const router = require('express').Router();

const {
    getUsersData,
    insertUserData
} = require('../controller/userController');


router.get('/getusers', getUsersData);
router.post('/insertusers', insertUserData);

module.exports = router;