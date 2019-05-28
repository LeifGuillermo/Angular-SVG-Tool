import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';

@Component({
  selector: 'app-svg-sandbox',
  templateUrl: './svg-sandbox.component.html',
  styleUrls: ['./svg-sandbox.component.scss']
})
export class SvgSandboxComponent implements OnInit, OnChanges {
  public coordinateX;
  public coordinateY;

  public lined = '';
  public curved = '';
  public svgEventArray = [];
  public pathString = '';
  public lineString = '';
  public gridRows = [];
  public gridCols = [];

  public gridWidth = 50;
  public gridHeight = 35;

  private numRows = Math.ceil(1020 / this.gridHeight);
  private numCols = Math.ceil(1020 / this.gridWidth);

  public pointArray = [];

  public nodeArray = [];
  public nodeSizeArray = [];

  private maxArraySize = 4;

  private xOffset = -10;
  private yOffset = -30;

  public cRect1 = null;
  public cRectSize = null;
  @ViewChild('svgBox') svg;

  public nodeToggle = false;

  constructor() {
    this.updateGrid();
  }

  ngOnInit() {}

  ngOnChanges() {
    this.updateGrid();
  }

  private updateGrid() {
    const rows = Array(this.numRows)
      .map((x, i) => i)
      .fill(0);
    const columns = Array(this.numCols)
      .map((x, i) => i)
      .fill(0);

    rows.map((row, index) => {
      this.gridRows.push(
        ' M 0 ' + index * this.gridHeight + ' L 1200 ' + index * this.gridHeight
      );
    });

    columns.map((col, index) => {
      this.gridCols.push(
        ' M ' +
          index * this.gridWidth +
          ' 0 L ' +
          index * this.gridWidth +
          ' 800'
      );
    });
  }

  public mouseMoved($event) {
    this.coordinateX = $event.x + this.xOffset;
    this.coordinateY = $event.y + this.yOffset;
    if (this.nodeToggle && this.cRect1) {
      this.cRectSize = {
        x: this.coordinateX - this.cRect1.x,
        y: this.coordinateY - this.cRect1.y
      };
    }
  }

  public clear() {
    this.svgEventArray = [];
    this.pointArray = [];
    this.lined = '';
    this.curved = '';
    this.pathString = '';
    this.lineString = '';
  }

  public sandboxClicked($event) {
    const eventPoint = {
      x: $event.x + this.xOffset,
      y: $event.y + this.yOffset
    };

    if (this.nodeToggle) {
      if (!this.cRect1) {
        this.cRect1 = eventPoint;
        this.cRectSize = { x: 0, y: 0 };
      } else if (this.cRect1 && this.cRectSize) {
        if (this.nodeArray.length > this.nodeSizeArray.length) {
          const lastPoint = this.nodeArray[this.nodeArray.length - 1];
          eventPoint.x = eventPoint.x - lastPoint.x;
          eventPoint.y = eventPoint.y - lastPoint.y;
          this.nodeSizeArray.push(eventPoint);
        } else {
          this.nodeArray.push(eventPoint);
        }
        this.cRect1 = null;
        this.cRectSize = null;
      }
    } else {
      this.svgEventArray.push(eventPoint);
      this.pointArray = this.svgEventArray;
    }
  }

  public drawPaths() {
    if (this.svgEventArray.length >= 4) {
      this.drawStraightLine();
      this.drawCurve();

      this.svgEventArray = [];
    }
  }

  private drawStraightLine() {
    const p1 = this.svgEventArray[0];
    const p2 = this.svgEventArray[1];

    this.lined = 'M ' + p1.x + ' ' + p1.y;
    this.lined = this.lined + ' L' + ' ' + p2.x + ' ' + p2.y;
    this.lineString = this.lined;
  }

  private drawCurve() {
    const p1 = this.svgEventArray[0];
    const p2 = this.svgEventArray[1];

    const c1 = this.svgEventArray[2];
    const c2 = this.svgEventArray[3];

    this.curved = 'M ' + p1.x + ' ' + p1.y;
    this.curved += ' S ' + c1.x + ' ' + c1.y;
    this.curved += ', ' + c2.x + ' ' + c2.y;

    this.svgEventArray.map((point, index) => {
      if (index !== this.svgEventArray.length - 1 && index > 3) {
        this.curved += ' ' + ' ' + point.x + ' ' + point.y;
      }
    });
    this.curved += ' ' + ' ' + p2.x + ' ' + p2.y;
    this.pathString = this.curved;
  }
}
