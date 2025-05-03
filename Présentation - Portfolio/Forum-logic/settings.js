
// settings.js

document.addEventListener("DOMContentLoaded", () => {
    console.log("Settings script chargé");

    const overlay = document.getElementById("background-overlay");
    if (!overlay) {
      console.warn("⚠️ Element #background-overlay not found");
      return;
    }
  
    const blurSlider = document.getElementById("bg-blur");
    const resetBtn = document.getElementById("reset-bg");
    const bgUploadInput = document.getElementById("bg-upload");
  
    // === Restore saved blur ===
    const savedBlur = localStorage.getItem("userBgBlur");
    if (savedBlur && overlay) {
      overlay.style.backdropFilter = `blur(${savedBlur})`;
      overlay.style.webkitBackdropFilter = `blur(${savedBlur})`;
      if (blurSlider) blurSlider.value = parseInt(savedBlur);
    }
  
    // === Background color ===
    const bgColorPicker = document.getElementById("bg-color-picker");
    const savedBgColor = localStorage.getItem("userBackgroundColor");
  
    if (bgColorPicker && savedBgColor) {
      bgColorPicker.value = savedBgColor;
      document.documentElement.style.setProperty("--bg-color", savedBgColor);
    }
  
    bgColorPicker?.addEventListener("input", (e) => {
      const color = e.target.value;
      localStorage.setItem("userBackgroundColor", color);
      document.documentElement.style.setProperty("--bg-color", color);
    });
  
    // === Accent color ===
    const accentColorPicker = document.getElementById("accent-color-picker");
    const savedAccent = localStorage.getItem("userAccentColor");
  
    if (accentColorPicker && savedAccent) {
      accentColorPicker.value = savedAccent;
      document.documentElement.style.setProperty("--accent", savedAccent);
    }
  
    accentColorPicker?.addEventListener("input", (e) => {
      const color = e.target.value;
      localStorage.setItem("userAccentColor", color);
      document.documentElement.style.setProperty("--accent", color);
    });
  
    // === Menu visibility ===
    const menuSwitch = document.getElementById("menu-switch");
    const savedPreference = localStorage.getItem("menuAlwaysVisible");
  
    if (menuSwitch) {
      menuSwitch.checked = savedPreference === "true";
  
      menuSwitch.addEventListener("change", (e) => {
        const isChecked = e.target.checked;
        localStorage.setItem("menuAlwaysVisible", isChecked.toString());
        localStorage.setItem("menuMouseEventsEnabled", (!isChecked).toString());
        console.log(`Menu always visible: ${isChecked}`);
        console.log(`Mouse events enabled: ${!isChecked}`);
      });
    }
  
    // === Background image upload ===
    bgUploadInput?.addEventListener("change", function (e) {
      const file = e.target.files[0];
      if (!file) return;
  
      const reader = new FileReader();
      reader.onload = function (event) {
        const imageUrl = event.target.result;
        localStorage.setItem("userBackgroundImage", imageUrl);
  
        if (overlay) {
          overlay.style.backgroundImage = `url(${imageUrl})`;
          overlay.style.backgroundSize = "cover";
          overlay.style.backgroundPosition = "center";
        }
      };
      reader.readAsDataURL(file);
    });
  
    // === Reset background ===
    resetBtn?.addEventListener("click", () => {
      localStorage.removeItem("userBackgroundImage");
      overlay.style.backgroundImage = "none";
      localStorage.removeItem("userBgBlur");
      overlay.style.backdropFilter = "blur(0px)";
      overlay.style.webkitBackdropFilter = "blur(0px)";
      if (blurSlider) blurSlider.value = 0;
    });
  
    // === Blur slider control ===
    blurSlider?.addEventListener("input", (e) => {
      const blurValue = `${e.target.value}px`;
      overlay.style.backdropFilter = `blur(${blurValue})`;
      overlay.style.webkitBackdropFilter = `blur(${blurValue})`;
      localStorage.setItem("userBgBlur", blurValue);
    });
  });