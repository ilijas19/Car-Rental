import View from "./View.js";
class FeaturedCarsView extends View {
  _parentEl = document.querySelector(".featured-cars");

  render(data) {
    if (!this._parentEl) return;
    this._clear();
    const featuredCars = data.filter((car) => car.featuredCar === 1);
    featuredCars.forEach((car) => {
      this._parentEl.insertAdjacentHTML("beforeend", this._generateMarkup(car));
    });
  }

  addHandlerFeaturedCars(handler) {
    if (
      window.location.href.includes("index.html") ||
      window.location.href.includes("index")
    ) {
      handler();
    }
  }
}
export default new FeaturedCarsView();
