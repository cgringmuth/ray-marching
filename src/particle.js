class Particle {
    constructor() {
        let x, y;
        if(arguments.length == 2) {   
            x = arguments[0];
            y = arguments[1];
        } else {
            x = random(10, width-10);
            y = random(10, height-10);
        }
        this.pos = createVector(x, y);
        this.rays = [];
        this.xoff = random(0, 1000);
        this.yoff = random(0, 1000) + this.xoff;

        for (let a = 0; a < 360; ++a) {
            this.rays.push(new Ray(this.pos, p5.Vector.fromAngle(radians(a))));
        }
    }

    draw() {
        for (let ray of this.rays) {
            ray.draw();
        }
    }

    updatePos(x, y) {
        this.pos.x = x;
        this.pos.y = y;
    }

    randomWalk() {
        let x = noise(this.xoff) * width;
        let y = noise(this.yoff) * height;

        this.updatePos(x,y);

        this.xoff += .01;
        this.yoff += .01;
    }

    check(walls) {
        for (let ray of this.rays) {
            let pt = ray.check(walls);
            if (pt) {
                stroke(255, 100);
                line(ray.pos.x, ray.pos.y, pt.x, pt.y);
            }
        }
    }
}