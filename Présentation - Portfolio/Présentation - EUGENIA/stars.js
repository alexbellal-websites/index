let numStars = 150;
let stars = [];
let shootingStars = []; // Array to store shooting stars
let baseDriftSpeed = 0.2; // Reduced base speed of stars drifting left

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent("particle-bg"); // Attach the canvas to a div with the ID "particle-bg"
    noStroke();

    // Initialize stars with random properties
    for (let i = 0; i < numStars; i++) {
        let size = random(1, 3);
        stars.push({
            x: random(width),
            y: random(height),
            size: size,
            speed: map(size, 1, 3, 0.10, 0.20), // Slower parallax effect
            opacity: 0
        });
    }

    // Start fading in stars
    setTimeout(() => {
        for (let s of stars) {
            s.opacity = 255;
        }
    });

    // Schedule the first shooting star
    scheduleShootingStar();
}

function draw() {
    clear(); // Clear the canvas for each frame

    // Draw stars
    for (let s of stars) {
        if (s.opacity < 255) {
            s.opacity += 255 / 60;
        }

        // Move stars leftward with parallax effect
        s.x -= s.speed;
        
        // Wrap stars from left to right
        if (s.x < 0) s.x = width;

        fill(255, 255, 255, s.opacity);
        ellipse(s.x, s.y, s.size, s.size);
    }
    
    // Redraw shooting stars
    for (let i = shootingStars.length - 1; i >= 0; i--) {
        let ss = shootingStars[i];
        fill(255, 255, 255, 200);
        ellipse(ss.x, ss.y, ss.size, ss.size);
        ss.x += cos(ss.angle) * ss.speed;
        ss.y += sin(ss.angle) * ss.speed;
        
        if (ss.x < -50 || ss.y < -50 || ss.y > height + 50) {
            shootingStars.splice(i, 1);
        }
    }
}

// Schedule shooting stars at random intervals
function scheduleShootingStar() {
    setTimeout(() => {
        let startX = random(width, width * 1.2); // Start slightly outside right
        let startY = random(height);
        let endX = random(-50, 0); // End outside left
        let endY = random(height);
        let angle = atan2(endY - startY, endX - startX);

        shootingStars.push({
            x: startX,
            y: startY,
            size: random(2, 5),
            speed: random(5, 10),
            angle: angle
        });

        scheduleShootingStar();
    }, random(12000, 20000));
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
