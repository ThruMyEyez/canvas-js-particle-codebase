const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const particlesArray = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillstyle = 'red';
    ctx.fillRect(10, 20, 150, 50);

});
const mouse = {
  x: undefined,
  y: undefined,
}
canvas.addEventListener('click', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(event);
});
canvas.addEventListener('mousemove', function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
});



class Particle {
    constructor() {
      // this.x = mouse.x;
      // this.y = mouse.y;
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 5+1;
      this.speedX = Math.random() * 3-1.5;
      this.speedY = Math.random() * 3-1.5;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
    }
    draw() {
      ctx.fillStyle = 'orange';
      ctx.beginPath();
      ctx.arc(this.x, this.y, 10, 0, Math.PI*2);
      ctx.fill();
    }
}

function init() {
  for(let i = 0; i < 100; i++) {
    particlesArray.push(new Particle());
  }
}

init();

function handleParticles() {
  for(let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }
}

console.log(particlesArray);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animate);
}

animate();









