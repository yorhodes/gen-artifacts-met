//Framerate controls how much often the canvas refreshes
var fr = 60;

const canvasX = 250;
const canvasY = 250;

// let colors;

let R, G, B;
function set_main_color() {
  R = random(255);
  G = random(255);
  B = random(255);
}

function granulate(amount) {
  loadPixels();
  const d = pixelDensity();
  const pixelsCount = 4 * (width * d) * (height * d);
  for (let i = 0; i < pixelsCount; i += 4) {
    const grainAmount = random(-amount, amount);
    pixels[i] = pixels[i] + grainAmount;
    pixels[i + 1] = pixels[i + 1] + grainAmount;
    pixels[i + 2] = pixels[i + 2] + grainAmount;
    // comment in, if you want to granulate the alpha value
    // pixels[i + 3] = pixels[i + 3] + grainAmount;
  }
  updatePixels();
}

function arc_triangle(points) {
  beginShape();
  for (let point of points) {
    vertex(point.x, point.y);
  }
  // mainColor
  // fill(R, G, B);
  // fill(random(colors));
  granulate(10);
  // fill(0);
  // fill(random(255), random(255), random(255));
  fill(R + random(-25, 25), G + random(-25, 25), B + random(-25, 25));
  endShape();

  // x2rx3(x1, y1, 50, 50, 0, Hx2LF_PI);
}

function augment_points(points) {
  const index = int(random(3));
  const p1 = points[index];
  const p2 = points[(index + 1) % 3];
  let p3 = { x: -1, y: -1 };
  while (p3.x < 0 || p3.x > canvasX || p3.y < 0 || p3.y > canvasY) {
    const avg_x = (p1.x + p2.x) / 2;
    const avg_y = (p1.y + p2.y) / 2;
    const delta_x = random(-100, 100);
    const delta_y = random(-100, 100);
    p3 = {
      x: avg_x + delta_x,
      y: avg_y + delta_y
    };
    // const curr_color = get(p3.x, p3.y);
    // console.log(curr_color);
  }
  return [p1, p2, p3];
}

let points = [
  { x: 0, y: 0 },
  { x: 0, y: 50 },
  { x: 50, y: 0 }
];

function setup() {
  createCanvas(canvasX, canvasY);
  set_main_color();
  background(R, G, B);
  noStroke();
  frameRate(fr);
  // setMainColor();
  // const s = 200;
  // colors = [
  //   color(235, 186, 185),
  //   color(201, 197, 186),
  //   color(151, 177, 166),
  //   color(105, 137, 150),
  //   color(64, 112, 118)
  // ];
}

let frame = 0;

function draw() {
  arc_triangle(points);
  points = augment_points(points);
  frame += 1;
  if (frame > 100) {
    background(R, G, B);
    set_main_color();
    frame = 0;
  }
}
