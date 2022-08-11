quizUser();

function quizUser() {
  const questions = [
    {
      question: 'Сколько будет 2+2?',
      answer: 4,
    },
    {
      question: 'Солнце встает на востоке?',
      answer: true,
    },
    {
      question: 'Сколько будет 5 / 0?',
      answer: 'Infinity',
    },
    {
      question: 'Какого цвета небо?',
      answer: 'голубого',
    },
    {
      question: 'Какой правильный ответ на "Главный вопрос жизни, вселенной и всего такого"',
      answer: '42',
    },
  ];

  const answers = askQuestions(questions);
  const score = getScore(questions, answers);
  showResult(score);
};

function askQuestions(questions) {
  const answers = [];

  questions.forEach((item) => {
    typeof item.answer === 'boolean' 
      ? answers.push(confirm(item.question)) 
      : answers.push(prompt(item.question));
  });

  return answers;
};

function getScore(questions, answers) {
  let score = 0;

  questions.forEach((item, index) => {
    item.answer.toString().toLowerCase() === answers[index].toString().toLowerCase() 
      ? score += 10 
      : score += 0;
  });

  return score;
};

function showResult(score) {
  alert(`Ваш результат - ${score} очков!`);
};
