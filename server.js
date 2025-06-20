const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing form-data
app.use('/', require('./routes/route'));
// require('./cronServices');

app.get('/test', (req, res) => res.send('Server is working!'));
app.listen(9000, () => {
    console.log("Server running on http://localhost:9000");
});
