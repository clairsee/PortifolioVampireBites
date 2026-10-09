const DarkModeButton = document.getElementById('dark-mode-button');
const DarkModeImg = document.getElementById('dark-mode-img');

window.onload = function() {
    if (sessionStorage.getItem("darkMode") === 'true') {
        document.body.classList.add('light');
        DarkModeImg.src = 'img/moon.png';
    } else {
        document.body.classList.remove('light');
        DarkModeImg.src = 'img/sun.png';
    }
};

// 2. Ao clicar no botão, alterna o estado
DarkModeButton.addEventListener('click', (e) => {
    e.preventDefault();
    const isLight = document.body.classList.toggle('light');
    DarkModeImg.src = isLight ? 'img/moon.png' : 'img/sun.png';
    sessionStorage.setItem("darkMode", isLight);
});





const body = document.body;

function randomImg() {
    const numeroAleatorio = Math.floor(Math.random() * 3) + 1;
    console.log(numeroAleatorio);
    if (numeroAleatorio === 1) {
        document.body.style.setProperty('--img', 'url("img/bat.png")');
    } else if (numeroAleatorio === 2) {
        document.body.style.setProperty('--img', 'url("img/blood.webp")');
    } else {
        document.body.style.setProperty('--img', 'url("img/fang.png")');
    }
}

const cards = document.querySelectorAll('.abi-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const cardRect = card.getBoundingClientRect();

        const x = e.clientX - cardRect.left;
        const y = e.clientY - cardRect.top;

        const centerX = cardRect.width / 2;
        const centerY = cardRect.height / 2;

        const rotateX = ((y - centerY) / centerY) * 15;
        const rotateY = ((centerX - x) / centerX) * 15;

        card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(700px) rotateX(0) rotateY(0)';
    });
});





















const canvas = document.getElementById('batCanvas');
const ctx = canvas.getContext('2d');
const mainScreen = document.getElementById('main-screen');

const batImg = new Image();
batImg.src = 'img/bat.png';

function getTintedBat(img, color) {
    const offCanvas = document.createElement('canvas');
    offCanvas.width = img.width;
    offCanvas.height = img.height;
    const offCtx = offCanvas.getContext('2d');

    offCtx.drawImage(img, 0, 0);
    offCtx.fillStyle = color;
    offCtx.globalCompositeOperation = 'source-in';
    offCtx.fillRect(0, 0, offCanvas.width, offCanvas.height);

    return offCanvas;
}

let width, height;
let batScale = 1;
const bats = [];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    batScale = Math.min(Math.max(width / 1200, 0.35), 1);
}
window.addEventListener('resize', resize);
resize();

function createBats() {
    bats.length = 0;
    for (let i = 0; i < 25; i++) {
        bats.push({
            x: Math.random() * width,
            startY: height + 10 + (Math.random() * 600),
            speedY: height + 400 + (Math.random() * 150),
            wobble: Math.random() * Math.PI * 100,
            size: 0.05 + Math.random() * 0.15
        });
    }
}
createBats();

function render() {
    ctx.clearRect(0, 0, width, height);

    const animationDuration = window.innerHeight * 0.6;
    const progress = Math.min(Math.max(window.scrollY / animationDuration, 0), 1);

    mainScreen.style.opacity = 1 - (progress * 1.5);

    if (progress >= 0.7) {
        mainScreen.style.pointerEvents = 'none';
    } else {
        mainScreen.style.pointerEvents = 'auto';
    }

    if (progress > 0 && progress < 1 && batImg.complete) {
        const computedStyle = getComputedStyle(document.body);
        const bodyColor = computedStyle.getPropertyValue('--body-color').trim() || 'rgb(0, 0, 0)';
        const currentBatCanvas = getTintedBat(batImg, bodyColor);

        bats.forEach(bat => {
            const currentY = bat.startY - (progress * bat.speedY);
            const currentX = bat.x + Math.sin(progress * 15 + bat.wobble) * 30;

            ctx.save();
            ctx.translate(currentX, currentY);
            ctx.scale(bat.size, bat.size);

            ctx.drawImage(currentBatCanvas, -currentBatCanvas.width / 2, -currentBatCanvas.height / 2);

            ctx.restore();
        });
    }
    requestAnimationFrame(render);
}

requestAnimationFrame(render);


function maskTel(){
    let tel = document.getElementById("telefone").value
    tel = tel.slice(0,20)
    document.getElementById("telefone").value = tel

    if(tel[0] != "+"){
        if(tel[0] != undefined){
            tel = "+" + tel[0]
            document.getElementById("telefone").value = tel
        }
    }
    if(tel[3] != " "){
        if(tel[3] != undefined){
            tel = tel.slice(0,3) + " " + tel[3]
            document.getElementById("telefone").value = tel
        }
    }
    if(tel[4] != "("){
        if(tel[4] != undefined){
            tel = tel.slice(0,4) + "(" + tel[4]
            document.getElementById("telefone").value = tel
        }
    }
    if(tel[7] != ")"){
        if(tel[7] != undefined){
            tel = tel.slice(0,7) + ")" + tel[7]
            document.getElementById("telefone").value = tel
        }
    }
    if(tel[8] != " "){
        if(tel[8] != undefined){
            tel = tel.slice(0,8) + " " + tel[8]
            document.getElementById("telefone").value = tel
        }
    }
    if(tel[10] != " "){
        if(tel[10] != undefined){
            tel = tel.slice(0,10)+ " " + tel[10]
            document.getElementById("telefone").value = tel
        }
    }
    if(tel[15] != "-"){
        if(tel[15] != undefined){
            tel = tel.slice(0,15)+ "-" + tel[15]
            document.getElementById("telefone").value = tel
        }
    }
}

const form = document.getElementById('contact');
const modal = document.getElementById('modal');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (form.checkValidity()) {
        modal.showModal();
    } else {
        form.reportValidity();
    }
});

function sendForm() {
    document.getElementById('contact').submit();
}