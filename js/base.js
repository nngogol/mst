let [vertexes, edges] = [[], []];

function setup() {
	createCanvas(640, 360);
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
				let d = dist(reached_v.x, reached_v.y, unreached_v.x, unreached_v.y);
				if (d < record) { // closes found!
					record = d;
					rIndex = reached_index;
					uIndex = unreached_index;
				}
			})
		})

		// adding enge
		result.push([createVector(reached[rIndex].x, reached[rIndex].y), createVector(unreached[uIndex].x, unreached[uIndex].y)]);

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
	vertexes.push(createVector(mouseX, mouseY));
	edges = mkMST(vertexes);
}


function draw() {
	background(51);

	if (vertexes) vertexes.forEach(v => ellipse(v.x, v.y, 16, 16))
	if (edges) edges.forEach(e => line(e[0].x, e[0].y, e[1].x, e[1].y))

}