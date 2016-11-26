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
    "answerIndex": 1
},
{
    "question":"What is the name of the planet that was made uninhabitable in Season 1, Episode 1?",
    "answers":["Caprica", "Earth", "Nebula 5"],
    "answerIndex": 0
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

    if (state.questionsAsked.length == 0 || !state.questionsAsked.includes(questionIndex))
    {
        state.questionsAsked.push(questionIndex);
        return quiz[questionIndex];
    }
    else
        return getQuestion(state);
}

var renderQuestion = function(state, element){
    var question = state.currentQuestion;
    console.log(question);

    var questionsHTML = '<p class = "question">' + 
        question.question + '</p>' +
        '<ul class = "answers">' + 
        question.answers.map(function(answer){
            return '<li class = "answer">' + answer + '</li>'
        }).join(" ") + '</ul>' + getProgressString(state);

    element.html(questionsHTML);
}

var getProgressString = function(state){
    var progressNumber = 0;
    if(state.questionsAsked.length > 0){
        progressNumber = state.questionsAsked.length;
    }
    return '<p class = "progress"> You are on question ' +
           progressNumber + ' of ' + quiz.length + '</p>';
}

var drawBoard = function(state){
    if(state.questionsAsked.length < quiz.length){
        state.currentQuestion = getQuestion(state);
        renderQuestion(state, $('.quiz-area'));
    }
    else{
        renderSummary(state,$('.results-area'));
    }
}

var renderSummary = function(state, element){
    $('.quiz-in-progress').addClass('hidden');
    $('.quiz-cleanup').removeClass('hidden');
    
    var summaryHTML = '\
    <h2>Congratulations!</h2>\
    <p>You were able to get ' + state.questionsCorrect.length + 
    ' questions out of ' + quiz.length + ' correct. Which is not too shabby! If you\'d like\
    to  play again. Feel free to click on the <b>Restart</b> button below to\
    begin anew.</p>\
    '

    element.html(summaryHTML);

}

//listeners
$('.quiz-area').on('click', '.answers .answer', function(event){
    $(this).closest('ul').find('li').removeClass('selected');
    $(this).addClass('selected');
    state.currentAnswer = state.currentQuestion.answers.indexOf($(this).text());
    console.log(state.currentAnswer);
})

$('.submit-button').on('click', function(event){
    if(state.currentAnswer === state.currentQuestion.answerIndex){
        state.questionsCorrect.push(state.currentQuestion);
        state.currentAnswer = -1;
        drawBoard(state);
    }
    else{
        state.currentAnswer = -1;
        drawBoard(state);
    }

})

$('.start-button').on('click', function(event){
    $('.pre-quiz').addClass('hidden');
    $('.quiz-in-progress').removeClass('hidden');
    drawBoard(state);
})

$('.restart-button').on('click', function(event){
    state.currentQuestion = {};
    state.currentAnswer = -1;
    state.questionsAsked = [];
    state.questionsCorrect = [];
    $('.quiz-cleanup').addClass('hidden');
    $('.quiz-in-progress').addClass('hidden');
    $('.pre-quiz').removeClass('hidden');
})

//Start the game