let ray;
let walls = [];
let particles = [];


function setup() {
  createCanvas(400, 400);

  // ray = new Ray(100, 200); 
  particles.push(new Particle(width/2., height/2., 1, 0, 90));
  particles.push(new Particle(width/2., height/2., 1, 0, 40));
  particles.push(new Particle(width/2., height/2., 1, 0, 360));

  particles[0].state = ParticleState.RandomWalk;
  particles[1].state = ParticleState.RandomWalk;
  particles[2].state = ParticleState.FollowMouse;

  for (let i=0; i<5; i++) {
    const x1 = random(0, width);
    const x2 = random(0, width);
    const y1 = random(0, height);
    const y2 = random(0, height);
    walls.push(new Boundary(createVector(x1, y1), createVector(x2, y2)));
  }

  const p1 = createVector(0, 0);
  const p2 = createVector(width, 0);
  const p3 = createVector(width, height);
  const p4 = createVector(0, height);

  walls.push(new Boundary(p1, p2));
  walls.push(new Boundary(p2, p3));
  walls.push(new Boundary(p3, p4));
  walls.push(new Boundary(p4, p1));
}

function draw() {
  background(0,50);
  for (let wall of walls) {
    wall.draw();
  }

  for (let particle of particles) {
    particle.update();
    particle.check(walls);
    particle.draw();
  }

}