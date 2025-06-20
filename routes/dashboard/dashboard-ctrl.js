const db = require('../../db');

exports.getSeniorCitizenCountByState = (req, res) => {
    console.log("🎯 Controller reached");

    const sql = `
        SELECT 
            s.state_name, 
            COUNT(*) AS senior_count
        FROM aadhar_users u
        JOIN state_master s ON u.state_id = s.sid
        WHERE TIMESTAMPDIFF(YEAR, u.dob, CURDATE()) > 60
        GROUP BY u.state_id
    `;

    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ data: results });
    });
};
