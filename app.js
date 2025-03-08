import express from 'express';
import mariadb from 'mariadb';
import validateForm from './services/validation.js';
import dotenv from 'dotenv';

dotenv.config();

// Define our database credentials
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

// Define function to connect to the DB
async function connect() {
    try {
        const conn = await pool.getConnection();
        console.log('Connected to the database!!')
        return conn;
    } catch (err) {
        console.log(`Error connecting to the database.. uh oh: ${err}`)
    }
}

// Instantiate an Express application
const app = express();

app.use(express.static('public'));

app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');

// Const submissions = [];

const PORT = 3000;

app.get('/', (req, res) => {

    res.render('home');
});

// Const orders = [];

app.post('/thankyou', async(req, res) => {

    res.render(`${import.meta.dirname}/views/thankyou.html`);
    console.log(req.body);
});

app.post('/submit-order', async (req, res) => {

    // Get form data from req body
    const submission = {
        fname: req.body.fname,
        lname: req.body.lname,
        job: req.body.job,
        company: req.body.company,
        linkedin: req.body.linkedin,
        email: req.body.email,
        met: req.body.howwemet,
        other: req.body.other,
        message: req.body.message,
        mailinglist: req.body.mailinglist,
        emailformat: req.body.emailformat,
        timestamp: new Date()
    };
    console.log('Submission data: ', submission);

    const result = validateForm(submission);
    if (!result.isValid) {
        console.log(result.errors);
        res.send(result.errors);
        return;
    }
    
    // Connect to the database
    const conn = await connect();

    // Convert emailformat to a string 
    if (submission.mailinglist)
    {
        if (Array.isArray(submission.mailinglist))
        {
            submission.mailinglist = submission.mailinglist.join(",");
        }
    } else {
        submission.mailinglist = "";
    }

    
    // Add the submission to our database
    const insertQuery = await conn.query(`
        INSERT INTO submissions
        (fname, lname, job, company, linkedin, email, met, other, message, mailinglist, emailformat, time_stamp)
        values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [ submission.fname, submission.lname, submission.job, submission.company, submission.linkedin, submission.email, submission.met, submission.other, submission.message, submission.mailinglist, submission.emailformat, submission.timestamp]);

    // Send confirmation page
    res.render('thankyou', { submission });
});

app.get('/admin', async (req,res) => {
    // Connect to database
    const conn = await connect();

    // Query the databse
    const submissions = await conn.query('SELECT * FROM submissions');

    console.log(submissions);
    
    res.render('submission-summary', { submissions });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});