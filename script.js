const btnDetails = document.querySelectorAll(
  ".services-container .btn-details"
);
const btnCloseHiddenDetails = document.querySelectorAll(
  ".services-container .hidden-details .btn-close"
);
const contactSocialIcons = document.querySelectorAll(
  ".contacts .contacts-container .social-icon"
);
const btnBuyService = document.querySelectorAll(
  ".services-container .hidden-details .btn-buy"
);
const tabableElements = Array.from(
  document.querySelectorAll("p[tabindex], i[tabindex], a[tabindex]") //Select only the elements that have tabindex attribute.
);
const footerNav = document.querySelector("footer nav");
const footerAside = document.querySelector("footer aside");
const btnShowHideNav = document.querySelector(".main-nav .btn-nav");
const storyP = document.querySelector(".story-container p");
const handIcon = document.querySelector(".story-container i.fas");
var locked = false;

/*

--------- General purpose Scripts

*/

// This forEach is used to remove the outline style when the element is clicked,
// and enable it when the element is focused with TAB key. For accessibility and styling purpose.
tabableElements.forEach(el => {
  el.addEventListener("click", () => {
    el.classList.add("outline-none");
  });
  el.addEventListener("focus", () => {
    el.classList.remove("outline-none");
  });
});

// Show and hide the hand icon and toggle the blur effect when user hover the story section.
storyP.addEventListener("mouseover", () => {
  storyP.style.filter = "blur(0px)";
  handIcon.style.display = "none";
});

storyP.addEventListener("mouseout", () => {
  storyP.style.filter = "blur(2px)";
  handIcon.style.display = "block";
  handIcon.style.opacity = "0.7";
});

handIcon.addEventListener("mouseover", () => {
  storyP.style.filter = "blur(0px)";
  handIcon.style.display = "none";
});

handIcon.addEventListener("mouseout", () => {
  storyP.style.filter = "blur(2px)";
  handIcon.style.display = "block";
  handIcon.style.opacity = "0.7";
});

// Show the fixed buy menu when the user press the "Buy Now" button in the hidden
// details of the service boxes.

for (let i = 0; i < btnBuyService.length; i++) {
  btnBuyService[i].addEventListener("click", e => {
    e.preventDefault();
    let buyMenu = document.querySelector(".buy-service-menu");
    buyMenu.classList.add("visible");
  });
}

/*

--------- Functions

*/

// Show and Hide the navbar.
function showOrHideNavbar() {
  let navbar = document.querySelector(".main-nav ul");
  navbar.classList.toggle("collapse");
}

// Close the fixed buy menu that is shown when the user press the "Buy Now" button in the hidden
// details of the service boxes.
function closeBuyMenu() {
  let buyMenu = document.querySelector(".buy-service-menu");
  buyMenu.classList.remove("visible");
}

/*

--------- Services section Scripts

*/

// Add an event listener to show the hidden details
for (let i = 0; i < btnDetails.length; i++) {
  btnDetails[i].addEventListener("click", e => {
    e.preventDefault(); // Prevent the default jump on top of the page when anchor is clicked.
    let serviceDetails = btnDetails[i].closest(".service-details"); // Select the closest service-details to apply the blur effect.
    // Select the hidden details to make it to appear. -------------
    let parentBtnDetails = btnDetails[i].parentNode.parentNode.childNodes; // Jump up to two times to select the box div child's.
    let hiddenDetails = parentBtnDetails[3]; // Select the hidden details from the child nodes. Index 3 is the hidden details div.
    //--------------------------------------------------------------
    hiddenDetails.classList.toggle("visible");
    serviceDetails.classList.toggle("blur-effect");
    btnDetails[i].classList.add("inactive-anchor");
    // Set aria-hidden to false and aria-live to 'assertive' so the user can understand that the hidden
    // details appear
    hiddenDetails.setAttribute("aria-hidden", "false");
    hiddenDetails.setAttribute("aria-live", "assertive");
  });
}

// Add an event listener to the close button to hide the hidden details.
for (let i = 0; i < btnCloseHiddenDetails.length; i++) {
  // Add an event listener for the X icon that close the hidden details.
  // For mouse click event.
  btnCloseHiddenDetails[i].addEventListener("click", () => {
    // This loop is the same as the previous loop that show the hidden details
    // because select the only box that the users want to close.
    for (let y = 0; y < btnDetails.length; y++) {
      let serviceDetails = btnDetails[i].closest(".service-details");
      let parentBtnDetails = btnDetails[i].parentNode.parentNode.childNodes;
      let hiddenDetails = parentBtnDetails[3];
      hiddenDetails.classList.remove("visible");
      serviceDetails.classList.remove("blur-effect");
      btnDetails[i].classList.remove("inactive-anchor");
      // Set aria-hidden to true and aria-live to 'assertive' so the user can understand that the hidden
      // details disappear.
      hiddenDetails.setAttribute("aria-hidden", "true");
      hiddenDetails.setAttribute("aria-live", "off");
    }
  });
  // For ENTER key.
  btnCloseHiddenDetails[i].addEventListener("keyup", e => {
    // If ENTER is the key pressed, close the hidden details.
    // ENTER key
    if (e.keyCode === 13) {
      // This loop is the same as the previous loop that show the hidden details
      // because select the only box that the users want to close.
      for (let y = 0; y < btnDetails.length; y++) {
        let serviceDetails = btnDetails[i].closest(".service-details");
        let parentBtnDetails = btnDetails[i].parentNode.parentNode.childNodes;
        let hiddenDetails = parentBtnDetails[3];
        hiddenDetails.classList.remove("visible");
        serviceDetails.classList.remove("blur-effect");
        btnDetails[i].classList.remove("inactive-anchor");
        // Set aria-hidden to true and aria-live to 'assertive' so the user can understand that the hidden
        // details disappear
        hiddenDetails.setAttribute("aria-hidden", "true");
        hiddenDetails.setAttribute("aria-live", "off");
      }
    }
  });
}

/*

--------- Contacts section Scripts

*/

// This two for loops is used for the sliding animations of the icon of the social network
// in the contacts section.
for (let i = 0; i < contactSocialIcons.length; i++) {
  contactSocialIcons[i].addEventListener("click", () => {
    // Prevent click spamming
    if (!locked) {
      locked = true;
      contactSocialIcons[i].style.width = "30%";
      // This let select the closest link button of the clicked icon.
      let closestSocialLink = contactSocialIcons[i].nextElementSibling;
      // If the link button is hidden, then become visible.
      if (!closestSocialLink.classList.contains("not-visible")) {
        contactSocialIcons[i].style.width = "100%";
        closestSocialLink.classList.toggle("not-visible");
        locked = false;
      }
      // Vice-versa.
      if (closestSocialLink.classList.contains("not-visible")) {
        // At the end of the transition of the social icon the button become invisible.
        contactSocialIcons[i].addEventListener("transitionend", () => {
          closestSocialLink.classList.toggle("not-visible");
          locked = false;
        });
      }
    }
  });
}

// Same loop but for ENTER Key.
for (let i = 0; i < contactSocialIcons.length; i++) {
  contactSocialIcons[i].addEventListener("keyup", e => {
    // ENTER key
    if (e.keyCode === 13) {
      // Same behavior as above.
      if (!locked) {
        contactSocialIcons[i].style.width = "30%";
        let closestSocialLink = contactSocialIcons[i].nextElementSibling;
        if (!closestSocialLink.classList.contains("not-visible")) {
          contactSocialIcons[i].style.width = "100%";
          closestSocialLink.classList.toggle("not-visible");
          locked = false;
        }
        if (closestSocialLink.classList.contains("not-visible")) {
          contactSocialIcons[i].addEventListener("transitionend", () => {
            closestSocialLink.classList.toggle("not-visible");
            locked = false;
          });
        }
      }
    }
  });
}

/*

--------- Footer scripts

*/

// To make the footer Nav and Footer aside the height so the border on the left of
// the aside is always the same height as the footer Nav.
// footerAside.style.height = "" + footerNav.offsetHeight + "px";
