//quiz should be an array of objects
//each object should contain the question, the answers, and the index of the correct answer - I think?
var state = {
    questionsAsked: [],
    questionsCorrect: []
}

var quiz = [{
    "question":"How many humanoid cylon models were there?",
    "answers":["Seven", "Thirteen", "Twelve"],
    "answerIndex": 2
},
{
    "question":"What is the name of the planet that was made uninhabitable in Season 1, Episode 1?",
    "answers":["Caprica", "Earth", "Nebula 5"],
    "answerIndex": 1
},
{
    "question": "What was Laura Roslin's position before she became President?",
    "answers": ["Secretary of State", "Secretary of Agriculture", "Secretary of Education"],
    "answerIndex": 2
}
]


var getQuestion = function(state){
    var questionIndex = Math.floor((Math.random() * quiz.length));

    if (state.questionsAsked.length < 0 || !state.questionsAsked.includes(questionIndex))
    {
        state.questionsAsked.push(questioIndex);
        return quiz[questionIndex];
    }
    else
        getQuestion(state)
}

var renderQuestion = function(state){
    var question = getQuestion(state);

}
