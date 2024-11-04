// Constant dates
const todaysDate = new Date();
const ourAnniversary = new Date("2021-03-01T17:30:40");
const ourDayWeMet = new Date("2021-02-02T17:40:30");

// Select DOM elements
const outputInSeconds = document.querySelector(".seconds");
const outputInMinutes = document.querySelector(".minutes");
const outputInHours = document.querySelector(".hours");
const outputInDays = document.querySelector(".days");
const outputInMonths = document.querySelector(".months");
const outputInYears = document.querySelector(".years");

const arrowUp = document.querySelector(".up");
const arrowDown = document.querySelector(".down");
const header = document.getElementById("main-header");

const textArray = document.querySelector(".output");

// Toggle state to switch between anniversary and the day we met
let useAnniversary = true;
let lastSelectedUnit = "days"; // Default unit to display

// Event listeners
outputInSeconds.addEventListener("click", () => updateUnit("seconds"));
outputInMinutes.addEventListener("click", () => updateUnit("minutes"));
outputInHours.addEventListener("click", () => updateUnit("hours"));
outputInDays.addEventListener("click", () => updateUnit("days"));
outputInMonths.addEventListener("click", () => updateUnit("months"));
outputInYears.addEventListener("click", () => updateUnit("years"));
arrowUp.addEventListener("click", changeText);
arrowDown.addEventListener("click", changeTextBack);

// Function to calculate time difference in days
function calculateDays() {
  const referenceDate = useAnniversary ? ourAnniversary : ourDayWeMet;
  const differenceInDays = (todaysDate.getTime() - referenceDate.getTime()) / (1000 * 3600 * 24);
  return differenceInDays;
}

// Function to display time in different units
function displayTimeIn(unit) {
  const days = calculateDays();
  let result;

  switch (unit) {
    case "seconds":
      result = days * 24 * 60 * 60;
      break;
    case "minutes":
      result = days * 24 * 60;
      break;
    case "hours":
      result = days * 24;
      break;
    case "days":
      result = days;
      break;
    case "months":
      result = (days / 365) * 12;
      break;
    case "years":
      result = days / 365;
      break;
  }

  textArray.innerText = `${result.toFixed(2)} ≅ ${Math.floor(result)} ${unit}`;
}

// Wrapper function to set the unit and update display
function updateUnit(unit) {
  lastSelectedUnit = unit; // Update the last selected unit
  displayTimeIn(unit); // Display the time in the selected unit
}

// Function to change header text and toggle date reference
function changeText() {
  header.innerText = "How long do we know each other";
  arrowUp.style.display = "none";
  arrowDown.style.display = "flex";
  useAnniversary = false; // Switch to using 'the day we met' date
  displayTimeIn(lastSelectedUnit); // Automatically update display
}

function changeTextBack() {
  header.innerText = "How long have we been together";
  arrowUp.style.display = "flex";
  arrowDown.style.display = "none";
  useAnniversary = true; // Switch back to using anniversary date
  displayTimeIn(lastSelectedUnit); // Automatically update display
}
