document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const toggleModeBtn = document.getElementById('toggle-mode');
    const controlButtons = document.querySelectorAll('#controls button');
    let intervalId;
    let time = 1500; // 25 minutos em segundos
    const initialTime = 1500; // Tempo inicial padrão
    let isRunning = false;
    let isMusicOn = false;
    const audio = new Audio('bg-audio.mp3'); // Música de fundo
    const alarm = new Audio('kichen-timer.mp3'); // Toque de Alerta

    // Função para atualizar a interface com o tempo restante
    function updateTimer() {
        const absTime = Math.abs(time);
        const minutes = Math.floor(absTime / 60);
        const seconds = absTime % 60;
        minutesEl.textContent = (time < 0 ? '-' : '') + String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');

        // Verifica se o tempo chegou a zero ou começou a contar negativo
        if (time === 0 || time === -1) {
            alarm.play(); // Toca o toque de alerta
        }
    }

    // Função para iniciar o cronômetro
    function startTimer() {
        if (isRunning) return;
        isRunning = true;
        document.documentElement.classList.add('running');
        intervalId = setInterval(() => {
            time--;
            updateTimer();
        }, 1000);
    }

    // Função para pausar o cronômetro
    function pauseTimer() {
        if (!isRunning) return;
        isRunning = false;
        document.documentElement.classList.remove('running');
        clearInterval(intervalId);
    }

    // Função para resetar o cronômetro
    function resetTimer() {
        pauseTimer();
        time = initialTime; // Reseta para 25 minutos
        updateTimer();
    }

    // Função para ajustar o cronômetro
    function setTimer() {
        const newTime = prompt('Quanto tempo você deseja definir? (Formato: MM:SS)');
        if (newTime) {
            const timeParts = newTime.split(':');
            if (timeParts.length === 2) {
                const newMinutes = parseInt(timeParts[0], 10);
                const newSeconds = parseInt(timeParts[1], 10);
                if (!isNaN(newMinutes) && !isNaN(newSeconds) && newSeconds >= 0 && newSeconds < 60) {
                    time = (newMinutes * 60) + newSeconds;
                    updateTimer();
                } else {
                    alert('Entrada inválida. Por favor, use o formato MM:SS com segundos entre 0 e 59.');
                }
            } else {
                alert('Entrada inválida. Por favor, use o formato MM:SS.');
            }
        }
    }

    // Função para alternar a música
    function toggleMusic() {
        isMusicOn = !isMusicOn;
        if (isMusicOn) {
            audio.play();
            document.documentElement.classList.add('music-on');
        } else {
            audio.pause();
            document.documentElement.classList.remove('music-on');
        }
    }

    // Função para alternar o modo (light/dark)
    function toggleMode() {
        document.documentElement.classList.toggle('light');
    }

    // Event listeners para os botões de controle
    controlButtons.forEach(button => {
        button.addEventListener('click', () => {
            const action = button.getAttribute('data-action');
            switch (action) {
                case 'toggleRunning':
                    isRunning ? pauseTimer() : startTimer();
                    break;
                case 'reset':
                    resetTimer();
                    break;
                case 'set':
                    setTimer();
                    break;
                case 'toggleMusic':
                    toggleMusic();
                    break;
            }
        });
    });

    // Event listener para o botão de alternar modo
    toggleModeBtn.addEventListener('click', toggleMode);

    // Inicializa o cronômetro com o tempo padrão
    updateTimer();
});
