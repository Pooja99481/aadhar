// const cron = require('node-cron');
// const nodemailer = require('nodemailer');
// const db = require('./db');

// // Cron runs every minute (for testing)
// cron.schedule('0 9 * * *', () => {
//     console.log("Running birthday cron...");

//     const query = `
//         SELECT first_name, email_id
//         FROM aadhar_users
//         WHERE DATE_FORMAT(dob, '%m-%d') = DATE_FORMAT(CURDATE(), '%m-%d')
//     `;

//     db.query(query, (err, results) => {
//         if (err) return console.error("DB error:", err);

//         if (results.length === 0) {
//             console.log("No birthdays today.");
//             return;
//         }

//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: 'poojashivashankar12@gmail.com',
//                 pass: 'twlm zjni rgrz vlni'
//             }
//         });

//         results.forEach(user => {
//             const mailOptions = {
//                 from: 'your_email@gmail.com',
//                 to: user.email_id,
//                 subject: 'Happy Birthday!',
//                 text: `Dear ${user.first_name},\n\nWishing you a wonderful birthday!\n\n– Aadhar Team`
//             };

//             transporter.sendMail(mailOptions, (error, info) => {
//                 if (error) console.error("Email error:", error);
//                 else console.log(`Email sent to ${user.email_id}`);
//             });
//         });
//     });
// });
