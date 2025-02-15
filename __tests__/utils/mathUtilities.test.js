const { isCorrectAnswer, getQuestion } = require("../../utils/mathUtilities");

describe("Tests for getQuestion", () => {
  test("should return correct objects", () => {
    const question = getQuestion();

    // check keys
    expect(question).toHaveProperty("operand1");
    expect(question).toHaveProperty("operand2");
    expect(question).toHaveProperty("operator");
    expect(question).toHaveProperty("correctAnswer");

    // validate operand1 and operand2
    expect(question.operand1).toBeGreaterThanOrEqual(1);
    expect(question.operand1).toBeLessThanOrEqual(12);
    expect(question.operand2).toBeGreaterThanOrEqual(1);
    expect(question.operand2).toBeLessThanOrEqual(12);

    // validate operator
    const validOperators = ["+", "-", "*", "/"];
    expect(validOperators).toContain(question.operator);
  });
});

describe("Tests for isCorrectAnswer", () => {
  test("should return true for correct answers", () => {
    // random example question
    const mockQuestion = {
      operand1: 2,
      operand2: 3,
      operator: "+",
      correctAnswer: 5
    };

    // correct answer
    expect(isCorrectAnswer(mockQuestion, "5")).toBe(true);
  });

  test("should return false", () => {
    const mockQuestion = {
      operand1: 2,
      operand2: 3,
      operator: "+",
      correctAnswer: 5
    };

    // User's wrong answer
    expect(isCorrectAnswer(mockQuestion, "10")).toBe(false);
  });

  test("should handle floating-point", () => {
    const mockQuestion = {
      operand1: 10,
      operand2: 4,
      operator: "/",
      correctAnswer: 2.5
    };

    // if correct
    expect(isCorrectAnswer(mockQuestion, "2.5")).toBe(true);
  });
});
