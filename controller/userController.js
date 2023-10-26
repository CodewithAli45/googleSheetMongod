const Users = require('../models/Users');
const {google} = require('googleapis');
const keys = require('../keys.json');

const fetchGoogleSheetData = async () => {
    const auth = new google.auth.GoogleAuth({
        keyFile: "keys.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });

    const authClientObject = await auth.getClient();
    const gooleSheetInstance = google.sheets({version: "v4", auth: authClientObject});
    const spreadsheetId = '1R33AKNVcQKHoY3V6_wueb_BRbiMcGEL1TIcS0oxsgoA';
    
    const readData = await gooleSheetInstance.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "sheet1!A1:D10",
    })

    const sampleData = readData.data.values;
    const fieldNames = sampleData[0];

    const convertedData = [];

    for(let i = 1; i < sampleData.length; i++){
        const row = sampleData[i];
        const rowData = {};
        for(let j = 0; j < fieldNames.length; j++){
            rowData[fieldNames[j]] = row[j];
        }

        convertedData.push(rowData);
    }
    return convertedData;
};

const insertDataIfNotExists = async (data) => {
    for (const item of data) {
        const existingUser = await Users.findOne({sl: item.sl});
        if (!existingUser) {
            await Users.create(item);
        }
    }
};

const runInsertUserData = async () => {
    try {
      const convertedData = await fetchGoogleSheetData();
      await insertDataIfNotExists(convertedData);
      console.log('Data inserted successfully.');
    } catch (error) {
      console.error('Error inserting data:', error);
    }
};

setInterval(runInsertUserData, 5000);

const runDeleteUserData = async () => {
    try {
        const convertedData = await fetchGoogleSheetData(); // Fetch the latest data from the Google Sheet.
        const googleSheetSLs = convertedData.map((item) => item.sl);

        // Delete records that are not present in the Google Sheet.
        await Users.deleteMany({ sl: { $nin: googleSheetSLs } });
        console.log('Data deleted successfully.');
    } catch (error) {
        
    }
}
setInterval(runDeleteUserData, 5000);


const getUsersData = async (req, res) => {
    try {

        const users = await Users.find().sort({ sl: 1 });;
        if(!users){
            return res.status(404).json({
                status: "failure",
                message: "no data found"
            })
        }

        return res.status(200).json({
            status: "success",
            data: {
                users
            }
        })
        
    } catch (error) {
        return res.status(401).json({
            status: "failure",
            message: error.message
        })
    }
}

const insertUserData = async (req,res) => {
    

    try {
        const convertedData = await fetchGoogleSheetData();
        await insertDataIfNotExists(convertedData);

        return res.status(200).json({
            status: "success",
            data: {
                convertedData
            }
        })
        
    } catch (error) {
        return res.status(401).json({
            status: "failure",
            message: error.message
        })
    }
}

module.exports = {
    getUsersData,
    insertUserData
}