const card = document.getElementById('card')
const tapHint = document.getElementById('tap-hint')
const button = document.getElementById('muteaudio');
const musicOn = '<i class="fas fa-volume-high"></i>';
const musicOff = '<i class="fas fa-volume-xmark"></i>';

const muteSound = new Howl({
    src: ['./audio/Romantic-Happy-Birthday.mp3'],
    // mute: false,
    // autoplay:true,
    loop: true,
    html5: true,
    volume: 1
});
muteSound.autoUnlock = false;
card.addEventListener('click', function(e) {
    e.preventDefault();
    $('html, body').css({ overflow: 'hidden' });
    card.classList.toggle('flipped');

    // if (tapHint) {
    //   tapHint.remove()
    // }
    // else if(!tapHint){
    //   tapHint.add()
    // }

});
// play music once tim flip card
card.addEventListener('click', playsongbirthday, { once: true });

function playsongbirthday() {
    muteSound.play();
}


// mute/unmute
button.addEventListener("click", () => {
    // if the audio is muted, set the btn.innerHTML to unmuteIcon
    // otherwise, set it to the muteIcon
    if (muteSound.muted) {
        button.innerHTML = musicOn;
        muteSound.mute(false);
    } else {
        button.innerHTML = musicOff;
        muteSound.mute(true);
    }
    // toggle the muted property of the audio element
    muteSound.muted = !muteSound.muted;
});