const db = require('../../db');

exports.insertAadhar = (req, res) => {
    const {
        first_name, last_name, dob,
        mobile_number, email_id, address,
        city_id, state_id
    } = req.body;

    if (!first_name || !last_name || !dob || !mobile_number) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const sql = `CALL insert_aadhar_user(?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [
        first_name, last_name, dob,
        mobile_number, email_id, address,
        city_id, state_id
    ], (err, result) => {
        if (err) {
            const duplicateKeywords = ['duplicate', 'already exists'];
            const isDuplicate = duplicateKeywords.some(keyword =>
                err.sqlMessage && err.sqlMessage.toLowerCase().includes(keyword)
            );

            return res.status(isDuplicate ? 409 : 400).json({
                error: err.sqlMessage
            });
        }

        res.json({
            message: result[0][0].message,
            aadhar_number: result[0][0].aadhar_number,
            first_name: result[0][0].first_name,
            mobile_number: result[0][0].mobile_number
        });
    });
};
// getting all aadhar users stored in the table

exports.getAllAadharUsers = (req, res) => {
    db.query('SELECT * FROM aadhar_users', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ data: results });
    });
};
// get one aadhar user by ID
exports.getAadharUserById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM aadhar_users WHERE aid = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: "User not found" });
        res.json({ data: results[0] });
    });
};
// update
exports.updateAadharUser = (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, address } = req.body;

    const sql = 'UPDATE aadhar_users SET first_name = ?, last_name = ?, address = ? WHERE aid = ?';
    db.query(sql, [first_name, last_name, address, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: "User not found" });
        res.json({ message: "User updated successfully" });
    });
};
// delete
exports.deleteAadharUser = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM aadhar_users WHERE aid = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: "User not found" });
        res.json({ message: "User deleted successfully" });
    });
};

const path = require('path');
const fs = require('fs');
const multer = require('multer');
//condition to check if uploads dir exists or  not
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
// Configure multer to save in /uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});
const upload = multer({ storage: storage });

exports.upload = upload.single('profile_picture');

exports.uploadProfilePicture = (req, res) => {
    const { id } = req.params;

    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const imagePath = req.file.filename;

    // Check if profile_picture already exists
    const checkSql = 'SELECT profile_picture FROM aadhar_users WHERE aid = ?';
    db.query(checkSql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (results[0].profile_picture) {
            return res.status(409).json({ error: 'Profile picture already exists and cannot be updated.' });
        }

        // Proceed with update
        const updateSql = 'UPDATE aadhar_users SET profile_picture = ? WHERE aid = ?';
        db.query(updateSql, [imagePath, id], (err2, result) => {
            if (err2) return res.status(500).json({ error: err2.message });

            res.json({
                message: 'Profile picture uploaded successfully',
                file: imagePath
            });
        });
    });
};
