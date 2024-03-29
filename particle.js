class Particle {
  constructor(x, y, r, time) {
    let options = {
      restitution: 0.8, // 弾性(跳ね返り)。0 ~ 1の範囲
      friction: 0.2, // 摩擦力。 0 ~ 1の範囲
      density: 1, // 密度
    };

    x += random(-4, 4); // xの位置を左右ランダムに変化させる
    this.body = Bodies.circle(x, y, r, options); // 円の物質を作成
    this.r = r; // 半径を追跡するためのプロパティ
    this.time = time;
    this.isSecond = false;
    this.isMinute = false;
    this.isHour = false;
    this.body.collisionFilter.group = 1; // partcile同士の当たり判定。正の値なら衝突し、負の値なら衝突しない
    this.body.collisionFilter.category = 0x002; // 他の物質との衝突判定のためのカテゴリーを設定する
    this.body.collisionFilter.mask = 0x001; // maskの値が他の物質に設定されているcategoryの値を含んでいると衝突し、違うと衝突しない

    Composite.add(world, this.body); // 全ての世界にbodyを反映させる
  }

  clearParticle() {
    // 1分経ったら当たり判定を無くして画面外にdropさせる
    if (second() == 59) {
      this.body.collisionFilter.mask = 0x000;
    }
  }

  removeParticle(particle, i) {
    if (this.isOffScreen()) {
      Composite.remove(world, this.body); // 物理の世界から削除する
      particle.splice(i, 1); // 配列から削除する
      i--; // 配列から削除されたらそれに合わせてindexも減らす
    }
  }

  // キャンバスの画面外にあるか判定する
  isOffScreen() {
    let x = this.body.position.x;
    let y = this.body.position.y;
    let offScreenLeft = x < 0;
    let offScreenRight = x > width + this.r * 2;
    let offScreenBottom = y > height + this.r * 2;

    return offScreenLeft || offScreenRight || offScreenBottom;
  }

  show() {
    let pos = this.body.position; // 現在地を取得する
    let yellow = [238, 232, 32, 100];
    let green = [0, 255, 0, 100];
    let red = [255, 0, 0, 100];

    push();
    translate(pos.x, pos.y); // 移動する座標を追跡する

    if (this.isSecond) {
      this.particleStyle(yellow);
    }
    if (this.isMinute) {
      this.particleStyle(green);
    }
    if (this.isHour) {
      this.particleStyle(red);
    }
    pop();
  }

  particleStyle(color) {
    // particleの形状
    fill(color);
    noStroke();
    ellipse(0, 0, this.r * 2);

    // テキストスタイル
    fill(255);
    stroke(255);
    strokeWeight(2);
    textSize(this.r + this.r / 4);
    text(this.time, 0, 0 + this.r / 2);
  }
}
