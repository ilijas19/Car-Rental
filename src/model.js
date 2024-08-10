import { defaultCarPage, resultsPerPage } from "./config.js";
import ourCarsView from "./views/ourCarsView.js";

export const state = {
  cars: [],
  carsToBeDisplayed: [],
  currentCarPage: defaultCarPage, //1
  resultsPerPage: resultsPerPage, //6
  filteredCars: [],
};

export const loadCars = async function () {
  try {
    const response = await fetch("../cars.json");
    if (!response.ok) throw new Error("Error fetching cars:");

    const data = await response.json();
    state.cars = data;
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
