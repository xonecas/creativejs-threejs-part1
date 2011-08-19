var camera, 
   scene, 
   renderer,
   mouseX      = 0,
   mouseY      = 0,
   middle      = window.innerWidth / 2,
   particles   = [];

init();

function init() {
   camera = new THREE.Camera( 
      80, 
      window.innerWidth/window.innerHeight,
      1,
      4000
   );

   camera.position.z = 1000;

   scene = new THREE.Scene();

   renderer = new THREE.CanvasRenderer();
   renderer.setSize(window.innerWidth, window.innerHeight);

   document.body.appendChild(renderer.domElement);

   makeParticles();

   document.addEventListener('mousemove', onMouseMove, false);

   setInterval(update, 1000/30);
}

function update() {
   updateParticles();

   renderer.render(scene, camera);
}

function randomColor () {
   var hex  = "0123456789abcdef",
      color = "0x",
      key;

   while (color.length !== 8) {
      key = Math.floor(Math.random() * hex.length);
      color += hex[key];
   }

   return color;
}

function makeParticles () {
   var particle, material;

   for (var zpos = 1000; zpos > -1000; zpos -= 20) {
      material = new THREE.ParticleCanvasMaterial({
         color: randomColor(),
         program: particleRender
      });

      particle = new THREE.Particle(material);

      particle.position.x = Math.random() * 1000 - 500;
      particle.position.y = Math.random() * 1000 - 500;

      particle.position.z = zpos;

      particle.scale.x = particle.scale.y = 10;

      scene.addObject(particle);

      particles.push(particle);
   }
}

function particleRender (ctx) {
   ctx.beginPath();

   ctx.moveTo(3, 0); // 3,0 top point

   ctx.lineTo(5, 6); // 5,6 bottom right point
   ctx.lineTo(0, 2); // 0,2 top left point
   ctx.lineTo(6, 2); // 6,2 top right point
   ctx.lineTo(1, 6); // 1,6 bottom left point
   ctx.lineTo(3, 0); // connect to the top point

   ctx.fill();
}

function updateParticles () {
   for (var i = 0; i < particles.length; i++) {
      particle = particles[i];

      particle.position.z -= mouseY * 0.1;

      if (particle.position.z < -1000) {
         particle.position.z += 2000;
         particle.position.x = (mouseX - middle) + Math.random() * (i * 10); 
      }
   }
}

function onMouseMove (ev) {
   mouseX = ev.clientX;
   mouseY = ev.clientY;
}
