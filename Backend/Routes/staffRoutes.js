const express = require('express');
const { updateEmailController, changePasswordController } = require('../Controllers/staffController');

const router = express.Router();

router.put('/updateEmail', updateEmailController);
router.put('/changePassword', changePasswordController);    

module.exports = router;