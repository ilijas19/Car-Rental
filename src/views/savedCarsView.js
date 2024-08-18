import View from "./View.js";

class SavedCarsView extends View {
  _parentEl;

  addBookmarkBtnHandler(handler) {
    const bookmarkBtns = document.querySelectorAll(".info-icon");
    bookmarkBtns.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        const clickedBtn = e.target.closest(".info-icon");

        // Toggle the name attribute between "bookmark-outline" and "bookmark"
        if (clickedBtn.name === "bookmark-outline") {
          clickedBtn.name = "bookmark";
          const clickedBtnValue = Number(clickedBtn.getAttribute("data-id"));
          handler(clickedBtnValue, "ADD");
        } else {
          clickedBtn.name = "bookmark-outline";
          const clickedBtnValue = Number(clickedBtn.getAttribute("data-id"));
          handler(clickedBtnValue, "REMOVE");
        }
      });
    });
  }

  removeSavedCarHandler(handler) {
    // Assume the parent element of the bookmark buttons is `.saved-cars-container`
    const container = document.querySelector(".our-cars");
    if (!container) return;

    container.addEventListener("click", function (e) {
      const clickedBtn = e.target.closest(".info-icon");
      if (!clickedBtn) return;

      const clickedBtnValue = Number(clickedBtn.getAttribute("data-id"));
      handler(clickedBtnValue);
    });
  }

  addSavedCarsPageHandler(handler) {
    if (
      window.location.href.includes("saved.html") ||
      window.location.href.includes("saved")
    ) {
      handler();
      this._removePaginationBtns();
    }
  }

  render(data) {
    this._parentEl = document.querySelector(".our-cars");
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
            name="${car.saved ? "bookmark" : "bookmark-outline"}"
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
  _removePaginationBtns() {
    const paginationBtnDiv = document.querySelector(".next-prev-div");
    paginationBtnDiv.style.display = "none";
  }
}

export default new SavedCarsView();
