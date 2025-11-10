document.addEventListener('DOMContentLoaded', () => {

    /* ============================================= */
    /* LÓGICA DE LA TRIVIA                          */
    /* ============================================= */
    const allQuestions = [
        // México
        { q: '¿En qué año fue México sede del mundial por última vez?', o: ['1970', '1986', '1994'], c: 1 },
        { q: '¿Cuál de estos platillos es Patrimonio de la Humanidad y cocina tradicional Mexicana?', o: ['Tacos al Pastor', 'Pozole', 'Enchiladas'], c: 1 },
        { q: '¿Quién es el máximo goleador histórico de la selección mexicana?', o: ['Hugo Sánchez', 'Cuauhtémoc Blanco', 'Javier Hernández'], c: 2 },
        // Argentina
        { q: '¿Cuántas Copas del Mundo ha ganado Argentina?', o: ['2', '3', '4'], c: 1 },
        { q: '¿Qué baile es emblemático de Argentina?', o: ['Salsa', 'Tango', 'Samba'], c: 1 },
        { q: '¿Quién fue el capitán de Argentina en el mundial de 1986?', o: ['Daniel Passarella', 'Jorge Valdano', 'Diego Maradona'], c: 2 },
        // Brasil
        { q: '¿Cuántas veces ha ganado Brasil el mundial?', o: ['5', '4', '6'], c: 0 },
        { q: '¿Cómo se llama el famoso carnaval celebrado en Río de Janeiro?', o: ['La Tomatina', 'Carnaval de Río', 'Oktoberfest'], c: 1 },
        { q: '¿Qué jugador es conocido como "O Rei"?', o: ['Pelé', 'Ronaldo', 'Neymar'], c: 0 },
        // Australia
        { q: '¿Cuál es el apodo de la selección de fútbol de Australia?', o: ['Los Wallabies', 'Los Kangaroos', 'Los Socceroos'], c: 2 },
        { q: '¿En qué año Australia fue sede de los Juegos Olímpicos de Verano?', o: ['2000 (Sídney)', '2004 (Atenas)', '2008 (Pekín)'], c: 0 },
        { q: '¿Cuál fue la mejor actuación de Australia en un Mundial (hasta 2022)?', o: ['Octavos de final', 'Cuartos de final', 'Semifinal'], c: 0 },
        // Canadá
        { q: '¿Cuál de estas ciudades canadienses será sede del Mundial 2026?', o: ['Montreal', 'Vancouver', 'Calgary'], c: 1 },
        { q: '¿Cuál es el deporte nacional de invierno de Canadá?', o: ['Esquí', 'Hockey sobre hielo', 'Curling'], c: 1 },
        { q: '¿Qué hoja aparece en el centro de la bandera de Canadá?', o: ['Hoja de Roble', 'Hoja de Arce', 'Hoja de Abedul'], c: 1 },
        // Ecuador
        { q: '¿En qué ciudad de Ecuador la selección juega sus partidos de local?', o: ['Guayaquil', 'Cuenca', 'Quito'], c: 2 },
        { q: '¿Qué famosas islas, patrimonio de la humanidad, pertenecen a Ecuador?', o: ['Islas Galápagos', 'Islas Malvinas', 'Islas Canarias'], c: 0 },
        { q: '¿Quién es el máximo goleador histórico de la selección de Ecuador?', o: ['Agustín Delgado', 'Enner Valencia', 'Antonio Valencia'], c: 1 },
        // Estados Unidos (EUA)
        { q: '¿En qué año fue Estados Unidos sede de la Copa del Mundo masculina?', o: ['1994', '1998', '2002'], c: 0 },
        { q: '¿Cuál es la liga de fútbol profesional más importante de EE. UU.?', o: ['NFL', 'NBA', 'MLS'], c: 2 },
        { q: '¿Cuál fue la mejor actuación de EE. UU. en un Mundial masculino (moderno)?', o: ['Cuartos de final (2002)', 'Semifinal (1930)', 'Final'], c: 0 },
        // Irán
        { q: '¿Cuál es el apodo de la selección de fútbol de Irán?', o: ['Los Leones', 'Equipo Melli', 'Las Águilas'], c: 1 },
        { q: '¿Cuál es la capital de Irán?', o: ['Teherán', 'Isfahán', 'Shiraz'], c: 0 },
        { q: '¿Qué jugador iraní mantuvo el récord de más goles internacionales por muchos años?', o: ['Ali Daei', 'Mehdi Taremi', 'Sardar Azmoun'], c: 0 },
        // Japón
        { q: '¿Cuál es el apodo de la selección japonesa de fútbol?', o: ['Los Dragones', 'Los Samuráis Azules', 'Los Tigres'], c: 1 },
        { q: '¿Qué arte marcial es originario de Japón?', o: ['Taekwondo', 'Kung Fu', 'Kárate'], c: 2 },
        { q: '¿En qué año Japón fue co-anfitrión de la Copa del Mundo?', o: ['1998', '2002', '2006'], c: 1 },
        // Jordania
        { q: '¿Cuál es la capital de Jordania?', o: ['Amán', 'Petra', 'Aqaba'], c: 0 },
        { q: '¿Qué famosa ciudad antigua, tallada en roca, es un símbolo de Jordania?', o: ['Machu Picchu', 'Petra', 'Persépolis'], c: 1 },
        { q: '¿Cuál fue el logro histórico de Jordania en la Copa Asiática 2023?', o: ['Campeón', 'Subcampeón', 'Semifinalista'], c: 1 },
        // Nueva Zelanda
        { q: '¿Cuál es el apodo de la selección de fútbol de Nueva Zelanda?', o: ['All Blacks', 'All Whites', 'Kiwis'], c: 1 },
        { q: '¿Qué famosa danza de guerra maorí es conocida por su equipo de rugby?', o: ['Haka', 'Hula', 'Sirtaki'], c: 0 },
        { q: '¿En qué Mundial Nueva Zelanda terminó invicta, empatando sus 3 partidos?', o: ['2006', '2010', '2014'], c: 1 },
        // Corea del Sur
        { q: '¿Cuál fue la histórica posición de Corea del Sur en el Mundial 2002?', o: ['Finalista', '3er Lugar', '4to Lugar'], c: 2 },
        { q: '¿Cómo se le llama al género de música pop mundialmente famoso de Corea?', o: ['J-Pop', 'C-Pop', 'K-Pop'], c: 2 },
        { q: '¿Qué estrella de Corea del Sur es famoso por jugar en el Tottenham?', o: ['Park Ji-Sung', 'Son Heung-min', 'Kim Min-jae'], c: 1 },
        // Uzbekistán
        { q: '¿Cuál es la capital de Uzbekistán?', o: ['Samarcanda', 'Bujará', 'Taskent'], c: 2 },
        { q: '¿Qué ruta comercial histórica pasaba por ciudades como Samarcanda?', o: ['La Ruta de la Seda', 'La Ruta de las Especias', 'El Camino Real'], c: 0 },
        { q: '¿Cuál es el principal apodo de la selección de fútbol de Uzbekistán?', o: ['Lobos Blancos', 'Águilas Doradas', 'Leones de Montaña'], c: 0 }
    ];

    let shuffledQuestions = [];
    let currentQuestionIndex = 0;
    let score = 0;

    // --- Referencias del DOM ---
    const triviaModal = document.getElementById('trivia-modal');
    const startTriviaButton = document.getElementById('start-trivia-button');
    const closeModalButton = document.querySelector('.modal-close');
    const restartTriviaButton = document.getElementById('restart-trivia-button');

    const triviaContent = document.getElementById('trivia-content');
    const triviaResults = document.getElementById('trivia-results');

    const questionCounter = document.getElementById('question-counter');
    const questionText = document.getElementById('question-text');
    const answerOptionsContainer = document.getElementById('answer-options');
    const scoreText = document.getElementById('score-text');

    // --- Funciones de la Trivia ---

    function startTrivia() {
        score = 0;
        currentQuestionIndex = 0;
        // Mezcla las preguntas y toma las primeras 5
        shuffledQuestions = allQuestions.sort(() => 0.5 - Math.random()).slice(0, 5);

        showQuestion();

        triviaResults.classList.add('hidden');
        triviaContent.classList.remove('hidden');
        triviaModal.style.display = 'flex';
    }

    function showQuestion() {
        // Limpia el estado anterior
        answerOptionsContainer.innerHTML = '';

        const currentQuestion = shuffledQuestions[currentQuestionIndex];

        questionCounter.innerText = `Pregunta ${currentQuestionIndex + 1} / 5`;
        questionText.innerText = currentQuestion.q;

        currentQuestion.o.forEach((option, index) => {
            const button = document.createElement('button');
            button.innerText = option;
            button.addEventListener('click', () => selectAnswer(index, currentQuestion.c));
            answerOptionsContainer.appendChild(button);
        });
    }

    function selectAnswer(selectedIndex, correctIndex) {
        // Deshabilita todos los botones
        Array.from(answerOptionsContainer.children).forEach(button => {
            button.disabled = true;
            // Marca la respuesta correcta
            if (parseInt(button.dataset.index) === correctIndex) {
                button.classList.add('correct');
            }
        });

        const selectedButton = answerOptionsContainer.children[selectedIndex];

        if (selectedIndex === correctIndex) {
            score++;
            selectedButton.classList.add('correct');
        } else {
            selectedButton.classList.add('incorrect');
            // Muestra también la correcta
            answerOptionsContainer.children[correctIndex].classList.add('correct');
        }

        // Espera un momento antes de pasar a la siguiente
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < 5) {
                showQuestion();
            } else {
                showResults();
            }
        }, 1500); // 1.5 segundos de espera
    }

    function showResults() {
        triviaContent.classList.add('hidden');
        triviaResults.classList.remove('hidden');
        scoreText.innerText = `Tu puntuación: ${score} de 5`;
    }

    function closeTrivia() {
        triviaModal.style.display = 'none';
    }

    // --- Event Listeners ---
    if (startTriviaButton) {
        startTriviaButton.addEventListener('click', startTrivia);
    }
    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeTrivia);
    }
    if (restartTriviaButton) {
        restartTriviaButton.addEventListener('click', startTrivia);
    }

    /* ============================================= */
    /* LÓGICA DE ESTADÍSTICAS (NUEVO)              */
    /* ============================================= */

    // --- Base de Datos de Estadísticas ---
    // Usamos las mismas llaves (sin acentos) que en tu ar_script.js
    const STATS_DATA = {
        'argentina': {
            name: 'Argentina',
            flag: 'assets/flags/Argentina-1.jpeg',
            logo: 'assets/logos/argentina.jpeg',
            confederation: 'CONMEBOL',
            titles: 3,
            participations: 18,
            scorer: 'Lionel Messi (106)'
        },
        'australia': {
            name: 'Australia',
            flag: 'assets/flags/Australia-1.jpeg',
            logo: 'assets/logos/australia.jpeg',
            confederation: 'AFC',
            titles: 0,
            participations: 6,
            scorer: 'Tim Cahill (50)'
        },
        'brasil': {
            name: 'Brasil',
            flag: 'assets/flags/Brasil-1.jpeg',
            logo: 'assets/logos/brasil.jpeg',
            confederation: 'CONMEBOL',
            titles: 5,
            participations: 22,
            scorer: 'Neymar (79)'
        },
        'canada': {
            name: 'Canadá',
            flag: 'assets/flags/Canadá-1.jpeg',
            logo: 'assets/logos/canada.jpeg',
            confederation: 'CONCACAF',
            titles: 0,
            participations: 2,
            scorer: 'Cyle Larin (28)'
        },
        'ecuador': {
            name: 'Ecuador',
            flag: 'assets/flags/Ecuador-1.jpeg',
            logo: 'assets/logos/ecuador.jpeg',
            confederation: 'CONMEBOL',
            titles: 0,
            participations: 4,
            scorer: 'Enner Valencia (40)'
        },
        'eua': {
            name: 'Estados Unidos',
            flag: 'assets/flags/Estados Unidos-1.jpeg',
            logo: 'assets/logos/eua.jpeg',
            confederation: 'CONCACAF',
            titles: 0,
            participations: 11,
            scorer: 'C. Dempsey / L. Donovan (57)'
        },
        'iran': {
            name: 'Irán',
            flag: 'assets/flags/Irán-1.jpeg',
            logo: 'assets/logos/irán.jpeg',
            confederation: 'AFC',
            titles: 0,
            participations: 6,
            scorer: 'Ali Daei (109)'
        },
        'japon': {
            name: 'Japón',
            flag: 'assets/flags/Japón-1.jpeg',
            logo: 'assets/logos/japón.jpeg',
            confederation: 'AFC',
            titles: 0,
            participations: 7,
            scorer: 'Kunishige Kamamoto (75)'
        },
        'jordania': {
            name: 'Jordania',
            flag: 'assets/flags/Jordania-1.jpeg',
            logo: 'assets/logos/jordania.jpeg',
            confederation: 'AFC',
            titles: 0,
            participations: 0,
            scorer: 'Hamza Al-Dardour (35)'
        },
        'mexico': {
            name: 'México',
            flag: 'assets/flags/México-1.jpeg',
            logo: 'assets/logos/méxico.jpeg',
            confederation: 'CONCACAF',
            titles: 0,
            participations: 17,
            scorer: 'Javier Hernández (52)'
        },
        'nueva_zelanda': {
            name: 'Nueva Zelanda',
            flag: 'assets/flags/Nueva Zelanda-1.jpeg',
            logo: 'assets/logos/nueva zelanda.jpeg',
            confederation: 'OFC',
            titles: 0,
            participations: 2,
            scorer: 'Chris Wood (34)'
        },
        'sur_corea': {
            name: 'Corea del Sur',
            flag: 'assets/flags/Sur Corea-1.jpeg',
            logo: 'assets/logos/sur corea.jpeg',
            confederation: 'AFC',
            titles: 0,
            participations: 11,
            scorer: 'Cha Bum-kun (58)'
        },
        'uzbekistan': {
            name: 'Uzbekistán',
            flag: 'assets/flags/Uzbekistán-1.jpeg',
            logo: 'assets/logos/uzbekistán.jpeg',
            confederation: 'AFC',
            titles: 0,
            participations: 0,
            scorer: 'Eldor Shomurodov (38)'
        }
    };
    const statsModal = document.getElementById('stats-modal');
    const statsModalClose = document.getElementById('stats-modal-close');
    const statsListContainer = document.getElementById('stats-list-container');

    // --- Referencias a los campos del Modal ---
    const statsTeamLogo = document.getElementById('stats-team-logo');
    const statsTeamName = document.getElementById('stats-team-name');
    const statsConfederation = document.getElementById('stats-confederation');
    const statsTitles = document.getElementById('stats-titles');
    const statsParticipations = document.getElementById('stats-participations');
    const statsTopScorer = document.getElementById('stats-top-scorer');

    // --- Funciones ---

    // 1. Poblar la lista de equipos en la página
    function populateStatsList() {
        if (!statsListContainer) return; // Seguridad

        // Limpia el contenedor
        statsListContainer.innerHTML = '';

        // Itera sobre nuestra base de datos
        for (const teamKey in STATS_DATA) {
            const team = STATS_DATA[teamKey];

            // Crea un botón por cada equipo
            const teamButton = document.createElement('button');
            teamButton.className = 'team-item';
            // Almacenamos la "llave" del equipo en un data-attribute
            teamButton.dataset.teamKey = teamKey;

            teamButton.innerHTML = `
                <img src="${team.flag}" alt="Bandera de ${team.name}">
                <span>${team.name}</span>
            `;

            // Añadimos el listener para abrir el modal
            teamButton.addEventListener('click', () => {
                openStatsModal(teamKey);
            });

            statsListContainer.appendChild(teamButton);
        }
    }

    // 2. Abrir y poblar el modal con la info del equipo
    function openStatsModal(teamKey) {
        const team = STATS_DATA[teamKey];
        if (!team) return; // Si no encontramos el equipo, no hacemos nada

        // Rellenamos el modal con la info
        statsTeamLogo.src = team.logo;
        statsTeamName.innerText = team.name;
        statsConfederation.innerText = team.confederation;
        statsTitles.innerText = team.titles;
        statsParticipations.innerText = team.participations;
        statsTopScorer.innerText = team.scorer;

        // Mostramos el modal
        if (statsModal) {
            statsModal.style.display = 'flex';
        }
    }

    // 3. Cerrar el modal
    function closeStatsModal() {
        if (statsModal) {
            statsModal.style.display = 'none';
        }
    }

    // --- Ejecución ---
    populateStatsList(); // Llamamos a la función para crear la lista al cargar
    if (statsModalClose) {
        statsModalClose.addEventListener('click', closeStatsModal);
    }

    /* ============================================= */
    /* LÓGICA DE VIDEOS (NUEVO)                    */
    /* ============================================= */

    const VIDEO_DATA = [
        { id: 'e-0ikH_VKkw', title: 'MUNDIAL ESTADOS UNIDOS 🇺🇸 USA 1994 | Historia de los Mundiales', country: 'Estados Unidos' },
        { id: '_9_18SMH5ug', title: 'México vs Alemania | Rusia 2018 | Sigue Soñando | Richard5TN |', country: 'México' },
        { id: 'nvXeT1J-rbA', title: 'Bélgica 1-0 Canadá All Goals Extended Highlights |Mundial Qatar 2022|', country: 'Canadá' },
        { id: 'dNpK1us58gE', title: 'Italy 1 - 1 New Zealand | World Cup 2010', country: 'Nueva Zelanda' },
        { id: 'Fwp9seJEFmg', title: 'Ni ESPAÑA pudo DETENER a los JAPONESES en este MUNDIAL', country: 'Japón' },
        { id: 'rMBKvOThEBo', title: 'Wales 0-2 Iran Highlights Extended & All Goals | FIFA World Cup 2022 ', country: 'Irán' },
        { id: '6mrfOlryOxY', title: 'Los 3 MUNDIALES de ARGENTINA (1978, 1986, 2022)', country: 'Argentina' },
        { id: 'iHc5kcacLDs', title: 'Alemania 0 - 2 Corea de Sur. TV Mexicana | Mundial Rusia 2018', country: 'Corea del Sur' },
        { id: 'pMDo_xz5Uso', title: 'La PRIMERA CLASIFICACIÓN de 🇯🇴 JORDANIA a la COPA DEL MUNDO 2026', country: 'Jordania' },
        { id: '6rrQn5PqerQ', title: 'ARGENTINA vs AUSTRALIA | Qatar 2022 - Octavos de Final', country: 'Australia' },
        { id: 'w7iiwdAK5v0', title: 'El Día Que ALEMANIA HUMILLÓ a La Selección Brasileña En Su MUNDIAL', country: 'Brasil' },
        { id: 'JIBQrEtnNKI', title: 'El país que GASTÓ 500 MILLONES para clasificar a su primer MUNDIAL (y funcionó)', country: 'Uzbekistán' },
        { id: 'KgbI6F8ILnc', title: 'La FÓRMULA de ECUADOR para Clasificar a MUNDIALES | Documental Inédito', country: 'Ecuador' }
    ];

    // --- Referencias del DOM de Videos ---
    const videoCarousel = document.getElementById('video-carousel');
    const filterSelect = document.getElementById('filter-select');
    const prevCarouselButton = document.querySelector('.carousel-nav.prev');
    const nextCarouselButton = document.querySelector('.carousel-nav.next');

    let currentFilter = 'default';

    // 1. Cargar videos en el carrusel
    function loadVideos() {
        if (!videoCarousel) return;
        videoCarousel.innerHTML = ''; // Limpiar cualquier video existente

        VIDEO_DATA.forEach(video => {
            const videoCard = document.createElement('div');
            videoCard.className = 'video-card';
            videoCard.dataset.filter = currentFilter; // Establece el filtro inicial

            videoCard.innerHTML = `
                <div class="video-responsive">
                    <iframe 
                        src="https://www.youtube.com/embed/${video.id}?enablejsapi=1" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen
                        loading="lazy">
                    </iframe>
                </div>
                <div class="video-info">
                    <h3>${video.title}</h3>
                    <p>${video.country}</p>
                </div>
            `;
            videoCarousel.appendChild(videoCard);
        });

        applyFilter(currentFilter); // Aplica el filtro inicial después de cargar
    }

    // 2. Aplicar filtro a todos los videos
    function applyFilter(filter) {
        currentFilter = filter;
        const videoCards = document.querySelectorAll('.video-card');
        videoCards.forEach(card => {
            const iframe = card.querySelector('iframe');
            // Elimina clases de filtro anteriores
            iframe.classList.remove('filter-sepia', 'filter-grayscale', 'filter-cinematic');

            // Aplica la nueva clase de filtro si no es 'default'
            if (filter !== 'default') {
                iframe.classList.add(`filter-${filter}`);
            }
        });
    }

    // 3. Funcionalidad de navegación del carrusel (botones)
    function scrollCarousel(direction) {
        const scrollAmount = videoCarousel.clientWidth * 0.8; // Desplaza 80% del ancho visible
        if (direction === 'next') {
            videoCarousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        } else {
            videoCarousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
    }

    // --- Event Listeners ---
    if (filterSelect) {
        filterSelect.addEventListener('change', (event) => {
            applyFilter(event.target.value);
        });
    }

    if (prevCarouselButton) {
        prevCarouselButton.addEventListener('click', () => scrollCarousel('prev'));
    }
    if (nextCarouselButton) {
        nextCarouselButton.addEventListener('click', () => scrollCarousel('next'));
    }

    // Cargar los videos cuando la página esté lista
    loadVideos();

    /* ============================================= */
    /* LÓGICA DEL MODAL DE AYUDA (NUEVO)             */
    /* ============================================= */

    // --- Referencias del DOM de Ayuda ---
    const helpButton = document.getElementById('help-button');
    const helpModal = document.getElementById('help-modal');
    const helpModalClose = document.getElementById('help-modal-close');

    // --- Funciones ---
    function openHelpModal() {
        if (helpModal) {
            helpModal.style.display = 'flex';
        }
    }

    function closeHelpModal() {
        if (helpModal) {
            helpModal.style.display = 'none';
        }
    }

    // --- Event Listeners ---
    if (helpButton) {
        helpButton.addEventListener('click', openHelpModal);
    }
    if (helpModalClose) {
        helpModalClose.addEventListener('click', closeHelpModal);
    }


    /* ============================================= */
    /* LÓGICA DEL NAVBAR ACTIVO (Opcional pero recomendado) */
    /* ============================================= */
    
    // Esta parte es para que el ícono del navbar se vea "activo"
    // cuando te desplazas a esa sección.
    
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 150) { // 150px de offset
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            // El href del link (ej: "#trivia") debe coincidir con el 'current' id
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        // Caso especial para "Inicio"
        if (current === '') {
            navLinks[0].classList.add('active');
        }
    });
});