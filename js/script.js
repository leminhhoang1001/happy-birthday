const card = document.getElementById('card')
const tapHint = document.getElementById('tap-hint')
const button = document.getElementById('muteaudio');
const musicOn = '<i class="fas fa-volume-high"></i>';
const musicOff = '<i class="fas fa-volume-xmark"></i>';
const messagelist = [
    "Count your life by smiles, not tears. Count your age by friends, not years.",
    "I hope all your birthday wishes and dreams come true.",
    "May the joy that you have spread in the past come back to you on this day.",
    "Your life is just about to pick up speed and blast off into the stratosphere. Wear a seat belt and be sure to enjoy the journey.",
    "Forget the past; look forward to the future, for the best things are yet to come.",
    "You’re older today than yesterday but younger than tomorrow!",
    "Don’t get all weird about getting older! Our age is merely the number of years the world has been enjoying us!",
    "You are only young once, but you can be immature for a lifetime."
];
const random = Math.floor(Math.random() * messagelist.length);
var i = 0;
var speed = 50;
var message = messagelist[random];
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

// Random TypeWriter Message

card.addEventListener('click', function() {
    setTimeout(function() {
        var typed = new Typed('.greeting-content', {
            strings: [messagelist[random]],
            typeSpeed: 40,
            showCursor: false
        });
    }, 2000);
}, { once: true });