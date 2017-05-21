
var elements = [
	"H",
	"He",
	"Li",
	"Be",
	"B",
	"C",
	"N",
	"O",
	"F",
	"Ne",
	"Na",
	"Mg",
	"Al",
	"Si",
	"P",
	"S",
	"Cl",
	"Ar",
	"K",
	"Ca",
	"Sc",
	"Ti",
	"V",
	"Cr",
	"Mn",
	"Fe",
	"Co",
	"Ni",
	"Cu",
	"Zn",
	"Ga",
	"Ge",
	"As",
	"Se",
	"Br",
	"Kr",
	"Rb",
	"Sr",
	"Y",
	"Zr",
	"Nb",
	"Mo",
	"Tc",
	"Ru",
	"Rh",
	"Pd",
	"Ag",
	"Cd",
	"In",
	"Sn",
	"Sb",
	"Te",
	"I",
	"Xe",
	"Cs",
	"Ba",
	"La",
	"Ce",
	"Pr",
	"Nd",
	"Pm",
	"Sm",
	"Eu",
	"Gd",
	"Tb",
	"Dy",
	"Ho",
	"Er",
	"Tm",
	"Yb",
	"Lu",
	"Hf",
	"Ta",
	"W",
	"Re",
	"Os",
	"Ir",
	"Pt",
	"Au",
	"Hg",
	"Tl",
	"Pb",
	"Bi",
	"Po",
	"At",
	"Rn",
	"Fr",
	"Ra",
	"Ac",
	"Th",
	"Pa",
	"U",
	"Np",
	"Pu",
	"Am",
	"Cm",
	"Bk",
	"Cf",
	"Es",
	"Fm",
	"Md",
	"No",
	"Lr",
	"Rf",
	"Db",
	"Sg",
	"Bh",
	"Hs",
	"Mt",
	"Ds",
	"Rg",
	"Cn",
	"Uut",
	"Fl",
	"Uup",
	"Lv", 
	"Uus",
	"Uuo",
];




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
                    question.choices = answers.split(",");
                } else if (answers.indexOf("!") >= 0) { //A | and a ! means generate random answers excluding the specified elements
                    var nt = answers.substring(answers.indexOf("!") + 1);
                    var notThese = nt.split(",");
                    notThese.push(question.correct);
                    question.choices = randomElements(notThese);
                } else { //no ! but a | means generate random answers
                    question.choices = randomElements([question.correct]);
                }
                question.choices.push(question.correct); //Add correct answer to answers
                for (var i = 0; i < question.choices.length; i++) { //Remove excess whitespace in answers
                    question.choices[i] = question.choices[i].trim();
                }
                
                if (question.choices.length == 5) { //Verify that the correct number of answers exist
                    // console.log(question);
                    questions.push(question);
                    // console.log(questions);
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
    var elems = [];
    for (var i = 0; i < 4; i++) {
    	var rnd = Math.floor(Math.random() * elements.length);
    	if (notThese.indexOf(elements[rnd]) >= 0) {
    		i--;
    	} else {
    		elems.push(elements[rnd]);
    		notThese.push(elements[rnd]);
    	}
    }
    return elems;
}