class Particle {
  constructor(x, y, r, sc) {
    let options = {
      restitution: 1, // 弾性(跳ね返り)。0 ~ 1の範囲
      friction: 0.2, // 摩擦力。 0 ~ 1の範囲
      density: 1, // 密度
    };

    x += random(-4, 4); // xの位置を左右ランダムに変化させる
    this.body = Bodies.circle(x, y, r, options); // 円の物質を作成
    this.r = r; // 半径を追跡するためのプロパティ
    this.sc = sc;

    Composite.add(world, this.body); // 全ての世界にbodyを反映させる
  }

  removeParticle(i) {
    if (this.isOffScreen() || second() == 0) {
      Composite.remove(world, this.body); // 物理の世界から削除する
      particles.splice(i, 1); // 配列から削除する
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

    push();
    translate(pos.x, pos.y); // 移動する座標を追跡する
    fill(238, 232, 32, 100);
    noStroke();
    ellipse(0, 0, this.r * 2);

    fill(255);
    stroke(255);
    strokeWeight(2);
    textSize(this.r + this.r / 4);
    text(this.sc, 0, 0 + this.r / 2);
    pop();
  }
}
