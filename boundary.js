class Boundary {
  constructor(x, y, w, h) {
    let options = { isStatic: true };
    this.w = w;
    this.h = h;
    this.body = Bodies.rectangle(x, y, this.w, this.h, options); // 円の物質を作成

    Composite.add(world, this.body); // 全ての世界にbodyを反映させる
  }

  show() {
    let pos = this.body.position; // 現在地を取得する

    push();
    translate(pos.x, pos.y); // 移動する座標を追跡する
    rectMode(CENTER); // 図形の中心のx座標とy座標を使用する
    fill(0, 255, 0, 100);
    stroke(255);
    strokeWeight(2);
    rect(0, 0, this.w, this.h);
    pop();
  }
}
