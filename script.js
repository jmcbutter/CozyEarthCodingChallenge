const title = document.getElementById("title");
const heading = title.querySelector("h1");
const detailBox = document.getElementById("detail-box");
const detailContent = Array.from(detailBox.children);

const animationCard = document.getElementById("animation-card");

const moreButtonImg = document.querySelector("#more-button > button > img");
const closeButton = document.getElementById("close-button");

(() => {
  // Create a span element from each letter in the heading to allow for a
  // left-to-right fade out
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
  setTimeProperty(animationCard, "--animation-duration", duration); 
  setCardAnimationAt("start", moreButtonImg);
  setCardAnimationAt("end", detailBox);
  hide(moreButtonImg.parentElement);
  fadeHeading("out", 0.1, 0);
  addAnimationTo(animationCard, "animate-card", duration, 0);
  setTimeout(() => {
    turnOn(detailBox);
    turnOff(moreButtonImg.parentElement);
    show(detailBox); }
    , duration * 1000);
  fadeChildren(detailContent, "in", duration / 2, duration);
});

function setTimeProperty(element, property, duration) {
  // Using custom properties in CSS to allow for manipulation of CSS animations
  element.style.setProperty(property, duration + 's');
}

function setCardAnimationAt(location, node) {
  // Set the position for the card animation to start or end at an existing node
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
  //Get the px values for the bounding rectangle
  if (Array.from(node.classList).includes('d-none')) {                          //Need to display the element in order to get the bounding rectangle
    node.style.opacity = 0;                                                     //Don't want to show the element yet
    node.classList.remove('d-none');
  }
  const { top, right, bottom, left } = node.getBoundingClientRect();
  const width = node.offsetWidth;
  const height = node.offsetHeight;
  return { top, right, bottom, left, width, height };
}

function turnOff(element) {
  element.classList.add('d-none');
}

function fadeHeading(fadeDirection, duration, delay) {
  let headingLetters = Array.from(heading.children);

  if (fadeDirection == "out") {
    headingLetters.forEach(letter => {
      fade(letter, fadeDirection, duration, delay)
      delay += 0.025;                                                            //Slightly increase the delay on each letter to allow for a letter-at-a-time fade
    });
  } else {
    headingLetters.reverse().forEach(letter => {
      fade(letter, fadeDirection, duration, delay)
      delay += 0.025;
    });
  }
}

function fade(element, fadeDirection, duration, delay) {
  element.style.opacity = fadeDirection == "out" ? 1 : 0;                       //Make sure the beginning opacity is set correctly
  setTimeout(() => element.style.opacity = fadeDirection == "out" ? 0 : 1,       //Don't want the element to pop back up after fading out
             (duration + delay) * 1000)
  setTimeProperty(element, "--animation-duration", duration)
  setTimeProperty(element, "--animation-delay", delay);
  addAnimationTo(element, `fade-${fadeDirection}`, duration, delay);
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
  setTimeProperty(animationCard, "--animation-duration", duration);
  setCardAnimationAt("start", detailBox);
  turnOn(moreButtonImg.parentElement);
  show(moreButtonImg.parentElement);
  setCardAnimationAt("end", moreButtonImg);
  turnOn(title);
  turnOff(detailBox);
  fadeHeading("in", 0.1, 0);
  addAnimationTo(animationCard, "animate-card", duration, 0);
});
