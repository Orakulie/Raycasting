const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.translate(0.5, 0.5);


let wände = [];
let ecken = [];
var rect = canvas.getBoundingClientRect();
let s1;


start();

function start() {
    drawWalls(6);


    checkForCorners();


    s1 = new Source({ x: 150, y: 200 }, 0);
    s1.update(150,200);
    s1.show();
}


onmousemove = e => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);


    s1.update(e.clientX - rect.left, e.clientY - rect.top);
    s1.show();
    for (let wand of wände) {
        wand.show();
    }
};


function checkForCorners() {
    for (let wand of wände) {
        if (!contains(ecken, wand.a))
            ecken.push(wand.a);
        if (!contains(ecken, wand.b))
            ecken.push(wand.b);
    }

    for (let wand of wände) {
        for (let wand2 of wände) {
            const temp = wand.intersect(wand2);
            if(temp && !contains(ecken,temp)) {
                ecken.push(temp);
            }
        }
    }

}

function drawWalls(amount) {
    for (let i = 0; i < amount; i++) {
        let w = new Wand(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height), Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height));
        w.show();
        wände.push(w);
    }

    let oben = new Wand(0, 0, canvas.width, 0);
    let unten = new Wand(0, canvas.height, canvas.width, canvas.height);
    let rechts = new Wand(canvas.width, 0, canvas.width, canvas.height);
    let links = new Wand(0, 0, 0, canvas.height);

    wände.push(oben, unten, rechts, links);
}

function runden(x) {
    if (x < 0)
        return aufRunden(x);
    else
        return abRunden(x);
}

function abRunden(x) {
    return (Math.floor(x * 100)) / 100;
}
function aufRunden(x) {
    return (Math.ceil(x * 100)) / 100;
}


function länge(vek) {
    return Math.sqrt(vek.x * vek.x + vek.y * vek.y);
}

function contains(array, obj) {
    for (let x of array) {
        if (JSON.stringify(x) == JSON.stringify(obj)) {
            return true;
        }
    }
    return false;
}