let timeline;
let moment;

let TEMP_dead_to_food = [];

let worldSize;
let scroll;

let names;

let maxFood;

let img_Nate;
let img_Rebace;
let img_Buggy;
let img_Coowee;
let img_Miranda;

function preload() {
	img_Nate = loadImage("imgs/cartoonate.png");
	img_Rebace = loadImage("imgs/cartoonbace.png");
	img_Buggy = loadImage("imgs/in shower.png");
	img_Coowee = loadImage("imgs/mee.png");
	img_Miranda = loadImage("imgs/mirtoonda.png");
}

function setup() {
	document.title = "Natural Selection";
    createCanvas(windowWidth - 20, windowHeight - 21);

    ellipseMode(CENTER);
	imageMode(CENTER);
    textSize(15);

    importNames();

    timeline = [];
    moment = 0;
    
    worldSize = createVector(1500, 1500);
    scroll = createVector(worldSize.x / 2 - width / 2, worldSize.y / 2 - height / 2);

    maxFood = 3000;

    let firstLife = [];
    for (let i = 0; i < 300; i++) {
        firstLife.push(new Life(
            random(worldSize.x),
            random(worldSize.y),
            100,
            random(),
            random(100),
            random(10, 30),
            random(names),
            ["god"],
            random(255), // red
            random(255), // green
            random(255), // blue
            random(),
            random(),
			0,
			random(100),
			random(1, 10),
			random(100),
			random()
        ));
    }

    let firstFood = [];
    for (let i = 0; i < maxFood; i++) {
        firstFood.push(new Food(
            random(worldSize.x),
            random(worldSize.y),
            0,
			random(1, 10)
        ));
    }

    timeline.push(new Frame(
        firstLife,
        firstFood
    ));
}

function draw() {
    background(0, 0, 200);
    noStroke();
	textStyle(NORMAL);

    timeline[moment].draw();

    if (keyIsDown(RIGHT_ARROW)) {
        moment++;
        if (moment >= timeline.length) {
            timeline.push(timeline[timeline.length - 1].createNextFrame());
        }
    }

    if (keyIsDown(LEFT_ARROW)) {
        if (moment != 0) {
            moment--;
        }
    }

    if (mouseIsPressed) {
        scroll.add(pmouseX - mouseX, pmouseY - mouseY);
    }

    fill(255);
    textAlign(LEFT, TOP);
    text("frame " + moment + "; " + timeline[moment].life.length + " lives; " + timeline[moment].food.length + " foods", 0, 0, width, 20);
	text("v" + version, 0, 15);
}

function windowResized() {
    resizeCanvas(windowWidth - 20, windowHeight - 21);
}

function randomInt(min, max) {
    return round(random(min, max));
}

function truncate(number, decimal_places) {
    return floor(number * pow(10, decimal_places)) / pow(10, decimal_places);
}