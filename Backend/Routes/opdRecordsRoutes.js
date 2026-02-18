const express = require('express');
const { createOpdRecord, getAllOpdRecords } = require('../Controllers/opdRecordsController');

const router = express.Router();

router.post('/add/:patientId', createOpdRecord);
router.get('/getAll/:patientId', getAllOpdRecords);

module.exports = router;