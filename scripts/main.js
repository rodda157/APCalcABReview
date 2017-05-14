var fileNames = getFileNames();
console.log(fileNames);
var questionFiles = getQuestionsArrayFromFiles(fileNames);
console.log(questionFiles);
createQuestions(questionFiles);