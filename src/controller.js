import * as model from "./model.js";
import headerFooterView from "./views/headerFooterView.js";
import featuredCarsView from "./views/featuredCarsView.js";
import ourCarsView from "./views/ourCarsView.js";
import filterView from "./views/filterView.js";
import popupView from "./views/popupView.js";
import savedCarsView from "./views/savedCarsView.js";

const headerFooterControl = async function () {
  await headerFooterView.loadHeader();
  await headerFooterView.loadFooter();
};

const featuredCarsControl = async function () {
  try {
    // Load all cars and initialize saved cars
    await model.loadCars();
    model.initializeSavedCars(); // Initialize saved cars

    // Render featured cars
    featuredCarsView.render(model.state.cars);

    // Add bookmark button functionality
    savedCarsView.addBookmarkBtnHandler(model.saveCar);
    // Add event listener for "rent now" button
    popupControl();
  } catch (error) {
    console.error(error);
  }
};

const ourCarsControl = async function () {
  try {
    // Load all cars and initialize saved cars
    await model.loadCars();
    model.initializeSavedCars(); // Initialize saved cars

    // Set the initial cars to be displayed
    model.loadNumberOfCars(model.state.cars);
    ourCarsView.render(model.state.carsToBeDisplayed);

    // Set events for page buttons and filtering
    ourCarsView.setBtnEvents(function (query) {
      model.changePage(query);
      // Render cars after changing the page
      ourCarsView.render(model.state.carsToBeDisplayed);
      // Add bookmark button functionality
      savedCarsView.addBookmarkBtnHandler(model.saveCar);
      popupControl();
    });
    popupControl();

    // Add event listener for "rent now" button

    // Add bookmark button functionality
    savedCarsView.addBookmarkBtnHandler(model.saveCar);
  } catch (error) {
    console.error(error);
  }
};

const filterCarsControl = function () {
  filterView.setSelectListener(function (filterCarName) {
    model.filterCars(filterCarName);
    // Render filtered cars
    filterView.render(model.state.filteredCars);

    // Add event listener for "rent now" button
    popupControl();

    // Add bookmark button functionality
    savedCarsView.addBookmarkBtnHandler(model.saveCar);
  });
};

const popupControl = function () {
  popupView.initializePopupContainer(); // Ensure the container is found
  popupView.addButtonEvents(function (id) {
    model.findCar(id);

    popupView.togglePopup(model.state.currentCar);
  });
};
const popupSavedCarControl = function () {
  popupView.initializePopupContainer(); // Ensure the container is found
  popupView.addButtonEvents(function (id) {
    model.findSaved(id);
    popupView.togglePopup(model.state.currentCar);
  });
};

const savedCarsControl = function () {
  model.initializeSavedCars();
  savedCarsView.render(model.state.savedCars);
  popupView.addPopupHandler(popupSavedCarControl);
  savedCarsView.removeSavedCarHandler(function (id) {
    model.removeSavedCar(id);
    savedCarsView.render(model.state.savedCars);
  });
};

const init = async function () {
  try {
    // Initialize header and footer
    headerFooterView.addHandlerHeaderFooter(headerFooterControl);

    // Initialize featured cars view
    featuredCarsView.addHandlerFeaturedCars(featuredCarsControl);

    // Initialize our cars view
    ourCarsView.addHandlerOurCars(ourCarsControl);

    // Initialize filter view
    filterView.addFilterHandler(filterCarsControl);

    // Initialize saved cars view
    savedCarsView.addSavedCarsPageHandler(savedCarsControl);
  } catch (error) {
    console.error(error);
  }
};

init();
