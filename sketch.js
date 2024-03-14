const Engine = Matter.Engine,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite;

const ROWS = 11;
const COLS = 9;
const TIME_STEP = 1000 / 60; // 毎秒60フレーム

let world;
let engine;
let particles = [];
let pin = [];
let bounds = [];

function setup() {
  createCanvas(600, 700);

  engine = Engine.create(); // 世界のシミュレーションの更新を管理するコントローラを作成
  world = engine.world; // このエンジンでシミュレートされる Matter.Composite インスタンス
  engine.gravity.y = 2; // 重力の設定

  // 初期配置するparticleの作成
  createParticle();
  createPin();
  createBoundary();
}

function draw() {
  background(0);

  // 一定時間ごとにparticleを生成する
  generateRegularIntervals();

  // particlesの描画
  particles.map((item, i) => {
    item.show();
    item.removeParticle(i);
  });

  // ピンの描画
  pin.map((row) => row.map((col) => col.show()));

  // シミュレーションをミリ秒単位で進める(更新したいものを引数に渡す)
  Engine.update(engine, TIME_STEP);
}

function createBoundary() {
  // rectangleは図形の中心のx座標とy座標を使用する
  let b = new Boundary(width / 2, height + 50, width, 100);
  bounds.push(b);
}

function createPin() {
  // rows[[cols],[cols]…]の2次元配列を作成する
  pin = Array(ROWS)
    .fill(0)
    .map(() => Array(COLS).fill(0))
    .map((row, rowIndex) =>
      row.map((_, colIndex) => new Pin(4, rowIndex, colIndex))
    );
}

function generateRegularIntervals() {
  if (frameCount % 60 == 0) {
    createParticle();
  }
}

function createParticle() {
  let particle = new Particle(width / 2, 0, 8);
  particles.push(particle);
}
