import { ShapeModel } from '../model/ShapeModel';

export class ShapeView {
    private shapeCountElement: HTMLInputElement;
    private surfaceAreaElement: HTMLInputElement;
    private gravityElement: HTMLInputElement;
    private shapesPerSecondElement: HTMLInputElement;

    constructor() {
        this.shapeCountElement = document.getElementById('shapeCount') as HTMLInputElement;
        this.surfaceAreaElement = document.getElementById('surfaceArea') as HTMLInputElement;
        this.gravityElement = document.getElementById('gravityValue') as HTMLInputElement;
        this.shapesPerSecondElement = document.getElementById('rateValue') as HTMLInputElement;
    }

    updateShapeCount(count: number): void {
        this.shapeCountElement.value = count.toString();
    }

    updateSurfaceArea(area: number): void {
        this.surfaceAreaElement.value = area.toFixed(2);
    }

    updateGravity(gravity: number): void {
        this.gravityElement.value = gravity.toFixed(1);
    }

    updateShapesPerSecond(shapesPerSecond: number): void {
        this.shapesPerSecondElement.value = shapesPerSecond.toString();
    }
}