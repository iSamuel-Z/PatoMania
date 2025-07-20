document.addEventListener('DOMContentLoaded', () => {
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const fullscreenIcon = fullscreenBtn.querySelector('i');

    fullscreenBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch((err) => {
                console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    });

    // Altera o ícone quando o modo de tela cheia muda
    document.addEventListener('fullscreenchange', () => {
        if (document.fullscreenElement) {
            fullscreenIcon.classList.remove('fa-expand');
            fullscreenIcon.classList.add('fa-compress');
        } else {
            fullscreenIcon.classList.remove('fa-compress');
            fullscreenIcon.classList.add('fa-expand');
        }
    });
    const mainContainer = document.querySelector('.main-container');
    const head = document.querySelector('head');

    // Função para carregar o conteúdo, estilo e script de uma página
    const loadPage = async (pageName) => {
        // Remove o CSS e o SCRIPT da página anterior, se houver
        const oldStyle = document.getElementById('page-style');
        if (oldStyle) {
            oldStyle.remove();
        }
        const oldScript = document.getElementById('page-script');
        if (oldScript) {
            oldScript.remove();
        }

        try {
            // Carrega o HTML
            const response = await fetch(`source/${pageName}.html`);
            const content = await response.text();
            mainContainer.innerHTML = content;

            // Cria e adiciona o novo link de CSS
            const newStyle = document.createElement('link');
            newStyle.id = 'page-style';
            newStyle.rel = 'stylesheet';
            newStyle.href = `styles/${pageName}.css`;
            head.appendChild(newStyle);

            // Cria e adiciona o novo SCRIPT
            const newScript = document.createElement('script');
            newScript.id = 'page-script';
            newScript.src = `scripts/${pageName}.js`;
            newScript.defer = true;
            document.body.appendChild(newScript);

        } catch (error) {
            console.error('Erro ao carregar a página:', error);
            mainContainer.innerHTML = '<p>Erro ao carregar o conteúdo. Tente novamente mais tarde.</p>';
        }
    };

    // Carrega a página de splash inicial
    loadPage('splash');

    // Após a splash screen, decide para onde ir
    setTimeout(() => {
        const tutorialCompleted = localStorage.getItem('tutorialCompleted');
        if (tutorialCompleted === 'true') {
            loadPage('menu');
        } else {
            loadPage('tutorial');
        }
    }, 6000); // 5 segundos para a splash

    // Ouve o evento de finalização do tutorial para carregar o menu
    window.addEventListener('tutorialFinished', () => {
        loadPage('menu');
    });

    // Ouve o evento do botão 'Jogar' no menu para carregar o jogo
    window.addEventListener('playGame', () => {
        loadPage('game');
    });
});
