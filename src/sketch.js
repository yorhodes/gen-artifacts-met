//Framerate controls how much often the canvas refreshes
var fr = 100;

const canvasX = 300;
const canvasY = 300;

let colors;

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
    // pixels[i+3] = pixels[i+3] + grainAmount;
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
  fill(random(colors));
  granulate(20);
  // fill(random(255), random(255), random(255));
  // fill(R + random(40, 200), G + random(40, 200), B + random(40, 200));
  endShape();

  // x2rx3(x1, y1, 50, 50, 0, Hx2LF_PI);
}

function augment_points(points) {
  const index = int(random(3));
  const p1 = points[index];
  const p2 = points[(index + 1) % 3];
  let p3 = { x: -1, y: -1 };
  while (p3.x < 0 || p3.x > canvasX || p3.y < 0 || p3.y > canvasY) {
    const avg_x = int((p1.x + p2.x) / 2);
    const avg_y = int((p1.y + p2.y) / 2);
    p3 = {
      x: avg_x + int(random(-100, 100)),
      y: avg_y + int(random(-100, 100))
    };
    // const curr_color = get(p3.x, p3.y);
    // console.log(curr_color);
  }
  return [p1, p2, p3];
}

let points = [
  { x: 0, y: 0 },
  { x: 100, y: 0 },
  { x: 0, y: 100 }
];

function setup() {
  createCanvas(canvasX, canvasY);
  background(200);
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

function draw() {
  arc_triangle(points);
  points = augment_points(points);
}
