const Patient = require('../Model/patientOpdRecords');
const { encrypt, decrypt } = require('../Utils/crypto');

const createPatientOpdRecord = async ({ patientID, date, symptoms, treatment, investigation }) => {
    try {
        const encryptedPatientData = {
            patientID,
            date,
            symptoms: encrypt(symptoms),
            treatment: encrypt(treatment),
            investigation: encrypt(investigation),
        };
        const newPatient = new Patient(encryptedPatientData);
        await newPatient.save();
        return newPatient;
    } catch (error) {
        throw error;
    }
};

const getAllPatientOpdRecords = async (patientId) => {
    try {
        const patientRecords = await Patient.find({ patientID: patientId });

        return {
            patientRecords: patientRecords.map((record) => ({
                patientID: record.patientID,
                date: record.date,
                time: record.time,
                symptoms: decrypt(record.symptoms.encryptedData, record.symptoms.iv),
                treatment: decrypt(record.treatment.encryptedData, record.treatment.iv),
                investigation: decrypt(record.investigation.encryptedData, record.investigation.iv),
            })),
        };
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createPatientOpdRecord,
    getAllPatientOpdRecords,
};