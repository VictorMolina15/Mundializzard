document.addEventListener('DOMContentLoaded', () => {
    const sceneEl = document.querySelector('a-scene');
    const startButton = document.querySelector('#start-button');
    const startContainer = document.querySelector('#start-container');
    const uiContainer = document.querySelector('#ui-container');
    const infoButtons = document.querySelectorAll('.info-button');
    const backButton = document.querySelector('#back-button');
    const infoModal = document.querySelector('#info-modal');
    const closeInfo = document.querySelector('#close-info-button');

    const mexicoButtons = document.querySelector('#mexico-buttons').content;
    const logoButtons = document.querySelector('#logo-buttons').content;

    // Esperamos a que la escena de A-Frame esté completamente cargada
    sceneEl.addEventListener('loaded', () => { 
        const arSystem = sceneEl.systems['mindar-image-system'];
        
        // Añadimos el listener al botón de inicio
        startButton.addEventListener('click', () => {
            startContainer.classList.add('hidden');
            arSystem.start(); 
            uiContainer.classList.remove('hidden'); 
        });

        // Lógica para el botón de información
        infoButtons.forEach(button => {
            button.addEventListener('click', () => {           
                infoModal.classList.remove('hidden');
            });
        });

        // Lógica para el botón de regresar
        backButton.addEventListener('click', () => {
            arSystem.stop();
            startContainer.classList.remove('hidden');
            uiContainer.classList.add('hidden');
        });

        // Lógica para cerrar el modal de información
        closeInfo.addEventListener('click', () => {
            infoModal.classList.add('hidden');
        });

        // Lógica para los marcadores
        const markers = document.querySelectorAll('.marker');
        markers.forEach((marker) => {
            marker.addEventListener('targetFound', () => {    
                uiContainer.innerHTML = '';
                const targetIndex = marker.getAttribute('mindar-image-target').targetIndex;

                switch (targetIndex) {
                    case '0':
                        uiContainer.appendChild(mexicoButtons.cloneNode(true));
                        break;
                    case '1':
                        uiContainer.appendChild(logoButtons.cloneNode(true));
                        break;
                }
            });

            marker.addEventListener('targetLost', () => {
                uiContainer.classList.add('hidden');
            });
        });
    });
});