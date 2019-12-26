class Wand {
    constructor(x1, y1, x2, y2) {
        this.a = { x: x1, y: y1 };
        this.b = { x: x2, y: y2 };
        this.vek = { x: x2 - x1, y: y2 - y1 };
    }


    show() {
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.lineWidth = 4;
        ctx.moveTo(this.a.x, this.a.y);
        ctx.lineTo(this.b.x, this.b.y);
        ctx.stroke();
    }


    intersect(wall) {
        if (this != wall) {
            const a = this.a.x;
            const b = this.a.y;
            const c = this.vek.x;
            const d = this.vek.y;

            const e = wall.a.x;
            const f = wall.a.y;
            const g = wall.vek.x;
            const h = wall.vek.y;



            const u = (c * (f - b) + d * (a - e)) / (g * d - h * c);
            let t = (e + u * g - a) / c;
            if (c == 0) {
                t = t = (f + u * h - b) / d;
            }

            if (t > 0 && t < 1 && u > 0 && u < 1) {
                return { x: abRunden(a + c * t), y: abRunden(b + d * t) };

            }
        }

    }
}