import {
  Component,
  OnInit,
  ViewChild,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
  EmbeddedViewRef
} from '@angular/core';

@Component({
  selector: 'app-svg-sandbox',
  templateUrl: './svg-sandbox.component.html',
  styleUrls: ['./svg-sandbox.component.scss']
})
export class SvgSandboxComponent implements OnInit {
  public coordinateX;
  public coordinateY;

  public lined = '';
  public curved = '';
  public svgEventArray = [];
  public pathString = '';
  public lineString = '';

  public pointArray = [];

  private maxArraySize = 4;

  private xOffset = -10;
  private yOffset = -30;

  @ViewChild('svgBox') svg;

  constructor() {}

  ngOnInit() {}

  public mouseMoved($event) {
    this.coordinateX = $event.x + this.xOffset;
    this.coordinateY = $event.y + this.yOffset;
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
    console.log($event);
    this.svgEventArray.push({
      x: $event.x + this.xOffset,
      y: $event.y + this.yOffset
    });
    this.pointArray = this.svgEventArray;
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
