/**
 * PatoMania Tutorial - Cutscene e Tutorial Interativo
 * Implementação completa conforme especificações do game design
 */

class TutorialCutscene {
    constructor() {
        this.currentPhase = 'cutscene';
        this.tutorialStep = 0;
        this.score = 0;
        this.shotsRemaining = 3;
        this.ducksHit = 0;
        this.audioEnabled = true;
        
        this.initializeElements();
        this.initializeAudio();
        this.startCutscene();
    }
    
    initializeElements() {
        // Containers principais
        this.cutsceneContainer = document.getElementById('cutscene-container');
        this.shakeWrapper = document.getElementById('shake-wrapper');
        this.tutorialContainer = document.getElementById('tutorial-container');
        this.completionModal = document.getElementById('completion-modal');
        
        // Elementos da cutscene
        this.ducks = {
            duck1: document.getElementById('duck1'),
            duck2: document.getElementById('duck2'),
            duck3: document.getElementById('duck3')
        };
        this.shotEffect = document.getElementById('shot-effect');
        this.cenarioBg = document.getElementById('cenario-bg');
        this.thoughtDialog = document.getElementById('thought-dialog');
        this.thoughtText = document.getElementById('thought-text');
        
        // Elementos do tutorial
        this.patonildoSprite = document.getElementById('patonildo-sprite');
        this.dialogText = document.getElementById('dialog-text');
        this.continueBtn = document.getElementById('continue-btn');
        this.finishBtn = document.getElementById('finish-tutorial-btn');
        
        // HUD
        this.scoreValue = document.getElementById('score-value');
        this.shotsValue = document.getElementById('shots-value');
        this.duckIcons = [
            document.getElementById('duck-icon-1'),
            document.getElementById('duck-icon-2'),
            document.getElementById('duck-icon-3')
        ];
        
        // Patos do tutorial
        this.tutorialDucks = [
            document.getElementById('tutorial-duck-1'),
            document.getElementById('tutorial-duck-2'),
            document.getElementById('tutorial-duck-3')
        ];
        
        // Elementos interativos
        this.crosshair = document.getElementById('crosshair');
        this.clickIndicator = document.getElementById('click-indicator');
        this.gameArea = document.getElementById('game-area');
        
        this.setupEventListeners();
    }
    
    initializeAudio() {
        this.audioElements = {
            ambient: document.getElementById('ambient-audio'),
            shot: document.getElementById('shot-audio'),
            duckHit: document.getElementById('duck-hit-audio'),
            victory: document.getElementById('victory-audio')
        };
    }
    
    setupEventListeners() {
        // Botão continuar
        this.continueBtn.addEventListener('click', () => this.handleContinue());
        
        // Botão finalizar tutorial
        this.finishBtn.addEventListener('click', () => this.finishTutorial());
        
        // Movimento do mouse/touch para mira
        this.gameArea.addEventListener('mousemove', (e) => this.updateCrosshair(e));
        this.gameArea.addEventListener('touchmove', (e) => this.updateCrosshair(e));
        
        // Event listeners para cliques nos patos
        this.setupDuckClickListeners();
        
        console.log('✅ Tutorial inicializado com sucesso!');
    }
    
    setupDuckClickListeners() {
        this.tutorialDucks.forEach((duck, index) => {
            const handleDuckClick = (event) => {
                if (!duck.classList.contains('hidden') && this.tutorialStep >= 2 && !duck.classList.contains('hit-effect')) {
                    // Mover mira para posição do pato
                    this.moveCrosshairToDuck(duck);
                    
                    this.shootDuck(index);
                    
                    // Esconder indicador de clique
                    this.clickIndicator.classList.add('hidden');
                    
                    // Verificar se deve avançar para próxima fase
                    if (this.tutorialStep === 2 && index === 0) {
                        // Primeiro pato atingido, avançar para fase 3
                        setTimeout(() => {
                            this.showTutorialStep3();
                        }, 2000);
                    }
                }
            };
            
            duck.addEventListener('click', handleDuckClick);
            duck.addEventListener('touchend', (e) => {
                e.preventDefault(); // Evitar duplo disparo
                handleDuckClick(e);
            });
        });
    }
    
    // SEÇÃO 1 - CUTSCENE DE ABERTURA
    startCutscene() {
        console.log('Iniciando cutscene de abertura...');
        
        // Fade-in inicial (1.5s)
        this.cutsceneContainer.classList.add('active');
        
        // Simular sons ambiente
        this.playAmbientSounds();
        
        // Sequenciar eventos da cutscene com múltiplos tiros e diálogos
        setTimeout(() => this.showThought('Vamos à caça!'), 2000);           // 2s - Primeiro pensamento
        setTimeout(() => this.triggerShot(), 4000);                         // 3s - Primeiro disparo
        setTimeout(() => this.startDuckFlight(), 5000);                     // 4s - Patos voando
        setTimeout(() => this.showThought('Oh não, errei!'), 4750);         // 5s - Segundo pensamento
        setTimeout(() => this.triggerAdditionalShot('left'), 7000);         // 5.5s - Segundo tiro (esquerda)
        setTimeout(() => this.triggerAdditionalShot('right'), 8000);        // 6.5s - Terceiro tiro (direita)
        setTimeout(() => this.showThought('Droga, vamos atrás deles!'), 8750); // 8s - Terceiro pensamento
        setTimeout(() => this.transitionToTutorial(), 12000);               // 12s - Transição
    }
    
    playAmbientSounds() {
        // Placeholder para sons ambiente
        console.log(' Sons ambiente: vento, grilos, quacks suaves');
    }
    
    triggerShot() {
        console.log(' Disparo e reação dos patos!');
        
        // Mostrar efeito de tiro na posição original
        this.shotEffect.classList.remove('hidden');
        
        // Tremor da câmera
        this.shakeWrapper.classList.add('camera-shake');
        
        // Som de tiro
        console.log(' Som alto de tiro');
        
        // Patos assustados
        Object.values(this.ducks).forEach(duck => {
            duck.style.backgroundImage = "url('assets/duck/pato-assustado.png')";
            duck.classList.add('scared');
        });
        
        // Esconder efeito de tiro após animação
        setTimeout(() => {
            this.shotEffect.classList.add('hidden');
            this.shakeWrapper.classList.remove('camera-shake');
        }, 500);
    }
    
    showThought(text) {
        console.log(` Pensamento: ${text}`);
        
        // Mostrar caixa de diálogo
        this.thoughtDialog.classList.remove('hidden');
        
        // Digitar texto letra por letra
        this.typeThoughtText(text);
        
        // Esconder após tempo baseado no tamanho do texto
        const displayTime = text.length > 30 ? 4000 : 2500;
        setTimeout(() => {
            this.thoughtDialog.classList.add('hidden');
        }, displayTime);
    }
    
    triggerAdditionalShot(position = 'center') {
        console.log(` Tiro adicional durante o voo! Posição: ${position}`);
        
        // Posicionar efeito de tiro baseado na posição
        const shotSprite = this.shotEffect.querySelector('#shot-sprite');
        
        if (position === 'left') {
            this.shotEffect.style.left = '85%';
            this.shotEffect.style.top = '60%';
        } else if (position === 'right') {
            this.shotEffect.style.left = '30%';
            this.shotEffect.style.top = '50%';

        } else {
            this.shotEffect.style.left = '50%';
            this.shotEffect.style.top = '80%';
        }
        
        // Mostrar efeito de tiro
        this.shotEffect.classList.remove('hidden');
        this.shotEffect.style.opacity = '1';
        
        // Tremor da câmera
        this.shakeWrapper.classList.add('camera-shake');
        
        // Som de tiro
        console.log(' Som de tiro (erro)');
        
        // Esconder efeito de tiro após animação
        setTimeout(() => {
            this.shotEffect.style.opacity = '0';
            this.shakeWrapper.classList.remove('camera-shake');
            
            // Resetar posição para a original após fade out
            setTimeout(() => {
                this.shotEffect.classList.add('hidden');
                this.shotEffect.style.left = '50%';
                this.shotEffect.style.top = '80%';
            }, 300);
        }, 500);
    }
    
    startDuckFlight() {
        console.log(' Patos voando com animação de asas');
        
        // Direções de voo diferentes para cada pato
        const flightDirections = ['up', 'left', 'right'];
        const duckNames = ['duck1', 'duck2', 'duck3'];
        
        // Animar patos voando
        Object.values(this.ducks).forEach((duck, index) => {
            // Ciclo de animação das asas
            this.animateWings(duck, index);
            
            // Aplicar animação de voo com direção específica
            setTimeout(() => {
                // Limpar classes anteriores
                duck.classList.remove('scared', 'calm-duck');
                
                // Aplicar animação de voo
                duck.classList.add('flying');
                
                // Adicionar direção específica
                if (flightDirections[index] === 'left') {
                    duck.classList.add('fly-left');
                    console.log(` ${duckNames[index]} voando para a ESQUERDA`);
                } else if (flightDirections[index] === 'right') {
                    duck.classList.add('fly-right');
                    console.log(` ${duckNames[index]} voando para a DIREITA`);
                } else {
                    console.log(` ${duckNames[index]} voando para CIMA`);
                }
            }, index * 400); // Delay escalonado aumentado
        });
        
        console.log(' Efeitos sonoros: asas batendo, quacks apressados');
    }
    
    animateWings(duck, index) {
        const wingSprites = [
            'assets/duck/pato-asas-fechada.png',
            'assets/duck/pato-asas-central.png',
            'assets/duck/pato-asas-aberta.png'
        ];
        
        let wingFrame = 0;
        const wingInterval = setInterval(() => {
            duck.style.backgroundImage = `url('${wingSprites[wingFrame % wingSprites.length]}')`;
            wingFrame++;
            
            if (wingFrame > 9) { // 3 ciclos completos
                clearInterval(wingInterval);
            }
        }, 150);
    }
    
    transitionToTutorial() {
        console.log(' Transição para tutorial interativo');
        
        // Escurecer cutscene
        this.cutsceneContainer.style.opacity = '0';
        
        setTimeout(() => {
            this.cutsceneContainer.classList.remove('active');
            this.cutsceneContainer.classList.add('hidden');
            
            // Mostrar tutorial
            this.tutorialContainer.classList.remove('hidden');
            this.tutorialContainer.classList.add('active');
            
            this.currentPhase = 'tutorial';
            this.startTutorial();
        }, 1000);
    }
    
    // SEÇÃO 2 - TUTORIAL INTERATIVO
    startTutorial() {
        console.log(' Iniciando tutorial interativo');
        this.tutorialStep = 1;
        this.showTutorialStep1();
    }
    
    showTutorialStep1() {
        console.log(' PARTE 1 - Introdução ao clique');
        
        // Patonildo tutorial 1
        this.patonildoSprite.src = 'assets/protagonist/patonildo-tutorial-1.png';
        
        // Esconder botão continuar durante digitação
        this.continueBtn.style.display = 'none';
        
        // Diálogo inicial (com atraso para troca de imagem)
        setTimeout(() => {
            this.typeText('Vamos pegar todos esses patonildos!', () => {
                this.continueBtn.style.display = 'block';
            });
        }, 100);
        
        // Esconder todos os patos do tutorial inicialmente
        this.tutorialDucks.forEach(duck => duck.classList.add('hidden'));
    }
    
    handleContinue() {
        switch(this.tutorialStep) {
            case 1:
                this.showTutorialStep2();
                break;
            case 2:
                this.showTutorialStep3();
                break;
        }
    }
    
    showTutorialStep2() {
        console.log(' PARTE 2 - Primeiro tiro');
        this.tutorialStep = 2;
        
        // Esconder botão continuar imediatamente
        this.continueBtn.style.display = 'none';
        
        // Patonildo tutorial 2
        this.patonildoSprite.src = 'assets/protagonist/patonildo-tutorial-2.png';
        
        // Novo diálogo (com atraso)
        setTimeout(() => {
            this.typeText('Toque no pato para testarmos sua mira!', () => {
                // Mostrar primeiro pato
                this.tutorialDucks[0].classList.remove('hidden');
                
                // Mostrar indicador de clique
                this.showClickIndicator(this.tutorialDucks[0]);
                
                // Ativar mira
                this.crosshair.style.display = 'block';
            });
        }, 100);
    }
    
    showTutorialStep3() {
        console.log(' PARTE 3 - Múltiplos alvos');
        this.tutorialStep = 3;
        
        // Esconder botão continuar imediatamente
        this.continueBtn.style.display = 'none';
        
        // Patonildo tutorial 3
        this.patonildoSprite.src = 'assets/protagonist/patonildo-tutorial-3.png';
        
        // Novo diálogo (com atraso)
        setTimeout(() => {
            this.typeText('Agora acerte os demais patos!', () => {
                // Mostrar patos restantes
                this.tutorialDucks[1].classList.remove('hidden');
                this.tutorialDucks[2].classList.remove('hidden');
            });
        }, 100);
    }
    
    shootDuck(duckIndex) {
        if (this.tutorialDucks[duckIndex].classList.contains('hidden')) return;
        
        console.log(` Pato ${duckIndex + 1} atingido!`);
        
        const duck = this.tutorialDucks[duckIndex];
        
        // Efeito visual de acerto
        duck.classList.add('hit-effect');
        
        // Trocar para imagem de pato acertado
        duck.src = 'assets/duck/pato-acertado.png';
        
        // Som de acerto
        console.log(' Som de impacto leve');
        
        setTimeout(() => {
            // Animação de queda
            duck.src = 'assets/duck/pato-caindo.png';
            duck.classList.remove('hit-effect');
            duck.classList.add('falling');
            
            // Atualizar HUD
            this.updateHUD(duckIndex);
            
            // Esconder pato após queda
            setTimeout(() => {
                duck.classList.add('hidden');
                this.ducksHit++;
                
                // Verificar se tutorial foi concluído
                if (this.ducksHit >= 3) {
                    setTimeout(() => this.completeTutorial(), 1000);
                }
            }, 1000);
        }, 300);
    }
    
    updateHUD(duckIndex) {
        // Atualizar pontuação
        this.score += 100;
        this.scoreValue.textContent = this.score;
        
        // Atualizar tiros restantes
        this.shotsRemaining--;
        this.shotsValue.textContent = this.shotsRemaining;
        
        // Atualizar ícones de patos
        if (this.duckIcons[duckIndex]) {
            this.duckIcons[duckIndex].classList.add('hit');
        }
    }
    
    completeTutorial() {
        console.log(' Tutorial concluído!');
        
        // Escurecer tela parcialmente
        this.tutorialContainer.style.opacity = '0.3';
        
        // Mostrar modal de conclusão
        this.completionModal.classList.remove('hidden');
        
        // Sons de vitória
        console.log(' Música leve de vitória, som de quack comemorativo');
    }
    
    finishTutorial() {
        console.log('Finalizando tutorial...');
        
        // Marcar tutorial como concluído
        localStorage.setItem('tutorialCompleted', 'true');
        
        // Dispara um evento para notificar o script principal que o tutorial acabou
        const event = new CustomEvent('tutorialFinished');
        window.dispatchEvent(event);
    }
    
    // UTILITÁRIOS
    typeText(text, callback) {
        // Limpar qualquer animação anterior
        if (this.currentTypeInterval) {
            clearInterval(this.currentTypeInterval);
        }
        
        this.dialogText.textContent = '';
        let index = 0;
        
        this.currentTypeInterval = setInterval(() => {
            this.dialogText.textContent += text[index];
            index++;
            
            if (index >= text.length) {
                clearInterval(this.currentTypeInterval);
                this.currentTypeInterval = null;
                if (callback) callback();
            }
        }, 50); // Velocidade de digitação
    }
    
    typeThoughtText(text) {
        // Limpar qualquer animação anterior
        if (this.currentThoughtInterval) {
            clearInterval(this.currentThoughtInterval);
        }
        
        this.thoughtText.textContent = '';
        let index = 0;
        
        this.currentThoughtInterval = setInterval(() => {
            this.thoughtText.textContent += text[index];
            index++;
            
            if (index >= text.length) {
                clearInterval(this.currentThoughtInterval);
                this.currentThoughtInterval = null;
            }
        }, 40); // Velocidade de digitação mais rápida para pensamentos
    }
    
    showClickIndicator(targetElement) {
        const rect = targetElement.getBoundingClientRect();
        const gameAreaRect = this.gameArea.getBoundingClientRect();
        
        this.clickIndicator.style.left = (rect.left - gameAreaRect.left + rect.width/2 - 30) + 'px';
        this.clickIndicator.style.top = (rect.top - gameAreaRect.top + rect.height/2 - 30) + 'px';
        this.clickIndicator.classList.remove('hidden');
        
        // Esconder indicador após alguns segundos
        setTimeout(() => {
            this.clickIndicator.classList.add('hidden');
        }, 3000);
    }
    
    updateCrosshair(event) {
        if (this.currentPhase !== 'tutorial') return;
        
        const rect = this.gameArea.getBoundingClientRect();
        let clientX, clientY;
        
        if (event.type === 'touchmove') {
            clientX = event.touches[0].clientX;
            clientY = event.touches[0].clientY;
        } else {
            clientX = event.clientX;
            clientY = event.clientY;
        }
        
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        
        this.crosshair.style.left = (x - 25) + 'px';
        this.crosshair.style.top = (y - 25) + 'px';
        this.crosshair.style.display = 'block';
    }
    
    moveCrosshairToDuck(duck) {
        const duckRect = duck.getBoundingClientRect();
        const gameAreaRect = this.gameArea.getBoundingClientRect();
        
        // Calcular posição relativa do pato dentro da game area
        const x = duckRect.left - gameAreaRect.left + (duckRect.width / 2);
        const y = duckRect.top - gameAreaRect.top + (duckRect.height / 2);
        
        // Posicionar mira no centro do pato
        this.crosshair.style.left = (x - 20) + 'px';
        this.crosshair.style.top = (y - 20) + 'px';
        this.crosshair.style.display = 'block';
    }
}

// Inicializa o tutorial assim que o script é carregado.
console.log('PatoMania Tutorial Iniciado!');
new TutorialCutscene();
