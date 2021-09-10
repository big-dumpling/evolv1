class Food {
    constructor(x, y, amount, maxSize) {
        this.x = x;
        this.y = y;
        this.amount = amount;
		this.maxSize = maxSize;
    }

    update() {
        if (!this.eaten) {
			if(this.amount > this.maxSize) {
				this.amount = this.maxSize;
			}
			
            return new Food(
                this.x,
                this.y,
                this.amount + random(0.1),
				this.maxSize
            );
        }
    }

    draw() {
        fill(0, 255, 0);
        ellipse(this.x - scroll.x, this.y - scroll.y, 5 * this.amount, 5 * this.amount);
    }
}