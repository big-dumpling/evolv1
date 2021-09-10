class Life {
    constructor(
		x,
		y,
		energy,
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
		age,
		death_age,
		pickiness,
		energy_reproduce_threshold,
		sexuality_spectrum // 0.5+ is sexual reproduction, <0.5 is asexual reproduction
	) {
        this.x = x;
        this.y = y;
        this.energy = energy;
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
		this.death_age = death_age;
		this.pickiness = pickiness;
		this.energy_reproduce_threshold = energy_reproduce_threshold;
		this.sexuality_spectrum = sexuality_spectrum;
    }

    update() {
		this.speed = abs(this.speed);
        this.x = constrain(this.x, 0, worldSize.x);
        this.y = constrain(this.y, 0, worldSize.y);
        this.r = constrain(this.r, 0, 255);
        this.g = constrain(this.g, 0, 255);
        this.b = constrain(this.b, 0, 255);
        this.reproduce_rate = constrain(this.reproduce_rate, 0, 1);
        this.energy_ratio = constrain(this.energy_ratio, 0, 1);
		this.energy_reproduce_threshold = abs(this.energy_reproduce_threshold);
		this.sexuality_spectrum = constrain(this.sexuality_spectrum, 0, 1);
		
		// JUST A SPACER BETWEEN PROPERTIES AND TEMP VARIABLES
            
        let x = this.x;
        let y = this.y;
        let energy = this.energy;
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
		let death_age = this.death_age;
		let pickiness = this.pickiness;
		let energy_reproduce_threshold = this.energy_reproduce_threshold;
		let sexuality_spectrum = this.sexuality_spectrum;

        let ret = [];
		let moveX = random(-speed - size, speed + size);
		let moveY = random(-speed - size, speed + size);
		let oldX = x;
		let oldY = y;
        x += moveX;
        y += moveY;
        energy -= sqrt(sqrt(speed * sqrt(pow(moveX, 2) + pow(moveY, 2))) + sqrt(size) + sqrt(eyesight));

        if (energy > 0) {
            for (let i in timeline[moment - 1].newFrame.food) {
                if (!timeline[moment - 1].newFrame.food[i].eaten) {
                    if (dist(x, y, timeline[moment - 1].newFrame.food[i].x, timeline[moment - 1].newFrame.food[i].y) <= eyesight) {
						if(pickiness <= timeline[moment - 1].newFrame.food[i].amount) {
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
						}

                        if (dist(x, y, timeline[moment - 1].newFrame.food[i].x, timeline[moment - 1].newFrame.food[i].y) - timeline[moment - 1].newFrame.food[i].amount * 2.5 <= size / 2) {
                            energy += timeline[moment - 1].newFrame.food[i].amount * 5;
                            timeline[moment - 1].newFrame.food[i].eaten = true;
                        }
                    }
                }
            }
			
            if (timeline.length == moment) {
                if (energy >= energy_reproduce_threshold && random() <= reproduce_rate) {
					if(sexuality_spectrum < 0.5) { // asexual reproduction
						ret.push(new Life(
                            x,
                            y,
                            energy / 2,
                            speed + random(-1, 1),
                            eyesight + random(-1, 1),
                            size + random(-1, 1),
                            random(names),
                            [name],
                            r + random(-1, 1),
                            g + random(-1, 1),
                            b + random(-1, 1),
                            reproduce_rate + random(-0.1, 0.1),
                            energy_ratio + random(-0.1, 0.1),
							0,
							death_age + random(-1, 1),
							pickiness + random(-1, 1),
							energy_reproduce_threshold + random(-1, 1),
							sexuality_spectrum + random(-0.05, 0.05)
                        ));
                        timeline[moment - 1].life.push();
                        energy = energy - energy * energy_ratio;
					} else { // sexual reproduction
						for(let i in timeline[moment - 1].life) {
							if (timeline[moment - 1].life.sexualty_spectrum >= 0.5 && timeline[moment - 1].life.energy_reproduce_threshold < timeline[moment - 1].life.energy && timeline[moment - 1].life != this && dist(x, y, timeline[moment - 1].life[i].x, timeline[moment - 1].life[i].y) <= eyesight) {
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
										weight(speed, timeline[moment - 1].life[i].speed, random(["average", "between", "choose"])) + random(-1, 1),
										weight(eyesight, timeline[moment - 1].life[i].eyesight, random(["average", "between", "choose"])) + random(-1, 1),
										weight(size, timeline[moment - 1].life[i].size, random(["average", "between", "choose"])) + random(-1, 1),
										random(names),
										[name, timeline[moment - 1].life[i].name],
										weight(r, timeline[moment - 1].life[i].r, random(["average", "between", "choose"])) + random(-1, 1),
										weight(g, timeline[moment - 1].life[i].g, random(["average", "between", "choose"])) + random(-1, 1),
										weight(b, timeline[moment - 1].life[i].b, random(["average", "between", "choose"])) + random(-1, 1),
										weight(reproduce_rate, timeline[moment - 1].life[i].reproduce_rate, random(["average", "between", "choose"])) + random(-0.1, 0.1),
										weight(energy_ratio, timeline[moment - 1].life[i].energy_ratio, random(["average", "between", "choose"])) + random(-0.1, 0.1),
										0,
										weight(death_age, timeline[moment - 1].life[i].death_age, random(["average", "between", "choose"])) + random(-1, 1),
										weight(pickiness, timeline[moment - 1].life[i].pickiness, random(["average", "between", "choose"])) + random(-1, 1),
										weight(energy_reproduce_threshold, timeline[moment - 1].life[i].energy_reproduce_threshold, random(["average", "between", "choose"])) + random(-1, 1),
										weight(sexuality_spectrum, timeline[moment - 1].life[i].sexuality_spectrum, random(["average", "between", "choose"])) + random(-1, 1)
									));
									energy = energy - energy * energy_ratio;
									timeline[moment - 1].life[i].energy = timeline[moment - 1].life[i].energy - timeline[moment - 1].life[i].energy * timeline[moment - 1].life[i].energy_ratio;
								}
							}
						}
					}
				}
            }
            
			if(random() < death_age / age) { // survives to see the next frame
				ret.push(new Life(
					x,
					y,
					energy,
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
					age + 1,
					death_age,
					pickiness,
					energy_reproduce_threshold,
					sexuality_spectrum
				));
			}
        } else {
			TEMP_dead_to_food.push(new Food(oldX, oldY, (energy + 1) / 5, (energy + 1) / 5));
		}
		return ret;
    }

    draw() {
		switch(this.name) {
			case "nate":
				image(img_Nate, this.x - scroll.x, this.y - scroll.y, this.size, this.size);
				break;
			case "rebace":
				image(img_Rebace, this.x - scroll.x, this.y - scroll.y, this.size, this.size);
				break;
			case "buggy":
				image(img_Buggy, this.x - scroll.x, this.y - scroll.y, this.size, this.size);
				break;
			case "big dumpling":
				image(img_Coowee, this.x - scroll.x, this.y - scroll.y, this.size, this.size);
				break;
			case "miranda":
				image(img_Miranda, this.x - scroll.x, this.y - scroll.y, this.size, this.size);
				break;
			default:
				fill(this.r, this.g, this.b);
				ellipse(this.x - scroll.x, this.y - scroll.y, this.size, this.size);
				fill(255);
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