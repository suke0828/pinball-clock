class Clock {
  constructor(second, minute, hour) {
    this.second = second;
    this.minute = minute;
    this.hour = hour;
  }

  show() {
    const clockDisplay = [this.hour, ':', this.minute, ':', this.second];
    const clockRows = clockDisplay.length;
    const SECOND_COLOR = [238, 232, 32];
    const MINUTE_COLOR = [0, 255, 0, 200];
    const HOUR_COLOR = [255, 0, 0];
    const COLON_COLOR = [0, 0, 255];

    // clockDisplayの配列のindexによってカラーを変更する
    const clockColor = {
      0: HOUR_COLOR,
      2: MINUTE_COLOR,
      4: SECOND_COLOR,
      colon: COLON_COLOR,
    };

    clockDisplay.map((clock, index) => {
      let cellSize = width / clockRows;
      let row = index % clockRows;
      let x = row * cellSize;
      let y = height / 3;

      const color = clockColor[index] || clockColor.colon;

      fill(color);
      stroke(color);
      strokeWeight(4);
      textAlign(CENTER);
      textSize(80);

      // 時間が 1 ~ 9 の時は0を加える(01 ~ 09)
      if (clock < 10) {
        text('0' + clock, x, y, cellSize, cellSize);
      } else {
        text(clock, x, y, cellSize, cellSize);
      }
    });
  }
}
