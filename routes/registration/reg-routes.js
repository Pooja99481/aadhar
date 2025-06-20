const express = require('express');
const router = express.Router();
const regCtrl = require('./reg-ctrl');

router.post('/upload_profile_picture/:id', regCtrl.upload, regCtrl.uploadProfilePicture);


router.post('/insert_aadhar', regCtrl.insertAadhar);
router.get('/aadhar_users', regCtrl.getAllAadharUsers);         // GET all
router.get('/aadhar_users/:id', regCtrl.getAadharUserById);     // GET one
router.patch('/aadhar_users/:id', regCtrl.updateAadharUser);    // UPDATE
router.delete('/aadhar_users/:id', regCtrl.deleteAadharUser);   // DELETE
module.exports = router;
