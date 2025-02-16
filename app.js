import express from 'express';

const app = express();

app.use(express.static('public'));

app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');

const submissions = [];

const PORT = 3000;

app.get('/', (req, res) => {

    res.render('home');
});

const orders = [];

app.post('/thankyou', (req, res) => {

    res.render(`${import.meta.dirname}/views/thankyou.html`);
    console.log(req.body);
});

app.post('/submit-order', (req, res) => {

    if (req.body.fname == "" || req.body.lname == "" || req.body.email == "")
    {
        res.render('invalid-submission');
        return;
    }

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

    // Save submission to the array
    submissions.push(submission);

    // Log the submissions array to the console
    console.log(submissions);

    // Send confirmation page
    res.render('thankyou', { submission });
});

app.get('/admin', (req,res) => {
    res.render('submission-summary', { submissions });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});