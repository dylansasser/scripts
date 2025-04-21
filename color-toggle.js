/*
Original Script: 

Copyright (c) 2023 timothydesign

MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Modified by Dylan Sasser, 2025

Modifications: 

Original Script URL: https://github.com/flowtricks/scripts/blob/948dc19e1cdcdaa70a4422f7c2a90fc4a8b8e20b/dark-mode-toggle.js

*/

function colorModeToggle() {
    function attr(defaultVal, attrVal) {
      const defaultValType = typeof defaultVal;
      if (typeof attrVal !== "string" || attrVal.trim() === "") return defaultVal;
      if (attrVal === "true" && defaultValType === "boolean") return true;
      if (attrVal === "false" && defaultValType === "boolean") return false;
      if (isNaN(attrVal) && defaultValType === "string") return attrVal;
      if (!isNaN(attrVal) && defaultValType === "number") return +attrVal;
      return defaultVal;
    }
  
    const htmlElement = document.documentElement;
    const computed = getComputedStyle(htmlElement);
    let toggleEl;
    let togglePressed = "false";
  
    const scriptTag = document.querySelector("[tr-color-vars]");
    if (!scriptTag) {
      console.warn("Script tag with tr-color-vars attribute not found");
      return;
    }
  
    let colorModeDuration = attr(0.5, scriptTag.getAttribute("duration"));
    let colorModeEase = attr("power1.out", scriptTag.getAttribute("ease"));
  
    const cssVariables = scriptTag.getAttribute("tr-color-vars");
    if (!cssVariables.length) {
      console.warn("Value of tr-color-vars attribute not found");
      return;
    }
  
    let lightColors = {};
    let darkColors = {};
    cssVariables.split(",").forEach(function (item) {
      let lightValue = computed.getPropertyValue(`--color--${item}`);
      let darkValue = computed.getPropertyValue(`--dark--${item}`);
      if (lightValue.length) {
        if (!darkValue.length) darkValue = lightValue;
        lightColors[`--color--${item}`] = lightValue;
        darkColors[`--color--${item}`] = darkValue;
      }
    });
  
    if (!Object.keys(lightColors).length) {
      console.warn("No variables found matching tr-color-vars attribute value");
      return;
    }
  
    function setColors(colorObject, animate) {
      if (typeof gsap !== "undefined" && animate) {
        gsap.to(htmlElement, {
          ...colorObject,
          duration: colorModeDuration,
          ease: colorModeEase,
        });
      } else {
        Object.keys(colorObject).forEach(function (key) {
          htmlElement.style.setProperty(key, colorObject[key]);
        });
      }
    }
  
    function goDark(dark, animate) {
      if (dark) {
        localStorage.setItem("dark-mode", "true");
        htmlElement.classList.add("dark-mode");
        setColors(darkColors, animate);
        togglePressed = "true";
      } else {
        localStorage.setItem("dark-mode", "false");
        htmlElement.classList.remove("dark-mode");
        setColors(lightColors, animate);
        togglePressed = "false";
      }
      if (typeof toggleEl !== "undefined") {
        toggleEl.forEach(function (element) {
          element.setAttribute("aria-pressed", togglePressed);
        });
      }
    }
  
    function checkPreference(e) {
      goDark(e.matches, false);
    }
    const colorPreference = window.matchMedia("(prefers-color-scheme: dark)");
    colorPreference.addEventListener("change", (e) => {
      checkPreference(e);
    });
  
    let storagePreference = localStorage.getItem("dark-mode");
    if (storagePreference !== null) {
      storagePreference === "true" ? goDark(true, false) : goDark(false, false);
    } else {
      checkPreference(colorPreference);
    }
  
    window.addEventListener("DOMContentLoaded", (event) => {
      toggleEl = document.querySelectorAll("[tr-color-toggle]");
      toggleEl.forEach(function (element) {
        element.setAttribute("aria-label", "View Dark Mode");
        element.setAttribute("role", "button");
        element.setAttribute("aria-pressed", togglePressed);
      });
      document.addEventListener("click", function (e) {
        const targetElement = e.target.closest("[tr-color-toggle]");
        if (targetElement) {
          let darkClass = htmlElement.classList.contains("dark-mode");
          darkClass ? goDark(false, true) : goDark(true, true);
        }
      });
    });
  }
  colorModeToggle();
  