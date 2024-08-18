import View from "./View.js";

class SavedCarsView extends View {
  _parentEl = document.querySelector(".saved-cars");

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

  addSavedCarsPageHandler() {
    if (
      window.location.href.includes("saved.html") ||
      window.location.href.includes("saved")
    ) {
      console.log("rendering saved cars");
    }
  }
}

export default new SavedCarsView();
