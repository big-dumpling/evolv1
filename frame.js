class Frame {
    constructor(life, food) {
        this.life = life;
        this.food = food;
    }

    draw() {
        for (let i in this.food) {
            this.food[i].draw();
        }

        for (let i in this.life) {
            this.life[i].draw();
        }

        for (let i in this.life) {
            if (dist(mouseX, mouseY, this.life[i].x - scroll.x, this.life[i].y - scroll.y) <= this.life[i].size / 2) {
                stroke(0);
                strokeWeight(1.5);
                fill(255);
                let x = constrain(mouseX + 5, 0, width - 100);
                let y = constrain(mouseY + 5, 0, height - 100);
                text("name: " + this.life[i].name, x, y);
                text("parent(s): " + this.life[i].parents, x, y + textSize());
                text("sexuality: " + this.life[i].sexuality_spectrum, x, y + 2 * textSize());
                text("energy: " + truncate(this.life[i].energy, 2), x, y + 3 * textSize());
                text("reproduce rate: " + truncate(this.life[i].reproduce_rate * 100, 2) + "%", x, y + 4 * textSize());
                text("energy to offspring: " + truncate(this.life[i].energy_ratio * 100, 2) + "%", x, y + 5 * textSize());
                text("eyesight: " + floor(this.life[i].eyesight) + "px", x, y + 6 * textSize());
				text("age: " + this.life[i].age + " frames", x, y + 7 * textSize());
				text("could die at age: " + this.life[i].death_age, x, y + 8 * textSize());
				text("pickiness: " + this.life[i].pickiness, x, y + 9 * textSize());
				text("energy needed to reproduce: " + this.life[i].energy_reproduce_threshold, x, y + 10 * textSize());
				textStyle(ITALIC);
				let funny_statement;
				switch(this.life[i].name) {
					case "nate":
						funny_statement = "'I must flee...'";
						break;
					case "rebace":
						funny_statement = "'Why not?'";
						break;
					case "buggy":
						funny_statement = "'Oh my goss.'";
						break;
					case "big dumpling":
						funny_statement = "'I don't knoh.'";
						break;
					case "miranda":
						funny_statement = "'Rat, wehagga thagga.'";
						break;
					default:
						funny_statement = "";
				}
				text(funny_statement, textSize() + x, y + 11 * textSize());
				textStyle(NORMAL);
            }
        }
		
		for(let i in this.food) {
			if (dist(mouseX, mouseY, this.food[i].x - scroll.x, this.food[i].y - scroll.y) <= this.food[i].amount * 2.5) {
				stroke(0);
                strokeWeight(1.5);
                fill(255);
				text("amount: " + this.food[i].amount, mouseX, mouseY);
			}
		}
    }

    createNextFrame() {
        let newLife = [];
        let newFood = [];

        for (let i in this.food) {
            if (this.food[i].update() != undefined) {
                newFood.push(this.food[i].update());
            }
        }
        
		// for(let i = 0; i < maxFood - timeline[moment - 1].food.length; i++) {
		for(let i = 0; i < random(1, maxFood / 100 + 10); i++) {
			if (newFood.length < maxFood) {
				newFood.push(new Food( // create a new food
					random(worldSize.x),
					random(worldSize.y),
					0,
					// random(1, 5),
					random(1, 10)
				));
			}
		}

        this.newFrame = new Frame([], newFood);

        for (let i in this.life) {
            if (this.life[i].update() != undefined) {
                newLife = concat(newLife, this.life[i].update());
                // newLife.push(this.life[i].update());
            }
        }
		
		let temp_thing = TEMP_dead_to_food;
		TEMP_dead_to_food = [];
        return new Frame(concat(this.newFrame.life, newLife), concat(this.newFrame.food, temp_thing));
        // return new Frame(newLife, newFood);
    }
}