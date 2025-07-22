const countdownEl = document.getElementById('countdown');
const gameContent = document.getElementById('game-content');
const ducksContainer = document.getElementById('ducks-container');

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
    const velocidade = 8 + Math.random() * 4;

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
        clearInterval(animarAsas);
        pato.remove();
        gerarPato();
    });

    // Quando for clicado
    pato.addEventListener('click', () => {
        clearInterval(animarAsas);

        // Remove classe de voo
        pato.classList.remove('flying');

        // Mostra imagem de susto
        pato.style.backgroundImage = "url('assets/duck/pato-assustado.png')";
        pato.style.animation = 'none'; // cancela qualquer animação anterior

        // Susto
        pato.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            pato.style.transform = 'translateY(0)';

            // Troca imagem para caindo
            pato.style.backgroundImage = "url('assets/duck/pato-caindo.png')";

            // Adiciona animação de queda
            pato.classList.add('caindo');

            // Remove após cair
            setTimeout(() => {
                pato.remove();
                gerarPato();
            }, 1000); // tempo da animação de queda
        }, 200); // duração do susto
    });


    ducksContainer.appendChild(pato);
}
