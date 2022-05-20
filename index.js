const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question-quizz');
const answerButtonsElements = document.getElementById('choices-container');
const nextButton = document.getElementById('btn-next');
const previousButton = document.getElementById('btn-prev');
const validationButton = document.getElementById('btn-validation');
const counterElem = document.querySelector('.counter');
const MIN_COUNTER = 1;
const MAX_COUNTER = 15;

let initialCount = 1 ;
let goodAnswer = [];
let shuffledQuestions;
let currentQuestionIndex;
let questionIndex;
let choiceBox;
let answer;
let question;
let userChoice;
let nextQuestion;

document.addEventListener('DOMContentLoaded', buildQuizz);
nextButton.addEventListener('click', submitControl); 

//On génére l'affichage aléatoire des questions
// Affichage de la première question en mode random après le chargement de la page
function buildQuizz() {
   shuffledQuestions = questionsQuizz.sort(() => Math.random() - 0.5);
   currentQuestionIndex = 0;
   counterElem.textContent = initialCount;
   //previousButton.setAttribute('style', 'display: none');
   showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion() {

    for (const questions in questionsQuizz) {   
        // le tableau des questions
        question = shuffledQuestions[currentQuestionIndex];
        questionElement.innerHTML = question.question;

        // le tableau de réponses
        answer = question.answers;
    }

    //affichage des options de réponse et ajout de l'écouteur d'évènement 'click'
     for (const index in shuffledQuestions) {
        let choiceBox = document.createElement('button');
        choiceBox.innerHTML = answer[index].option;
        choiceBox.classList.add('choice-box');
        answerButtonsElements.appendChild(choiceBox);
        choiceBox.addEventListener('click', selectItems);
    }
}

function selectItems(e) {

    // gestion des styles sur les boxs
    choiceBox = document.querySelectorAll('.choice-box');
 
    selectedElem = e.target;
 
    for (const box of choiceBox) {
        box.classList.remove('isClicked');
    }
     
    if(selectedElem){
        selectedElem.classList.add('isClicked');    
        console.log(selectedElem); 
        // ajout de l'écouteur d'évènement sur le boutton validation
        validationButton.addEventListener('click', submit);
        console.log('btn-validation déclenché');
    }      
 }
 
function submit(e) {

    const submit = e;    

    userChoice = selectedElem.textContent;

    const found = answer.find(e =>
        e.option === userChoice);

    if(found.correct === false){
        selectedElem.classList.remove('isClicked');
        selectedElem.classList.add('isFalse');

        for(const box of choiceBox) {
            box.removeEventListener('click', submit);
            box.classList.add('disabled');
        } 
    }

    if(found.correct === true){
        selectedElem.classList.remove('isClicked');
        selectedElem.classList.add('isCorrect');

        // on stocke les bonnes réponses dans le tableau goodAnswer
        goodAnswer.push(userChoice);
        //console.log(userChoice);
        //console.log(goodAnswer);

        for(const box of choiceBox) {
            box.removeEventListener('click', submit);
            box.classList.add('disabled');
        } 
    }

    // stockage des bonnes réponses   
    localStorage.setItem("goodAnswer", JSON.stringify(goodAnswer));
            
    return selectedElem;
}
 
function submitControl(e) {

    const errorMessage = document.getElementById('error-message');
    const trueAnswer = document.querySelector('.isCorrect');
    const falseAnswer = document.querySelector('.isFalse');

    errorMessage.innerText = "";
  
    if(trueAnswer || falseAnswer){      
        displayNextQuestion();
    }else{  
        errorMessage.innerText = 'Veuillez valider une réponse';
    }
}

function displayNextQuestion(){

    choiceBox = document.querySelectorAll('.choice-box');
    
    for (const box of choiceBox) {
       box.remove();
    }

    // changement du style du bouton next à l'arrivée à la fin du questionnaire 
    if(initialCount == MAX_COUNTER -1){
        nextButton.setAttribute('style', 'background-color: black');
        nextButton.innerHTML = 'Terminer';
    }

    // je redirige vers la page des résultats
    if(initialCount >= MAX_COUNTER){  
        window.location.assign('./end.html');
    }

    currentQuestionIndex++; 
    counterElem.textContent = initialCount+= 1;
    console.log(initialCount);
    showQuestion(questionsQuizz[currentQuestionIndex]);
}









