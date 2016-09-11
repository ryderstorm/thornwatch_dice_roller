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
}

function Refresh() {
  window.parent.location = window.parent.location.href;
};
function hide() {
  $('.visible').toggleClass('hidden');
};
function show() {
  $('.hidden').toggleClass('visible');
};
$("#show").click(function() {
  $('.hidden').toggleClass('visible');
});
$("#hide").click(function() {
  $('.visible').toggleClass('hidden');
});