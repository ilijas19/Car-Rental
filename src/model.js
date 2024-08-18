import { defaultCarPage, resultsPerPage } from "./config.js";
import ourCarsView from "./views/ourCarsView.js";

export const state = {
  cars: [],
  carsToBeDisplayed: [],
  currentCarPage: defaultCarPage, //1
  resultsPerPage: resultsPerPage, //6
  filteredCars: [],
  savedCars: [],
};

export const loadCars = async function () {
  try {
    const response = await fetch("../cars.json");
    if (!response.ok) throw new Error("Error fetching cars:");

    const data = await response.json();
    state.cars = data;

    // Retrieve saved cars from local storage
    const savedCars = JSON.parse(localStorage.getItem("savedCars")) || [];

    // Update state.cars with the saved status from local storage
    state.cars.forEach((car) => {
      const savedCar = savedCars.find((saved) => saved.id === car.id);
      car.saved = savedCar ? savedCar.saved : false;
    });
  } catch (error) {
    console.error(error);
  }
};

export const loadNumberOfCars = function (carArr) {
  const start = (state.currentCarPage - 1) * state.resultsPerPage;
  const end = state.currentCarPage * state.resultsPerPage;
  state.carsToBeDisplayed = carArr.slice(start, end);
};

export const changePage = function (query) {
  const maxCarPage = Math.ceil(state.cars.length / resultsPerPage);

  if (query === "next" && state.currentCarPage < maxCarPage) {
    state.currentCarPage++;
  }
  if (query === "last" && state.currentCarPage > 1) {
    state.currentCarPage--;
  }
  loadNumberOfCars(state.cars);
};

export const filterCars = function (filterCarName) {
  const btnDiv = document.querySelector(".next-prev-div");
  if (filterCarName === "all") {
    btnDiv.style.opacity = 1;
    state.filteredCars = state.carsToBeDisplayed;
  } else {
    btnDiv.style.opacity = 0;
    state.filteredCars = state.cars.filter((car) => car.make === filterCarName);
  }
};

export const findCar = function (id) {
  const car = state.cars.find((car) => car.id === id);
  state.currentCar = car;
  // console.log(state.currentCar);
};

export const findSaved = function (id) {
  const car = state.savedCars.find((car) => car.id === id);
  state.currentCar = car;
  // console.log(state.currentCar);
};
// Save or remove a car from savedCars and local storage
export const saveCar = function (id, query) {
  const car = state.cars.find((car) => car.id === id);
  if (!car) return; // Car not found

  if (query === "ADD") {
    // Add car to savedCars if not already present
    if (!state.savedCars.find((saved) => saved.id === id)) {
      state.savedCars.push({ ...car, saved: true });
      car.saved = true;
    }
  } else if (query === "REMOVE") {
    // Remove car from savedCars
    state.savedCars = state.savedCars.filter((savedCar) => savedCar.id !== id);
    car.saved = false;
  }

  // Update local storage with the current state of savedCars
  localStorage.setItem("savedCars", JSON.stringify(state.savedCars));
};

export const initializeSavedCars = function () {
  const savedCars = JSON.parse(localStorage.getItem("savedCars")) || [];
  state.savedCars = savedCars;

  // Update state.cars with the saved status from local storage
  state.cars.forEach((car) => {
    const savedCar = savedCars.find((saved) => saved.id === car.id);
    car.saved = savedCar ? savedCar.saved : false;
  });
};

export const removeSavedCar = function (id) {
  console.log("removing", id);
  // Find the car to remove
  const car = state.savedCars.find((car) => car.id === id);
  console.log(car);
  if (!car) return; // Car not found

  // Remove car from savedCars array
  state.savedCars = state.savedCars.filter((savedCar) => savedCar.id !== id);

  // Update the car's saved status to false
  car.saved = false;

  // Update local storage
  localStorage.setItem("savedCars", JSON.stringify(state.savedCars));
};
