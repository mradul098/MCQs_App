// required packages
const express = require('express');
const path = require('path');
const Datastore = require('nedb');
const { Auth } = require("two-step-auth");


const app = express();
const PORT = process.env.PORT || 3000;


// path variables
const pathPUBLIC = path.join(__dirname,`/public`);
const pathADMIN = path.join(__dirname,`/public/adminLogin.html`);
const pathRESULT = path.join(__dirname,`/public/score.html`);

// middlewares
app.use(express.static(pathPUBLIC));
app.use(express.json({ limit: '5mb' }));


const question_bank = new Datastore('question_bank.json');
const users_score = new Datastore('users_score.json');

question_bank.loadDatabase();
users_score.loadDatabase();


function randomize(data1) {

    let questions = [];
    let i = 0;
    let num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

    while (i < 10) {
        let random = Math.floor(Math.random() * num.length)
        let indx = num.splice(random, 1);
        questions.push(data1[indx[0]]);
        i++;
    }
    return questions;
}


async function login(emailId) {

    const res = await Auth(emailId);

    let otp = res.OTP;
    let status = res.success;
    return { otp, status };
}


app.get('/admin-login', (req, res) => {
    res.sendFile(pathADMIN);
});


app.get('/api', (request, response) => {

    question_bank.find({}, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        response.send(randomize(data));
    });
});


app.get('/result', (req, res) => {
    res.sendFile(pathRESULT);
});


app.get('/rankings', (request, response) => {
    users_score.find({}, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    });
});


app.post('/otp', (req, res) => {
    const data = req.body;

    login(data.email).then(res1 => {
        res.json(res1);
    });
});


app.post('/result', (request, response) => {
    const data = request.body;

    users_score.insert(data);
    response.json(data);
});


app.post('/add_questions', (request, response) => {
    const data = request.body;
    const data1 = {
        question: data.question,
        options: [data.choices[0], data.choices[1], data.choices[2], data.choices[3]],
        correctIndex: data.correctindex
    }

    question_bank.insert(data1);
});


app.listen(PORT, () => {
    console.log(`server running on Port:${PORT}`);
})