/* VARIABLES */
let player, walls;
let gameWon = false;

/* SETUP RUNS ONCE */
function setup() {
    createCanvas(600, 600);

    // Create player
     player = {
        x: 340,
        y: 20,
        w: 40,
        h: 40,
        speed: 4
      
    };
    // Create maze walls
      walls = [];

    walls.push({ x: 10, y: 200, w: 5, h: 385 }); // Left Wall

    walls.push({ x: 160, y: 10, w: 300, h: 5 }); // Top Line
    walls.push({ x: 150, y: 60, w: 5, h: 100 }); // Top Middle Line
    walls.push({ x: 190, y: 197, w: 185, h: 5 }); // Middle Line

    walls.push({ x: 285, y: 198, w: 5, h: 109 }); // Right Wall 02 
    walls.push({ x: 395, y: 200, w: 5, h: 380 }); // Right Wall

    walls.push({ x: 185, y: 332, w: 5, h: 109 }); // Bottom Middle Line
    walls.push({ x: 340, y: 146, w: 110, h: 5 }); // Bottom Line 04
    walls.push({ x: 340, y: 250, w: 110, h: 5 }); // Bottom Line 03
    walls.push({ x: 50, y: 300, w: 75, h: 5 }); // Bottom Line 02
    walls.push({ x: 247, y: 390, w: 300, h: 5 }); // Bottom Line Main
}

/* DRAW LOOP REPEATS */
function draw( ) {
     background(197, 155, 155);

    if (!gameWon) {
        // =================================
        // PART 1: PLAYER MOVEMENT
        // =================================

        let leftPressed = keyIsDown(LEFT_ARROW);
        let rightPressed = keyIsDown(RIGHT_ARROW);
        let upPressed = keyIsDown(UP_ARROW);
        let downPressed = keyIsDown(DOWN_ARROW);

        let previousX = player.x;
        if (leftPressed) {
            player.x -= player.speed;
        }
        if (rightPressed) {
            player.x += player.speed;
        }
        if (touchingWall()) {
            player.x = previousX;
        }

        let previousY = player.y;
        if (upPressed) {
            player.y -= player.speed;
        }
        if (downPressed) {
            player.y += player.speed;
        }
        if (touchingWall()) {
            player.y = previousY;
        }

        // =================================
        // PART 3: CANVAS BOUNDARIES
        // =================================

        let halfWidth = player.w / 2;
        let halfHeight = player.h / 2;

        if (player.x - halfWidth < 0) {
            player.x = halfWidth;
        }
        if (player.x + halfWidth > width) {
            player.x = width - halfWidth;
        }
        if (player.y - halfHeight < 0) {
            player.y = halfHeight;
        }
        if (player.y + halfHeight > height) {
            player.y = height - halfHeight;
        }

        // =================================
        // PART 4: WIN CONDITION
        // =================================
        if (player.x < 45 && player.y > 350) {
            gameWon = true;
        }
    }

    // =================================
    // DRAW MAZE
    // =================================

    fill(0);
    noStroke();
    rectMode(CENTER);

    for (let wall of walls) {
        rect(wall.x, wall.y, wall.w, wall.h);
    }

    // Draw player
    fill(100, 150, 255);
    rect(player.x, player.y, player.w, player.h);

    // Draw Start and End
    fill(0);
    textSize(20);
    textAlign(LEFT);
    text("Start", 330, 20);
    text("End", 35, 380);

    // =================================
    // PART 5: WIN MESSAGE
    // =================================
    if (gameWon) {
        fill(0);
        textSize(40);
        textAlign(CENTER, CENTER);
        textStyle(BOLD);
        text("You Win, Good Job!!", width / 2, height / 2);
    }

} // END DRAW


/* WALL COLLISION DETECTION */
function touchingWall() {
    for (let wall of walls) {
        if (
            player.x + player.w / 2 > wall.x - wall.w / 2 &&
            player.x - player.w / 2 < wall.x + wall.w / 2 &&
            player.y + player.h / 2 > wall.y - wall.h / 2 &&
            player.y - player.h / 2 < wall.y + wall.h / 2
        ) {
            return true;
        }
    }
    return false;
}
