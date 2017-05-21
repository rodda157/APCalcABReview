var fileNames = getFileNames();
// console.log(fileNames);
var questionFiles = getQuestionsArrayFromFiles(fileNames);
// console.log(questionFiles);
var questions = createQuestions(questionFiles);
// console.log(questions)
questions = shuffle(questions);
// console.log(questions);

var qCurrent = 0;
var numCorrect = 0;
var numTotal = 0;

$(".ans").click(function() {
    numTotal++;
    ans = $(this).find("h4").html();
    console.log(ans);
    if (ans == questions[qCurrent].correct) {
        numCorrect++;
        $("#incorrect").hide();
        $("#correct").show();
    } else {
        $("#correct").hide();
        $("#incorrect").show();
    }
    $("#score").html((numCorrect / numTotal * 100) + "%");
    qCurrent++;
    showNextQuestion();
});

$("#playBtn").click(function() {
    console.log("play");
    $("#playBtn").hide();
    $("#qArea").show();
    showNextQuestion();
});

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var n = Math.floor(Math.random() * i);
        var temp = array[i];
        array[i] = array[n];
        array[n] = temp;
    }
    return array;
}

function showNextQuestion() {
    if (qCurrent < questions.length) {
        $("#qBody").html(questions[qCurrent].body);
        questions[qCurrent].choices = shuffle(questions[qCurrent].choices);
        for (var i = 0; i < questions[qCurrent].choices.length; i++) {
            $("#ans" + (i + 1)).html(questions[qCurrent].choices[i]);
        }
    } else {
        $("#qArea").hide();
    }
}