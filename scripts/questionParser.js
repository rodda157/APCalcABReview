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
        if (file != ""){
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
           var question = {};
           console.log(q);
           //TODO actually parse the questions into an array
       });
    });
}