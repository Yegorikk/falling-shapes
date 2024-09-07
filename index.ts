import * as PIXI from 'pixi.js';
import { ShapeController } from './src/controller/ShapeController';
import { ShapeView } from './src/view/ShapeView';

let app;

function initApp() {
    const canvasContainer = document.getElementById('canvas-container');
    
    app = new PIXI.Application({
        width: canvasContainer?.clientWidth,
        height: canvasContainer?.clientHeight,
        backgroundColor: 0xffffff
    });

    canvasContainer?.appendChild(app.view as HTMLCanvasElement);
    const shapeView = new ShapeView();
    const shapeController = new ShapeController(app, shapeView);

    app.ticker.add((delta) => shapeController.updateShapes(delta));
}

window.onload = initApp;