# Falling Shapes Simulation

This project is a falling shapes simulation built using **PIXI.js**. Random shapes with random colors are generated above a rectangular area and fall due to gravity. Users can interact by clicking on the shapes to remove them or generate new shapes by clicking inside the rectangle.

## Features

- **Shape Types**:
  - Triangle (3 sides)
  - Square (4 sides)
  - Pentagon (5 sides)
  - Hexagon (6 sides)
  - Circle
  - Ellipse
  - Random (combination of different shapes)

- **Interaction**:
  - **Click to generate**: A new shape is generated at the clicked position and starts falling.
  - **Click to remove**: Shapes will disappear when clicked.

- **Dynamic Controls**:
  - **Gravity control**: You can increase or decrease gravity, affecting the speed of falling shapes.
  - **Shape generation rate**: Adjust the number of shapes generated per second.

- **Shape Count and Area**:
  - **Shape Count**: Shows the current number of shapes.
  - **Total Area**: Shows the total surface area (in px²) occupied by the shapes.

 
## Video Demonstration

Check out the video demonstration of the project [here](https://drive.google.com/file/d/1uFvIgT3pRe1Ptxl8aPv77K_vjKft4mnf/view?usp=sharing).

## How to Use

### Prerequisites

- **Node.js** installed

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Yegorikk/falling-shapes.git
    ```

2. Navigate to the project directory:

    ```bash
    cd falling-shapes
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Start the development server:

    ```bash
    npm run start
    ```

## Code Structure

- **ShapeModel**: Defines shape properties (type, color, position, area, and how it is drawn).
- **ShapeController**: Handles shape generation, updates positions due to gravity, and manages user interactions.
- **ShapeView**: Displays the shape count, total area, and user control inputs.

## Technologies Used

- **PIXI.js**: Used for 2D rendering.
- **TypeScript**: For type-safe development.
- **SCSS**: For styling.
