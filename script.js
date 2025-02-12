"use strict";

// Timer buttons
let startBtn = document.getElementById("start");
let stopBtn = document.getElementById("stop");
let resetBtn = document.getElementById("reset");

// New categories
let newCategory = document.querySelector(".new-category-button");
let categoryID = 1;
let category0 = document.getElementById("category0");

// Create Web Worker
let worker = new Worker("worker.js");

// =======================================
// Listen for messages from the worker
// =======================================

worker.onmessage = function (e) {
  let { hour, minute, second, count } = e.data;

  let hrString = hour < 10 ? "0" + hour : hour;
  let minString = minute < 10 ? "0" + minute : minute;
  let secString = second < 10 ? "0" + second : second;
  let countString = count < 10 ? "0" + count : count;

  document.getElementById("hr").innerHTML = hrString;
  document.getElementById("min").innerHTML = minString;
  document.getElementById("sec").innerHTML = secString;
  document.getElementById("count").innerHTML = countString;
};

// ===========================
// Timer button click events
// ===========================

startBtn.addEventListener("click", function () {
  worker.postMessage("start");
  startBtn.style.display = "none";
  stopBtn.style.display = "block";
});

stopBtn.addEventListener("click", function () {
  worker.postMessage("stop");
  startBtn.style.display = "block";
  stopBtn.style.display = "none";
});

resetBtn.addEventListener("click", function () {
  worker.postMessage("reset");
  startBtn.style.display = "block";
  stopBtn.style.display = "none";
});

// =============================
// Create new categories
// =============================

newCategory.addEventListener("click", function () {
  // Create new categories and increase categoryID
  let firstCategory = category0;
  let clonedCategory = firstCategory.cloneNode(true); // Create deep clone
  clonedCategory.style.display = "flex";
  const parentElement = document.querySelector(".category-container");

  // Place new category under the previous, within the category-container
  parentElement.appendChild(clonedCategory);

  // Set's the id of the new category
  clonedCategory.id = `category${categoryID}`;

  // Accessing color icon and input
  let clonedColorIcon = clonedCategory.querySelector(".color-icon");
  let clonedCategoryInput = clonedCategory.querySelector(".category-input");

  // Set color-icon ID
  clonedColorIcon.id = `color-icon${categoryID}`;

  // Set category input id and reset value
  clonedCategoryInput.id = `category-input${categoryID}`;
  clonedCategoryInput.value = "";

  categoryID++;
});

// ======================
// Change hover icons
// ======================

// Event delegation for hover effect on color icons
// document.addEventListener("mouseover", function (e) {
//   if (e.target.classList.contains("color-icon")) {
//     e.target.style.backgroundColor = "transparent";
//     e.target.style.border = "none";
//     e.target.style.cursor = "pointer";
//     e.target.style.fontSize = "20px";
//     e.target.style.alignItems = "center";
//     e.target.style.justifyContent = "center";
//     e.target.style.color = "red";
//     e.target.innerHTML = "X";
//   }
// });

// Event delegation for mouseout to reset styles when no longer hovering
// document.addEventListener("mouseout", function (e) {
//   if (e.target.classList.contains("color-icon")) {
//     const targetId = e.target.id;
//     const color = targetId.slice(-1);

//     e.target.style.backgroundColor = "white";
//     e.target.style.border = "white";
//     e.target.style.cursor = "pointer";
//     e.target.style.fontSize = "";
//     e.target.style.alignItems = "";
//     e.target.style.justifyContent = "";
//     e.target.style.color = "";
//     e.target.innerHTML = "";
//   }
// });

// Event delegation for deleting categories when clicking on a color icon
// document.addEventListener("click", (e) => {
//   // Check if the clicked element is inside a color icon
//   if (e.target.closest(".color-icon")) {
//     const categoryToRemove = e.target.closest(".category"); // Find the closest parent category container

//     // Remove the category container if it exists
//     if (categoryToRemove) {
//       categoryToRemove.remove();
//     }
//   }
// });
