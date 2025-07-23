const countdownEl = document.getElementById('countdown');
const gameContent = document.getElementById('game-content');
const ducksContainer = document.getElementById('ducks-container');
const scoreEl = document.getElementById('score');
const missesEl = document.getElementById('misses');


let score = 0;
let velocidadeMultiplicador = 1; // começa normal (100%)
let erros = 0;
let count = 3;

const countdownInterval = setInterval(() => {
    if (count > 0) {
        countdownEl.textContent = count;
        countdownEl.classList.remove('pop');
        void countdownEl.offsetWidth; // reinicia animação
        countdownEl.classList.add('pop');
        count--;
    } else {
        countdownEl.textContent = 'Vai!';
        setTimeout(() => {
            countdownEl.style.display = 'none';
            iniciarJogo();
        }, 1000);
        clearInterval(countdownInterval);
    }
}, 1000);

function iniciarJogo() {
    console.log("Jogo iniciado!");
    gameContent.classList.remove('hidden');
    gerarPato();
}

function gerarPato() {
    const pato = document.createElement('div');
    pato.classList.add('duck');

    const randomY = Math.random();
    const fromLeft = Math.random() > 0.5;

    // Velocidade de voo mais lenta: entre 8 e 12 segundos
    let velocidade = (8 + Math.random() * 4) * velocidadeMultiplicador;


    pato.style.top = `${10 + randomY * 70}%`;

    if (fromLeft) {
        pato.style.left = '-100px';
        pato.style.animation = `fly-left ${velocidade}s linear forwards`;
    } else {
        pato.style.left = '110%';
        pato.style.animation = `fly-right ${velocidade}s linear forwards`;
        // Para manter pato de frente (sem virar com scaleX)
        pato.style.transform = 'none';
    }

    // Imagens das asas
    const imagens = [
        'assets/duck/pato-asas-aberta.png',
        'assets/duck/pato-asas-central.png',
        'assets/duck/pato-asas-fechada.png',
        'assets/duck/pato-asas-central.png'
    ];
    let frame = 0;

    // Trocar frame a cada 80ms para bater asas rápido
    const animarAsas = setInterval(() => {
        pato.style.backgroundImage = `url('${imagens[frame]}')`;
        frame = (frame + 1) % imagens.length;
    }, 200);

    pato.addEventListener('animationend', () => {
    if (!pato.classList.contains('abatido')) {
        erros++;
        missesEl.textContent = erros;

        if (erros >= 6) {
            gameOver();
            return;
        }
    }

    clearInterval(animarAsas);
    pato.remove();
    gerarPato();
});


    // Quando for clicado
    pato.addEventListener('click', () => {
    if (pato.classList.contains('abatido')) return; // Evita múltiplos cliques
        pato.classList.add('abatido');

        clearInterval(animarAsas);

        // Remove classe de voo
        pato.classList.remove('flying');
        

        pato.style.backgroundImage = "url('assets/tiro.png')";
        
        // Mostra imagem de susto
        pato.style.backgroundImage = "url('assets/duck/pato-assustado.png')";

        // Susto
        pato.style.transform = 'translateY(-px)';
        setTimeout(() => {
            pato.style.transform = 'translateY(0)';

            // Pega a posição atual do pato
            const topAtual = pato.offsetTop;
            pato.style.top = `${topAtual}px`; // fixa a posição atual no estilo inline
            pato.style.left = pato.offsetLeft + 'px'; // trava o left para evitar movimentos laterais
            pato.style.animation = 'none'; // remove a animação de voo
            pato.offsetHeight; // força reflow para reiniciar animações

            // Troca imagem para caindo
            pato.style.backgroundImage = "url('assets/duck/pato-caindo.png')";


            // Adiciona classe de queda com animação vertical
            pato.classList.add('queda');
            // Remove após cair
            setTimeout(() => {
                score++;
                scoreEl.textContent = score;
                // Aumenta a velocidade do jogo após 20 patos abatidos
                if (score === 20) {
                    velocidadeMultiplicador = 0.7; // 30% mais rápido (100% - 30% = 70%)
                    console.log('Velocidade aumentada em 30%!');
                }
                pato.remove();
                gerarPato();
            }, 500); // tempo da animação de queda
        }, 20); // duração do susto
    });

    function gameOver() {
    alert("Game Over! Mais de 6 patos escaparam.");
    window.location.reload(); // reinicia o jogo (opcional)
    }


    ducksContainer.appendChild(pato);
}
