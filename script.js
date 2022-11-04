const title = document.getElementById("title");
const heading = title.querySelector("h1");
const moreDetailsBox = document.getElementById("more-details");
const moreDetailsContent = Array.from(moreDetailsBox.children);

const animationCard = document.getElementById("animation-card");

const moreButtonImg = document.querySelector("#more-button > img");
const closeButton = document.getElementById("close-button");

// Create a span element from each letter in the heading to allow for a
// left-to-right fade out
(() => {
  let text = heading.textContent;
  heading.textContent = "";
  text.split('').forEach(letter => {
    let span = document.createElement('span');
    span.textContent = letter;
    heading.appendChild(span);
  })
})();

moreButtonImg.addEventListener("click", () => {
  const duration = 0.25; 
  setDurationProperty(animationCard, duration); 
  setCardAnimationAt("start", moreButtonImg);
  setCardAnimationAt("end", moreDetailsBox);
  hide(moreButtonImg.parentElement);
  fadeHeading("out", 0.1, 0);
  addAnimationTo(animationCard, "animate-card", duration, 0);
  setTimeout(() => {
    turnOn(moreDetailsBox);
    turnOff(moreButtonImg.parentElement);
    show(moreDetailsBox); }
    , duration * 1000);
  fadeChildren(moreDetailsContent, "in", duration / 2, duration);
});

function setDurationProperty(element, duration) {
  element.style.setProperty("--animation-duration", duration + 's');
}

function setCardAnimationAt(location, node) {
  let borderRadius = node == moreButtonImg ? "100%" : 0;
  let { top, right, bottom, left, width, height } = getNodeProperties(node);
  animationCard.style.setProperty(`--${location}-top`, top + "px");
  animationCard.style.setProperty(`--${location}-bottom`, bottom + "px");
  animationCard.style.setProperty(`--${location}-left`, left + "px");
  animationCard.style.setProperty(`--${location}-right`, right + "px");
  animationCard.style.setProperty(`--${location}-width`, width + "px");
  animationCard.style.setProperty(`--${location}-height`, height + "px");
  animationCard.style.setProperty(`--${location}-border-radius`, borderRadius);
}

function getNodeProperties(node) {
  if (Array.from(node.classList).includes('d-none')) {
    node.style.opacity = 0;
    node.classList.remove('d-none');
  }
  const { top, right, bottom, left } = node.getBoundingClientRect();
  const width = node.offsetWidth;
  const height = node.offsetHeight;
  return { top, right, bottom, left, width, height, borderRadius: "100%" };
}

function turnOff(element) {
  element.classList.add('d-none');
}

function fadeHeading(fadeDirection, duration, delay) {
  let headingLetters = Array.from(heading.children);

  if (fadeDirection == "out") {
    headingLetters.forEach(letter => {
      fade(letter, fadeDirection, duration, delay)
      delay += 0.025;
    });
  } else {
    headingLetters.reverse().forEach(letter => {
      fade(letter, fadeDirection, duration, delay)
      delay += 0.025;
    });
  }
}

function fade(element, fadeDirection, animationDuration, animationDelay) {
  element.style.opacity = fadeDirection == "out" ? 1 : 0;
  setTimeout(() => {
    element.style.opacity = fadeDirection == "out" ? 0 : 1;
    element.classList.remove(`fade-${fadeDirection}`)
  }, (animationDuration + animationDelay) * 1000)
  element.style.setProperty("--animation-duration", animationDuration + 's')
  element.style.setProperty("--animation-delay", animationDelay + 's');
  element.classList.add(`fade-${fadeDirection}`);
}

function addAnimationTo(element, animationClass, duration, delay) {
  element.classList.add(animationClass);
  setTimeout(() => {
    element.classList.remove(animationClass);
  }, (duration + delay) * 1000)
}

function turnOn(element) {
  element.classList.remove('d-none');
}

function show(element) {
  element.style.opacity = 1;
}

function hide(element) {
  element.style.opacity = 0;
}

function fadeChildren(element, fadeDirection, duration, delay) {
  element.forEach(child => {
    child.style.opacity = fadeDirection == "in" ? 0 : 1;
    fade(
      child, 
      fadeDirection, 
      duration, 
      delay,
      )
    })
}

closeButton.addEventListener("click", () => {
  let duration = 0.25;
  setDurationProperty(animationCard, duration);
  setCardAnimationAt("start", moreDetailsBox);
  turnOn(moreButtonImg.parentElement);
  show(moreButtonImg.parentElement);
  setCardAnimationAt("end", moreButtonImg);
  turnOn(title);
  turnOff(moreDetailsBox);
  fadeHeading("in", 0.1, 0);
  addAnimationTo(animationCard, "animate-card", duration, 0);
});
