class Life {
    constructor(x, y, energy, sexuality, speed, eyesight, size, name, parents, r, g, b, reproduce_rate, energy_ratio, age) {
        this.x = x;
        this.y = y;
        this.energy = energy;
        this.sexuality = sexuality;
        // this.willingness_to_reproduce = willingness_to_reproduce;
        this.speed = speed;
        this.eyesight = eyesight;
        this.size = size;
        this.name = name;
        this.parents = parents;
        this.r = r;
        this.g = g;
        this.b = b;
        this.reproduce_rate = reproduce_rate;
        this.energy_ratio = energy_ratio;
		this.age = age;
    }

    update() {
        this.size = constrain(this.size, 10, 200);
        this.eyesight = constrain(this.eyesight, 0, 200);
        this.speed = constrain(this.speed, 0, 200);
        this.x = constrain(this.x, 0, worldSize.x);
        this.y = constrain(this.y, 0, worldSize.y);
        this.r = constrain(this.r, 0, 255);
        this.g = constrain(this.g, 0, 255);
        this.b = constrain(this.b, 0, 255);
        this.reproduce_rate = constrain(this.reproduce_rate, 0, 1);
        this.energy_ratio = constrain(this.energy_ratio, 0, 1);
            
        let x = this.x;
        let y = this.y;
        let energy = this.energy;
        let sexuality = this.sexuality;
        // let willingness_to_reproduce = this.willingness_to_reproduce;
        let speed = this.speed;
        let eyesight = this.eyesight;
        let size = this.size;
        let name = this.name;
        let parents = this.parents;
        let r = this.r;
        let g = this.g;
        let b = this.b;
        let reproduce_rate = this.reproduce_rate;
        let energy_ratio = this.energy_ratio;
		let age = this.age;

        let ret = [];

        x += random(-speed - size, speed + size);
        y += random(-speed - size, speed + size);
        energy -= speed / 2 + size / 10;

        if (energy > 0) {
            // if (energy > 30) {
                // willingness_to_reproduce += energy / 10;
            // } else {
                // if (energy < 10) {
                    // willingness_to_reproduce -= energy / 5;
                // }
            // }

            // if (sexuality == "asexual") { // no reproduction
                // willingness_to_reproduce = 0;
            // }

            for (let i in timeline[moment - 1].newFrame.food) {
                if (!timeline[moment - 1].newFrame.food[i].eaten) {
                    if (dist(x, y, timeline[moment - 1].newFrame.food[i].x, timeline[moment - 1].newFrame.food[i].y) <= eyesight) {
                        if (x < timeline[moment - 1].newFrame.food[i].x) {
                            x += random(speed);
                        } else {
                            x -= random(speed);
                        }

                        if (y < timeline[moment - 1].newFrame.food[i].y) {
                            y += random(speed);
                        } else {
                            y -= random(speed);
                        }

                        if (dist(x, y, timeline[moment - 1].newFrame.food[i].x, timeline[moment - 1].newFrame.food[i].y) - timeline[moment - 1].newFrame.food[i].amount * 2.5 <= size / 2) {
                            energy += timeline[moment - 1].newFrame.food[i].amount * 5;
                            timeline[moment - 1].newFrame.food[i].eaten = true;
                        }
                    }
                }
            }
            if (timeline.length == moment) {
                if (energy >= 30 && random() <= reproduce_rate) {
                // if (willingness_to_reproduce >= 10) {
                    if (sexuality == "sexual" || sexuality == "both") { // sexual reproduction or "both" labelled
                        for (let i in timeline[moment - 1].life) {
                            // if (timeline[moment - 1].life[i].sexuality == "sexual") {
                            if (timeline[moment - 1].life[i] != this && timeline[moment - 1].life[i].sexuality == "sexual" /*&& random() <= reproduce_rate*/ && random() <= timeline[moment - 1].life[i].reproduce_rate) {
                                if (dist(x, y, timeline[moment - 1].life[i].x, timeline[moment - 1].life[i].y) <= eyesight) {
                                    if (x < timeline[moment - 1].life[i].x) {
                                        x += random(speed);
                                    } else {
                                        x -= random(speed);
                                    }

                                    if (y < timeline[moment - 1].life[i].y) {
                                        y += random(speed);
                                    } else {
                                        y -= random(speed);
                                    }

                                    if (dist(x, y, timeline[moment - 1].life[i].x, timeline[moment - 1].life[i].y) - timeline[moment - 1].life[i].size / 2 <= size / 2) {
                                        ret.push(new Life(
                                            weight(x, timeline[moment - 1].life[i].x, random(["average", "between", "choose"])) + random(-1, 1),
                                            weight(y, timeline[moment - 1].life[i].y, random(["average", "between", "choose"])) + random(-1, 1),
                                            energy * energy_ratio + timeline[moment - 1].life[i].energy * timeline[moment - 1].life[i].energy_ratio,
                                            random(["sexual", "sexual", "sexual", "sexual", "asexual", "solo", "solo", "both", "both"]),
                                            // 0,
                                            weight(speed, timeline[moment - 1].life[i].speed, random(["average", "between", "choose"])) + random(-1, 1),
                                            weight(eyesight, timeline[moment - 1].life[i].eyesight, random(["average", "between", "choose"])) + random(-1, 1),
                                            weight(size, timeline[moment - 1].life[i].size, random(["average", "between", "choose"])) + random(-1, 1),
                                            random(names),
                                            [name, timeline[moment - 1].life[i].name],
                                            weight(r, timeline[moment - 1].life[i].r, random(["average", "between", "choose"])) + randomInt(-1, 1),
                                            weight(g, timeline[moment - 1].life[i].g, random(["average", "between", "choose"])) + randomInt(-1, 1),
                                            weight(b, timeline[moment - 1].life[i].b, random(["average", "between", "choose"])) + randomInt(-1, 1),
                                            weight(reproduce_rate, timeline[moment - 1].life[i].reproduce_rate, random(["average", "between", "choose"])) + random(-0.1, 0.1),
                                            weight(energy_ratio, timeline[moment - 1].life[i].energy_ratio, random(["average", "between", "choose"])) + random(-0.1, 0.1),
											0
                                        ));
                                        energy = energy - energy * energy_ratio;
                                        timeline[moment - 1].life[i].energy = timeline[moment - 1].life[i].energy - timeline[moment - 1].life[i].energy * timeline[moment - 1].life[i].energy_ratio;
                                    }
                                }
                            }
                        }
                    }

                    if ((sexuality == "solo" || sexuality == "both") /*&& random() <= reproduce_rate*/) { // asexual reproduction
                        ret.push(new Life(
                            x,
                            y,
                            energy / 2,
                            random(["sexual", "asexual", "solo", "solo", "solo", "both"]),
                            // 0,
                            speed + random(-1, 1),
                            eyesight + random(-1, 1),
                            size + random(-1, 1),
                            random(names),
                            [name],
                            r + randomInt(-1, 1),
                            g + randomInt(-1, 1),
                            b + randomInt(-1, 1),
                            reproduce_rate + random(-0.1, 0.1),
                            energy_ratio + random(-0.1, 0.1),
							0
                        ));
                        timeline[moment - 1].life.push();
                        energy = energy - energy * energy_ratio;
                    }
                }
            }
            
			if(random() < 100 / age) {
				ret.push(new Life(
					x,
					y,
					energy,
					sexuality,
					// willingness_to_reproduce,
					speed,
					eyesight,
					size,
					name,
					parents,
					r,
					g,
					b,
					reproduce_rate,
					energy_ratio,
					age + 1
				));
			}
            
            return ret;
            /*
            return new Life(
                x,
                y,
                energy,
                sexuality,
                // willingness_to_reproduce,
                speed,
                eyesight,
                size,
                name,
                parents
            );*/
        }
    }

    draw() {
        // if (this.willingness_to_reproduce >= 10) {
        //     fill(255, 0, 0);
        // }
		if(this.name == "nate") {
			image(img_Nate, this.x - scroll.x, this.y - scroll.y, this.size, this.size);
		} else {
			fill(this.r, this.g, this.b);
			ellipse(this.x - scroll.x, this.y - scroll.y, this.size, this.size);
			fill(255);
			// fill(0);
			// fill(255 - this.r, 255 - this.g, 255 - this.b);
			fill(255 - (this.r + this.g + this.b) / 3);
			ellipse(this.x - scroll.x, this.y - scroll.y, map(this.eyesight, 0, 200, 0, this.size), map(this.eyesight, 0, 200, 0, this.size));
		}
    }
}

function weight(in1, in2, type) { // used when combining traits or "recombination"
	if(type == "average") {
		return (in1 + in2) / 2;
	}

	if(type == "between" || type == "random") {
		return random(in1, in2);
	}

	if(type == "choose") {
		return random([in1, in2]);
	}
}