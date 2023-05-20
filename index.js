// example 1
var objective_function = "40x + 80y";
var constraints = ["2x + 3y <= 48", "x <= 15", "y <= 10", "x, y >= 0"];

const constraint_1 = "2x + 3y <= 48";
const constraint_2 = "x <= 15";
const constraint_3 = "y <= 10";

// example 2
// var objective_function = "15x + 10y";
// // var constraints = ["4x + 6y <= 360", "3x <= 180", "5y <= 200", "x, y >= 0"];
// var constraints = ["4x + 6y <= 360", "x <= 60", "y <= 40", "x, y >= 0"];

// const constraint_1 = "4x + 6y <= 360";
// const constraint_2 = "3x <= 180";
// const constraint_3 = "5y <= 200";

// // objective function
// let z_x1, z_x2;
// // constraints
// let c1_x1, c1_x2, c1_op, c1_c;
// let c2_x1, c2_x2, c2_op, c2_c;
// let c3_x1, c3_x2, c3_op, c3_c;

// let objective_function;

// let constraint_1;
// let constraint_2;
// let constraint_3;
// let constraints = [];

function get_input() {
  z_x1 = document.getElementById("z_x1").value;
  console.log("z_x1: ", z_x1);
  z_x2 = document.getElementById("z_x2").value;
  console.log("z_x2: ", z_x2);

  c1_x1 = document.getElementById("c1_x1").value;
  c1_x2 = document.getElementById("c1_x2").value;
  c1_op = document.getElementById("c1_op").value;
  c1_c = document.getElementById("c1_c").value;

  c2_x1 = document.getElementById("c2_x1").value;
  c2_x2 = document.getElementById("c2_x2").value;
  c2_op = document.getElementById("c2_op").value;
  c2_c = document.getElementById("c2_c").value;

  c3_x1 = document.getElementById("c3_x1").value;
  c3_x2 = document.getElementById("c3_x2").value;
  c3_op = document.getElementById("c3_op").value;
  c3_c = document.getElementById("c3_c").value;

  objective_function = `${z_x1}x + ${z_x2}y`;

  constraint_1 = `${c1_x1}x + ${c1_x2}y <= ${c1_c}`;
  constraint_2 = `${c2_x1}x + ${c2_x2}y <= ${c2_c}`;
  constraint_3 = `${c3_x1}x + ${c3_x2}y <= ${c3_c}`;

  console.log("objective function: ", objective_function);
  console.log("constraint 1: ", constraint_1);
  console.log("constraint 2: ", constraint_2);
  console.log("constraint 3: ", constraint_3);
}

function displayInput() {

  get_input();

  const obj_func = document.getElementById("objective-function");
  obj_func.innerHTML = `z = ${z_x1}x\u2081 + ${z_x2}x\u2082`;

  var num_of_constraints = 3;

  // const constraint_1 = `${c1_x1}x\u2081 + ${c1_x2}x\u2082 ${c1_op} ${c1_c}`;
  // const constraint_2 = `${c2_x1}x\u2081 + ${c2_x2}x\u2082 ${c2_op} ${c2_c}`;
  // const constraint_3 = `${c3_x1}x\u2081 + ${c3_x2}x\u2082 ${c3_op} ${c3_c}`;

  const ulElement = document.createElement('ul');

  const constraints = [constraint_1, constraint_2, constraint_3, "zxc"];
  constraints.forEach((constraint) => {
    const liElement = document.createElement('li');
    liElement.textContent = constraint;
    ulElement.appendChild(liElement);
  });

  const containerElement = document.getElementById("input-summary");
  containerElement.appendChild(ulElement);

}

function calculateMainLineCoordinates(cosntraint) {
  console.log("constraint in calculateMainLineCoordinates function: ", cosntraint);
  const regex = /(\d+)x \+ (\d+)y <= (\d+)/;
  const [, a, b, c] = cosntraint.match(regex).map(Number);

  const x = c / a;
  const y = c / b;

  return [x, y];
}

function getCoordinates_maineLine() {
  return [
    { x: 0, y: calculateMainLineCoordinates(constraint_1)[1] },
    { x: calculateMainLineCoordinates(constraint_1)[0], y: 0 },
  ];
}

function getx1y1(constraint1, constraint2) {
  // Change the "<=" to "=".
  const newConstraint1 = constraint1.replace("<=", "=");
  const newConstraint2 = constraint2.replace("<=", "=");

  // Solve for x and y.
  const x = solveForX(newConstraint1);
  const y = solveForY(newConstraint2);

  // Return the solution.
  return [x, y];
}

function solveForX(expression) {
  // Split the expression into an array of strings.
  const parts = expression.split(" ");

  // Get the value of x.
  const x = parseInt(parts[0], 10);

  // Get the value of the right-hand side of the equation.
  const rightHandSide = parseInt(parts[2], 10);

  // Solve for x.

  if (isNaN(x)) {
    return rightHandSide;
  }
  return rightHandSide / x;
}

function solveForY(expression) {
  // Split the expression into an array of strings.
  const parts = expression.split(" ");

  // Get the value of y.
  const y = parseInt(parts[0], 10);

  // Get the value of the right-hand side of the equation.
  const rightHandSide = parseInt(parts[2], 10);

  if (isNaN(y)) {
    return rightHandSide;
  } else {
    return rightHandSide / y;
  }
}

function getCoordinates_x1(scale_max) {
  return [
    { x: getx1y1(constraint_2, constraint_3)[0], y: 0 },
    { x: getx1y1(constraint_2, constraint_3)[0], y: scale_max },
  ];
}

function getCoordinates_y1(scale_max) {
  return [
    { x: 0, y: getx1y1(constraint_2, constraint_3)[1] },
    { x: scale_max, y: getx1y1(constraint_2, constraint_3)[1] },
  ];
}

function calculateIntersectionPoints(equations) {
  const intersectionPoints = [];

  // Extract coefficients and constant terms from the equations
  const eq1Coefficients = getEquationCoefficients(equations[0]);
  const eq1Const = eq1Coefficients.pop();

  const eq2Coefficients = getEquationCoefficients(equations[1]);
  const eq2Const = eq2Coefficients.pop();

  const eq3Coefficients = getEquationCoefficients(equations[2]);
  const eq3Const = eq3Coefficients.pop();

  // Calculate intersection point between equation 1 and equation 2
  if (eq1Coefficients[0] !== 0) {
    const x = eq2Const;
    const y = (eq1Const - eq1Coefficients[0] * x) / eq1Coefficients[1];
    intersectionPoints.push([x, y]);
  } else {
    const x = eq1Const / eq1Coefficients[1];
    const y = eq3Const;
    intersectionPoints.push([x, y]);
  }

  // Calculate intersection point between equation 1 and equation 3
  if (eq1Coefficients[1] !== 0) {
    const y = eq3Const;
    const x = (eq1Const - eq1Coefficients[1] * y) / eq1Coefficients[0];
    intersectionPoints.push([x, y]);
  } else {
    const x = eq1Const / eq1Coefficients[0];
    const y = eq2Const;
    intersectionPoints.push([x, y]);
  }

  return intersectionPoints;
}

function getEquationCoefficients(equation) {
  console.log("equation: ", equation);
  const coefficients = equation
    .match(/(-?\d+)\w/g)
    .map((coefficient) => parseInt(coefficient));
  return coefficients;
}

function calculateMidpoint(p1, p2) {
  const x1 = p1[0];
  const y1 = p1[1];
  const x2 = p2[0];
  const y2 = p2[1];

  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;

  return [midX, midY];
}

function getCoordinates_feasibleRegion(p1, p2) {
  const p4 = calculateMidpoint(p1, p2);
  return calculateMidpoint([0, 0], p4);
}

function getTablePointandCoordinates(scaleMax) {
  return [
    { point: "0", coordinates: [0, 0] },
    {
      point: "A",
      coordinates: [
        getCoordinates_x1(scaleMax)[0].x,
        getCoordinates_x1(scaleMax)[0].y,
      ],
    },
    { point: "B", coordinates: calculateIntersectionPoints(constraints)[0] },
    { point: "C", coordinates: calculateIntersectionPoints(constraints)[1] },
    {
      point: "D",
      coordinates: [
        getCoordinates_y1(scaleMax)[0].x,
        getCoordinates_y1(scaleMax)[0].y,
      ],
    },
  ];
}

function calculateObjectiveFunctionValue(z, points_coordinates) {
  const result_arr = [];
  const output = [];

  for (let i = 0; i < points_coordinates.length; i++) {
    const coordinates = points_coordinates[i].coordinates;

    const equation = z
      .replace(/x/g, `*(${coordinates[0]})`)
      .replace(/y/g, `*(${coordinates[1]})`);
    const result = eval(equation);

    result_arr.push(result);
    output.push(`${equation.split("*").join("")} = ${result}`);
  }

  return [output, result_arr];
}

function addToTable(z, points_coordinates, values) {
  const table = document.getElementById("table-body");

  // add objective function to table header
  const header = document.getElementById("table-z");
  header.textContent = `Objective Function Value (${z})`;

  // Create table rows with data
  for (let i = 0; i < points_coordinates.length; i++) {
    const row = table.insertRow();

    const pointCell = row.insertCell();
    pointCell.textContent = points_coordinates[i].point;

    const coordCell = row.insertCell();
    coordCell.textContent = `(${points_coordinates[i].coordinates[0]}, ${points_coordinates[i].coordinates[1]})`;

    const objectiveFunctionValue = row.insertCell();
    objectiveFunctionValue.textContent = values[i];
  }
}

function getConclusion(points_coordinates, values) {
  // Get the index of the highest value
  const highestValueIndex = values.indexOf(Math.max(...values));

  // Get the point and coordinates based on the highest value index
  const { point, coordinates } = points_coordinates[highestValueIndex];

  // Update the <p> element with the conclusion
  const conclusionElement = document.getElementById("conclusion");
  conclusionElement.textContent = `Choose point ${point} with values ${coordinates[0]} for x1, and ${coordinates[1]} for x2 which yields a profit of ${values[highestValueIndex]}.`;
}

function getScaleMax() {
  let values = [];

  values.push(calculateMainLineCoordinates(constraint_1));
  values.push(getx1y1(constraint_2, constraint_3));

  // Merge the arrays.
  const mergedArray = values.reduce((a, b) => {
    for (let i = 0; i < b.length; i++) {
      a.push(b[i]);
    }
    return a;
  });

  // Get the maximum element.
  return Math.max(...mergedArray) + 10;
}

function calculate() {
  displayInput();
}
addToTable(objective_function, getTablePointandCoordinates(getScaleMax()), calculateObjectiveFunctionValue(objective_function, getTablePointandCoordinates(getScaleMax()))[0]);
getConclusion(getTablePointandCoordinates(getScaleMax()), calculateObjectiveFunctionValue(objective_function, getTablePointandCoordinates(getScaleMax()))[1]);



