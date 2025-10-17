const fs = require('fs');
const path = require('path');

const carsFile = path.join(__dirname, 'cars.json');

function readCars() {
  if (!fs.existsSync(carsFile)) {
    fs.writeFileSync(carsFile, '[]');
  }

  const data = fs.readFileSync(carsFile, 'utf8').trim();

  if (!data) return [];

  try {
    return JSON.parse(data);
  } catch {
    console.log('Invalid JSON detected, resetting cars.json');
    fs.writeFileSync(carsFile, '[]');
    return [];
  }
}

function writeCars(cars) {
  fs.writeFileSync(carsFile, JSON.stringify(cars, null, 2));
}

const [,, command, arg2, arg3, arg4] = process.argv;

if (command && !['show'].includes(command)) {
  addCar(command, arg2, arg3);
}

else if (command === 'show') {
  showCars(arg2);
}

else {
  console.log('Usage:');
  console.log('Add car → node car.js <carName> <carReleaseDate> <carColor>');
  console.log('Show cars → node car.js show <year|color>');
}

function addCar(carName, carReleaseDate, carColor) {
  if (!carName || !carReleaseDate || !carColor) {
    console.log('Please provide car name, release date, and color.');
    return;
  }

  const cars = readCars();

  const newCar = {
    carName,
    carReleaseDate,
    carColor
  };

  cars.push(newCar);
  writeCars(cars);
  console.log(`Added car: ${carName} (${carReleaseDate}, ${carColor})`);
}

function showCars(filter) {
  const cars = readCars();

  if (!filter) {
    console.log('Please specify a year or color to filter.');
    return;
  }

  const filteredCars = cars.filter(car =>
    car.carReleaseDate === filter || car.carColor.toLowerCase() === filter.toLowerCase()
  );

  if (filteredCars.length === 0) {
    console.log(`No cars found for filter: ${filter}`);
    return;
  }

  console.log(`Cars matching "${filter}":`);
  filteredCars.forEach(car =>
    console.log(`- ${car.carName} (${car.carReleaseDate}, ${car.carColor})`)
  );
}
