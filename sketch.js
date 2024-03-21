const Engine = Matter.Engine,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite;

const ROWS = 10;
const COLS = 9;
const TIME_STEP = 1000 / 60; // 毎秒60フレーム

let world;
let engine;
let particles = [];
let pin = [];
let bounds = [];
let buckets = [];
let clock;

function setup() {
  createCanvas(600, 700);

  engine = Engine.create(); // 世界のシミュレーションの更新を管理するコントローラを作成
  world = engine.world; // このエンジンでシミュレートされる Matter.Composite インスタンス

  createPin();
  createBoundary();
  createBuckets();
}

function draw() {
  background(0);

  // 時計の表示
  getTime();
  clock.show();

  // 一定時間ごとにparticleを生成する
  generateBalls(60, 'second');
  generateBalls(minute(), 'minute');
  generateBalls(hour(), 'hour');

  // particlesの描画
  particles.map((item, i) => {
    item.show();
    item.clearParticle();
    item.removeParticle(particles, i);
  });

  // ピンの描画
  pin.map((row) => row.map((col) => col.show()));
  // 床に設置する仕切りの描画
  buckets.map((bucket) => bucket.show());

  // シミュレーションをミリ秒単位で進める(更新したいものを引数に渡す)
  Engine.update(engine, TIME_STEP);
}

function getTime() {
  let sc = second();
  let mn = minute();
  let hr = hour();

  clock = new Clock(sc, mn, hr);
}

function createBuckets() {
  buckets = Array(ROWS + 1)
    .fill(0)
    .map((_, i) => {
      let spacing = width / ROWS; // 隙間を与える
      let x = floor(i * spacing);
      let w = 10;
      let h = 100;
      let y = height - h / 2;

      return new Boundary(x, y, w, h);
    });
}

function createBoundary() {
  // rectangleは図形の中心のx座標とy座標を使用する
  let bottomWall = new Boundary(width / 2, height + 50, width, 100);
  bounds.push(bottomWall);

  let leftWall = new Boundary(-65, height / 2, 100, height);
  bounds.push(leftWall);

  let rightWall = new Boundary(width + 65, height / 2, 100, height);
  bounds.push(rightWall);
}

function createPin() {
  let size = 4;
  // rows[[cols],[cols]…]の2次元配列を作成する
  pin = Array(ROWS)
    .fill(0)
    .map(() => Array(COLS).fill(0))
    .map((row, rowIndex) =>
      row.map((_, colIndex) => new Pin(size, rowIndex, colIndex))
    );
}

function generateBalls(clock, label) {
  Array(clock)
    .fill(0)
    .map((_, i) => {
      let number = i + 1;
      if (second() === i && frameCount % 60 == 0) {
        return createParticle(number, label);
      }
    });
}

function createParticle(time, label) {
  const widthtMap = {
    second: random(width / 1.5, width),
    minute: random(width / 3, width / 1.5),
    hour: random(0, width / 3),
  };
  const heightMap = {
    second: 0,
    minute: -22,
    hour: -22,
  };

  const sizeMap = {
    second: 14,
    minute: 18,
    hour: 22,
  };

  const flagMap = {
    second: 'isSecond',
    minute: 'isMinute',
    hour: 'isHour',
  };

  if (label in sizeMap) {
    let x = widthtMap[label]; // 各particleの生成する横の位置を取得
    let y = heightMap[label]; // 各particleの生成する高さを取得
    let size = sizeMap[label]; // 各particleのサイズを取得
    let particle = new Particle(x, y, size, time);

    particle[flagMap[label]] = true; // 秒、分、時のそれぞれのテキストの生成フラグ
    particles.push(particle);
  }
}
