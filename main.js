//GLOBAL VARIABLES!!

//Storing Answer from generated question(dont'change!)
var answer;
var points = 0
var time = 0
var highScoreDataBase = []


//activate timer based on gametype
var gameType = {
        equation: null,
        maxtime: null,
        ticspersec: null,
        numberDigits: null
    };

//choose gametype and update object data storage
gameType.equation = singleAddition
gameType.maxtime = 10
gameType.ticspersec = 1
gameType.numberDigits = 1


//Useful functions

//This function takes in a querySelectorName(e.g. "#box") and put append someText "string" into the question box
var appendChild = function(parentNodeName, childNodeName, someText){
    console.log("Display question on screen")

    //get parent node
    var parentNodeInJs = document.querySelector(parentNodeName);

    //create child node
    var childNodeInJs = document.createElement(childNodeName)
    console.log("Created Child Node: " + childNodeInJs)
    childNodeInJs.textContent = someText

    console.log("Added text to child node: " + someText)

    //appending child node to parent node
    parentNodeInJs.appendChild(childNodeInJs);
};

var removeChild = function(parentNodeName, childNodeName){
    console.log("Remove question from screen")

    //get parent node
    var parentNodeInJs = document.querySelector(parentNodeName);

    //retrieve the child node under specific parent
    var childNodeInJs = document.querySelector(parentNodeName + " " + childNodeName)
    console.log("Parent node to target: " + parentNodeName)
    console.log("Child node to remove: " + childNodeName)

    //remove the child
    parentNodeInJs.removeChild(childNodeInJs)

}


//This section takes in data from JS and put into webpage

function updateQuestionNumber(number){
    var questionNumber = document.querySelector("#questionNumber")
    questionNumber.textContent = number
    return number;
};


function updatePoints(number){
    var points = document.querySelector("#points")
    points.textContent = number
    return number;
};

function updateCurrentTimer(number){
    var time = document.querySelector("#timer")
    time.textContent = number
    return number;
};


function updateHighscore(number, topPlayers){
    appendChild("#highScoreList", 'li', number)
    return number
};


//generating random numbers (works perfectly! Dont touch!), does not include max number
var getRandomInteger = function(min, max){
    var min = Math.ceil(min)
    var max = Math.floor(max)

    return Math.floor(Math.random()*(max-min)) + min;
};

var singleDigitRandomInteger = function(){
    return getRandomInteger(1,10);
};

//Returns an integer based on number of digits user chooses
var multiRandomInteger = function(numberOfDigits){
    var calculateLength = [1]

    //for each "number of digit add 0 to calculate length array"
    for (i = 0; i < numberOfDigits; i++){
        calculateLength.push(0);
    };
    var maxNumber = calculateLength.join("")

    return getRandomInteger(1, maxNumber)

};


//store a database of equations
var arrayOfEquations = [{
    name: "Single Addition",
    equation: singleAddition
    },
    {name: "Single Subtraction",
    equation: singleSubtraction
    },
    {name: "Single Multiplication",
    equation: singleMultiplication
    },
    {name: "Single Division",
    equation: singleDivision
    },
    {name: "Randomised Single Equation",
    equation: randomisedSingle},
    {name: "Custom Question Generator",
    equation: customisedNumbersOperators}]

//This function generates a question with a single operator
//The answer will generate an object with question and answer
function singleAddition(){
    var firstNumber = singleDigitRandomInteger();
    var secondNumber = singleDigitRandomInteger();

    //the answer for the random generated question
    questionAnswer = firstNumber + secondNumber

    return{
            answer: questionAnswer,
            equationQuestion: firstNumber + " + " + secondNumber
            };
    };

function singleSubtraction(){
    var firstNumber = singleDigitRandomInteger();
    var secondNumber = singleDigitRandomInteger();

    //the answer for the random generated question
    questionAnswer = firstNumber - secondNumber

    return{
            answer: questionAnswer,
            equationQuestion: firstNumber + " - " + secondNumber
            };
    };

function singleMultiplication(){
    var firstNumber = singleDigitRandomInteger();
    var secondNumber = singleDigitRandomInteger();

    //the answer for the random generated question
    questionAnswer = firstNumber * secondNumber

    return{
            answer: questionAnswer,
            equationQuestion: firstNumber + " x " + secondNumber
            };
    };

//This division function does not return a remainder
function singleDivision(){
    var firstNumber = singleDigitRandomInteger();
    var secondNumber = singleDigitRandomInteger();

    //check if division has a remainder, if yes re-generate numbers
    while((firstNumber % secondNumber !== 0) || (firstNumber < secondNumber)){
        firstNumber = singleDigitRandomInteger();
        secondNumber = singleDigitRandomInteger();
    }

    //the answer for the random generated question
    questionAnswer = firstNumber / secondNumber



    return{
            answer: questionAnswer,
            equationQuestion: firstNumber + " / " + secondNumber
            };
    };

function randomisedSingle(){
    var chooseIndexNumber = getRandomInteger(0,4)
    var chooseEquation = arrayOfEquations[chooseIndexNumber].equation()

    return chooseEquation
}


//user will update this operator
var arrayOfOperators = ["*", "/", "+", "-"];

//This function takes in user input in an array and outputs a randomised operator if array exist
function generateRandomisedOperators(){
    var randomiseIndex = getRandomInteger(0, arrayOfOperators.length)

    //choose a randomised index number
    var operatorChosen = arrayOfOperators[randomiseIndex]

    //returns an operator
    return operatorChosen
}

//Generate multiple number equation based on userchoice
function customisedNumbersOperators(numberOfDigitsInput = 1, numberOfOperators = 1, operatorInput = "+"){
    var combinedEquation = []


    function generatingEquation(numberOfDigitsInput = 1, numberOfOperators = 1, operatorInput = "+"){
    for(var i = 0; i <  (2 * numberOfOperators + 1); i++){
        if (i % 2 === 0){

            //refer to global variable
            combinedEquation.push(multiRandomInteger(gameType.numberDigits))
        }
        else{
            combinedEquation.push(generateRandomisedOperators())
        };
    };
    };

    generatingEquation()
    //concat combined Equation array to form a string
    var question = combinedEquation.join(" ")

    //if answer is not a wholenumber, regenerate the question
    var questionAnswer = eval(question)
    console.log(questionAnswer)

    while(questionAnswer % 1 !== 0){
        combinedEquation = []
        generatingEquation()
        question = combinedEquation.join(" ")
        questionAnswer = eval(question)
    };



    return  {
            answer: questionAnswer,
            equationQuestion: question
            };
    };

//Create function to create options in "question-select" select box

var createOptions = function(){
    for (var i = 0; i < arrayOfEquations.length; i++){
        appendChild("#question-select", "option", arrayOfEquations[i].name)
        var currentOption = document.querySelectorAll("#question-select option")[i+1]
        currentOption.setAttribute("value", i+1)
    };
};

//populate the select equation box
createOptions()


// var multiply = function(a,b){
//     return a * b;
// };

// var order = [
//     multiply,
//     divide,
//     add,
//     subtract

// ];

// for( var i=0; i< order.length; i++){

//     var operator = order[i];

//     var numberofTimes = singleDigitRandomInteger();

//     for( ...){
//         output.push( operator( a,b) );
//     }





// }


//user interaction on selectbox. When the user click, it will activate optionEvent("value" of option e.g. 1). Function will reference the number with arrayOfEquations and update gameType
var optionEvent = function(number){
        //update the current state of the equation in global object
        gameType.equation = arrayOfEquations[number-1].equation
}

document.querySelector("#select-further").addEventListener("click", function(event){
    gameType.numberDigits = parseInt(this.value)
    console.log(this.value)
})


//This function set a time and takes in variables of max time to determine when to stop and ticspersec
function activateTimer(maxtime, ticspersec){


    document.querySelector("#totalTime").textContent = "/ " + maxtime

    var timer = function(){

                        if(time < maxtime){
                            time++
                            console.log(time)
                            updateCurrentTimer(time)
                            }
                        else{
                            clearInterval(setTimer)
                            console.log("timer end")

                            //push points into a highscore from array
                            highScoreDataBase.push(points)
                            console.log(highScoreDataBase)
                            updateHighscore(highScoreDataBase[highScoreDataBase.length -1])
                            //enable start button again
                            document.querySelector("#startButton").removeAttribute("disabled", "disabled")

                        }
                    }

    var setTimer = setInterval(timer, ticspersec*1000)

}


//This function takes in a math question and returns a question in words
var questionGenerator = function(equation){
    //stored question is an object that contains the answer and question
    var storedQuestion = equation()
    var mathQuestion = storedQuestion.equationQuestion
    var mathAnswer = storedQuestion.answer

    //storing answer outside of function
    answer = mathAnswer


    console.log("Display Math Question: " + mathQuestion)
    console.log("Display Math Answer: " + mathAnswer)
    return {
            question:"Input the answer for\n" + mathQuestion,
            answer: mathAnswer
        }
};

//This function takes in a function e.g. singleAddition and inserts into webpage after some formatting in HTML.
var displayQuestion = function(equation){
    //use the place to screen function to convert from javascript to webpage
    appendChild("#questionbox","p", questionGenerator(equation).question);
};

var removeQuestion = function(){
    if (document.querySelector("#questionbox p") !== null){

    removeChild("#questionbox","p")
}
}

//displayQuestion(singleSubtraction)

var currentQuestionNumber = updateQuestionNumber(1)
var currentPoints = updatePoints(0)
console.log("currentquestionNumber: " + currentQuestionNumber)




//Processing the answer
var answerArray = []




//This function adds a clickevent keydown to record what the user type into an array
//this event records the keypress of what the uses type and records in the answerArray


document.querySelector('#userAnswer').addEventListener("keyup", recordKeyStrokes)

function recordKeyStrokes(event){
        if (event.key !== "Enter" && event.key !== "Backspace"){
            answerArray.push(event.key)
            console.log(answerArray)
        };

        if (event.key === "Backspace"){
            answerArray.pop()
            console.log(answerArray)
        };

        if (event.key === "Enter"){
        console.log(answerArray)
        };


        //Everytime the user enteres a value, check answer. Function is retrieved from outside of this function.
        checkAnswer()

        };



//This object stores the type of weapons
arrayOfWeapons = {
    name: "arrow",
    link: "pictures/arrow.jpg"
}

//This function launches an attack based on the weapon. Activate the function e.g. attackWeapon(arrayOfWeapons.name, arrayOfWeapons.link)
var attackWeapon = function(weaponName, weaponLink){

    //remove image of weapon if it detects it already exist
    if(document.querySelector("#weapondiv img") !== null){
        removeChild("#weapondiv", "img")
    };

    //this creates css element, attaches the relevant class
    appendChild("#weapondiv", "img", "")
    weapon = document.querySelector("#weapondiv img")
    weapon.src = weaponLink
    weapon.className = weaponName
    console.log(weaponName)

};


//This function compares the the array of answers that user put in and and returns a true if answer is correct
var checkAnswer = function(){
    //join the array and turn it into number
    var concatArrayAnswer = parseInt(answerArray.join(""))
    console.log(concatArrayAnswer)


        if (concatArrayAnswer === answer){
            console.log("answer is correct");

            //if correct update points on screen
            points++;
            updatePoints(points)

            //if correct, launch weapon animation
            attackWeapon(arrayOfWeapons.name, arrayOfWeapons.link)


            nextquestion();
            return true
        }
        else{
            console.log("answer is incorrect, please try again")
            return false
        };




};


//This function refreshes the question and clears the answer array
function nextquestion(){
    //clear answer array
    answerArray = [];

    //update question number
    console.log("Current question number: " + currentQuestionNumber)
    updateQuestionNumber(currentQuestionNumber++)


    //generate next question
    document.querySelector('#userAnswer').value = ""
    console.log(document.querySelector('#userAnswer').value)
    removeChild("#questionbox","p")
    displayQuestion(gameType.equation)
};



//This function starts the game
var chooseGameAndStart = function(){

    function startGame(){
        //remove question
        removeQuestion()

        displayQuestion(gameType.equation);


        //disable start button
        document.querySelector("#startButton").setAttribute("disabled", "disabled")

        activateTimer(gameType.maxtime, gameType.ticspersec);
    }

    document.querySelector("#startButton").addEventListener('click', startGame)

};

chooseGameAndStart()




