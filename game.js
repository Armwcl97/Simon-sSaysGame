var gamePatterns = [];
var buttonColors = ["red","blue","green","yellow"];
var userClickedPatterns = [];
var level = 0;
var started = false;

//Registrar si el usuario presiono alguna tecla
$(document).keydown(function(){

if(!started){
  $("#level-title").text("nivel "+level);
  nextSequence();
  started = true;
}
});

// registro de clicks realizados
$(".btn").click(function (){
  var userChosenColor = $(this).attr("id");
  userClickedPatterns.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPatterns.length-1);
});

//Comparar respuestas con la computadora
function checkAnswer(currentLevel){

  if (gamePatterns[currentLevel]===userClickedPatterns[currentLevel]) {
    console.log("sucess");
    if (userClickedPatterns.length === gamePatterns.length) {
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else {

    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game over, Press any key to restart");
    startOver();
  }
}

//Secuencia de numeros al azar
function nextSequence(){
  userClickedPatterns = [];
  level ++
  $("#level-title").text("nivel "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePatterns.push(randomChosenColor);

  $("#"+ randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
}

//secuencia que realiza el sonido de los botones

function playSound(name){
  var audio = new Audio ("sounds/"+name+".mp3");
  audio.play();
}

//animaciones de los botones
function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}

//Reiniciar la partida luego de perder
function startOver(){
  level = 0;
  gamePatterns = [];
  started = false;
}
