var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var x = canvas.width/2;
var y = canvas.height -30;
var dx =2;
var dy = -2;
var ballRadius = 10;
var paddleHeight = 10
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2; // we only need to move the paddle left and right
var rightPressed = false;
var leftPressed = false	;

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetleft = 30;


var score = 0; 

//creating a 2-dimensional array of size 3*5 for bricks
var bricks = [];
for (i =0 ; i < brickColumnCount; i++) {
	bricks[i] = [];
	for (k = 0; k < brickRowCount; k++) {
		bricks[i][k] = {x: 0, y:0, status: 1}
	}

}

document.addEventListener("keyup", keyUpHandler);
document.addEventListener("keydown", keyDownHandler);

function keyDownHandler(e){

if (e.keyCode == 39) {
	rightPressed = true;
}
else if (e.keyCode == 37){
	leftPressed = true;
}

}

function keyUpHandler(e){

if (e.keyCode == 39) {
	rightPressed = false;
}
else if (e.keyCode == 37){
	leftPressed = false;
}

}

function drawScore(){
	ctx.font = "14px Arial";
	ctx.fillStyle = "0095DD";
	ctx.fillText("Score: " +score, 8, 20)
}

function collisionDetection(){

	for ( i = 0; i < brickColumnCount; i++) {
		for (k = 0; k < brickRowCount; k++) {
			var b = bricks[i][k];
			if(b.status == 1){
				if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {

				dy = -dy;
				b.status = 0;
				score++;

					if(score == brickRowCount * brickColumnCount ){
						alert("Congratulation!!! YOU WIN");
						document.location.reload();						
					}
				}
			}
		}
	}
}


function drawBricks(){
	for (i = 0; i<brickColumnCount; i++){
		for (k = 0; k < brickRowCount; k++) {
			if(bricks[i][k].status == 1){
				var brickX = (i * (brickWidth + brickPadding)) + brickOffsetleft;
				var brickY = (k * (brickHeight + brickPadding)) + brickOffsetTop;
				bricks[i][k].x = brickX;
			    bricks[i][k].y = brickY;

			    ctx.beginPath();
			    ctx.rect(brickX, brickY, brickWidth, brickHeight);
			    ctx.fillStyle = "#0095DD";
			    ctx.fill();
			    ctx.closePath();
			}			
		}
	}
}

function drawBall(){
	// drawing code
	ctx.beginPath();
	ctx.arc	(x,y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function drawPaddle(){
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}


function draw(){

	//without the clearRect() the ball leaves a trail
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBall();
	drawPaddle();
	drawBricks();
	collisionDetection();
	drawScore();
	if( y + dy < ballRadius){
		// if the value of y cordinate is greater than the size of the canvas or the smaller than 0 then reverse the movement of the ball
				dy = -dy;
	}

	else if (y + dy > canvas.height-ballRadius ){

		if(x > paddleX && x < paddleX + paddleWidth){
			dy = -dy;

		}
		else{
			alert ("GAME OVER")
		document.location .reload();

		}
		
	}

	if(x + dx > canvas.width-ballRadius || x + dx < ballRadius){
		// if the value of x cordinate is greater than the size of the canvas or the smaller than 0 then reverse the movement of the ball
				dx = -dx;
	}


if (rightPressed && paddleX < canvas.width-paddleWidth) {
		paddleX += 7;
	}

	else if(leftPressed && paddleX > 0){
		paddleX -= 7;
	}

	x += dx;
	y += dy;

	
}

	setInterval(draw, 10);
