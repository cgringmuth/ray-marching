class Ray {
    constructor(pos, dir) {
        this.pos = pos;
        this.dir = dir;
    }

    draw() {
        stroke(255, 100);
        push();
        translate(this.pos);
        line(0, 0, this.dir.x * 10, this.dir.y * 10);
        pop();
    }

    updatePos(x, y) {
        this.pos.x = x;
        this.pos.y = y;
    }

    check(walls) {
        
        let minT = Infinity;
        let closesPt;
        for (let wall of walls) {
            // https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection
            const x1 = this.pos.x;
            const y1 = this.pos.y;
            const x2 = this.pos.x + this.dir.x;
            const y2 = this.pos.y + this.dir.y;

            const x3 = wall.p1.x;
            const y3 = wall.p1.y;
            const x4 = wall.p2.x;
            const y4 = wall.p2.y;

            const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

            if (den == 0) {
                // console.log("den == 0");
                continue;
            }

            const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
            if (t < 0) {
                // console.log("t < 0 || t > 1 "+str(t));
                continue;
            }

            const u = - ((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
            if (u < 0 || u > 1) {
                // console.log("u < 0 || u > 1");
                continue;
            }

            if (t < minT) {
                minT = t;
                closesPt = createVector(x1 + t * (x2 - x1), y1 + t * (y2 - y1));
            }
        }

        return closesPt;
    }
}