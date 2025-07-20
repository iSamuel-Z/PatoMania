// Este script é executado quando a página de splash é carregada.

const loadingText = document.getElementById('loading-text');
let percentage = 0;

const animationDuration = 3000; // 3 segundos, igual à animação CSS
const animationDelay = 2000;    // 2 segundos de delay, igual à animação CSS
const intervalTime = animationDuration / 100; // Tempo para cada incremento de 1%

let interval;

// Inicia o contador após o mesmo delay da animação CSS
setTimeout(() => {
    interval = setInterval(() => {
        if (percentage <= 100) {
            loadingText.textContent = `${percentage}%`;
            percentage++;
        } else {
            clearInterval(interval);
        }
    }, intervalTime);
}, animationDelay);
