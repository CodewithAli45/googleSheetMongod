const express = require('express');
const mongoose = require('mongoose');

const uri = 'mongodb+srv://alimy0304:AliBokaro827001@cluster1.snaghiz.mongodb.net/google_form';

const app = express();

mongoose.connect(uri).then(() => {
    console.log("connected to database");
}).catch((err) => {
    console.log("error in connecting to db ", err);
})

app.listen(3000, () => {
    console.log("server running at 3000");
})