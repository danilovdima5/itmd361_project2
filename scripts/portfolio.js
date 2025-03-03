const projects = document.querySelectorAll(".project");
const dotsContainer = document.getElementById("dots");
const slider = document.getElementById("slider");

let currentIndex = 0;
let startX = 0;

function showProject(index) {
  projects.forEach((project, i) => {
    project.classList.toggle("active", i === index);
    dots[i].classList.toggle("active", i === index);
  });
}

document.getElementById("next").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % projects.length;

  showProject(currentIndex);
});

document.getElementById("prev").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + projects.length) % projects.length;

  showProject(currentIndex);
});

// Create dots dynamically
projects.forEach((_, i) => {
  const dot = document.createElement("span");

  dot.classList.add("dot");

  if (i === 0) dot.classList.add("active");

  dot.addEventListener("click", () => {
    currentIndex = i;
    showProject(currentIndex);
  });

  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

// Swipe Gesture Support for Mobile
slider.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

slider.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;
  let diffX = startX - endX;

  if (diffX > 50) {
    currentIndex = (currentIndex + 1) % projects.length;
  } else if (diffX < -50) {
    currentIndex = (currentIndex - 1 + projects.length) % projects.length;
  }

  showProject(currentIndex);
});

showProject(currentIndex);
