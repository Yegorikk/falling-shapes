import * as PIXI from 'pixi.js';

export enum ShapeType {
    TRIANGLE = 'triangle',
    SQUARE = 'square',
    PENTAGON = 'pentagon',
    HEXAGON = 'hexagon',
    CIRCLE = 'circle',
    ELLIPSE = 'ellipse',
    CLOUD = 'cloud'
}

export class ShapeModel {
    type: ShapeType;
    x: number;
    y: number;
    color: number;
    private app!: PIXI.Application;
    shapeGraphic: PIXI.Graphics;
    private area: number;

    constructor(type: ShapeType, x: number, y: number, color: number, app: PIXI.Application) {
        this.app = app;
        this.type = type;
        this.x = x;
        this.y = y;
        this.color = color;
        this.shapeGraphic = new PIXI.Graphics();
        this.drawShape();
        this.shapeGraphic.interactive = true;
        this.shapeGraphic.on('pointerdown', () => this.removeShape());
        app.stage.addChild(this.shapeGraphic);
        this.area = this.calculateArea();
    }

    drawShape(): void {
        console.log(this)
        this.shapeGraphic.clear();
        this.shapeGraphic.beginFill(this.color);
        switch (this.type) {
            case ShapeType.TRIANGLE:
                this.shapeGraphic.drawPolygon([0, 0, 100, 0, 50, 100]);
                break;
            case ShapeType.SQUARE:
                this.shapeGraphic.drawRect(0, 0, 100, 100);
                break;
            case ShapeType.PENTAGON:
                this.shapeGraphic.drawPolygon(this.getPolygonPoints(5, 50));
                break;
            case ShapeType.HEXAGON:
                this.shapeGraphic.drawPolygon(this.getPolygonPoints(6, 50));
                break;
            case ShapeType.CIRCLE:
                this.shapeGraphic.drawCircle(0, 0, 50);
                break;
            case ShapeType.ELLIPSE:
                this.shapeGraphic.drawEllipse(0, 0, 60, 40);
                break;
            case ShapeType.CLOUD:
                this.drawCloudShape();
                break;
        }
        this.shapeGraphic.endFill();
        this.shapeGraphic.x = this.x;
        this.shapeGraphic.y = this.y;
    }

    getPolygonPoints(sides: number, radius: number): number[] {
        const points: number[] = [];
        const angle = (2 * Math.PI) / sides;
        for (let i = 0; i < sides; i++) {
            points.push(radius * Math.cos(i * angle), radius * Math.sin(i * angle));
        }
        return points;
    }
    
    drawCloudShape(): void {
        this.shapeGraphic.drawCircle(-30, 0, 30);
        this.shapeGraphic.drawCircle(-10, -20, 30);
        this.shapeGraphic.drawCircle(20, -10, 35);
        this.shapeGraphic.drawCircle(40, 10, 30);
        this.shapeGraphic.drawCircle(5, 15, 35);
    }

    calculateArea(): number {
        switch (this.type) {
            case ShapeType.TRIANGLE:
                return 0.5 * 100 * 100;
            case ShapeType.SQUARE:
                return 100 * 100;
            case ShapeType.PENTAGON:
                return (5 / 2) * 50 * 50 * Math.tan(Math.PI / 5);
            case ShapeType.HEXAGON:
                return (3 * Math.sqrt(3)) / 2 * Math.pow(50, 2);
            case ShapeType.CIRCLE:
                return Math.PI * Math.pow(50, 2);
            case ShapeType.ELLIPSE:
                return Math.PI * 60 * 40;
            case ShapeType.CLOUD:
                return Math.PI * (3 * Math.pow(30, 2) + 2 * Math.pow(35, 2));
            default:
                return 0;
        }
    }

    getArea(): number {
        return this.area;
    }

    update(gravity: number): void {
        if (this.shapeGraphic.parent) {
            this.y += gravity;
            this.shapeGraphic.y = this.y;
        }
    }

    isOutOfBounds(): boolean {
        if (!this.shapeGraphic || !this.shapeGraphic.parent) return true;
        const { width, height } = this.app.view;
        const bounds = this.shapeGraphic.getBounds();
        return bounds.y > height || bounds.x > width || bounds.x + bounds.width < 0 || bounds.y + bounds.height < 0;
      }

      removeShape(): void {
        if (this.shapeGraphic && this.shapeGraphic.parent) {
            this.app.stage.removeChild(this.shapeGraphic);
            this.shapeGraphic.destroy();
            this.shapeGraphic = null;
        }
    }    

    changeColor(): void {
        this.color =  Math.random() * 0xffffff;;
        this.drawShape();
    }
}
