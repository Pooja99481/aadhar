const express = require('express');
const router = express.Router();
const dashboardCtrl = require('./dashboard-ctrl');

router.get('/state_wise_aadhar_count_above_60', dashboardCtrl.getSeniorCitizenCountByState);
router.get('/test', (req, res) => res.send("✔️ Dashboard test route working!"));

console.log("Dashboard routes loaded");


module.exports = router;

