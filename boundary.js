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
    fill(255);
    stroke(255);
    rect(0, 0, this.w, this.h);
    pop();
  }
}
