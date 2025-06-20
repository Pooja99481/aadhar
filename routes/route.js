const express = require('express');
const router = express.Router();

const regRoutes = require('./registration/reg-routes');
const dashboardRoutes = require('./dashboard/dashboard-routes');

router.use('/registration', regRoutes);        
router.use('/dashboard', dashboardRoutes); 

console.log("Routes file loaded");
module.exports = router;