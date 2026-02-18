const mongoose = require('mongoose');

const encryptedDataSchema = new mongoose.Schema({
    encryptedData: { type: String, required: true },
    iv: { type: String, required: true },
})

const opdSchema = new mongoose.Schema({
  patientID: { type: String, required: true },
  date: { type: Date, required: true },
  symptoms: { type: encryptedDataSchema, required: false },
  treatment: { type: encryptedDataSchema, required: false },
  investigation: { type: encryptedDataSchema, required: false },
});

module.exports = mongoose.models.patientOpdRecords || mongoose.model('patientOpdRecords', opdSchema, 'patientOpdRecords');