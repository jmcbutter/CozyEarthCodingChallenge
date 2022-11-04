const elements = (function Elements() {
  const title = {
    id: "title",
    "smallClasses": ["start-0", "end-0", "mx-auto", "text-center", "translate-middle-y"],
    "largeClasses": ["start-9"]
  }


  const detailBox = {
    id: "detail-box",
    "smallClasses": ["start-0", "end-0", "mx-auto"],
    "largeClasses": ["start-9"]
  };

  const moreButton = {
    id: "more-button",
    "smallClasses": ["d-flex", "justify-content-center"],
    "largeClasses": ["mx-5", "translate-middle-y"]
  }

  const moreButtonText = {
    id: "more-button-text",
    "smallClasses": ["d-none"]
  }

  const social = {
    id: "social",
    "smallClasses": ["flex-row", "start-0", "mx-auto", "justify-content-center"],
    "largeClasses": ["flex-column"]
  }

  return [title, detailBox, moreButton, moreButtonText, social];
})();

function watchClasses(smallMediaQuery) {
  if (smallMediaQuery.matches) { // If media query matches
    elements.forEach(element => swapClasses(element, "small"))
  } else { 
    elements.forEach(element => swapClasses(element, "large"))
  }
}

function swapClasses(element, screenSize) {
  const {id, smallClasses, largeClasses} = element;
  const el = document.getElementById(id);

  if (screenSize == "small") {
    addClasses(smallClasses);
    removeClasses(largeClasses);
  } else {
    addClasses(largeClasses);
    removeClasses(smallClasses);
  }

  function addClasses(classes) {
    if (classes) {
      el.classList.add(...classes);
    }
  }

  function removeClasses(classes) {
    if (classes) {
      el.classList.remove(...classes);
    }
  }
}

var smallMediaQuery = window.matchMedia("(max-width: 991px)")
watchClasses(smallMediaQuery) // Call listener function at run time
smallMediaQuery.addEventListener("change", watchClasses) // Attach listener function on state changes