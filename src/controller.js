import * as model from "./model.js";
import headerFooterView from "./views/headerFooterView.js";
import featuredCarsView from "./views/featuredCarsView.js";
import ourCarsView from "./views/ourCarsView.js";
import filterView from "./views/filterView.js";
import popupView from "./views/popupView.js";
import View from "./views/View.js";

//loading header and footer controller
const headerFooterControl = async function () {
  await headerFooterView.loadHeader();
  await headerFooterView.loadFooter();
};

const featuredCarsControl = async function () {
  try {
    //loading all cars
    await model.loadCars();
    //rendering featured cars
    featuredCarsView.render(model.state.cars);
  } catch (error) {
    console.error(error);
  }
};

const ourCarsControl = async function () {
  // Load all cars into the state
  await model.loadCars();

  // Set the initial cars to be displayed
  model.loadNumberOfCars(model.state.cars);
  ourCarsView.render(model.state.carsToBeDisplayed);

  // Set events to the page buttons and filtering
  ourCarsView.setBtnEvents(function (query) {
    model.changePage(query);
    // Render cars after changing the page
    ourCarsView.render(model.state.carsToBeDisplayed);
  });
  //adding event listener for rent now btn
  /////
  popupControl();
};

const filterCarsControl = function () {
  filterView.setSelectListener(function (filterCarName) {
    model.filterCars(filterCarName);
    // Render filtered cars
    filterView.render(model.state.filteredCars);

    //adding event listener for rent now btn
    /////
    popupControl();
  });
};

const popupControl = function () {
  popupView.initializePopupContainer(); // Ensure the container is found
  popupView.addButtonEvents(function (id) {
    model.findCar(id);

    // console.log(model.state.currentCar);
    popupView.togglePopup(model.state.currentCar);
  });
};

const init = async function () {
  try {
    headerFooterView.addHandlerHeaderFooter(headerFooterControl);
    featuredCarsView.addHandlerFeaturedCars(featuredCarsControl);
    ourCarsView.addHandlerOurCars(ourCarsControl);
    filterView.addFilterHandler(filterCarsControl);
  } catch (error) {
    console.error(error);
  }
};
init();
