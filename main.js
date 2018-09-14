
//Useful functions

//This function takes in a querySelectorName(e.g. "#box") and put append someText "string" into the question box
var placeWordsToScreen = function(parentNodeName, childNodeName, someText){
    console.log("test placeWordsToScreen")

    //get parent node
    var parentNodeInJs = document.querySelector(parentNodeName);

    //create child node
    var childNodeInJs = document.createElement(childNodeName)
    childNodeInJs.textContent = someText
    console.log(childNodeInJs)
    console.log(someText)

    //appending child node to parent node
    parentNodeInJs.appendChild(childNodeInJs);
};

//creating the addition game

//checking whether userinput is correct


//check answer

var enteredValue = 1;
var questionAnswer = 0;

var checkAnswer = function(){
    if (enteredValue === questionAnswer){
        console.log("answer is correct")
    };
};





//get userInput
console.log("I AM GETTING CALLED BEFORE ANYTHING EVENT HAPPENS");


var getUserInput = function(){
   var userInput = document.querySelector("#userAnswer");
};



document.querySelector('#userAnswer').addEventListener("keydown", function(event){
    console.log(event.key)
    if (event.key === 'Enter'){
        //event.preventDefault();
        console.log(this.value)
        enteredValue = this.value
    };
})





//generating random numbers (works perfectly! Dont touch!)
var getRandomInteger = function(min, max){
    var min = Math.ceil(min)
    var max = Math.floor(max)

    return Math.floor(Math.random()*(max-min)) + min;
};

var singleDigitRandomInteger = function(){
    return getRandomInteger(1,10);
};


//generating question


//This function generates a question with a single add operator
//The answer will outputed to somewhere else in the midst of executing the function
var randomSingleAddition = function(){
    var firstNumber = singleDigitRandomInteger();
    var secondNumber = singleDigitRandomInteger();


    //the answer for the random generated question
    questionAnswer = firstNumber + secondNumber
    //transfer answer to variable outside to check



    var singleAddition = firstNumber.toString() + " + " + secondNumber.toString();
    return singleAddition
};

//This function takes the math question (1+1) returns a question in words
var questionGenerator = function(){
    mathQuestion = randomSingleAddition()
    return "Input the answer for\n" + mathQuestion
};

var displayQuestion = function(){
    console.log("test displayQuestion")

    //use the place to screen function to convert from javascript to webpage
    placeWordsToScreen("#questionbox","p", questionGenerator());

}

displayQuestion()

