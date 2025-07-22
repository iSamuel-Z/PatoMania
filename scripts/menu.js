// PatoMania - Menu Principal com Modais

class MenuController {
    constructor() {
        this.cacheDOMElements();
        this.init();
    }

    cacheDOMElements() {
        // Modais
        this.howToPlayModal = document.getElementById('how-to-play-modal');
        this.optionsModal = document.getElementById('options-modal');
        this.allModals = document.querySelectorAll('.modal');

        // Botões
        this.playButton = document.querySelector('.play-button');
        this.menuItems = document.querySelectorAll('.bottom-menu-item');
        this.closeButtons = document.querySelectorAll('.close-btn');

        // Controles de Opções
        this.volumeSliders = document.querySelectorAll('input[type="range"]');
        this.resetOptionsBtn = document.getElementById('reset-options');
    }

    init() {
        this.setupClickHandlers();
        this.setupKeyboardNavigation();
        this.setupModalHandlers();
        this.setupOptionsHandlers();
        this.setupSoundPlaceholders();
    }

    setupClickHandlers() {
        if (this.playButton) {
            this.playButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.handlePlayClick();
            });
        }

        this.menuItems.forEach((item, index) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleMenuItemClick(index);
            });
        });
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.allModals.forEach(modal => this.closeModal(modal));
            }

            if (e.key === 'Enter' || e.key === ' ') {
                const focused = document.activeElement;
                if (focused.classList.contains('play-button')) {
                    e.preventDefault();
                    this.handlePlayClick();
                } else if (focused.classList.contains('bottom-menu-item')) {
                    e.preventDefault();
                    const index = Array.from(this.menuItems).indexOf(focused);
                    this.handleMenuItemClick(index);
                }
            }
        });
    }

    handlePlayClick() {
        console.log('🎮 Iniciando jogo...');
        window.dispatchEvent(new CustomEvent('playGame'));
    }

    handleMenuItemClick(index) {
        const menuOptions = ['Como Jogar', 'Placar', 'Opções'];
        console.log(`📋 Abrindo: ${menuOptions[index]}`);
        
        switch(index) {
            case 0: // Como Jogar
                this.openModal(this.howToPlayModal);
                break;
            case 1: // Placar
                this.showScoreboard();
                break;
            case 2: // Opções
                this.openModal(this.optionsModal);
                break;
        }
    }

    setupModalHandlers() {
        this.closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modalId = button.getAttribute('data-modal');
                const modal = document.getElementById(modalId);
                if (modal) this.closeModal(modal);
            });
        });

        this.allModals.forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal);
                }
            });
        });
    }

    setupOptionsHandlers() {
        this.volumeSliders.forEach(slider => {
            const valueSpan = slider.nextElementSibling;
            valueSpan.textContent = `${slider.value}%`;
            slider.addEventListener('input', (e) => {
                valueSpan.textContent = `${e.target.value}%`;
            });
        });

        if (this.resetOptionsBtn) {
            this.resetOptionsBtn.addEventListener('click', () => {
                console.log('Restaurando opções padrão...');
                // Lógica para restaurar opções aqui
            });
        }
    }

    openModal(modal) {
        if (!modal) return;
        modal.classList.remove('hidden');
    }

    closeModal(modal) {
        if (!modal) return;
        modal.classList.add('hidden');
    }

    showScoreboard() {
        console.log('🏆 Exibindo placar... (funcionalidade futura)');
        // Futuramente, pode abrir um modal ou uma nova página
    }

    setupSoundPlaceholders() {
        if (this.playButton) {
            this.playButton.addEventListener('mouseenter', () => console.log('🔊 Som: hover botão play'));
        }
        this.menuItems.forEach(item => {
            item.addEventListener('mouseenter', () => console.log('🔊 Som: hover menu item'));
        });
    }
}

// Inicializa o controller assim que o script é carregado
new MenuController();
console.log('🎯 Menu PatoMania com modais carregado com sucesso!');
