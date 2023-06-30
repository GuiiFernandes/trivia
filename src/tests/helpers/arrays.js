export const initialState = {
  player: {
    name: 'Teste1',
    assertions: 4,
    score: 273,
    gravatarEmail: 'teste1@email.com',
  },
};

export const ranking = [
  {
    name: 'Teste2',
    email: 'teste2@email.com',
    score: 40,
  },
  {
    name: 'Teste3',
    email: 'teste3@email.com',
    score: 0,
  },
  {
    name: 'Teste4',
    email: 'teste4@email.com',
    score: 194,
  },
  {
    name: 'Teste4',
    email: 'teste4@email.com',
    score: 70,
  },
  {
    name: 'Teste1',
    assertions: 4,
    score: 273,
    gravatarEmail: 'teste1@email.com',
  },
];

export const sortRanking = [
  {
    name: 'Teste1',
    email: 'teste1@email.com',
    score: 273,
  },
  {
    name: 'Teste4',
    email: 'teste4@email.com',
    score: 194,
  },
  {
    name: 'Teste4',
    email: 'teste4@email.com',
    score: 70,
  },
  {
    name: 'Teste2',
    email: 'teste2@email.com',
    score: 40,
  },
  {
    name: 'Teste3',
    email: 'teste3@email.com',
    score: 0,
  },
];

export const questions = [
  {
    category: "Entertainment: Video Games",
    correct_answer: "7.62mm",
    difficulty: "easy",
    incorrect_answers: ["5.56mm", "9mm", ".300 Magnum"],
    question: "In &quot;PUBATTLEGROUNDS&quot; which ammo type does the M24 use?",
    type: "multiple",
  },
  {
    category: "Science & Nature",
    correct_answer: "True",
    difficulty: "medium",
    incorrect_answers: ["False"],
    question: "Anatomy considers the forms of macroscopic structures such as organs and organ systems.",
    type: "boolean",
  },
  {
    category: "Geography",
    correct_answer: "Anglesey",
    difficulty: "hard",
    incorrect_answers: ["Barry", "Bardsey", "Caldey"],
    question: "Llanfair&shy;pwllgwyngyll&shy;gogery&shy;chwyrn&shy;drobwll&shy;llan&shy;tysilio&shy;gogo&shy;goch is located on which Welsh island?",
    type: "multiple",
  },
  {
    category: "Science: Computers",
    correct_answer: "Serbia",
    difficulty: "medium",
    incorrect_answers: ["Romania", "Russia", "Rwanda"],
    question: ".rs is the top-level domain for what country?",
    type: "multiple",
  },
  {
    category: "Entertainment: Books",
    correct_answer: "True",
    difficulty: "hard",
    incorrect_answers: ["False"],
    question: "Harry Potter was born on July 31st, 1980.",
    type: "boolean",
  },
];
