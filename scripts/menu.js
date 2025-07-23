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
        this.saveOptionsBtn = document.getElementById('save-options-btn');
        this.understoodBtn = document.getElementById('understood-btn');
        this.allModals = document.querySelectorAll('.modal');

        // Botões
        this.playButton = document.querySelector('.play-button');
        this.menuItems = document.querySelectorAll('.bottom-menu-item');
        this.closeButtons = document.querySelectorAll('.modal-close-btn');

        // Controles de Opções
        this.optionSliders = document.querySelectorAll('.slider-container input[type="range"]');
        
        // Novos elementos do modal de opções
        this.gameModeCards = document.querySelectorAll('.game-mode-card');
        this.scenarioCards = document.querySelectorAll('.scenario-card');
        this.toggleButtons = document.querySelectorAll('.toggle-btn');
        this.fullscreenBtn = document.getElementById('fullscreen-btn'); // Botão original de tela cheia
    }

    init() {
        this.setupClickHandlers();
        this.setupKeyboardNavigation();
        this.setupModalHandlers();
        this.setupOptionsHandlers();
        this.setupGameModeHandlers();
        this.setupScenarioHandlers();
        this.setupToggleHandlers();
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
        console.log(' Iniciando jogo...');
        window.dispatchEvent(new CustomEvent('playGame'));
    }

    handleMenuItemClick(index) {
        const menuOptions = ['Como Jogar', 'Placar', 'Opções'];
        console.log(` Abrindo: ${menuOptions[index]}`);
        
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
        // Handler para os botões de fechar dentro dos modais
        this.closeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                if (modal) this.closeModal(modal);
            });
        });

        // Handler para fechar o modal clicando fora do conteúdo
        this.allModals.forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal);
                }
            });
        });
    }

    setupOptionsHandlers() {
        // Configura os sliders de volume
        this.optionSliders.forEach(slider => {
            const valueSpan = slider.nextElementSibling;

            const updateSliderValue = () => {
                valueSpan.textContent = `${slider.value}%`;
            };

            slider.addEventListener('input', updateSliderValue);
            updateSliderValue(); // Inicializa o valor correto
        });

        // Botão salvar
        if (this.saveOptionsBtn) {
            this.saveOptionsBtn.addEventListener('click', () => {
                console.log(' Opções salvas!');
                this.closeModal(this.optionsModal);
            });
        }

        if (this.understoodBtn) {
            this.understoodBtn.addEventListener('click', () => {
                this.closeModal(this.howToPlayModal);
            });
        }
    }

    setupGameModeHandlers() {
        this.gameModeCards.forEach(card => {
            card.addEventListener('click', () => {
                const mode = card.getAttribute('data-mode');
                
                if (card.classList.contains('disabled')) {
                    this.showComingSoonMessage();
                    return;
                }
                
                // Remove active de todos os cards
                this.gameModeCards.forEach(c => c.classList.remove('active'));
                // Adiciona active ao card clicado
                card.classList.add('active');
                
                console.log(`🎮 Modo de jogo selecionado: ${mode}`);
            });
        });
    }

    setupScenarioHandlers() {
        this.scenarioCards.forEach(card => {
            card.addEventListener('click', () => {
                const scenario = card.getAttribute('data-scenario');
                
                // Remove active de todos os cards
                this.scenarioCards.forEach(c => c.classList.remove('active'));
                // Adiciona active ao card clicado
                card.classList.add('active');
                
                console.log(`🎨 Cenário selecionado: ${scenario}`);
                // Futuramente: mudar o fundo do jogo
            });
        });
    }

    setupToggleHandlers() {
        this.toggleButtons.forEach(button => {
            button.addEventListener('click', () => {
                const isActive = button.getAttribute('data-active') === 'true';
                const newState = !isActive;
                
                button.setAttribute('data-active', newState.toString());
                
                if (button.id === 'fullscreen-toggle') {
                    // Aciona a funcionalidade de tela cheia
                    if (this.fullscreenBtn) {
                        this.fullscreenBtn.click();
                    } else {
                        this.toggleFullscreen();
                    }
                    console.log(`🔲 Tela cheia: ${newState ? 'ativada' : 'desativada'}`);
                } else if (button.id === 'show-crosshair') {
                    console.log(`🎯 Mostrar mira: ${newState ? 'ativada' : 'desativada'}`);
                    // Futuramente: implementar lógica da mira
                }
            });
        });
    }

    showComingSoonMessage() {
        // Cria a mensagem se não existir
        let message = document.querySelector('.coming-soon-message');
        if (!message) {
            message = document.createElement('div');
            message.className = 'coming-soon-message';
            message.textContent = 'Em breve...';
            document.body.appendChild(message);
        }
        
        // Mostra a mensagem com fade-in
        message.classList.add('show');
        
        // Remove a mensagem após 2 segundos
        setTimeout(() => {
            message.classList.remove('show');
        }, 2000);
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log(`Erro ao entrar em tela cheia: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    }

    openModal(modal) {
        if (!modal) return;
        modal.classList.remove('hidden');
        // Adiciona a classe 'show' para iniciar a animação de entrada do conteúdo
        setTimeout(() => modal.classList.add('show'), 10); // Pequeno delay para garantir a transição
    }

    closeModal(modal) {
        if (!modal) return;
        modal.classList.remove('show');
        // Espera a transição de saída terminar para adicionar a classe 'hidden'
        modal.addEventListener('transitionend', () => {
            modal.classList.add('hidden');
        }, { once: true });
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
