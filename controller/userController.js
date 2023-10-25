const Users = require('../models/Users');
const {google} = require('googleapis');


const getUsersData = async (req, res) => {
    try {
        
    } catch (error) {
        return res.status(401).json({
            status: "failure",
            message: error.message
        })
    }
}

const insertUserData = async (req,res) => {

    try {
        
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