const canvas = document.getElementById('canvasOne');
const ctx = canvas.getContext('2d');
//assign a empty array to the particlesArray variable.
const particlesArray = [];
//adding HSL colour => hue, saturation, lightness
let hue = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const mouse = {
  x: undefined,
  y: undefined,
}

canvas.addEventListener('click', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(event);
    //when click event is triggered, .push a new particle to the particles array
    //and run it 10 times with for loop.
    for(let i = 0; i < 100; i++) {
    particlesArray.push(new Particle());
  }
});

canvas.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    for(let i = 0; i < 15; i++) {
      particlesArray.push(new Particle());
    }
});  

class Particle {
    constructor() {
      this.x = mouse.x;
      this.y = mouse.y;
      // this.x = Math.random() * canvas.width;
      // this.y = Math.random() * canvas.height;
      this.size = Math.random() * 15+1;
      this.speedX = Math.random() * 3-1.5;
      this.speedY = Math.random() * 3-1.5;
      //assign of the HSL color
      //during the hue is rotating 360° thru in the animation
      //make the particles remember their color
      this.color = 'hsl(' + hue + ', 100%, 50%)';
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      //make particles shrink when they move around
      if(this.size > 0.2) this.size -= 0.1;
    }
    draw() {
      //fill the particles with  HSL colors 
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
      //adding a stroke to the particles
      // ctx.strokeStyle = 'black';
      // ctx.stroke();
    }
}

// function init() {
//   for(let i = 0; i < 100; i++) {
//     particlesArray.push(new Particle());
//   }
// }
// init();

function handleParticles() {
  for(let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
    //check if particle size property is less or equal to 0.3 for example
    if(particlesArray[i].size <= 0.3) {
      //remove them if they are this small, remove them from the array
      particlesArray.splice(i, 1);
      i--;
      //check if particles are removed correctly
      console.log(particlesArray.length);

    }
  }
}

// console.log(particlesArray);

function animate() {
  //clearRect() removes the "old painting" from the canvas
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
  //make it slowly fade away by drawing a semi-transparent rectangle
    ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    //increase hue by every animation step
    hue+=0.5;
    requestAnimationFrame(animate);
}

animate();
      