class Ray {
    constructor(pos, angle) {
        this.pos = pos;
        /* this.angle = angle * Math.PI / 180;
        this.vek = { x: runden(Math.cos(this.angle)), y: runden(Math.sin(this.angle)) }; */
        this.vek = angle;
        this.u = 0;
        this.t = 0;
        this.min = Infinity;
        this.zielEcke;
        this.offsetRay;
        this.eckPunkt = false;
    }


    show() {
        if (this.min != Infinity) {
            ctx.strokeStyle = "white";
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.moveTo(this.pos.x, this.pos.y);
            ctx.lineTo(this.pos.x + this.vek.x * this.min, this.pos.y + this.vek.y * this.min);
            ctx.stroke();

            if (!this.eckPunkt) {
                s1.points.push({ x: this.pos.x + this.vek.x * this.min, y: this.pos.y + this.vek.y * this.min, angle: Math.atan2(this.vek.y, this.vek.x) / Math.PI * 180, eckPunkt: this.eckPunkt,vek:{x:this.vek.x,y:this.vek.y}});
            } else {
                s1.points.push({ x: this.pos.x + this.vek.x * this.min, y: this.pos.y + this.vek.y * this.min, angle: Math.atan2(this.vek.y, this.vek.x) / Math.PI * 180,vek:{x:this.vek.x,y:this.vek.y}, eckPunkt: this.eckPunkt, ray1: new Ray({ x: 0, y: 0 }, 0), ray2: new Ray({ x: 0, y: 0 }, 0) });
            }
        }
    }

    draw() {
        if (this.min != Infinity) {

            ctx.lineWidth = 1;
            ctx.lineTo(this.pos.x + this.vek.x * this.min, this.pos.y + this.vek.y * this.min);

        }
    }

    intersect(wall) {
        const a = this.pos.x;
        const b = this.pos.y;
        const c = this.vek.x;
        const d = this.vek.y;

        const e = wall.a.x;
        const f = wall.a.y;
        const g = wall.vek.x;
        const h = wall.vek.y;



        this.u = (c * (f - b) + d * (a - e)) / (g * d - h * c);
        this.t = (e + this.u * g - a) / c;
        if (c == 0) {
            this.t = this.t = (f + this.u * h - b) / d;
        }

        if (this.t > 0 && this.u > 0 && this.u < 1) {
            if (this.t < this.min) {
                this.min = this.t;
                this.eckPunkt = false;
            }

        } else if (this.t > 0 && (this.u == 0 || (this.u) == 1)) {
            if (this.t < this.min) {
                this.min = this.t;
                this.eckPunkt = true;
            }
        }

    }

    update(pos, angle) {
        this.pos = pos;
        // this.angle = angle * Math.PI / 180;
        //  this.vek = { x: runden(Math.cos(this.angle)), y: runden(Math.sin(this.angle)) };
        this.vek = angle;
        this.u = 0;
        this.t = 0;
        this.min = Infinity;
    }
}