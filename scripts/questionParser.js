
function getFileNames() {
    var fileNames;
    $.ajax({
        url: "./questions/qList.txt",
        method: "GET",
        success: function(data, err) {
            fileNames = data.split("\n");
        },
        error: function() {
            console.log("uh-oh");
        },
        async: false,
    });
    return fileNames
}

function getQuestionsArrayFromFiles(fileNames) {
    var questions = [];
    fileNames.forEach(function(file) {
        if (file.trim() != ""){
            $.ajax({
                url: "./questions/" + file,
                method: "GET",
                success: function(data, err) {
                    // console.log(data.split("\n"));
                    questions.push(data.split("\n"));
                },
                error: function() {
                    console.log("uh-oh");
                },
                async: false,
            });
        }
    });
    return questions;
}

function createQuestions(qArr) {
    var questions = [];
    qArr.forEach(function(file) {
        file.forEach(function(q) {
            if (q.trim() != "") {
                var question = {};
                var sep1 = q.indexOf("::");
                if(sep1 < 0)
                {
                    var img = q.substring(0, q.indexOf("|"));
                    img = img.trim();
                    var qImage = document.createElement("qImage");
                    qImage.setAttribute("src", img);
                    qImage.setAttribute("width", "150");
                    qImage.setAttribute("height", "50");
                    qImage.setAttribute("alt", "Question");
                    sep1 = q.indexOf("|")-1;
                    document.getElementById("qImage").src = img;
                    question.body = "";
                }
                    
                else
                {
                    question.body = q.substring(0, sep1).trim();
                }
                var sep2 = q.indexOf(";;");
                question.correct = q.substring(sep1 + 2, sep2).trim();
                var answers = q.substring(sep2 + 2).trim();
                if (answers.indexOf("|") < 0) { //No | means use specified answers
                    question.choices = answers.split(",");
                }
                question.choices.push(question.correct); //Add correct answer to answers
                for (var i = 0; i < question.choices.length; i++) { //Remove excess whitespace in answers
                    question.choices[i] = question.choices[i].trim();
                }
                
                if (question.choices.length >= 4) { //Verify that the correct number of answers exist
                    questions.push(question);
                } else {
                    console.log("Not enough answers on this question:");
                    console.log(question.body);
                }
            }
        });
    });
    return questions;
}