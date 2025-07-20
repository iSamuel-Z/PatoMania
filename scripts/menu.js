// PatoMania - Menu Principal
// Sistema de interações limpo e organizado

class MenuController {
    constructor() {
        this.init();
    }

    init() {
        this.setupClickHandlers();
        this.setupKeyboardNavigation();
        this.setupSoundPlaceholders();
    }

    setupClickHandlers() {
        // Botão principal de jogar
        const playButton = document.querySelector('.play-button');
        if (playButton) {
            playButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.handlePlayClick();
            });
        }

        // Itens do menu inferior
        const menuItems = document.querySelectorAll('.bottom-menu-item');
        menuItems.forEach((item, index) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleMenuItemClick(index);
            });
        });
    }

    setupKeyboardNavigation() {
        // Navegação por teclado para acessibilidade
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                const focused = document.activeElement;
                if (focused.classList.contains('play-button')) {
                    e.preventDefault();
                    this.handlePlayClick();
                } else if (focused.classList.contains('bottom-menu-item')) {
                    e.preventDefault();
                    const index = Array.from(document.querySelectorAll('.bottom-menu-item')).indexOf(focused);
                    this.handleMenuItemClick(index);
                }
            }
        });
    }

    handlePlayClick() {
        console.log('🎮 Iniciando jogo...');
        // Dispara um evento para o script principal carregar a página do jogo
        window.dispatchEvent(new CustomEvent('playGame'));
    }

    handleMenuItemClick(index) {
        const menuOptions = ['Como Jogar', 'Créditos', 'Opções'];
        console.log(`📋 Abrindo: ${menuOptions[index]}`);
        
        switch(index) {
            case 0: // Como Jogar
                this.showHowToPlay();
                break;
            case 1: // Créditos
                this.showCredits();
                break;
            case 2: // Opções
                this.showOptions();
                break;
        }
    }

    showHowToPlay() {
        console.log('📖 Exibindo tutorial...');
        // Implementar modal ou página de tutorial
    }

    showCredits() {
        console.log('👥 Exibindo créditos...');
        // Implementar modal de créditos
    }

    showOptions() {
        console.log('⚙️ Exibindo opções...');
        // Implementar modal de configurações
    }

    setupSoundPlaceholders() {
        // Placeholders para sistema de áudio futuro
        const playButton = document.querySelector('.play-button');
        const menuItems = document.querySelectorAll('.bottom-menu-item');

        if (playButton) {
            playButton.addEventListener('mouseenter', () => {
                console.log('🔊 Som: hover botão play');
            });
        }

        menuItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                console.log('🔊 Som: hover menu item');
            });
        });
    }
}

// Inicializa o controller assim que o script é carregado
new MenuController();
console.log('🎯 Menu PatoMania carregado com sucesso!');
