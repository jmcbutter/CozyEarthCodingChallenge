function changeClasses(x) {
  let title = document.getElementById("title");
  let detailsBox = document.getElementById("more-details");
  let moreInfoButton = document.getElementById("more-button");
  let moreInfoButtonText = moreInfoButton.querySelector("p");
  let social = document.getElementById("social");


  if (x.matches) { // If media query matches
    title.classList.remove("start-9");
    title.classList.add("start-0", "end-0", "mx-auto", "text-center", "translate-middle-y")

    detailsBox.classList.remove("start-9");
    detailsBox.classList.add("start-0", "end-0", "mx-auto")

    moreInfoButton.classList.remove("mx-5", "translate-middle-y");
    moreInfoButton.classList.add("d-flex", "justify-content-center");

    moreInfoButtonText.classList.add("d-none");

    social.classList.remove("flex-column");
    social.classList.add("flex-row", "start-0", "mx-auto", "justify-content-center");
  } else {
    title.classList.remove("start-0", "end-0", "mx-auto", "text-center", "translate-middle-y");
    title.classList.add("start-9");

    detailsBox.classList.add("start-9");
    detailsBox.classList.remove("start-0", "end-0", "mx-auto");

    moreInfoButton.classList.remove("d-flex", "justify-content-center");
    moreInfoButton.classList.add("mx-5", "translate-middle-y")

    moreInfoButtonText.classList.remove("d-none");
  
    social.classList.remove("flex-row", "start-0", "mx-auto", "justify-content-center");
    social.classList.add("flex-column");
  }
}

var x = window.matchMedia("(max-width: 992px)")
changeClasses(x) // Call listener function at run time
x.addEventListener("change", changeClasses) // Attach listener function on state changes