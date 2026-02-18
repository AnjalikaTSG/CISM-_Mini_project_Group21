const Staff = require('../Model/staff');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const updateEmail = async (username, newEmail) => {
    try {
        const staff = await Staff.findOne({username: username});
        if (!staff) {
            return { success: false, message: 'User not found' };
        }
        console.log(staff);
        staff.email = newEmail;
        await staff.save();
        return { success: true, message: 'Email updated successfully' };
    } catch (error) {
        console.error('Error updating email:', error);
        return { success: false, message: 'Error updating email' };
    }
};

const changePassword = async (username, newPassword) => {
    try {
        const staff = await Staff.findOne({username: username});
        if (!staff) {
            return { success: false, message: 'User not found' };
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        staff.password = hashedPassword;
        staff.isPasswordTemporary = false;
        staff.passwordResetAt = Date.now();
        await staff.save();
        return { success: true, message: 'Password changed successfully' };
    } catch (error) {
        console.error('Error changing password:', error);
        return { success: false, message: 'Error changing password' };
    }
};

module.exports = { updateEmail, changePassword };