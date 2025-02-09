import express from 'express';

const app = express();

app.use(express.static('public'));

app.use(express.urlencoded({extended: true}));

const submissions = [];

const PORT = 3000;

app.get('/', (req, res) => {

    res.sendFile(`${import.meta.dirname}/views/home.html`);
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

const orders = [];

app.post('/thankyou', (req, res) => {

    res.sendFile(`${import.meta.dirname}/views/thankyou.html`);
    console.log(req.body);
});

app.post('/submit-order', (req, res) => {

    // Get form data from req body
    const submission = {
        fname: req.body.fname,
        lname: req.body.lname,
        job: req.body.email,
        company: req.body.company,
        linkedin: req.body.linkedin,
        email: req.body.email,
        timestamp: new Date()
    };

    // Save submission to the array
    submissions.push(submission);

    // Log the submissions array to the console
    console.log(submissions);

    // Send confirmation page
    res.sendFile(`${import.meta.dirname}/views/thankyou.html`)
});

app.get('/admin/orders', (req,res) => {
    res.send(submissions);
});