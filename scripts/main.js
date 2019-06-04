var music = document.getElementById("music");
music.load();

var questions = [];

var qCurrent = 0;
var numCorrect = 0;
var numTotal = 0;
var topic = "";
$(".ans").click(function() {
    numTotal++;
    ans = $(this).find("h4").html();
    if (ans == questions[qCurrent].correct) {
        numCorrect++;
        $("#incorrect").hide();
        $("#correct").show();
    } else {
        $("#correct").hide();
        $("#correctWas").html(questions[qCurrent].correct);
        $("#incorrect").show();
    }
    $("#score").html("Correct: " + (numCorrect / numTotal * 100).toFixed(2) + "%");
    qCurrent++;
    $("#qArea").hide();
});

$(".navbar-brand").click(function(){
    document.location.reload()
});

$(".next").click(function() {
    $("#qArea").show();
    $(".result-msg").hide();
    showNextQuestion();
});

$("#playPause").click(function() {
    if (music.paused) {
        music.play();
        $(this).html('<i id="musicIcon" class="fa fa-volume-up"></i>');
    } else {
        music.pause();
        $(this).html('<i id="musicIcon" class="fa fa-volume-off"></i>&nbsp;&nbsp;');
    }
});

$("#cont").click(function() {
    $("#startScreen").hide();
    $("#qArea").show();
    music.play();
    alert("Hi");
    var questionFiles = getQuestionsArrayFromFiles(["LimitsAndContinuity.txt"]);
    questions = createQuestions(questionFiles);
    questions = shuffle(questions);
    showNextQuestion();
});

$("#deriv").click(function() {
    $("#startScreen").hide();
    $("#qArea").show();
    music.play();
    topic = "cont";
    var questionFiles = getQuestionsArrayFromFiles(["Deriv.txt"]);
    questions = createQuestions(questionFiles);
    questions = shuffle(questions);
    showNextQuestion();
});

$("#integ").click(function() {
    $("#startScreen").hide();
    $("#qArea").show();
    music.play();
    topic = "cont";
    var questionFiles = getQuestionsArrayFromFiles(["Integral.txt"]);
    questions = createQuestions(questionFiles);
    questions = shuffle(questions);
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
        if(questions[qCurrent].body.toString().charAt(0) == '.')
        {
            $("#qBody").html("");
            document.getElementById("qImage").src = questions[qCurrent].body;
        }
        else
        {
            $("#qBody").html(questions[qCurrent].body);
        }
        questions[qCurrent].choices = shuffle(questions[qCurrent].choices);
        for (var i = 0; i < questions[qCurrent].choices.length; i++) {
            $("#ans" + (i + 1)).html(questions[qCurrent].choices[i]);
        }
    } else {
        $("#qArea").hide();
        $("#finalScore").html("Correct: " + (numCorrect / numTotal * 100).toFixed(2) + "%");
        $("#finalScreen").show();
    }
}
