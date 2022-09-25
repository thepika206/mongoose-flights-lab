
//constants
const scorpionAudio = new Audio('../media/get-over-here.mp3')

//cache element refs
document.querySelector('#app-logo').addEventListener('click', function(){
  confetti.start(1000,2000,200)
  scorpionAudio.volume = .7
  scorpionAudio.play()

})



//functions