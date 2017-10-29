let scale = 800;
let circlePoints = [];
let innerTriangle = [];
let outerTriangle = [];
let innerTriangleEdges = [];

function setup() {
	createCanvas(scale, scale);
	angleMode(DEGREES);
	for(let i = 0; i < 360; i++)
	{
		circlePoints.push(createVector(Math.cos(radians(i)) * scale * 0.25, Math.sin(radians(i)) * scale * 0.25));
	}
	for(let i = 0; i < 3; i++)
	{
		innerTriangleEdges.push(createVector(Math.cos(radians(i * 120)) * scale * 0.25, Math.sin(radians(i * 120)) * scale * 0.25));
	}
	for(let i = 0; i < 360; i++)
	{
		let edgeIndex = Math.floor(i / 120);
		let way = (i % 120) / 120;
		let edge1 = innerTriangleEdges[edgeIndex];
		let edge2 = innerTriangleEdges[(edgeIndex + 1) % 3];
		innerTriangle.push(createVector(edge1.x + way * (edge2.x - edge1.x), edge1.y + way * (edge2.y - edge1.y)));
		outerTriangle.push(p5.Vector.mult(innerTriangle[i], 2));
	}
}

function draw() {
	clear();
	translate(scale * 0.5, scale * 0.5);
	rotate(-90);
	noFill();
	strokeWeight(2);
	beginShape();
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
	for(let i = 0; i < circlePoints.length; i++)
	{
		vertex(lerp(circlePoints[i].x, lerp(outerTriangle[i].x, innerTriangle[i].x, way), way), lerp(circlePoints[i].y, lerp(outerTriangle[i].y, innerTriangle[i].y, way), way));
	}
	endShape(CLOSE);
}