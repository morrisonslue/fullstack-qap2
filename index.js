const express = require('express');
const app = express();
const port = 3000;
const { generateQuestion, checkAnswer } = require('./quizLogic');

let currentQuestion = null;
let streak = 0;
let leaderboard = [];

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); 
app.use(express.static('public')); 

//routes required
app.get('/', (req, res) => {
    const msg = req.query.msg;
    res.render('index', {
        leaderboard,
        msg
    });
});

app.get('/quiz', (req, res) => {
    const feedback = req.query.msg;

    currentQuestion = generateQuestion();
    console.log('Generated question:', currentQuestion);

    res.render('quiz', {
        operand1: currentQuestion.operand1,
        operand2: currentQuestion.operand2,
        operator: currentQuestion.operator,
        streak,
        feedback
    });
});

//Handles quiz submissions
app.post('/quiz', (req, res) => {
    const { answer, finishQuiz } = req.body;
    console.log(`Answer: ${answer}`);

    if (finishQuiz === 'true') {
        if (streak > 0) {
            leaderboard.push({
                streak: streak,
                time: new Date().toLocaleString()
            });
            leaderboard.sort((a, b) => b.streak - a.streak);
            leaderboard = leaderboard.slice(0, 10);
        }
        console.log('User finished quiz. Saving streak and resetting.');
        streak = 0;
        return res.redirect('/?msg=finished');
    }

    if (checkAnswer(currentQuestion, answer)) {
        streak++;
        console.log('Correct! Current streak:', streak);
        return res.redirect('/quiz?msg=correct');
    } else {
        console.log('Incorrect! Final streak was:', streak);
        if (streak > 0) {
            leaderboard.push({
                streak: streak,
                time: new Date().toLocaleString()
            });
            leaderboard.sort((a, b) => b.streak - a.streak);
            leaderboard = leaderboard.slice(0, 10);
        }
        // reset streak
        streak = 0;
        // Redirect home and also have the you got it wrong message
        return res.redirect('/?msg=incorrect');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


