class Clock {
  constructor(second, minute, hour) {
    this.second = second;
    this.minute = minute;
    this.hour = hour;
  }

  show() {
    const clockDisplay = [this.hour, ':', this.minute, ':', this.second];
    const clockRows = clockDisplay.length;

    clockDisplay.map((clock, index) => {
      let cellSize = width / clockRows;
      let row = index % clockRows;
      let x = row * cellSize;
      let y = height / 3;

      fill(238, 232, 32, 200);
      stroke(255);
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
