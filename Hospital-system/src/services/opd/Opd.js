const API_BASE_URL = 'http://localhost:3000';

export const addOpdRecord = async (record, patientId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/opd-records/add/${patientId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(record),
        });
        return response.json();
    } catch (error) {
        console.error('Error adding OPD record:', error);
        throw error;
    }
};

export const getOpdRecords = async (patientId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/opd-records/getAll/${patientId}`);
        return response.json().then((data) => data.patientRecords);
    } catch (error) {
        console.error('Error fetching OPD records:', error);
        throw error;
    }
};