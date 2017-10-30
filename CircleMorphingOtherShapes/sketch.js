let scale = 800;
let circlePoints = [];
let innerTriangle = [];
let interpolationHelp = [];
let radius = scale * 0.25;

function setup() {
	createCanvas(scale, scale);
	angleMode(DEGREES);
	circlePoints = GenerateCirclePoints(radius);
	innerTriangle = GenerateShapePoints(new Array(0, 120, 240), new Array(radius, radius, radius));
	let diagonal = Math.sqrt(radius * radius + radius * radius);
	interpolationHelp = GenerateShapePoints(new Array(45, 130, 200, 330), new Array(diagonal * 0.5, diagonal * 2, diagonal * 1.5, diagonal));
}

function draw() {
	clear();
	translate(scale * 0.5, scale * 0.5);
	rotate(-90);
	noFill();
	strokeWeight(2);
	let ticks = 100;
	let way;
	let state = Math.floor(frameCount / ticks);
	state = state % 4;
	switch(state)
	{
		case 0:
			way = (frameCount % ticks) / ticks;
			break;
		case 1:
			way = 1;
			break;
		case 2:
			way = Math.abs(((frameCount % ticks) - ticks) / ticks);
			break;
		case 3:
			way = 0;
			break;
	}
	beginShape();
	for(let i = 0; i < circlePoints.length; i++)
	{
		let x = lerp(interpolationHelp[i].x, innerTriangle[i].x, way);
		let y = lerp(interpolationHelp[i].y, innerTriangle[i].y, way);
		vertex(lerp(circlePoints[i].x, x, way), lerp(circlePoints[i].y, y, way));
	}
	endShape(CLOSE);
}