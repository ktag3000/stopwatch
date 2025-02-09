// Stores my old working js file while changes are made to the live one

"use strict";

// Timer buttons
let startBtn = document.getElementById("start");
let stopBtn = document.getElementById("stop");
let resetBtn = document.getElementById("reset");

// New category button
let newCategory = document.querySelector(".new-category-button");

// Cloned categories
let categoryID = 0;
const category0 = document.querySelector(".category-container");

// Color array
const colorArray = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "indigo",
  "violet",
];

// Create Web Worker
let worker = new Worker("worker.js");

//
// Listen for messages from the worker

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

//
// Timer button click events
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

// =========================
// Create new categories
// =========================
/*
On the first click, show the main category that is written in the html file.
On the subsequent clicks, create clones where the id changes to match the increase in categoryID.
For each clone set the color to match the colorArray and clear the contents on the input
*/
// FIXME if you delete the main category the rest won't be created
// have the category to clone always be at the end and display: none

newCategory.addEventListener("click", () => {
  // First click - show category 0
  if (categoryID === 0) {
    category0.style.display = "flex";
    categoryID++;
  } else if (categoryID < 7) {
    // Create clone and increase categoryID
    let originalCategory = document.getElementById("category-container");
    let clonedCategory = originalCategory.cloneNode(true); // Create deep clone
    let parentElement = document.getElementById("cloned-category0"); // Empty div to create the clone under. cloned-category0 is the first category created
    parentElement.appendChild(clonedCategory);
    clonedCategory.id = `cloned-category${categoryID}`;

    // Set color-icon and category id's
    let clonedCategoryChilren = clonedCategory.childNodes;
    console.log(clonedCategoryChilren);

    // Color icon values
    clonedCategoryChilren[1].id = `color-icon${categoryID}`;
    clonedCategoryChilren[1].style.backgroundColor = colorArray[categoryID];
    clonedCategoryChilren[1].style.border = `1px solid ${colorArray[categoryID]}`;

    // Category values
    clonedCategoryChilren[3].id = `category${categoryID}`;
    console.log(clonedCategoryChilren[3].value);
    clonedCategoryChilren[3].value = "";

    categoryID++;
  } else {
    // Stop after 7 categories
  }
});

//
// Change hover icons
// Event delegation for hover effect on color icons
// FIXME color icons change back to red. Have them change back to what they originally were
let hoverOnOrOff = 1;

document.addEventListener("mouseover", (event) => {
  hoverOnOrOff = 1;
  // Check if the hovered element has the "color-icon" class
  if (event.target.classList.contains("color-icon") && hoverOnOrOff === 1) {
    const colorIcon = event.target; // Get the hovered color icon
    const hoverIcon = colorIcon.querySelector(".hover-icon"); // Find the hover icon inside the color icon
    console.log(hoverIcon);
    // Show the hover icon and change the styling of the color icon
    if (hoverIcon && hoverOnOrOff === 1) hoverIcon.style.display = "block";
    colorIcon.style.backgroundColor = "transparent";
    colorIcon.style.border = "none";
    colorIcon.style.cursor = "pointer";
  }
});

// Event delegation for mouseout to reset styles when no longer hovering
document.addEventListener("mouseout", (event) => {
  hoverOnOrOff = 0;
  // Check if the mouseout event occurred on a color icon
  if (event.target.classList.contains("color-icon") && hoverOnOrOff === 0) {
    const colorIcon = event.target; // Get the color icon
    const hoverIcon = colorIcon.querySelector(".hover-icon"); // Find the hover icon

    // Hide the hover icon and restore original styles
    if (hoverIcon && hoverOnOrOff === 0) hoverIcon.style.display = "none";
    colorIcon.style.backgroundColor = "red";
    colorIcon.style.border = "1px solid red";
  }
});

// Event delegation for deleting categories when clicking on a color icon
document.addEventListener("click", (e) => {
  // Check if the clicked element is inside a color icon
  if (e.target.closest(".color-icon")) {
    const categoryToRemove = e.target.closest(".category-container"); // Find the closest parent category container

    // Remove the category container if it exists
    if (categoryToRemove) {
      categoryToRemove.remove();
    }
  }
});
