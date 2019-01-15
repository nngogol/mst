let bg_color = [255,100,40]
let fontSize_ = 10
let [vertexes, edges] = [[], []];

class Node{
	constructor(myname, x,y){
		this.x = x
		this.y = y
		this.myname = myname
	}
	getX(){
		return this.x
	}
	getY(){
		return this.y
	}
	render(){
		push()
			// rect
			rectMode(CENTER)
			noStroke()
			fill(bg_color);
			rect(this.x, this.y-20, textWidth(this.myname), fontSize_)

			// text
			textAlign(CENTER)
			noStroke(); strokeWeight(1); fill(0);
			text(this.myname,this.x, this.y-15)
			
			// circle
			stroke(255); strokeWeight(2); fill(255);
			ellipse(this.x, this.y, 16, 16)
		pop()
	}
	distance_between(v){
		return dist(this.x, this.y, v.x, v.y)
	}
}

function setup() {
	createCanvas(640, 360);
	textSize(fontSize_)
	stroke(255); strokeWeight(2); fill(255);
	
	// add circle vertexes
	// for (let i = 0; i < 20; i++) vertexes.push(p5.Vector.random2D().mult(100))
	
	// add random vertexes
	// for (let i = 0; i < 20; i++) vertexes.push(createVector(random(width), random(height)))

}

function mkMST() {
	let result = []
	let reached = vertexes.slice(0,1)
	let unreached = vertexes.slice();

	while (unreached.length != 0) {
		var record = 10000;
		var rIndex, uIndex;

		reached.forEach((reached_v, reached_index, _1) => {
			unreached.forEach((unreached_v, unreached_index, _1) => {
				let d = reached_v.distance_between(unreached_v)
				if (d < record) {
				// closes found!
					record = d;
					rIndex = reached_index;
					uIndex = unreached_index;
				}
			})
		})

		// adding enge
		result.push([createVector(reached[rIndex].getX(), reached[rIndex].getY()), createVector(unreached[uIndex].getX(), unreached[uIndex].getY())]);

		// next state
		reached.push(unreached[uIndex]);
		unreached.splice(uIndex, 1);
	}

	return result

}

// function mouseDragged() {
// function keyPressed(){
// 	if (key == 'A') edges = mkMST(vertexes);
// }

function mousePressed() {
	vertexes.push(new Node(`(${mouseX}, ${mouseY})`, mouseX, mouseY));
	edges = mkMST(vertexes);
}


function draw() {
	background(bg_color);

	if (edges) edges.forEach(e => line(e[0].x, e[0].y, e[1].x, e[1].y))
	if (vertexes) vertexes.forEach(v => v.render())

}