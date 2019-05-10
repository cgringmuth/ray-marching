const ParticleState = {
    Static: 1,
    RandomWalk: 2,
    FollowMouse: 3
}

class Particle {
    constructor() {
        let x, y;
        if(arguments.length >= 2) {
            x = arguments[0];
            y = arguments[1];
        } else {
            x = random(10, width-10);
            y = random(10, height-10);
        }

        let dirX, dirY;
        if(arguments.length >= 4) {
            dirX = arguments[2];
            dirY = arguments[3];
        } else {
            dirX = 1;
            dirY = 0;
        }

        let fov;
        if(arguments.length >= 5) {
            fov = arguments[4];
        } else {
            fov = 360;
        }

        this.pos = createVector(x, y);
        this.dir = createVector(dirX, dirY);
        this.dir.normalize();
        this.fov = fov;
        this.rays = [];
        this.xoff = random(0, 1000);
        this.yoff = random(0, 1000) + this.xoff;

        this.state = ParticleState.Static;
        this.speed = .0025

        this.createRays();
    }

    createRays() {
        this.rays = [];
        for (let a = 0; a < this.fov/2.; ++a) {
            // let dir = this.dir.copy();
            this.rays.push(new Ray(this.pos, this.dir.copy().rotate(radians(a))));
            if (a == 0) {
                continue;
            }
            this.rays.push(new Ray(this.pos, this.dir.copy().rotate(radians(-a))));
            // console.log(dir.rotate(radians(a)).x);
        }
        this.rays.push(new Ray(this.pos, this.dir.copy().rotate(radians(this.fov/2.))));

        // for (let a = 0; a < this.fov/2.; ++a) {
        //     this.rays.push(new Ray(this.pos, p5.Vector.fromAngle(radians(a))));
        // }
    }

    draw() {
        stroke(0,0,255,100);
        push();
        translate(this.pos);
        line(0, 0, this.dir.x*30, this.dir.y*30);
        pop();
    }

    updatePos(x, y) {
        this.pos.x = x;
        this.pos.y = y;
    }

    updateDir(x, y) {
        this.dir.x = x;
        this.dir.y = y;
        this.dir.normalize();
        this.createRays();
    }

    update()
    {
        switch(this.state) {
            case ParticleState.Static:
                break;
            case ParticleState.RandomWalk:
                this.randomWalk();
                break;
            case ParticleState.FollowMouse:
                let dirX = mouseX - this.pos.x;
                let dirY = mouseY - this.pos.y;
                if (abs(dirX) > 0 || abs(dirY) > 0) {
                    this.updateDir(dirX, dirY);
                    this.updatePos(mouseX,mouseY);
                }
                break;
            default:
        } 
    }

    randomWalk() {
        let x = noise(this.xoff) * width;
        let y = noise(this.yoff) * height;

        this.updateDir(x-this.pos.x,y-this.pos.y);
        this.updatePos(x,y);

        this.xoff += this.speed;
        this.yoff += this.speed;
    }

    check(walls) {
        for (let ray of this.rays) {
            let pt = ray.check(walls);
            if (pt) {
                stroke(255, 255, 100, 100);
                line(ray.pos.x, ray.pos.y, pt.x, pt.y);
            }
        }
    }
}