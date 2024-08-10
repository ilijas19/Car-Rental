class HeaderFooterView {
  async loadHeader() {
    try {
      const headerHTML = await this._fetchHTML("header.html");
      this._insertHTML("header-placeholder", headerHTML);
      this._setupMenuEventListeners();
    } catch (error) {
      console.error("Error loading header:", error);
    }
  }

  async loadFooter() {
    try {
      const footerHTML = await this._fetchHTML("footer.html");
      this._insertHTML("footer-placeholder", footerHTML);
    } catch (error) {
      console.error("Error loading footer:", error);
    }
  }

  async _fetchHTML(url) {
    const response = await fetch(url);
    return response.text();
  }

  _insertHTML(elementId, html) {
    document.getElementById(elementId).innerHTML = html;
  }

  _setupMenuEventListeners() {
    const absoluteDiv = document.querySelector(".absolute-div");
    const closeIcon = document.querySelector(".close-icon");
    const phoneMenu = document.querySelector(".phone-menu");
    const phoneMenuLinks = document.querySelectorAll(".absolute-item");

    const toggleMenu = (action) => {
      if (action === "open") {
        absoluteDiv.style.right = "0";
        absoluteDiv.style.width = "100%";
      } else {
        absoluteDiv.style.right = "-35rem";
        absoluteDiv.style.width = "0%";
      }
    };

    closeIcon.addEventListener("click", () => toggleMenu("close"));
    phoneMenu.addEventListener("click", () => toggleMenu("open"));

    phoneMenuLinks.forEach((link) => {
      link.addEventListener("click", () => toggleMenu("close"));
    });
  }

  addHandlerHeaderFooter(handler) {
    window.addEventListener("DOMContentLoaded", handler);
  }
}

export default new HeaderFooterView();
