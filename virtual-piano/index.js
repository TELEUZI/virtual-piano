const container = document.querySelector('.piano');
const keySharps = document.querySelector('.keys-sharp');
const buttonContainer = document.querySelector('.btn-container');
const sharpLetters = "rtuio";
let activeButtons = [];

document.addEventListener("keypress", function(e) {
    if (e.code == 122) {
        toggleFullScreen();
    }
}, false);

document.querySelector('.fullscreen').addEventListener("click", function(e) {
    toggleFullScreen();
}, false);

document.addEventListener('keydown', function(e) {
    if (activeButtons.includes(e.code[e.code.length - 1])) return;
    activeButtons.push(e.code[e.code.length - 1]);
    const currentContainer = sharpLetters.includes(e.code[e.code.length - 1].toLowerCase()) ? keySharps : container;
    for (let element of currentContainer.children) {
        if (element.dataset.letter == e.code[e.code.length - 1]) {
            playNote(element.dataset.note);
            element.classList.add('piano-key-active', 'piano-key-active-pseudo');
        }
    }
});

document.addEventListener('keyup', function(e) {
    activeButtons = activeButtons.filter(el => el != e.code[e.code.length - 1]);
    const currentContainer = sharpLetters.includes(e.code[e.code.length - 1].toLowerCase()) ? keySharps : container;
    for (let element of currentContainer.children) {
        if (element.dataset.letter == e.code[e.code.length - 1]) {
            element.classList.remove('piano-key-active', 'piano-key-active-pseudo');
        }
    }
});

buttonContainer.addEventListener('click', function(e) {
    e.target.classList.add('btn-active');
    container.classList.toggle('letter-piano');
    e.target.nextElementSibling ?
        e.target.nextElementSibling.classList.remove('btn-active') :
        e.target.previousElementSibling.classList.remove('btn-active');
});

container.addEventListener('mousedown', mouseDownHandler);

document.addEventListener('mouseup', function(e) {
    for (let element of container.children) {
        element.removeEventListener('mouseover', mouseOverHandler);
    }
});

function mouseOutOrUpHandler(key) {
    key.addEventListener('mouseout',
        function() {
            makeKeyInactive(key);
        });
    key.addEventListener('mouseup',
        function() {
            makeKeyInactive(key);
        });
}

function mouseDownHandler(e) {
    e.target.classList.add('piano-key-active', 'piano-key-active-pseudo');
    playNote(e.target.dataset.note.toLocaleLowerCase());
    for (let index = 0; index < this.children.length; index++) {
        this.children[index].addEventListener('mouseover',
            mouseOverHandler);
    }
    mouseOutOrUpHandler(e.target);
}

function playNote(note) {
    let audio = new Audio();
    audio.src = `assets/audio/${note}.mp3`;
    audio.play();
}

function makeKeyActive(key) {
    key.classList.add('piano-key-active', 'piano-key-active-pseudo');
}

function makeKeyInactive(key) {
    key.classList.remove('piano-key-active', 'piano-key-active-pseudo');
}

function mouseOverHandler(e) {
    makeKeyActive(e.target);
    playNote(e.target.dataset.note.toLocaleLowerCase());
    mouseOutOrUpHandler(e.target);
}

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.querySelector('body').requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}