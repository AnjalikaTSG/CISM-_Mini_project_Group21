const API_BASE_URL = 'http://localhost:3000';

export const updateEmail = async (username, newEmail) => {
    try {
        const response = await fetch(`${API_BASE_URL}/staff/updateEmail`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: newEmail, username }),
        });
        if (!response.ok) {
            throw new Error('Failed to update email');
        }
        return { success: true, message: 'Email updated successfully' };
    } catch (error) {
        console.error('Error updating email:', error);
        return { success: false, message: 'Error updating email' };
    }
};

export const changePassword = async (username, newPassword) => {
    try {
        const response = await fetch(`${API_BASE_URL}/staff/changePassword`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newPassword: newPassword, username }),
        });
        if (!response.ok) {
            throw new Error('Failed to change password');
        }
        return { success: true, message: 'Password changed successfully' };
    } catch (error) {
        console.error('Error changing password:', error);
        return { success: false, message: 'Error changing password' };
    }
};
