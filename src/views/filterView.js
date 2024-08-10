import View from "./View.js";
class FilterView extends View {
  _parentEl = document.querySelector(".our-cars");

  setSelectListener(callBackFunction) {
    const selectEl = document.querySelector(".select");
    if (!selectEl) return;
    selectEl.addEventListener("change", function () {
      callBackFunction(selectEl.value);
    });
  }
  addFilterHandler(handler) {
    window.addEventListener("DOMContentLoaded", handler);
  }
}

export default new FilterView();
