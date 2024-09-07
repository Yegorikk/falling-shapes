import { ShapeModel, ShapeType } from "../model/ShapeModel";
import { ShapeView } from "../view/ShapeView";
import * as PIXI from "pixi.js";

export class ShapeController {
  private app: PIXI.Application;
  private gravity: number;
  private shapes: ShapeModel[];
  private view: ShapeView;
  private lastFrameTime: number = 0;
  private timeSinceLastShape: number = 0;
  private shapesPerSecond: number;
  private isClickOnShape: boolean = false;

  constructor(app: PIXI.Application, view: ShapeView) {
    this.app = app;
    this.shapes = [];
    this.view = view;
    this.shapesPerSecond = 0;
    this.gravity = 1;
    this.app.view?.addEventListener("click", (event: Event) =>
      this.handleCanvasClick(event as MouseEvent)
    );
    this.linkControls();
    this.startGameLoop();
  }

  private startGameLoop(): void {
    this.lastFrameTime = performance.now();
    this.gameLoop(this.lastFrameTime);
  }

  private gameLoop(currentTime: number): void {
    const deltaTime = (currentTime - this.lastFrameTime) / 1000;
    this.lastFrameTime = currentTime;

    this.updateShapes(deltaTime);

    this.timeSinceLastShape += deltaTime;
    const shapeInterval = 1 / this.shapesPerSecond;
    if (this.shapesPerSecond > 0 && this.timeSinceLastShape >= shapeInterval) {
      this.generateShape();
      this.timeSinceLastShape = 0;
    }

    requestAnimationFrame(this.gameLoop.bind(this));
  }

  private handleCanvasClick(event: MouseEvent): void {
    if (this.isClickOnShape) {
      this.isClickOnShape = false;
      return;
    }

    this.generateShape(event);
  }

  private linkControls(): void {
    const increaseGravityButton = document.getElementById(
      "increaseGravity"
    ) as HTMLButtonElement;
    const decreaseGravityButton = document.getElementById(
      "decreaseGravity"
    ) as HTMLButtonElement;
    const increaseRateButton = document.getElementById(
      "increaseRate"
    ) as HTMLButtonElement;
    const decreaseRateButton = document.getElementById(
      "decreaseRate"
    ) as HTMLButtonElement;

    increaseGravityButton.addEventListener("click", () =>
      this.increaseGravity()
    );
    decreaseGravityButton.addEventListener("click", () =>
      this.decreaseGravity()
    );
    increaseRateButton.addEventListener("click", () =>
      this.increaseShapesPerSecond()
    );
    decreaseRateButton.addEventListener("click", () =>
      this.decreaseShapesPerSecond()
    );
  }

  private generateShape(mouseEvent?: MouseEvent): void {
    let x: number;
    let y: number;

    if (mouseEvent) {
      const rect = this.app.view.getBoundingClientRect() as DOMRect;
      x = mouseEvent.clientX - rect.left;
      y = mouseEvent.clientY - rect.top;
    } else {
      x = Math.random() * this.app.view.width;
      y = -40;
    }

    const randomType = this.getRandomShapeType();
    const randomColor = Math.random() * 0xffffff;
    const shape = new ShapeModel(
      randomType as ShapeType,
      x,
      y,
      randomColor,
      this.app
    );

    this.shapes.push(shape);
    this.view.updateShapeCount(this.shapes.length);
    this.view.updateSurfaceArea(this.calculateTotalArea());

    shape.shapeGraphic.on("pointerdown", () => {
      this.isClickOnShape = true;
      this.changeColorOfSimilarShapes(shape);
      this.removeShape(shape, mouseEvent);
    });
  }

  updateShapes(deltaTime: number): void {
    const gravitySpeed = this.gravity * deltaTime;

    this.shapes.forEach((shape) => {
      shape.update(gravitySpeed);
      if (shape.isOutOfBounds()) {
        this.removeShape(shape);
      }
    });
  }

  increaseShapesPerSecond(): void {
    this.shapesPerSecond++;
    this.view.updateShapesPerSecond(this.shapesPerSecond);
  }

  decreaseShapesPerSecond(): void {
    if (this.shapesPerSecond > 0) {
      this.shapesPerSecond--;
      this.view.updateShapesPerSecond(this.shapesPerSecond);
    }
  }

  private getRandomShapeType(): ShapeType {
    const shapeTypes = Object.values(ShapeType);
    const randomIndex = Math.floor(Math.random() * shapeTypes.length);
    return shapeTypes[randomIndex];
  }

  increaseGravity(): void {
    this.gravity += 1;
    this.view.updateGravity(this.gravity);
  }

  decreaseGravity(): void {
    if (this.gravity > 1) {
      this.gravity -= 1;
    }
    this.view.updateGravity(this.gravity);
  }

  removeShape(shape: ShapeModel, mouseEvent?: MouseEvent): void {
    const index = this.shapes.indexOf(shape);
    if (index !== -1) {
      this.shapes.splice(index, 1);
      if (shape.shapeGraphic && shape.shapeGraphic.parent) {
        this.view.updateShapeCount(this.shapes.length);
        this.view.updateSurfaceArea(this.calculateTotalArea());
        shape.shapeGraphic.destroy();
      }
    }
  }

  calculateTotalArea(): number {
    return this.shapes.reduce((total, shape) => total + shape.getArea(), 0);
  }

  private changeColorOfSimilarShapes(clickedShape: ShapeModel): void {
    this.shapes.forEach((shape) => {
      if (shape.type === clickedShape.type) {
        if (shape.shapeGraphic) {
          shape.changeColor();
        }
      }
    });
  }
}
