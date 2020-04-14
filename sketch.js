let capture
let tracker
let balls = []
let poem

function preload() {
  poem = loadImage("alone.jpg")
}

function setup() {

    createCanvas(800, 600).parent('p5')

    // start capturing video
    capture = createCapture(VIDEO)
    capture.size(800, 600)
    capture.hide()

    // create the tracker
    tracker = new clm.tracker()
    tracker.init()
    tracker.start(capture.elt)



}

function draw() {

    // draw background stuff
    background(0)


    // show the mirrored video feed
    showFlippedCapture()

    // get new data from tracker
    let features = tracker.getCurrentPosition()

    // sometimes the tracker doesn't capture anything
    // in that case, we want to stop the function right here using 'return'
    if (features.length == 0) {
        return
    }

image(poem, mouseX, mouseY, poem.width, poem.height)

    fill(0,120)
    rect(0,0,400,600)
    fill(255,120)
    rect(400,0,400,600)



    let eye_top_two = features[29]

    let eye_bottom_two = features[31]

    let distances = dist(eye_top_two.x, eye_top_two.y, eye_bottom_two.x, eye_bottom_two.y)

    let nose_tip = features[62]
    let nose_left = features[39]
    let nose_right = features[35]

    let left_nose_distances = dist(nose_tip.x, nose_tip.y, nose_left.x, nose_left.y)
    let right_nose_distances = dist(nose_tip.x, nose_tip.y, nose_right.x, nose_right.y)
    //let nose_pointing = left_nose_distances - right_nose_distances
    // print(nose_pointing)


    if (distances > 10) {

        let eye_center = { x: eye_top_two.x,
                             y: (eye_top_two.y + eye_bottom_two.y) / 2
                         }


        let random_ball = { x: random(eye_center.x - 1, eye_center.x + 1),
                            y: random(eye_center.y - 1, eye_center.y + 1),
                            vx: (1, 1),
                            vy: (-1),
                            c: [255, 255,255, (200, 255)]
                        }
        balls.push(random_ball)

    }




    let eye_top = features[24]

    let eye_bottom = features[26]

    let distance = dist(eye_top.x, eye_top.y, eye_bottom.x, eye_bottom.y)

    let nose_tip_two = features[62]
    let nose_left_two = features[39]
    let nose_right_two = features[35]

    let left_nose_distance = dist(nose_tip.x, nose_tip.y, nose_left.x, nose_left.y)
    let right_nose_distance = dist(nose_tip.x, nose_tip.y, nose_right.x, nose_right.y)
    //let nose_pointing_two = left_nose_distance - right_nose_distance
    // print(nose_pointing)


    if (distance > 10) {

        let eye_center = { x: eye_top.x,
                             y: (eye_top.y + eye_bottom.y) / 2
                         }


        let random_ball = { x: random(eye_center.x - 1, eye_center.x + 1),
                            y: random(eye_center.y - 1, eye_center.y + 1),
                            vx:( 1,  1),
                            vy: (-1, 1),
                            c: [255,255,255, (200, 255)]
                        }
        balls.push(random_ball)

    }




    for (let ball of balls) {

        noStroke()
        fill(255)
        circle(ball.x, ball.y, 10)

        fill(255, 179, 250)
        beginShape();
	       vertex(200,350);
	        bezierVertex(200,250,350,200,350,150);
	         bezierVertex(350,100,250,50,200,140);
	          bezierVertex(150,50,50,100,50,150);
	           bezierVertex(50,200,200,250,200,350);

	endShape();



        ball.x += ball.vx
        ball.y += ball.vy

        ball.vy += 0.8

        if (ball.x < 0 || ball.x > width || ball.y < 0 || ball.y > height) {
            balls.splice(balls.indexOf(ball), 1)
        }

    }

    // make a new array of all the points in the left eye
    noStroke()
    strokeWeight(12)
    fill(0)
    let left_eye = [    features[24],
                        features[63],
                        features[23],
                        features[66],
                        features[26],
                        features[65],
                        features[25],
                        features[64],
                    ]

    // use a loop to make a shape vertex from each of those points
    noStroke()
    strokeWeight(12)
    fill(0)
    beginShape()
    for (let eye_point of left_eye) {
        curveVertex(eye_point.x, eye_point.y)
    }
    endShape(CLOSE)

    let right_eye = [   features[29],
                        features[68],
                        features[30],
                        features[69],
                        features[31],
                        features[70],
                        features[28],
                        features[67],
                    ]

    // use a loop to make a shape vertex from each of those points
    noStroke()
    fill(0, 0, 0)
    beginShape()
    for (let eye_point of right_eye) {
        curveVertex(eye_point.x, eye_point.y)
    }
    endShape(CLOSE)



}

// this function flips the webcam and displays it
function showFlippedCapture() {
    push()
    translate(capture.width, 0)
    scale(-1, 1)
    image(capture, 0, 0, capture.width, capture.height)
    pop()
}
