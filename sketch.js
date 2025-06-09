let plotSize = 60;

let plots = [];

let wateringCan;

let selectedTool = "seed"; // seed, water, harvest

function setup() {

  createCanvas(600, 400);

  for (let x = 0; x < width; x += plotSize) {

    for (let y = 100; y < height; y += plotSize) {

      plots.push(new Plot(x, y));

    }

  }

}

function draw() {

  background(150, 200, 100);

  drawToolbar();

  for (let plot of plots) {

    plot.update();

    plot.show();

  }

}

function mousePressed() {

  if (mouseY < 60) return; // não interagir com a barra de ferramentas

  for (let plot of plots) {

    if (plot.contains(mouseX, mouseY)) {

      if (selectedTool === "seed") {

        plot.plant();

      } else if (selectedTool === "water") {

        plot.water();

      } else if (selectedTool === "harvest") {

        plot.harvest();

      }

    }

  }

}

function drawToolbar() {

  fill(100, 60, 20);

  rect(0, 0, width, 60);

  textSize(16);

  fill(255);

  text("Ferramentas:", 10, 20);

  drawButton("🌱 Plantar", 120, "seed");

  drawButton("💧 Regar", 220, "water");

  drawButton("🧺 Colher", 320, "harvest");

}

function drawButton(label, x, tool) {

  if (selectedTool === tool) fill(180, 100, 50);

  else fill(80);

  rect(x, 10, 80, 30, 5);

  fill(255);

  textAlign(CENTER, CENTER);

  text(label, x + 40, 25);

}

function mouseClicked() {

  if (mouseY < 60) {

    if (mouseX > 120 && mouseX < 200) selectedTool = "seed";

    else if (mouseX > 220 && mouseX < 300) selectedTool = "water";

    else if (mouseX > 320 && mouseX < 400) selectedTool = "harvest";

  }

}

class Plot {

  constructor(x, y) {

    this.x = x;

    this.y = y;

    this.state = "empty"; // empty, planted, growing, ready

    this.timer = 0;

  }

  contains(mx, my) {

    return mx > this.x && mx < this.x + plotSize &&

           my > this.y && my < this.y + plotSize;

  }

  plant() {

    if (this.state === "empty") {

      this.state = "planted";

      this.timer = 0;

    }

  }

  water() {

    if (this.state === "planted") {

      this.state = "growing";

      this.timer = 0;

    }

  }

  harvest() {

    if (this.state === "ready") {

      this.state = "empty";

      this.timer = 0;

    }

  }

  update() {

    if (this.state === "growing") {

      this.timer++;

      if (this.timer > 180) { // após 3 segundos (~60fps * 3)

        this.state = "ready";

        this.timer = 0;

      }

    }

  }

  show() {

    stroke(80);

    noFill();

    rect(this.x, this.y, plotSize, plotSize);

    if (this.state === "empty") {

      fill(120, 90, 50);

    } else if (this.state === "planted") {

      fill(160, 110, 60);

      ellipse(this.x + plotSize / 2, this.y + plotSize / 2, 10, 10);

    } else if (this.state === "growing") {

      fill(100, 180, 100);

      rect(this.x + 20, this.y + 20, 20, 20);

    } else if (this.state === "ready") {

      fill(0, 200, 0);

      ellipse(this.x + plotSize / 2, this.y + plotSize / 2, 30, 30);

    }

  }

}

