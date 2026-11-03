let nycMap;
let queensMap;
let brooklynMap;
let manhattanMap;
let bronxMap;
let statenIslandMap;
let selectedBorough = "";
let challengeFailed = false;
let challengeCompleted = false;
let queensCompleted = false;
let brooklynCompleted = false;
let manhattanCompleted = false;
let bronxCompleted = false;
let statenIslandCompleted = false;
let popupAlpha = 0;
let buttonHover = false;
function preload() {
  nycMap = loadImage("nyc-choropleth.png");
  queensMap = loadImage("queens-astoria.png");
  brooklynMap = loadImage("brooklyn.png");
  bronxMap = loadImage("bronx.png");
  manhattanMap = loadImage("manhattan.png");
  statenIslandMap = loadImage("staten-island.png");
}
let gameScreen = "characterSelection";
let selectedCharacter = "";
let playerX = 100;
let playerY = 120;
let playerSpeed = 3;
let playerSize = 28;
let streetWidth = 35;

function setup() {
  createCanvas(1000, 700);
  textFont("Trebuchet MS");
}

function draw() {
  if (gameScreen === "characterSelection") {
    drawCharacterSelection();
  } 
  else if (gameScreen === "nycMap") {
    drawNYCMap();
  }
  else if (gameScreen === "streetChallenge") {
    drawStreetChallenge();
  }
  else if (gameScreen === "gameOver") {
  drawGameOverScreen();
}
}

function drawCharacterSelection() {

  // Background
  background(239, 232, 213);

  // Decorative background circles
  noStroke();
  fill(224, 211, 185);
  circle(80, 100, 180);
  circle(930, 600, 220);

  // Check whether mouse is hovering over characters
  jackHover = mouseX > 260 && mouseX < 440 &&
              mouseY > 270 && mouseY < 515;

  jillHover = mouseX > 560 && mouseX < 740 &&
              mouseY > 270 && mouseY < 515;

  // Check whether Start Journey can be clicked
  startHover = mouseX > 375 && mouseX < 625 &&
               mouseY > 605 && mouseY < 660 &&
               selectedCharacter !== "";

  // Header
  fill(38, 53, 65);
  textAlign(CENTER);

  textSize(15);
  textStyle(BOLD);
  fill(191, 111, 68);
  text("A NEW YORK CITY ADVENTURE", 500, 85);

  fill(38, 53, 65);
  textSize(48);
  text("WATCH YOUR STEP!", 500, 145);

  textStyle(NORMAL);
  textSize(18);
  fill(95, 100, 96);
  text("Explore NYC. Find your way. Avoid the hazards.", 500, 185);

  // Character cards
  push();

  if (jackHover || selectedCharacter === "Jack") {
    translate(350, 390);
    scale(1.04);
    translate(-350, -390);
  }

  drawCharacterCard(260, "JACK", color(111, 158, 174));

  pop();

  push();

  if (jillHover || selectedCharacter === "Jill") {
    translate(650, 390);
    scale(1.04);
    translate(-650, -390);
  }

  drawCharacterCard(560, "JILL", color(192, 132, 119));

  pop();

  // Instructions
  fill(65, 75, 78);
  textSize(16);
  text("CHOOSE YOUR CHARACTER TO BEGIN", 500, 570);

  // Start button
  if (selectedCharacter !== "") {

    if (startHover) {
      fill(65, 110, 110);
    } else {
      fill(43, 75, 77);
    }

  } else {
    fill(130, 130, 120);
  }

  rect(
    375 - (startHover ? 4 : 0),
    605 - (startHover ? 3 : 0),
    250 + (startHover ? 8 : 0),
    55 + (startHover ? 6 : 0),
    14
  );

  fill(255);
  textSize(18);
  textStyle(BOLD);
  text("START JOURNEY  →", 500, 640);

  textStyle(NORMAL);
  if (jackHover || jillHover || startHover) {
  cursor(HAND);
} else {
  cursor(ARROW);
}
}

function drawCharacterCard(x, label, cardColor) {

  // Check whether this card is being hovered over
  let hovering =
    mouseX > x && mouseX < x + 180 &&
    mouseY > 270 && mouseY < 515;

  // Check whether this character is selected
  let selected = selectedCharacter ===
                 (label === "JACK" ? "Jack" : "Jill");

  // Card shadow
  noStroke();

  if (hovering || selected) {
    fill(160, 150, 130);
  } else {
    fill(190, 180, 160);
  }

  rect(x + 5, 270 + 6, 180, 245, 20);

  // Highlight outline
  if (hovering || selected) {
    stroke(cardColor);
    strokeWeight(5);
  } else {
    noStroke();
  }

  // Card
  fill(255, 251, 241);
  rect(x, 270, 180, 245, 20);

  // Character background
  noStroke();
  fill(cardColor);
  circle(x + 90, 365, 125);

  // BODY
  fill(label === "JACK" ? color(65, 115, 145) : color(190, 105, 125));
  rect(x + 52, 390, 76, 65, 22);

  // Neck
  fill(245, 205, 163);
  rect(x + 80, 375, 20, 25, 5);

  // Face
  fill(245, 205, 163);
  ellipse(x + 90, 350, 62, 72);

  // Ears
  ellipse(x + 59, 352, 12, 19);
  ellipse(x + 121, 352, 12, 19);

  // HAIR
  fill(65, 42, 32);

  if (label === "JACK") {
    // Jack's messy short hair
    arc(x + 90, 341, 67, 65, PI, TWO_PI);
    triangle(x + 62, 340, x + 70, 322, x + 80, 340);
    triangle(x + 82, 329, x + 95, 316, x + 103, 340);
    triangle(x + 103, 340, x + 117, 322, x + 120, 343);
  } else {
    // Jill's hair and ponytail
    ellipse(x + 121, 327, 27, 30);
    arc(x + 90, 341, 70, 68, PI, TWO_PI);
    ellipse(x + 90, 330, 72, 30);
  }

  // Eyebrows
  stroke(65, 42, 32);
  strokeWeight(2);
  line(x + 72, 342, x + 83, 340);
  line(x + 97, 340, x + 108, 342);

  // Eyes
  noStroke();
  fill(45, 45, 45);
  ellipse(x + 78, 352, 6, 9);
  ellipse(x + 102, 352, 6, 9);

  // Eye highlights
  fill(255);
  circle(x + 79, 350, 2);
  circle(x + 103, 350, 2);

  // Nose
  fill(220, 155, 120);
  circle(x + 90, 362, 4);

  // Smile
  noFill();
  stroke(130, 65, 55);
  strokeWeight(2);
  arc(x + 90, 366, 20, 13, 0, PI);

  // Jacket collar
  noStroke();
  fill(255, 240, 220);
  triangle(x + 78, 390, x + 90, 405, x + 89, 390);
  triangle(x + 102, 390, x + 90, 405, x + 91, 390);

  // Character label
  fill(43, 57, 62);
  textAlign(CENTER);
  textStyle(BOLD);
  textSize(19);
  text(label, x + 90, 480);

  textStyle(NORMAL);
  fill(120);
  textSize(12);
  text("SELECT CHARACTER", x + 90, 500);
}

function mousePressed() {
// GAME OVER SCREEN
if (gameScreen === "gameOver") {

  // PLAY AGAIN BUTTON
  if (
    mouseX > 350 && mouseX < 650 &&
    mouseY > 365 && mouseY < 425
  ) {

    // Reset borough progress
    queensCompleted = false;
    brooklynCompleted = false;
    bronxCompleted = false;
    manhattanCompleted = false;
    statenIslandCompleted = false;

    // Reset challenge status
    challengeFailed = false;
    challengeCompleted = false;
    popupAlpha = 0;

    // Reset character selection
    selectedCharacter = "";
    selectedBorough = "";

    // Return to starting screen
    gameScreen = "characterSelection";
  }

  return;
}
  
  // FAILURE SCREEN - RETRY BUTTON
  if (gameScreen === "streetChallenge" && challengeFailed) {

    if (
      mouseX > 390 && mouseX < 610 &&
      mouseY > 415 && mouseY < 470
    ) {
      if (selectedBorough === "Queens") {
        playerX = 495;
        playerY = 205;
      }
      else if (selectedBorough === "Brooklyn") {
        playerX = 760;
        playerY = 160;
      }
      else if (selectedBorough === "Bronx") {
        playerX = 210;
        playerY = 635;
      }
      else if (selectedBorough === "Manhattan") {
        playerX = 780;
        playerY = 440;
      }
      else if (selectedBorough === "Staten Island") {
        playerX = 210;
        playerY = 370;
      }
      challengeFailed = false;
    }

    return;
  }

 // COMPLETION SCREEN - BACK TO NYC MAP
if (gameScreen === "streetChallenge" && challengeCompleted) {

  if (
    mouseX > 390 && mouseX < 610 &&
    mouseY > 415 && mouseY < 470
  ) {

    if (selectedBorough === "Queens") {
      queensCompleted = true;
    }

    else if (selectedBorough === "Brooklyn") {
      brooklynCompleted = true;
    }
    else if (selectedBorough === "Bronx") {
      bronxCompleted = true;
    }
    else if (selectedBorough === "Manhattan") {
      manhattanCompleted = true;
    }
    else if (selectedBorough === "Staten Island") {
      statenIslandCompleted = true;
    }
 
    gameScreen = "nycMap";
  }

  return;
}

  // CHARACTER SELECTION SCREEN
  if (gameScreen === "characterSelection") {

    if (mouseY > 270 && mouseY < 515) {

      if (mouseX > 260 && mouseX < 440) {
        selectedCharacter = "Jack";
      }

      else if (mouseX > 560 && mouseX < 740) {
        selectedCharacter = "Jill";
      }
    }

    // START JOURNEY BUTTON
    if (
      mouseX > 375 && mouseX < 625 &&
      mouseY > 605 && mouseY < 660 &&
      selectedCharacter !== ""
    ) {
      gameScreen = "nycMap";
    }
  }

  // NYC MAP SCREEN
  else if (gameScreen === "nycMap") {

    // ONLY QUEENS IS AVAILABLE
    if (dist(mouseX, mouseY, 575, 260) < 18 &&
       !queensCompleted
       ) {

      selectedBorough = "Queens";

      playerX = 495;
      playerY = 205;

      challengeFailed = false;
      challengeCompleted = false;

      gameScreen = "streetChallenge";

      console.log("Entering Queens!");
    }
    else if (dist(mouseX, mouseY, 475, 370) < 18 &&
       !brooklynCompleted
             ) {
      selectedBorough = "Brooklyn";

      playerX = 760;
      playerY = 160;

      challengeFailed = false;
      challengeCompleted = false;
      gameScreen = "streetChallenge";
      console.log("Entering Brooklyn!");
             }
      else if (dist(mouseX, mouseY, 660, 130) < 18 && !bronxCompleted) {
    selectedBorough = "Bronx";
        playerX = 210;
        playerY = 635;
        challengeFailed = false;
        challengeCompleted = false;
        gameScreen = "streetChallenge";
        console.log("Entering The Bronx!")
      }
        else if (dist(mouseX, mouseY, 500, 210) < 18 && !manhattanCompleted) {
          selectedBorough = "Manhattan";
          playerX = 780;
          playerY = 440;
          challengeFailed = false;
          challengeCompleted = false;
          gameScreen = "streetChallenge";
          console.log("Entering Manhattan!")
        }
    else if (dist(mouseX, mouseY, 290, 485) < 18 &&
    !statenIslandCompleted) {
      selectedBorough = "Staten Island";
      playerX = 210;
      playerY = 370;
      challengeFailed = false;
      challengeCompleted = false;
      gameScreen = "streetChallenge";
      console.log("Entering Staten Island!");
    }
  }
}
function drawNYCMap() {
  cursor(ARROW);
  background(245, 239, 220);

  // Display your choropleth map
  image(nycMap, 0, 0, width, height);

  // Borough markers
  drawBoroughMarker(500, 210, "Manhattan");
  drawBoroughMarker(660, 130, "Bronx");
  drawBoroughMarker(575, 260, "Queens");
  drawBoroughMarker(475, 370, "Brooklyn");
  drawBoroughMarker(290, 485, "Staten Island");

  fill(30);
  textAlign(RIGHT);
  textSize(24);
  text("CHOOSE A LOCATION", width / 2, 40);
  if (allBoroughsCompleted()) {
  gameScreen = "gameOver";
}
  
}

function drawBoroughMarker(x, y, borough) {

  // Check which boroughs are currently available
  let available =
    borough === "Queens" || borough === "Brooklyn" || borough === "Bronx" || borough === "Manhattan" || borough === "Staten Island";

  // Check whether the borough is completed
  let completed = false;

  if (borough === "Queens") {
    completed = queensCompleted;
  }

  else if (borough === "Brooklyn") {
    completed = brooklynCompleted;
  }

  else if (borough === "Bronx") {
    completed = bronxCompleted;
  }
  else if (borough === "Manhattan") {
    completed = manhattanCompleted;
  }
  else if (borough === "Staten Island") {
    completed = statenIslandCompleted;
  }

  // Check whether mouse is hovering over the marker
  let hovering = available &&
                 dist(mouseX, mouseY, x, y) < 22;

  // Animate available boroughs with a gentle pulse
  let pulse = 0;

  if (available) {
    pulse = sin(frameCount * 0.08) * 3;
  }

  // Make the marker grow when hovered
  let markerSize = 35 + pulse;

  if (hovering) {
    markerSize += 7;
    cursor(HAND);
  }

  // Marker colors
  if (completed) {
    fill(40, 180, 90);
  }

  else if (hovering) {
    fill(255, 225, 100);
  }

  else {
    fill(255, 210, 60);
  }

  // Draw marker outline
  stroke(80);
  strokeWeight(2);

  if (hovering) {
    strokeWeight(4);
  }

  circle(x, y, markerSize);

  // Borough name
  noStroke();
  fill(0);
  textSize(15);
  textAlign(CENTER);
  text(borough, x, y + 30);
}

function drawStreetChallenge() {
  if (selectedBorough === "Queens") {
    image(queensMap, 0, 0, width, height);
  }
  else if (selectedBorough === "Brooklyn") {
    image(brooklynMap, 0, 0, width, height)
  }
  else if (selectedBorough === "Bronx") {
    image(bronxMap, 0, 0, width, height)
  }
  else if (selectedBorough === "Manhattan") {
    image(manhattanMap, 0, 0, width, height)
  }
  else if (selectedBorough === "Staten Island") {
    image(statenIslandMap, 0, 0, width, height)
  }
  drawStartAndDestination();

  // Update and display the player
  updatePlayer();
  drawPlayer();
  if (challengeFailed) {
  drawFailureScreen();
}
  if (challengeCompleted) {
  drawCompletionScreen();
}
}

function drawPlayer() {

  push();

  // Character body and outfit color
  let outfitColor;

  if (selectedCharacter === "Jack") {
    outfitColor = color(65, 115, 145);
  } else {
    outfitColor = color(190, 105, 125);
  }

  // Legs
  stroke(55, 50, 45);
  strokeWeight(4);
  line(playerX - 6, playerY + 17, playerX - 8, playerY + 25);
  line(playerX + 6, playerY + 17, playerX + 8, playerY + 25);

  // Shoes
  noStroke();
  fill(55, 55, 60);
  ellipse(playerX - 9, playerY + 26, 10, 6);
  ellipse(playerX + 9, playerY + 26, 10, 6);

  // Arms
  stroke(245, 205, 163);
  strokeWeight(5);
  line(playerX - 10, playerY - 5, playerX - 16, playerY + 8);
  line(playerX + 10, playerY - 5, playerX + 16, playerY + 8);

  // Body
  noStroke();
  fill(outfitColor);
  rect(playerX - 11, playerY - 9, 22, 27, 7);

  // Neck
  fill(245, 205, 163);
  rect(playerX - 4, playerY - 17, 8, 9);

  // Face
  fill(245, 205, 163);
  ellipse(playerX, playerY - 23, 27, 30);

  // Hair
  fill(65, 42, 32);

  if (selectedCharacter === "Jack") {
    // Jack's messy hair
    arc(playerX, playerY - 29, 30, 24, PI, TWO_PI);
    triangle(playerX - 13, playerY - 29,
             playerX - 7, playerY - 39,
             playerX, playerY - 29);
    triangle(playerX - 3, playerY - 30,
             playerX + 5, playerY - 41,
             playerX + 12, playerY - 29);
  } else {
    // Jill's ponytail and hair
    ellipse(playerX + 15, playerY - 35, 10, 13);
    arc(playerX, playerY - 29, 31, 25, PI, TWO_PI);
  }

  // Eyes
  noStroke();
  fill(45);
  circle(playerX - 5, playerY - 23, 3);
  circle(playerX + 5, playerY - 23, 3);

  // Smile
  noFill();
  stroke(130, 65, 55);
  strokeWeight(1.5);
  arc(playerX, playerY - 18, 9, 6, 0, PI);

  pop();
}

function drawStartAndDestination() {
  if (selectedBorough === "Queens") {
  // BLUE START CIRCLE - SUBWAY STATION
  fill(40, 130, 230);
  stroke(255);
  strokeWeight(3);
  circle(495, 205, 35);

  noStroke();
fill(0, 45, 110);
textSize(13);
textAlign(CENTER);
text("START", 470, 180);


  // GREEN DESTINATION CIRCLE - BAKERY
  fill(40, 180, 90);
  stroke(255);
  strokeWeight(3);
  circle(950, 205, 35);

 noStroke();
fill(20, 130, 65);
textSize(13);
textAlign(CENTER);
text("FINISH", 950, 180);
}
  else if (selectedBorough === "Brooklyn") {
    // BLUE START CIRCLE - SUBWAY STATION
  fill(40, 130, 230);
  stroke(255);
  strokeWeight(3);
  circle(760, 160, 35);

  noStroke();
fill(0, 45, 110);
textSize(13);
textAlign(CENTER);
text("START", 760, 140);


  // GREEN DESTINATION CIRCLE - TRANSIT MUSEUM
  fill(40, 180, 90);
  stroke(255);
  strokeWeight(3);
  circle(770, 600, 35);

 noStroke();
fill(20, 130, 65);
textSize(13);
textAlign(CENTER);
text("FINISH", 770, 630);
  }
  else if (selectedBorough === "Bronx") {
    // BLUE START CIRCLE - SUBWAY STATION
  fill(40, 130, 230);
  stroke(255);
  strokeWeight(3);
  circle(210, 635, 35);

  noStroke();
fill(0, 45, 110);
textSize(13);
textAlign(CENTER);
text("START", 175, 620);


  // GREEN DESTINATION CIRCLE - BRONX ZOO
  fill(40, 180, 90);
  stroke(255);
  strokeWeight(3);
  circle(210, 120, 35);

 noStroke();
fill(20, 130, 65);
textSize(13);
textAlign(CENTER);
text("FINISH", 210, 100);
  }
  else if (selectedBorough === "Manhattan") {
    // BLUE START CIRCLE - SUBWAY STATION
  fill(40, 130, 230);
  stroke(255);
  strokeWeight(3);
  circle(780, 440, 35);

  noStroke();
fill(0, 45, 110);
textSize(13);
textAlign(CENTER);
text("START", 740, 450);


  // GREEN DESTINATION CIRCLE - MUSEUM
  fill(40, 180, 90);
  stroke(255);
  strokeWeight(3);
  circle(650, 220, 35);

 noStroke();
fill(20, 130, 65);
textSize(13);
textAlign(CENTER);
text("FINISH", 650, 200);
  }
  else if (selectedBorough === "Staten Island") {
    // BLUE START CIRCLE - BUS STOP
  fill(40, 130, 230);
  stroke(255);
  strokeWeight(3);
  circle(210, 370, 35);

  noStroke();
fill(0, 45, 110);
textSize(13);
textAlign(CENTER);
text("START", 175, 395);


  // GREEN DESTINATION CIRCLE - GARDEN
  fill(40, 180, 90);
  stroke(255);
  strokeWeight(3);
  circle(930, 370, 35);

 noStroke();
fill(20, 130, 65);
textSize(13);
textAlign(CENTER);
text("FINISH", 930, 400);
  }
}

function keyPressed() {

  if (gameScreen === "streetChallenge") {

    if (
      keyCode === LEFT_ARROW ||
      keyCode === RIGHT_ARROW ||
      keyCode === UP_ARROW ||
      keyCode === DOWN_ARROW
    ) {
      return false;
    }
  }
}

function updatePlayer() {

  // Stop movement if the challenge has ended
  if (challengeFailed || challengeCompleted) {
    return;
  }

  let nextX = playerX;
  let nextY = playerY;

  if (keyIsDown(LEFT_ARROW)) {
    nextX -= playerSpeed;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    nextX += playerSpeed;
  }

  if (keyIsDown(UP_ARROW)) {
    nextY -= playerSpeed;
  }

  if (keyIsDown(DOWN_ARROW)) {
    nextY += playerSpeed;
  }

  // Keep character inside canvas
  nextX = constrain(nextX, playerSize / 2, width - playerSize / 2);
  nextY = constrain(nextY, playerSize / 2, height - playerSize / 2);

  // Check for trip hazard
  if (hitsHazard(nextX, nextY)) {
    popupAlpha = 0;
    challengeFailed = true;
    return;
  }

  // Move only if on a street
  if (isOnStreet(nextX, nextY)) {
    playerX = nextX;
    playerY = nextY;
  }

  // Queens - Bakery
  if (
    selectedBorough === "Queens" &&
    dist(playerX, playerY, 950, 205) < 32
  ) {
    popupAlpha = 0;
    challengeCompleted = true;
  }

  // Brooklyn - Museum
  else if (
    selectedBorough === "Brooklyn" &&
    dist(playerX, playerY, 770, 600) < 32
  ) {
    popupAlpha = 0;
    challengeCompleted = true;
  }
  // Bronx - Zoo
  else if (
    selectedBorough === "Bronx" &&
    dist(playerX, playerY, 210, 120) < 32
  ) {
    popupAlpha = 0;
    challengeCompleted = true;
  }
  // Manhattan - Museum
  else if (
    selectedBorough === "Manhattan" &&
    dist(playerX, playerY, 650, 220) < 32
  ) {
    popupAlpha = 0;
    challengeCompleted = true;
  }
  // Staten Island - Garden
  else if (
    selectedBorough === "Staten Island" &&
    dist(playerX, playerY, 930, 370) < 32
  ) {
    popupAlpha = 0;
    challengeCompleted = true;
  }
}
function isOnStreet(x, y) {

  if (selectedBorough === "Queens") {
    return isOnQueensStreet(x, y);
  }

  if (selectedBorough === "Manhattan") {
    return isOnManhattanStreet(x, y);
  }

  if (selectedBorough === "Bronx") {
    return isOnBronxStreet(x, y);
  }

  if (selectedBorough === "Brooklyn") {
    return isOnBrooklynStreet(x, y);
  }

  if (selectedBorough === "Staten Island") {
    return isOnStatenIslandStreet(x, y);
  }

  return false;
}

function isOnQueensStreet(x, y) {
  // Astoria map: horizontal streets
 let onBroadway = y >= 190 && y <= 210;
  let on34thAve = y >= 575 && y <= 595;

  // Astoria map: vertical streets
  let on29thSt = x >= 90 && x <= 110;
  let on30thSt = x >= 283 && x <= 303;
  let on31stSt = x >= 485 && x <= 505;
  let on32ndSt = x >= 695 && x <= 715;
  let on33rdSt = x >= 885 && x <= 905;

  return onBroadway || on34thAve ||
         on29thSt || on30thSt || on31stSt ||
         on32ndSt || on33rdSt;
}

function isOnBrooklynStreet(x, y) {
  let onJoralemonSt = y >= 150 && y <= 170;
  let onLivingstonSt = y >= 360 && y <= 380;
  let onSchermerhornSt = y >= 590 && y<= 610;
  let onClintonSt = x >= 210 && x <= 235;
  let onCourtSt = x >= 490 && x <= 510;
  let onBoerumPl = x >= 835 && x <= 855;
  return onJoralemonSt || onLivingstonSt || onSchermerhornSt || onClintonSt || onCourtSt || onBoerumPl;
}

function isOnBronxStreet(x, y) {
  let onDevoeAv = x >= 650 && x <= 670 && y >=205;
  let onBostonRd = x >= 200 && x <= 220;
  let onETremontAv = y >= 625 && y <= 645;
  let onE178St = y >= 490 && y <= 510 && x <= 220;
  let onE179St1 = y >= 360 && y <= 380 && x <=350;
  let onE179St2 = y >= 415 && y <= 435 && x >= 650;
  let onLebanonSt = y >= 310 && y <= 330 && x >= 650;
  let onE180St = y >= 205 && y <= 225;
  return onDevoeAv || onBostonRd || onETremontAv || onE178St || onE179St1 || onE179St2 || onLebanonSt || onE180St;
}

function isOnManhattanStreet(x, y) {
  let on77St = y >= 625 && y <= 645;
  let on81St = y >= 210 && y <= 230;
  let onColumbusAv = x >= 210 && x <= 230;
  let onCentralPkW = x >= 770 && x <= 790;
  let on79St = y >= 390 && y <= 410 && x<= 230;
  let on80St = y >= 300 && y<= 320 && x <= 230;
  let on78St = y >= 490 && y <= 510 && x<= 230;
  return on77St || on81St || onColumbusAv || onCentralPkW || on79St || on80St || on78St;
}

function isOnStatenIslandStreet(x, y) {
  let onDavisAv = x>= 200 && x<= 220;
  let onHendersonAv = y >= 360 && y <= 380;
  let onBardAv = x >= 465 && x <= 485;
  let onWalnutSt = y >= 150 && y <= 170 && x >= 200 && x <= 710;
  let onKisselAv1 = x >= 690 && x <= 710 && y <= 380;
  let onKisselAv2 = x >= 745 && x <= 765 && y >= 360;
  let onWestburyAv = x >= 850 && x <= 870 && y>= 360;
  return onDavisAv || onHendersonAv || onBardAv || onWalnutSt || onKisselAv1 || onKisselAv2 || onWestburyAv;
}

function hitsHazard(x, y) {

  if (selectedBorough === "Queens") {
    return hitsQueensHazard(x, y);
  }

  if (selectedBorough === "Manhattan") {
    return hitsManhattanHazard(x, y);
  }

  if (selectedBorough === "Bronx") {
    return hitsBronxHazard(x, y);
  }

  if (selectedBorough === "Brooklyn") {
    return hitsBrooklynHazard(x, y);
  }

  if (selectedBorough === "Staten Island") {
    return hitsStatenIslandHazard(x, y);
  }

  return false;
}

function hitsQueensHazard(x, y) {
  // Trip hazard near Broadway and 32nd Street
  return (
    x >= 685 &&
    x <= 725 &&
    y >= 180 &&
    y <= 220
  );
}

function hitsBrooklynHazard(x, y) {
  // Trip hazard near Clinton Street and Schermerhorn Street
  return (
    x >= 210 &&
    x <= 230 &&
    y >= 590 &&
    y <= 610 
  );
}

function hitsBronxHazard(x, y) {
  // Trip hazard near E 178 Street and East Tremont Avenue
  return (x >= 200 &&
    x <= 220 &&
    y >= 490 &&
    y <= 510 
          );
}
function hitsManhattanHazard(x, y) {
  // Trip hazard near Central Pk W and W 81 St
  return (x >= 770 &&
          x <= 790 &&
          y >= 210 &&
         y <= 230
         );
}
function hitsStatenIslandHazard(x, y) {
  // Trip hazard near Henderson Av and Bard Av
  return (x >= 465 &&
         x <= 485 &&
         y >= 360 &&
         y <= 380
         );
}

function drawFailureScreen() {
  // Dark transparent overlay
  popupAlpha = min(popupAlpha + 12, 255);
  fill(0, 0, 0, popupAlpha * 0.63);
  rect(0, 0, width, height);

  // Popup panel
  fill(255, 248, 225, popupAlpha);
  stroke(80);
  strokeWeight(3);
  rect(250, 220, 500, 280, 20);

  // Message
  noStroke();
  fill(60);
  textAlign(CENTER);
  textSize(34);
  text("Oh no! You tripped!", 500, 295);

  textSize(19);
  text("You encountered a sidewalk trip hazard.", 500, 345);
  text("Let's try that route again!", 500, 375);

  // Check if mouse is hovering over Retry button
  let buttonHover =
    mouseX > 390 &&
    mouseX < 610 &&
    mouseY > 415 &&
    mouseY < 470;

  // Button animation
  let buttonSize = buttonHover ? 6 : 0;

  if (buttonHover) {
    fill(120, 210, 130);
    cursor(HAND);
  } else {
    fill(100, 190, 110);
  }

  stroke(80);
  strokeWeight(2);

  rect(
    390 - buttonSize / 2,
    415 - buttonSize / 2,
    220 + buttonSize,
    55 + buttonSize,
    12
  );

  noStroke();
  fill(255);
  textSize(21);
  text("Retry", 500, 450);
}

function drawCompletionScreen() {

  // Dark transparent overlay
  popupAlpha = min(popupAlpha + 12, 255);
  fill(0, 0, 0, popupAlpha * 0.63);
  rect(0, 0, width, height);

  // Popup panel
  fill(255, 248, 225, popupAlpha);
  stroke(80);
  strokeWeight(3);
  rect(250, 220, 500, 280, 20);

  // Success message
  noStroke();
  fill(30, 130, 65);
  textAlign(CENTER);
  textSize(34);

  if (selectedBorough === "Queens") {
    text("Queens Completed!", 500, 295);
  }

  else if (selectedBorough === "Brooklyn") {
    text("Brooklyn Completed!", 500, 295);
  }
  else if (selectedBorough === "Bronx") {
    text("The Bronx Completed!", 500, 295);
  }
  else if (selectedBorough === "Manhattan") {
    text("Manhattan Completed!", 500, 295);
  }
  else if (selectedBorough === "Staten Island") {
    text("Staten Island Completed!", 500, 295);
  }

  // Borough-specific message
  fill(60);
  textSize(19);

  if (selectedBorough === "Queens") {
    text("You safely reached the bakery!", 500, 345);
  }

  else if (selectedBorough === "Brooklyn") {
    text("You safely reached the museum!", 500, 345);
  }
  else if (selectedBorough === "Bronx") {
    text("You safely reached the zoo!", 500, 345);
  }
  else if (selectedBorough === "Manhattan") {
    text("You safely reached the museum!", 500, 345);
  }
  else if (selectedBorough === "Staten Island") {
    text("You safely reached the garden!", 500, 345);
  }

  text("Great job avoiding the trip hazard!", 500, 375);

  // Return button
  // Check hover
buttonHover = mouseX > 390 && mouseX < 610 &&
              mouseY > 415 && mouseY < 470;

// Button animation
let buttonSize = buttonHover ? 6 : 0;

if (buttonHover) {
  fill(125, 215, 135);
  cursor(HAND);
} else {
  fill(100, 190, 110);
}

stroke(80);
strokeWeight(2);

rect(
  390 - buttonSize / 2,
  415 - buttonSize / 2,
  220 + buttonSize,
  55 + buttonSize,
  12
);

noStroke();
fill(255);
textSize(21);
text("Back to NYC Map", 500, 450);
}

function allBoroughsCompleted() {
  return (
    manhattanCompleted &&
    bronxCompleted &&
    queensCompleted &&
    brooklynCompleted &&
    statenIslandCompleted
  );
}

function drawGameOverScreen() {

  cursor(ARROW);

  // Warm sunset background
  background(239, 196, 151);

  // Sunset glow
  noStroke();
  fill(250, 220, 170);
  circle(500, 300, 280);

  // Small decorative stars
  fill(255, 245, 210);
  circle(110, 100, 5);
  circle(220, 155, 4);
  circle(830, 110, 5);
  circle(900, 190, 4);
  circle(720, 75, 4);

  // Distant skyline
  fill(135, 119, 119);
  rect(0, 400, 1000, 300);

  rect(20, 330, 75, 370);
  rect(110, 370, 90, 330);
  rect(220, 350, 80, 350);
  rect(320, 390, 90, 310);
  rect(820, 370, 75, 330);
  rect(910, 340, 90, 360);

  // Empire State Building
  fill(83, 91, 103);
  rect(425, 245, 150, 455);
  rect(445, 200, 110, 45);
  rect(465, 165, 70, 35);
  rect(480, 125, 40, 40);
  rect(495, 85, 10, 40);
  triangle(495, 85, 500, 55, 505, 85);

  // Other tall buildings
  fill(105, 104, 112);
  rect(620, 280, 115, 420);
  triangle(620, 280, 677, 220, 735, 280);

  rect(755, 350, 55, 350);
  rect(210, 300, 90, 400);
  rect(310, 365, 80, 335);

  // Building windows
  fill(255, 218, 139);

  for (let x = 30; x < 90; x += 22) {
    for (let y = 350; y < 680; y += 35) {
      rect(x, y, 10, 16);
    }
  }

  for (let x = 450; x < 555; x += 25) {
    for (let y = 270; y < 680; y += 38) {
      rect(x, y, 12, 17);
    }
  }

  for (let x = 635; x < 720; x += 25) {
    for (let y = 305; y < 680; y += 38) {
      rect(x, y, 12, 17);
    }
  }

  for (let x = 225; x < 290; x += 25) {
    for (let y = 325; y < 680; y += 38) {
      rect(x, y, 12, 17);
    }
  }

  // Ground
  fill(55, 65, 75);
  rect(0, 690, 1000, 10);

  // Dark translucent message panel
  fill(38, 53, 65, 225);
  noStroke();
  rect(170, 115, 660, 320, 25);

  // Celebration message
  fill(255, 225, 166);
  textAlign(CENTER);
  textStyle(BOLD);
  textSize(17);
  text("NEW YORK CITY ADVENTURE", 500, 165);

  fill(255, 250, 235);
  textSize(47);
  text("YOU DID IT!", 500, 230);

  textStyle(NORMAL);
  textSize(20);
  text("All five boroughs conquered!", 500, 275);

  textSize(17);
  fill(230, 225, 210);
  text("From Manhattan to Staten Island,", 500, 315);
  text("you made it across New York City!", 500, 342);

  // Play Again hover detection
  let playHover =
    mouseX > 350 && mouseX < 650 &&
    mouseY > 365 && mouseY < 425;

  // Animated Play Again button
  push();

  if (playHover) {
    translate(500, 395);
    scale(1.07);
    translate(-500, -395);

    fill(235, 170, 95);
    cursor(HAND);
  } else {
    fill(211, 145, 83);
  }

  noStroke();
  rect(350, 365, 300, 60, 15);

  fill(255);
  textStyle(BOLD);
  textSize(21);
  text("PLAY AGAIN  ↻", 500, 403);

  pop();

  textStyle(NORMAL);
}