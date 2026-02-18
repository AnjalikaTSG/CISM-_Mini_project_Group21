const { updateEmail, changePassword } = require("../Services/staffService");

const updateEmailController = async (req, res) => {
    try {
        const { username, email } = req.body;
        await updateEmail(username, email);
        res.status(200).json({ message: "Email updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const changePasswordController = async (req, res) => {
    try {
        const { username, newPassword } = req.body;
        await changePassword(username, newPassword);
        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    updateEmailController,
    changePasswordController
};