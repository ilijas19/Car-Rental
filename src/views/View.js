export default class View {
  rentBtns;
  render(data) {
    if (!this._parentEl) return;
    this._data = data;
    this._clear();
    data.forEach((car) => {
      this._parentEl.insertAdjacentHTML("beforeend", this._generateMarkup(car));
    });
  }

  _generateMarkup(car) {
    return `
    <div class="our-car">
        <div class="our-car-text-div">
          <p class="our-car-name">${car.make} ${car.model}</p>
          <ion-icon
            class="info-icon"
            name="bookmark-outline"
            data-id="${car.id}"
            ></ion-icon>
        </div>
        <img class="our-car-img" src="${car.image}" alt="our-car" />
        <p class="id" >Car ID: ${car.id}</p>
        <div class="our-car-price-div">
          <p class="per-day">Per Day</p>
          <p class="price">${car.price_per_day} EUR</p>
          <a class="rent-btn" data-id='${car.id}'> Rent Now </a>
        </div>
      </div>
    `;
  }

  _clear() {
    this._parentEl.innerHTML = "";
  }
}
