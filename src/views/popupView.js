class PopupView {
  _popupContainerEl;

  addPopupHandler(handler) {
    window.addEventListener("DOMContentLoaded", handler);
  }

  initializePopupContainer() {
    this._popupContainerEl = document.querySelector(".rent-car-popup-section");
  }

  addButtonEvents(callBackFunction) {
    this.rentBtns = document.querySelectorAll(".rent-btn");
    this.rentBtns.forEach((btn) =>
      btn.addEventListener("click", function (e) {
        const clickedBtn = e.target.closest(".rent-btn");
        const btnId = Number(clickedBtn.getAttribute("data-id"));

        callBackFunction(btnId);
      })
    );
  }

  togglePopup(car) {
    const markup = this._generatePopupMarkup(car);
    this._popupContainerEl.innerHTML = ""; // Clear any existing content
    this._popupContainerEl.insertAdjacentHTML("beforeend", markup);

    // Toggle popup visibility
    if (this._popupContainerEl.classList.contains("show")) {
      this._popupContainerEl.classList.remove("show");
      this._popupContainerEl.classList.add("hide");
    } else {
      this._popupContainerEl.classList.remove("hide");
      this._popupContainerEl.classList.add("show");
    }
    this.closeBtnEvent();
    this.reserveBtnEvent(car);
  }

  closeBtnEvent() {
    const closeBtn = document.querySelector(".popup-icon");
    closeBtn.addEventListener("click", () => {
      this._popupContainerEl.classList.remove("show");
      this._popupContainerEl.classList.add("hide");
    });
  }

  reserveBtnEvent(car) {
    const popup = document.querySelector(".popup-content");
    const reserveBtn = document.querySelector(".reserve-btn");
    const markup = this._generateReserveMarkup(car);
    reserveBtn.addEventListener("click", () => {
      if (this._validateForm()) {
        popup.innerHTML = "";
        popup.insertAdjacentHTML("beforeend", markup);
      }
    });
  }

  _validateForm() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const number = document.getElementById("number").value.trim();
    const confirmNumber = document
      .getElementById("confirm-number")
      .value.trim();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !number || !confirmNumber) {
      alert("Please fill in all fields.");
      return false;
    }

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }

    if (number !== confirmNumber) {
      alert("Phone numbers do not match.");
      return false;
    }

    return true;
  }

  _generateReserveMarkup(car) {
    return `
    <div class="popup">
      <div class='popup-content'>
        <h2 class="popup-heading">Reservation Confirmed</h2>
        <p class="reservation-message">Your reservation for the ${car.make} ${car.model} has been successfully confirmed!</p>
        <p class="pickup-info">You can pick up your car at our store. Thank you for choosing us!</p>
        <div class="contact-info">
          <h3>Contact Us</h3>
          
          <p><strong>Phone:</strong> (123) 456-7890</p>
          <p><strong>Email:</strong> support@carrental.com</p>
          <p><strong>Address:</strong> 123 Car Lane, Auto City, AC 45678</p>
        </div>
      </div>
    </div>
    `;
  }

  _generatePopupMarkup(car) {
    return `
     <div class="popup">
      <ion-icon
        class="popup-icon"
        name="arrow-undo-circle-outline"
      ></ion-icon>
      <div class='popup-content'>
      <h2 class="popup-heading">Confirm Reservation</h2>
      <p class="car-name">${car.make} ${car.model}</p>
      <form class="popup-form" action="">
        <input class="form-input" id="name" type="text" placeholder="Name" />
        <input class="form-input" id="email" type="email" placeholder="Email" />
        <input
          class="form-input"
          id="number"
          type="number"
          placeholder="Number"
        />
        <input
          class="form-input"
          id="confirm-number"
          type="number"
          placeholder="Confirm Number"
        />
      </form>
      <button class="reserve-btn">Reserve</button>
      </div>
      
    </div>
    `;
  }
}

export default new PopupView();
