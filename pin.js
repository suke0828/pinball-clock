class Pin {
  constructor(r, rowIndex, colIndex) {
    this.r = r; // 半径を追跡するためのプロパティ
    this.rows = rowIndex;
    this.cols = colIndex;
    let x = this.calculatePositionX();
    let y = this.calculatePositionY();
    let options = { restitution: 1, friction: 0.9, isStatic: true }; // 静的なbody。trueの場合は位置や角度を変えることができず、完全に固定される(Matter.Body)

    this.body = Bodies.circle(x, y, r, options); // 円の物質を作成

    Composite.add(world, this.body); // 全ての世界にbodyを反映させる
  }

  calculatePositionX() {
    let spacing = width / ROWS; // 隙間を与える
    let x = this.rows * spacing;

    // 偶数行の場合はpinの位置を右にずらす
    if (this.cols % 2 == 0) {
      x += spacing / 2;
    }

    return x;
  }

  calculatePositionY() {
    let spacing = width / ROWS;

    return spacing + this.cols * spacing;
  }

  show() {
    let pos = this.body.position; // 現在地を取得する

    push();
    translate(pos.x, pos.y); // 移動する座標を追跡する
    fill(0, 255, 0);
    stroke(255);
    ellipse(0, 0, this.r * 2);
    pop();
  }
}
