function getFileNames() {
    var fileNames;
    $.ajax({
        url: "./questions/qList.txt",
        method: "GET",
        success: function(data, err) {
            // console.log(data.split("\n"));
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
                // console.log(q);
                var sep1 = q.indexOf("::");
                question.body = q.substring(0, sep1).trim();
                var sep2 = q.indexOf(";;");
                question.correct = q.substring(sep1 + 2, sep2).trim();
                var answers = q.substring(sep2 + 2).trim();
                if (answers.indexOf("|") < 0) { //No | means use specified answers
                    question.choices = answers.split(" ");
                } else if (answers.indexOf("!") >= 0) { //A | and a ! means generate random answers excluding the specified elements
                    var nt = answers.substring(answers.indexOf("!") + 1);
                    question.choices = randomElements(nt.split(" ").push(question.correct));
                } else { //no ! but a | means generate random answers
                    question.choices = randomElements([question.correct]);
                }
                question.choices.push(question.correct); //Add correct answer to answers
                
                if (question.choices.length == 5) { //Verify that the correct number of answers exist
                    // console.log(question);
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

function randomElements(notThese) {
    //TODO generate 4 random elements that are not in the passed in array
    return ["Kr","W","Ge","Li"]; //dummy placeholder. REPLACE THIS!
}