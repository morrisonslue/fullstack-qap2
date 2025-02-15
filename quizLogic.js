// question generator
function generateQuestion() {
    const operators = ['+', '-', '*', '/'];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    const operand1 = Math.floor(Math.random() * 12) + 1; 
    const operand2 = Math.floor(Math.random() * 12) + 1; 

    let correctAnswer;
    switch (operator) {
        case '+':
            correctAnswer = operand1 + operand2;
            break;
        case '-':
            correctAnswer = operand1 - operand2;
            break;
        case '*':
            correctAnswer = operand1 * operand2;
            break;
        case '/':
            correctAnswer = operand1 / operand2;
            break;
    }

    return {
        operand1,
        operand2,
        operator,
        correctAnswer
    };
}

// check the user's answer and return t or f
function checkAnswer(questionObj, userAnswer) {
    // float tolerance
    const epsilon = 0.000001;
    if (Math.abs(questionObj.correctAnswer - parseFloat(userAnswer)) < epsilon) {
        return true;
    }
    return false;
}

module.exports = {
    generateQuestion,
    checkAnswer
};
