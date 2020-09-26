const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const scale = 10;
const rows = canvas.height / scale;
const columns = canvas.width / scale;
var speed = 100;

(function setup() {
    snake = new Snake();
    fruit = new Fruit();
    fruit.pickLocation();

    window.setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fruit.draw();
        snake.update();
        snake.draw();

        if (snake.eat(fruit)) {
            fruit.pickLocation();
        }

        snake.checkCollision();
        document.querySelector('.score')
            .innerText = "Eaten fruits: " + snake.total;
        document.querySelector('.dead')
            .innerText = "Total deaths: " + snake.dead + "/3";
        if (snake.dead >= 3) {

            Reset();
            alert("GAME OVER");
        }
    }, speed);
}());

window.addEventListener('keydown', ((evt) => {
    const direction = evt.key.replace('Arrow', '');
    snake.changeDirection(direction);
}));
function Up(){snake.changeDirection('Up');}
function Down(){snake.changeDirection('Down');}
function Left(){snake.changeDirection('Left');}
function Right(){snake.changeDirection('Right');}
/* --Snake-- */
function Snake() {
    this.x = 0;
    this.y = 0;
    this.xSpeed = scale * 1;
    this.ySpeed = 0;
    this.total = 0;
    this.tail = [];
    this.dead = 0;

    this.draw = function () {
        ctx.fillStyle = "#4ed175";
        for (let i = 0; i < this.tail.length; i++) {
            ctx.fillRect(this.tail[i].x,
                this.tail[i].y, scale, scale);
        }

        ctx.fillRect(this.x, this.y, scale, scale);
    }

    this.update = function () {
        for (let i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i + 1];
        }

        this.tail[this.total - 1] =
            { x: this.x, y: this.y };

        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if (this.x > canvas.width) {
            this.x = 0;
        }

        if (this.y > canvas.height) {
            this.y = 0;
        }

        if (this.x < 0) {
            this.x = canvas.width;
        }

        if (this.y < 0) {
            this.y = canvas.height;
        }
    }

    this.changeDirection = function (direction) {
        switch (direction) {
            case 'Up':
                this.xSpeed = 0;
                this.ySpeed = -scale * 1;
                break;
            case 'Down':
                this.xSpeed = 0;
                this.ySpeed = scale * 1;
                break;
            case 'Left':
                this.xSpeed = -scale * 1;
                this.ySpeed = 0;
                break;
            case 'Right':
                this.xSpeed = scale * 1;
                this.ySpeed = 0;
                break;
        }
    }

    this.eat = function (fruit) {
        if (this.x === fruit.x &&
            this.y === fruit.y) {
            this.total++;
            return true;
        }

        return false;
    }

    this.checkCollision = function () {
        for (var i = 0; i < this.tail.length; i++) {
            if (this.x === this.tail[i].x &&
                this.y === this.tail[i].y) {
                this.total = 0;
                this.tail = [];
                this.x = 0;
                this.y = 0;
                this.dead++;
            }
        }
    }
}

/* --Fruits-- */

function Fruit() {
    this.x;
    this.y;

    this.pickLocation = function () {
        this.x = (Math.floor(Math.random() * (rows - 1)) + 10) * 10;
        this.y = (Math.floor(Math.random() * (columns - 1)) + 10) * 10;
        if (this.y > 140 || this.y < -1) {

            this.y = 50;
        }

    }
    this.draw = function () {
        ctx.fillStyle = "#bf4f4f";
        //ctx.fillRect(this.x, this.y, scale, scale);
        ctx.roundRect(this.x, this.y, scale, scale, 20).fill()
;

    }
}

/* --Reset-- */

function Reset() {
    this.total = 0;
    this.x = 0;
    this.y = 0;
    this.dead = 0;
    location.href = "Snake.html";
}

/* --Redondear rectangulo-- */
CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) 
{ if (w < 2 * r) r = w / 2; if (h < 2 * r) r = h / 2; 
    this.beginPath(); 
    this.moveTo(x+r, y); 
    this.arcTo(x+w, y, x+w, y+h, r); 
    this.arcTo(x+w, y+h, x, y+h, r); 
    this.arcTo(x, y+h, x, y, r); 
    this.arcTo(x, y, x+w, y, r); 
    this.closePath(); 
    return this; 
}



