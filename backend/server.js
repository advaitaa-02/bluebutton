const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 8081; // Change the port to 8081

app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // Enter your MySQL password here
  database: "bluebutton", // Change to your database name
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Route for registering new students
app.post('/register', (req, res) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;

  // Check if all required fields are present
  if (!firstName || !email || !password) {
    return res.status(400).json({ message: 'Please fill in all compulsory fields.' });
  }

  const sql = "INSERT INTO login (`first name`, `last name`, `email`, `password`, `phone number`) VALUES (?, ?, ?, ?, ?)";
  const values = [firstName, lastName, email, password, phoneNumber];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error registering the student.' });
    }
    return res.status(200).json({ message: 'Student registered successfully.' });
  });
});

// Route for retrieving login data
app.get('/', (req, res) => {
  const sql = "SELECT * FROM login";
  db.query(sql, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error retrieving login data.' });
    }
    return res.status(200).json(data);
  });
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
