//quiz should be an array of objects
//each object should contain the question, the answers, and the index of the correct answer - I think?
var state = {
    currentQuestion: {},
    currentAnswer: -1,
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

//Returns an unasked Question
var getQuestion = function(state){
    var questionIndex = Math.floor((Math.random() * quiz.length));

    if (state.questionsAsked.length < 0 || !state.questionsAsked.includes(questionIndex))
    {
        state.questionsAsked.push(questionIndex);
        return quiz[questionIndex];
    }
    else
        getQuestion(state)
}

//weird things happening: http://jsbin.com/rakobi/edit?js,console
var renderQuestion = function(state, element){
    var question = state.currentQuestion;

    var questionsHTML = '<p class = question>' + 
        question.question + '</p>' +
        '<ul class = "answers">' + 
        question.answers.map(function(answer){
            return '<li class = "answer">' + answer + '</li>'
        }).join(" ") + '</ul>';

    element.html(questionsHTML);
}

var setQuestion = function(state){
    state.currentQuestion = getQuestion(state);
}

setQuestion(state);
renderQuestion(state, $('.quiz-area'));

//listeners
$('.answers').on('click', '.answer', function(event){
    $(this).closest('ul').find('li').removeClass('selected');
    $(this).addClass('selected');
    state.currentAnswer = state.currentQuestion.answers.indexOf($(this).text());
    console.log(state.currentAnswer);
})

$('.submit-button').on('click', function(event){
    $(this).addClass('selected');
})