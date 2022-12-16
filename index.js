
let pickedOpt = undefined;
const options = document.getElementsByClassName("option");
let qSelect = 0;
let questions = [
    [
        "When using the &#60;canvas&#62; tag, which technique is used to draw the graphic to the page?",
        "None of these.",
        "A scripting language (such as Javascript) is used.",
        "Only server side code can be used to draw on the the canvas element.",
        "The canvas element has native support for geometric shapes, gradients, and fill colors; it does not require any other code to draw these."
    ], [
        "Which CSS style positions an element relative to the browser window?",
        "position: static;",
        "position: absolute;",
        "position: relative;",
        "position: fixed;"
    ], [
        "Which of the following is a JavaScript event capable of executing a function when the device pointer hovers over a page element?",
        "onmousein",
        "onmouseout",
        "onmousedown",
        "onmouseover"
    ], [
        "Which of the following functions is used to control timing in JavaScript Animations?",
        "timer()",
        "keyframes()",
        "setTimeout()",
        "None of these"
    ], [
        "Which of the following is the correct syntax for a pattern attribute on an input tag?",
        "pattern password",
        'pattern="password"',
        'pattern="[A-z0-9]"',
        "None of these"
    ], [
        "Which of the following tags has been deprecated in HTML5?",
        "&#60;small&#62;",
        "&#60;acronym&#62;",
        "&#60;b&#62;",
        "All of these have been deprecated"
    ], [
        "What is the <b>main</b> purpose of CSS in HTML5?",
        "CSS is used to determine style, positioning, and layout of a page.",
        "CSS is used to define content on a page.",
        "CSS is used for scripting on an HTML web page.",
        "None of these"
    ], [
        "In JavaScript, what is the difference between a global versus a local variable?",
        "A local variable can only be used by the function that defines it.",
        "A local variable is available to any code inside the script tags.",
        "A global variable is transported to other Javascript programs located on other web pages.",
        "A global variable is created inside a method or function"
    ], [
        "On a Windows touch device, in Mouse Pointer mode, which gesture serves the same purpose as a zoom out?",
        "Hold",
        "Pinch",
        "Swipe",
        "Tap"
    ], [
        "Which is a primary goal of the application launcher icon?",
        "Makes the application easier to configure.",
        "Help users discover the application in the Android Market or the Windows Store.",
        "Differentiates the application as paid vs. free.",
        "Identifies the developer of the application."
    ]
];
let answers = [1,3,3,2,2,1,0,0,1,1];
let picked = [4,4,4,4,4,4,4,4,4,4];
let qAnswered = [false, false, false, false, false, false, false, false, false, false];
let qFinishedEx = [true, true, true, true, true, true, true, true, true, true];
let score = 0;
let min = 0;
let sec = 0;
const timerCount = setInterval(timer,1000)

function select(o) {
    if (qAnswered[qSelect] == false) {
        pickedOpt = options[o];
        if (pickedOpt.className == "option selected") {
            pickedOpt.className = "option";
        } else {
            for (let p = 0; p != 4; p++) {
                options[p].className = "option";
            }
            pickedOpt.className = "option selected";
        }
    }
}

function loadQuestion() {
    var qSet = questions[qSelect];
    document.getElementById("question").innerHTML = qSet[0];
    for (let k = 1; k != 5; k++) {
        document.getElementsByClassName("option")[k - 1].innerHTML = qSet[k];
    }
    document.getElementById("questionNum").innerHTML = (qSelect + 1) + "/10";
}

let c = 0;
let allAnswered = false;
function checkIfRight() {
    for (let u = 0; u != 4; u++) {
        if (document.getElementsByClassName("option")[u].className == "option selected") {
            picked[qSelect] = u;
        }
    }
    if (document.getElementsByClassName("option selected")[0]) {
        document.getElementsByClassName("option")[answers[qSelect]].id = "right";
        document.getElementById("right").style.background = "#2ce438";
        if (document.getElementById("right").className == "option selected") {
            qAnswered[qSelect] = "c";
            document.getElementById("right").className = "option";
        } else {
            qAnswered[qSelect] = "i";
            document.getElementsByClassName("option selected")[0].id = "wrong";
            document.getElementById("wrong").style.background = "#e42c2c";
            document.getElementById("wrong").className = "option";
        }
        document.getElementById("submit").disabled = true;
    } else {
        console.log("No Answer Inputted");
    }
    checkmark();
    if (allAnswered == false) {
        for (let b = 0; b != 10; b++) {
            if (qAnswered[b] != false) {
                c++;
            }
        }
        if (c == 10) {
            document.getElementById("finish").style.display = "inline";
            allAnswered = true;
        } else {
            c = 0;
        }
    }
}

function difQuestion(g) {
    for (let v = 0; v != 4; v++) {
        document.getElementsByClassName("option")[v].className = "option";
        document.getElementsByClassName("option")[v].style.background = "#cbcbcb";
    }
    if (document.getElementsByClassName("option")[answers[qSelect]].id == "right") {
        document.getElementsByClassName("option")[answers[qSelect]].style.background = "#cbcbcb";
        document.getElementsByClassName("option")[answers[qSelect]].id = "";
    }
    if (document.getElementById("wrong")) {
        document.getElementById("wrong").style.background = "#cbcbcb";
        document.getElementById("wrong").id = "";
    }
    if (qSelect != (questions.length - 1) && g == 1 || qSelect != 0 && g == -1) {
        qSelect += g;
    }
    if (qAnswered[qSelect] == false) {
        document.getElementById("submit").disabled = false;
    } else {
        document.getElementById("submit").disabled = true;
    }
    if (qAnswered[qSelect] != false) {
        document.getElementsByClassName("option")[answers[qSelect]].id = "right";
        document.getElementById("right").style.background = "#2ce438";
    }
    checkmark();
    loadQuestion();
}
function checkmark() {
    if (qAnswered[qSelect] == "c") {
        document.getElementsByTagName("i")[0].className = "fa-solid fa-check fa-5x";
        document.getElementsByTagName("i")[0].style.left = "2vh";
        document.getElementsByTagName("i")[0].style.top = "1.5vh";
    } else if (qAnswered[qSelect] == "i") {
        document.getElementsByClassName("option")[picked[qSelect]].style.background = "#e42c2c";
        document.getElementsByTagName("i")[0].className = "fa-solid fa-xmark fa-5x";
        document.getElementsByTagName("i")[0].style.left = "3vh";
        document.getElementsByTagName("i")[0].style.top = "1.5vh";
    } else {
        document.getElementsByTagName("i")[0].style.top = "-10vh";
    }
}


function scoreScreen() {
    document.getElementById("QContainer").style.display = "none";
    document.getElementById("questionNum").style.display = "none";
    document.getElementById("indicator").style.top = "-15vh";
    for (let d = 0; d != 4; d++) {
        document.getElementsByClassName("button")[d].style.display = "none";
    }
    for (let m = 0; m != 10; m++) {
        if (answers[m] == picked[m]) {
            score++;
        }
    }
    document.getElementById("score").innerHTML = "Score: " + score + "/10";
    document.getElementById("reset").style.display = "inline";
    clearInterval(timerCount);
    document.getElementById("time").innerHTML = "Time Taken: " + min + "m " + sec + "s";
}

function timer() {
    sec++;
    if (sec == 60) {
        min++;
        sec = 0;
    }
}