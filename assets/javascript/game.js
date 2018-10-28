var words = ["drwho", "gameofthrones", "alien", "firefly", "startrek", "starwars", "avatar"]  //array for shows to guess
var wordGuess = "";   //to get random show
var wordLetters = []  //to split show and make an array of letters
var underline = 0;    //to get the show blanks
var wordBlank = [];   //to make the show blanks an array
var wrong = [];       //to get array of wrong letters 
var wins = 0;         //to hold amount of wins
var losses = 0;       //to hold amount of losses
var guessesLeft = 7;  //number of guesses

function scifi() {   //function to get the random word and split  
    wordGuess = words[Math.floor(Math.random() * words.length)];   
    wordLetters = wordGuess.split("");    
    underline = wordLetters.length;   
    for (var i = 0; i < underline; i++) {
        wordBlank.push("_");
    } //end for
    
    document.getElementById("currentword").innerHTML = "  " + wordBlank.join("  ");    
}  //end function scifi

function audio() {   //function to play audio files for wins
    if (wordGuess === words[0]) {   //drwho audio and image
        firefly.pause();
        startrek.pause();
        starwars.pause();
        avatar.pause();
        alien.pause();
        gameofthrones.pause();        
        drwho.play();
        document.getElementById("image").src = "./assets/images/drWho.jpg";
    } //end if drwho   

    else if (wordGuess === words[1]) {  //gameofthrones audio and image
        firefly.pause();
        startrek.pause();
        starwars.pause();
        avatar.pause();
        alien.pause();
        drwho.pause();        
        gameofthrones.play();
        document.getElementById("image").src = "./assets/images/gameOfThrones.jpg";
    } //end if gameofthrones    

    else if (wordGuess === words[2]) {  //alien audio and image
        firefly.pause();
        startrek.pause();
        starwars.pause();
        avatar.pause();
        gameofthrones.pause();        
        drwho.pause();
        alien.play();
        document.getElementById("image").src = "./assets/images/alien.jpg";
    }  //end if alien  

    else if (wordGuess === words[3]) {  //firefly audio and image
        startrek.pause();
        starwars.pause();
        avatar.pause();
        alien.pause();
        gameofthrones.pause();        
        drwho.pause();
        firefly.play();
        document.getElementById("image").src = "./assets/images/firefly.jpg";
    } //end if firefly

    else if (wordGuess === words[4]) {  //startrek audio and image
        starwars.pause();
        avatar.pause();
        alien.pause();
        gameofthrones.pause();       
        drwho.pause();
        firefly.pause();
        startrek.play();
        document.getElementById("image").src = "./assets/images/starTrek.jpg";
    } //end if starTrek 

    else if (wordGuess === words[5]) {  //starwars audio and image
        startrek.pause();
        avatar.pause();
        alien.pause();
        gameofthrones.pause();       
        drwho.pause();
        firefly.pause();
        starwars.play();
        document.getElementById("image").src = "./assets/images/starWars.png";
    } //end if starWars 

    else if (wordGuess === words[6]) {  //avatar audio and image
        startrek.pause();
        starwars.pause();
        alien.pause();
        gameofthrones.pause();        
        drwho.pause();
        firefly.pause();
        avatar.play();
        document.getElementById("image").src = "./assets/images/avatar.jpg";
    } //end if avatar      
}; //end audio

function reset() {   //function to reset game
    guessesLeft = 7;
    wrong = [];
    wordBlank = [];
    scifi()         
} //end function reset

function checkLetters(letter) {   //to check letters against random show
    var letterInWord = false;    
    for (var i = 0; i < underline; i++) {
        if (wordGuess[i] == letter) {
            letterInWord = true;
        } //end if
    }  //end for
    
    if (letterInWord) {        
        for (var i = 0; i < underline; i++) {
            if (wordGuess[i] == letter) {
                wordBlank[i] = letter;
            } //end if
        } //end for
    } //end if
    
    else {
        wrong.push(letter);
        guessesLeft--;
    } //end else    
}  //end function checkLetters(letter)

function complete() {    //function to reset after win or loss
    if (wordLetters.toString() == wordBlank.toString()) {
        wins++;
        audio()
        reset()        
        document.getElementById("winstracker").innerHTML = " " + wins;       
    } //end if

    else if (guessesLeft === 0) {
        losses++;
        reset()
        explosion.play()
        startrek.pause()
        starwars.pause()
        alien.pause()
        gameofthrones.pause()        
        drwho.pause()
        firefly.pause()
        avatar.pause()
        document.getElementById("image").src = "./assets/images/youlose.jpg";                      
        document.getElementById("losstracker").innerHTML = " " + losses;
    } //end else if 
    document.getElementById("currentword").innerHTML = "  " + wordBlank.join(" ");
    document.getElementById("guessesLeft").innerHTML = " " + guessesLeft;    
}  //end function complete

scifi()  //to call game to start
document.onkeyup = function (event) {
    var guesses = String.fromCharCode(event.keyCode).toLowerCase();    
    checkLetters(guesses);   
    complete();     
    console.log(guesses);    
    document.getElementById("playerguesses").innerHTML = "  " + wrong.join(" ");
}  //end document onkeyup
