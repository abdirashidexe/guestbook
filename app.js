import express from 'express';

const app = express();

app.use(express.static('public'));

app.use(express.urlencoded({extended: true}));

const PORT = 3000;

app.get('/', (req, res) => {

    res.sendFile(`${import.meta.dirname}/views/home.html`);
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

app.post('/thankyou', (req, res) => {

    res.sendFile(`${import.meta.dirname}/views/thankyou.html`);
    console.log(req.body);
});