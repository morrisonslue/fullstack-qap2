const express = require('express');
const app = express();
const port = 3000;
const { generateQuestion, checkAnswer } = require('./quizLogic');

let currentQuestion = null;
let streak = 0;
let leaderboard = [];

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); // For parsing form data
app.use(express.static('public')); // To serve static files (e.g., CSS)

//routes required
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/quiz', (req, res) => {
    // generate random question
    currentQuestion = generateQuestion();
    console.log('Generated question:', currentQuestion);

    // quiz EJS
    res.render('quiz', {
        operand1: currentQuestion.operand1,
        operand2: currentQuestion.operand2,
        operator: currentQuestion.operator,
        streak 
    });
});

app.get('/completion', (req, res) => {
    if (streak > 0) {
        leaderboard.push({
            streak: streak,
            time: new Date().toLocaleString() 
        });
        leaderboard.sort((a, b) => b.streak - a.streak);
        leaderboard = leaderboard.slice(0, 10);
    }
    res.render('completion', { streak });
});

app.get('/leaderboard', (req, res) => {
    res.render('leaderboard', { leaderboard });
});

//Handles quiz submissions.
app.post('/quiz', (req, res) => {
    const { answer } = req.body;
    console.log(`Answer: ${answer}`);

    //The `answer` variable will contain the value the user entered on the quiz page
    //You must add the logic here to check if the answer is correct, then track the streak and redirect the user
    //properly depending on whether or not they got the question right

    if (checkAnswer(currentQuestion, answer)) {
        streak++;
        console.log('Correct! Updating streak...');
        res.redirect('/completion');
    } else {
        console.log('Incorrect! Resetting streak...');
        streak = 0;
        res.redirect('/');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
