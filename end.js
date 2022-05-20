window.addEventListener('load', displayScore);

function displayScore() {

    const totalGoodAnswer = JSON.parse(localStorage.getItem("goodAnswer"));
    console.log(totalGoodAnswer.length);

    let firstImg, secondImg, thirdImg;
    let score = document.querySelector('#result-text >span');
    let resultText = document.querySelector('#img-score-text');

    firstImg = document.querySelector('#img-score-container').firstElementChild;
    secondImg = firstImg.nextElementSibling;
    thirdImg = secondImg.nextElementSibling;
   
    score.textContent = totalGoodAnswer.length;

    if(totalGoodAnswer.length < 10){
        thirdImg.setAttribute('style', 'display: block');     
        resultText.textContent = 'T\'inquiètes tu feras mieux la prochaine fois';
    }

    else if(totalGoodAnswer.length == 10 && goodAnswer.length <= 13){
        secondImg.setAttribute('style', 'display: block');
        resultText.textContent = 'Pas mal!! Bien joué';
    }

    else{
        firstImg.setAttribute('style', 'display: block');     
        resultText.textContent = 'Bravo l\'expert!';
    }
}
