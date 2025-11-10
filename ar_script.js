/* ===========================================
   PARTE 1: REGISTRAR COMPONENTES DE A-FRAME
   =========================================== */

AFRAME.registerComponent('set-jersey', {
  schema: {
    texture: { type: 'string' }
  },

  init: function () {
    const el = this.el; // El <a-gltf-model>
    const textureSrc = document.querySelector(this.data.texture).src;
    const newTexture = new THREE.TextureLoader().load(textureSrc);
    newTexture.flipY = false; // Importante para texturas en .glb

    el.addEventListener('model-loaded', () => {

      const model = el.getObject3D('mesh');
      let jerseyMesh = null;

      model.traverse((node) => {
        if (node.isMesh && node.name === 'Jersey') {
          jerseyMesh = node;
        }
      });

      if (jerseyMesh) {
        jerseyMesh.material.map = newTexture;
        jerseyMesh.material.needsUpdate = true;
      } else {
        console.error("¡ERROR! No se encontró el mesh 'Jersey' en el modelo. Revisa el nombre en Blender.");
      }
    });
  }
});

const TEAM_INFO = {
  'argentina': { name: 'Argentina', info: 'Actual campeón del mundo. Liderados por Lionel Messi.' },
  'australia': { name: 'Australia', info: 'Conocidos como los "Socceroos", siempre combativos.' },
  'brasil': { name: 'Brasil', info: 'El único pentacampeón de la historia de los mundiales.' },
  'canada': { name: 'Canadá', info: 'Equipo en ascenso, co-anfitrión del mundial 2026.' },
  'ecuador': { name: 'Ecuador', info: 'La "Tri" es conocida por su fortaleza en la altura de Quito.' },
  'eua': { name: 'Estados Unidos', info: 'Co-anfitrión del 2026 y un gigante de la CONCACAF.' },
  'iran': { name: 'Irán', info: 'El "Equipo Melli", una potencia constante del fútbol asiático.' },
  'japon': { name: 'Japón', info: 'Los "Samuráis Azules", famosos por su disciplina y técnica.' },
  'jordania': { name: 'Jordania', info: 'Equipo que ha mostrado un gran crecimiento en Asia.' },
  'mexico': { name: 'México', info: 'El "Tri", co-anfitrión del 2026 y eterno contendiente.' },
  'nueva_zelanda': { name: 'Nueva Zelanda', info: 'Los "All Whites", dominadores de la confederación de Oceanía.' },
  'sur_corea': { name: 'Corea del Sur', info: 'Los "Tigres de Asia", semifinalistas en 2002.' },
  'uzbekistan': { name: 'Uzbekistán', info: 'Una nación emergente con un fuerte programa juvenil.' }
};

const TARGET_TO_TEAM_MAP = {
  0: 'argentina', 1: 'argentina', 2: 'argentina',
  3: 'australia', 4: 'australia', 5: 'australia',
  6: 'brasil', 7: 'brasil', 8: 'brasil',
  9: 'canada', 10: 'canada', 11: 'canada',
  12: 'ecuador', 13: 'ecuador', 14: 'ecuador',
  15: 'eua', 16: 'eua', 17: 'eua',
  18: 'iran', 19: 'iran', 20: 'iran',
  21: 'japon', 22: 'japon', 23: 'japon',
  24: 'jordania', 25: 'jordania', 26: 'jordania',
  27: 'mexico', 28: 'mexico', 29: 'mexico',
  30: 'nueva_zelanda', 31: 'nueva_zelanda', 32: 'nueva_zelanda',
  33: 'sur_corea', 34: 'sur_corea', 35: 'sur_corea',
  36: 'uzbekistan', 37: 'uzbekistan', 38: 'uzbekistan'
};

/* ===============================
   PARTE 2: LÓGICA DE LA ESCENA
   =============================== */

window.addEventListener('load', () => {
  const backButton = document.getElementById('back-button');

  backButton.addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  const ANIMACION_IDLE = 'Idle';
  const LISTA_DE_BAILES = ['Gangnam', 'Capoeira', 'Twerk', 'Salsa', 'Samba', 'Silly'];

  const BAILES_EN_BUCLE = ['Capoeira', 'Silly']; 

  // -----------------------------------------------------

  const sceneEl = document.querySelector('a-scene');
  const button = document.querySelector('#danceButton');
  const infoBox = document.querySelector('#infoBox'); 
  const infoBoxTeamName = document.querySelector('#infoBoxTeamName');
  const infoBoxTeamInfo = document.querySelector('#infoBoxTeamInfo');

  let activeModel = null;
  let isDancing = false; // El estado de nuestro modelo

  // --- Función "Resetear" ---
  // Esta función SIEMPRE regresa el modelo a Idle y resetea el estado
  const returnToIdle = () => {
    if (!activeModel) return;

    // 1. Regresa a Idle con transición suave
    activeModel.setAttribute('animation-mixer', {
      clip: ANIMACION_IDLE,
      loop: 'repeat',
      crossFadeDuration: 0.3
    });

    // 2. Libera el estado
    isDancing = false;

    // 3. Limpia CUALQUIER listener de "finished" que haya quedado
    activeModel.removeEventListener('animation-finished', returnToIdle);
  };

  // 1. Mostrar el botón cuando se encuentra un target
  sceneEl.addEventListener('targetFound', event => {
    // ¡¡AQUÍ ESTÁ EL CAMBIO!! Usamos event.detail.target
    const targetEntity = event.target;
    console.log("¡Target Encontrado!", targetEntity); 
    const targetComponent = targetEntity.getAttribute('mindar-image-target');
    const targetIndex = targetComponent.targetIndex;
    activeModel = targetEntity.querySelector('.lizzard-model');
  
    const teamKey = TARGET_TO_TEAM_MAP[targetIndex]; 

    if (teamKey && TEAM_INFO[teamKey]) {
      const teamData = TEAM_INFO[teamKey];
      
      infoBoxTeamName.innerText = teamData.name;
      infoBoxTeamInfo.innerText = teamData.info;
  
      infoBox.classList.remove('hidden');
    }

    if (activeModel) {
      button.classList.remove('hidden');
      returnToIdle(); 
    }
  });

  // 2. Ocultar el botón cuando se pierde el target
  sceneEl.addEventListener('targetLost', event => {
    console.log("Target Perdido", event.target);

    if (activeModel) {
      // Limpia todo al perder el target
      activeModel.removeEventListener('animation-finished', returnToIdle);
    }
    activeModel = null;
    isDancing = false;
    button.classList.add('hidden');
    infoBox.classList.add('hidden');
  });

  // 3. ¡LA NUEVA LÓGICA DEL BOTÓN!
  button.addEventListener('click', () => {
    if (!activeModel) return; // Seguridad

    // --- LÓGICA DE INTERRUPCIÓN ---
    // Si ya está bailando, el botón ahora sirve para "Parar"
    if (isDancing) {
      console.log("Interrumpiendo baile, volviendo a Idle.");
      returnToIdle();
      return; // Detiene la ejecución aquí
    }

    // --- LÓGICA DE INICIAR BAILE ---
    // 1. Marca como "ocupado"
    isDancing = true;

    // 2. (Seguridad) Limpia listeners viejos
    activeModel.removeEventListener('animation-finished', returnToIdle);

    // 3. Elige el baile
    const randomDance = LISTA_DE_BAILES[Math.floor(Math.random() * LISTA_DE_BAILES.length)];
    console.log("Bailando:", randomDance);

    if (BAILES_EN_BUCLE.includes(randomDance)) {

      activeModel.setAttribute('animation-mixer', {
        clip: randomDance,
        loop: 'repeat', 
        crossFadeDuration: 0.2
      });

    } else {

      activeModel.addEventListener('animation-finished', returnToIdle);

      // Reproduce el baile
      activeModel.setAttribute('animation-mixer', {
        clip: randomDance,
        loop: 'once',
        crossFadeDuration: 0.2,
        clampWhenFinished: true
      });
    }
  });
});