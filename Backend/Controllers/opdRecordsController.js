const { createPatientOpdRecord, getAllPatientOpdRecords } = require('../Services/opdRecordsService');

const createOpdRecord = async (req, res) => {
    try {
        const patientId = req.params.patientId;
        const opdRecord = req.body;
        const newOpdRecord = await createPatientOpdRecord({ patientID: patientId, date: opdRecord.date, symptoms: opdRecord.symptoms, treatment: opdRecord.treatment, investigation: opdRecord.investigation });
        res.status(201).json(newOpdRecord);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllOpdRecords = async (req, res) => {
    try {
        const patientId = req.params.patientId;
        const opdRecords = await getAllPatientOpdRecords(patientId);
        res.status(200).json(opdRecords);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    createOpdRecord,
    getAllOpdRecords
};