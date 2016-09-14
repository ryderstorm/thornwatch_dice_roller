var rollResults = [];
var finalResults = [];

function launchFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
  $(".logo").addClass('fullscreen');
}

function exitFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
  $(".logo").removeClass('fullscreen');
}

jQuery(function($) {
  $(".logo").click(function(){
    if (this.className.includes("fullscreen")){
      console.log("Exiting fullscreen")
      exitFullscreen();
    }
    else{
      console.log("Launching fullscreen")
      launchFullscreen(document.body);
    }
  })
})

function Refresh() {
  window.parent.location = window.parent.location.href;
};

function hide_results() {
  console.log('hide_results');
  $('.results').removeClass('visible');
  $('.results').addClass('hidden');
  $('.return_button').removeClass('visible');
  $('.return_button').addClass('hidden');
};

function show_results() {
  console.log('show_results');
  $('.results').removeClass('hidden');
  $('.results').addClass('visible');
  $('.return_button').removeClass('hidden');
  $('.return_button').addClass('visible');
};

function show_chooser() {
  console.log('show_chooser');
  $('.chooser').removeClass('hidden');
  $('.chooser').addClass('visible');
  $('.roll_button').removeClass('hidden');
  $('.roll_button').addClass('visible');
};

function hide_chooser() {
  console.log('hide_chooser');
  $('.chooser').removeClass('visible');
  $('.chooser').addClass('hidden');
  $('.roll_button').removeClass('visible');
  $('.roll_button').addClass('hidden');
};

function show_chooser_wrapper() {
  console.log('show_chooser_wrapper');
  $(".die_button").removeClass('die_button_clicked');
  rollResults = []
  finalResults = []
  hide_results();
  setTimeout(function(){
    show_chooser();
  }, 500);
};

function show_results_wrapper() {
  console.log('show_results_wrapper');
  // document.getElementById('dice_sound').play();
  calculateResults();
  playDiceSound();
  hide_chooser();
  setTimeout(function(){
    show_results();
  }, 500);
};

function calculateResults() {
  var times = 9 - rollResults.length;
  for(var i=0; i < times; i++){
      rollResults.push("empty");
  }
  shuffleArray(rollResults).forEach(function(roll) {
    if (roll.includes("regular")){
      finalResults.push(regularDieRoll());
    }
    else if (roll.includes("hero")){
      finalResults.push(heroDieRoll());
    }
    else {
      finalResults.push("empty");
    }
  });
  console.log("Final results: " + finalResults.toString());
  console.log("Final results length: " + finalResults.length);
}

function UrlExists(url)
{
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}

function getSoundFile() {
  var path = 'sounds/',
  files = ['dice1.mp3', 'dice2.mp3', 'dice3.mp3', 'dice4.mp3'],
  i = Math.floor(Math.random()*files.length);
  console.log(path+files[i])
  return (path+files[i]);
}

function playDiceSound() {
  //Create the audio tag
  var soundFile = document.createElement("audio");
  soundFile.preload = "auto";

  //Load the sound file (using a source element for expandability)
  var src = document.createElement("source");
  var soundLocation = getSoundFile();
  src.src = getSoundFile();
  soundFile.appendChild(src);

  //Load the audio tag
  //It auto plays as a fallback
  soundFile.load();
  soundFile.volume = 0.9;
  soundFile.play();

  //Set the current time for the audio file to the beginning
  // soundFile.currentTime = 0.01;
  // soundFile.volume = volume;

  //Due to a bug in Firefox, the audio needs to be played after a delay
  // setTimeout(function(){soundFile.play();},1);
}

jQuery(function($) {
  $(".roll_button").click(function(){
    show_results_wrapper();
  })
})

jQuery(function($) {
  $(".return_button").click(function(){
    show_chooser_wrapper();
  })
})

jQuery(function($) {
  $(".die_button").click(function(){
    $(this).toggleClass('die_button_clicked');
    var classList = this.className.split(' ');
    if (classList.includes("die_button_clicked")) {
      if (this.className.includes("regular_die")){
        addRegularDieToResult(this.id);
      }
      else{
        addHeroDieToResult(this.id);
      }
    }
    else{
      if (this.className.includes("regular_die")){
        removeRegularDieFromResult(this.id);
      }
      else{
        removeHeroDieFromResult(this.id);
      }
    }
  })
})

function removeRegularDieFromResult(dieID){
  var index = rollResults.indexOf(dieID);
  if (index > -1) {
    rollResults.splice(index, 1);
  }
  console.log("rollResults after removing Regular Die: " + rollResults.toString());
};

function removeHeroDieFromResult(dieID){
  var index = rollResults.indexOf(dieID);
  if (index > -1) {
    rollResults.splice(index, 1);
  }
  console.log("rollResults after removing Hero Die: " + rollResults.toString());
};

function addRegularDieToResult(dieID){
  rollResults.push(dieID);
  console.log("rollResults after adding Regular Die: " + rollResults.toString());
};

function addHeroDieToResult(dieID){
  rollResults.push(dieID);
  console.log("rollResults after adding Hero Die: " + rollResults.toString());
};

function regularDieRoll(){
  var result
  switch (Math.floor((Math.random() * 10))) {
      case 0:
          result = "ebb"
          break;
      case 1:
      case 2:
      case 3:
          result = "miss"
          break;
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
          result = "hit";
          break;
      case 9:
          result = "double_hit";
          break;
  }
  console.log("Regular die result: " + result)
  return result
}

function heroDieRoll(){
  var result
  switch (Math.floor((Math.random() * 10))) {
      case 0:
      case 1:
          result = "miss"
          break;
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
          result = "hit";
          break;
      case 8:
      case 9:
          result = "double_hit";
          break;
  }
  console.log("Hero die result: " + result)
  return result
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}