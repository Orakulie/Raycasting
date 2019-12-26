class Source {
    constructor(pos, dir) {
        this.pos = pos;
        this.dir = dir;
        this.rays = [];
        this.offset = 0.0001;
        this.points = [];

        this.drawToEndPoints();
    }


    show() {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, 10, 0, 2 * Math.PI, false);
        ctx.fill();

    }
    update(x, y) {
        this.pos.x = x;
        this.pos.y = y;
        this.points = [];

        this.updateRays();

       /*  let offset = 50;
        let winkel = 5 * Math.PI / 180;
        for (let p = 0; p < this.points.length-3; p += 3) {
            if (this.points[p].eckPunkt == true) {

                let ray1 = this.points[p].ray1;
                let ray2 = this.points[p].ray2;

                let pos = { x: this.points[p].x, y: this.points[p].y };
                let pos1 = { x: this.points[p + 1].x, y: this.points[p + 1].y };
                let pos2 = { x: this.points[p + 2].x, y: this.points[p + 2].y };

                let angle = this.points[p].angle;


                angle = angle * Math.PI / 180;
                let pointVek = this.points[p].vek;
                ctx.beginPath();

                ray1.pos = { x: pos.x, y: pos.y };
                ray1.vek = { x: Math.cos(angle - winkel), y: Math.sin(angle - winkel) };

                for (let wall of wände) {
                    ray1.intersect(wall);
                }

                ctx.moveTo(pos.x, pos.y);

                ray1.draw();
                ctx.lineWidth = 5;
                ctx.lineTo(pos1.x,pos1.y);
                ctx.lineTo(pos.x,pos.y);

                /* ctx.strokeStyle = "red";
                ctx.stroke(); */
               // ctx.fillStyle = "grey";
              //  ctx.fill();
                /* ctx.fillStyle = "darkgreen";
                ctx.fill();

                this.points[p].ray2.pos = { x: pos.x, y: pos.y };
                this.points[p].ray2.vek = { x: Math.cos(angle + winkel), y: Math.sin(angle + winkel) }
                for (let wall of wände) {
                    this.points[p].ray2.intersect(wall);
                }
                ctx.moveTo(pos.x, pos.y);
                if (this.points[p].ray2.draw())
                    ctx.lineTo(this.points[p].ray2.draw().x, this.points[p].ray2.draw().y);
                ctx.lineTo(pos1.x, pos1.y);
                ctx.strokeStyle = "red";
                ctx.stroke();
                ctx.fillStyle = "darkgreen";
                ctx.fill(); */
                //ctx.lineTo(pos1.x-offset,pos1.y-offset);
                // ctx.lineTo(pos2.x,pos2.y);

          //  }
       // } 

        if(fill)
            this.fillArea();

    }

    drawCircular() {
        for (let a = 0; a < 360; a += 1) {
            let ray = new Ray(this.pos, a);
            this.rays.push(ray);
        }
    }

    drawToEndPoints() {
        for (let ecke of ecken) {
            let ray = new Ray(this.pos, { x: ecke.x - this.pos.x, y: ecke.y - this.pos.y });
            ray.zielEcke = ecken.indexOf(ecke);
            ray.offsetRay = 0;
            this.rays.push(ray);
            ray = new Ray(this.pos, { x: Math.cos(Math.atan2(ecke.y - this.pos.y, ecke.x - this.pos.x) + this.offset), y: Math.sin(Math.atan2(ecke.y - this.pos.y, ecke.x - this.pos.x) + this.offset) });
            ray.zielEcke = ecken.indexOf(ecke);
            ray.offsetRay = 1;
            this.rays.push(ray);
            ray = new Ray(this.pos, { x: Math.cos(Math.atan2(ecke.y - this.pos.y, ecke.x - this.pos.x) - this.offset), y: Math.sin(Math.atan2(ecke.y - this.pos.y, ecke.x - this.pos.x) - this.offset) });
            ray.zielEcke = ecken.indexOf(ecke);
            ray.offsetRay = 2;
            this.rays.push(ray);
        }
    }

    fillArea() {
        this.points.sort(function (a, b) { return a.angle - b.angle });
        ctx.beginPath();
        for (let punkt of this.points) {

            let pX = punkt.x;
            let pY = punkt.y;

            ctx.lineTo(pX, pY);

        }
        /* let r = 50;
        let fill = ctx.createRadialGradient(this.pos.x,this.pos.y,r,this.pos.x,this.pos.y,r*5);
        fill.addColorStop(0,"green");
        fill.addColorStop(1,"black");
        ctx.fillStyle = "rgb(0,255,0,0.5)"; */
        ctx.fillStyle = "KHAKI";
        ctx.fill();
    }

    updateRays() {
        for (let ray of this.rays) {
            ray.pos.x = this.pos.x;
            ray.pos.y = this.pos.y;
            if (ray.offsetRay == 0) {
                ray.vek.x = ecken[ray.zielEcke].x - ray.pos.x;
                ray.vek.y = ecken[ray.zielEcke].y - ray.pos.y;
            }
            if (ray.offsetRay == 1) {
                //   ray.vek.x = ecken[ray.zielEcke].x - ray.pos.x - this.offset;
                ray.vek.x = Math.cos(Math.atan2(ecken[ray.zielEcke].y - ray.pos.y, ecken[ray.zielEcke].x - ray.pos.x) + this.offset);
                //ray.vek.y = ecken[ray.zielEcke].y - ray.pos.y + this.offset;
                ray.vek.y = Math.sin(Math.atan2(ecken[ray.zielEcke].y - ray.pos.y, ecken[ray.zielEcke].x - ray.pos.x) + this.offset);
            }
            if (ray.offsetRay == 2) {
                /* ray.vek.x = ecken[ray.zielEcke].x - ray.pos.x + this.offset;
                ray.vek.y = ecken[ray.zielEcke].y - ray.pos.y - this.offset; */
                ray.vek.x = Math.cos(Math.atan2(ecken[ray.zielEcke].y - ray.pos.y, ecken[ray.zielEcke].x - ray.pos.x) - this.offset);
                ray.vek.y = Math.sin(Math.atan2(ecken[ray.zielEcke].y - ray.pos.y, ecken[ray.zielEcke].x - ray.pos.x) - this.offset);

            }
            ray.min = Infinity;
            for (let wall of wände) {
                ray.intersect(wall);
            }
            ray.show();

        }
    }
}
