//! navigation
const logInBtn = document.querySelector(".registration-btn-form-js");
const modalCloseBtn = document.querySelector(".button-modal-close-js");
const modalEl = document.querySelector(".modal-js");

function navigationFunk() {
  logInBtn.addEventListener("click", () => {
    modalEl.classList.add("is-open");
  });

  modalCloseBtn.addEventListener("click", () => {
    modalEl.classList.remove("is-open");
  });

  modalEl.addEventListener("click", (event) => {
    if (event.target.className !== "modal-js is-open") {
      return;
    }
    modalEl.classList.remove("is-open");
  });
}
navigationFunk();

//! form registration
import { usersArray } from "./server.js";
const form = document.querySelector(".main-registration-form-js");
const errorMessage = document.querySelector(".error-pass-js");
const symbolsArr = [
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "-",
  "_",
  "=",
  "+",
  "[",
  "]",
  "{",
  "}",
  "\\",
  "|",
  ";",
  ":",
  "'",
  '"',
  ",",
  ".",
  "/",
  "<",
  ">",
  "?",
  "`",
  "~",
  " ",
];
class User {
  constructor({ firstName, lastName, email, pass }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.pass = pass;
  }
}

form.addEventListener("submit", oneClickToSend);

function oneClickToSend(event) {
  event.preventDefault();
  const userFirstName = event.target.elements.userFirstName.value
    .trim()
    .toLowerCase();
  const userLastName = event.target.elements.userLastName.value
    .trim()
    .toLowerCase();
  const userEmail = event.target.elements.userEmail.value.trim().toLowerCase();
  const userPass = event.target.elements.userPass.value;
  const userPass2 = event.target.elements.userRepeatPass.value;
  //* userFirstNameCheck
  for (const item of userFirstName) {
    if (Number(item) || symbolsArr.includes(item)) {
      errorMessage.textContent =
        "There should be without numbers and special symbols in the name!";
      return;
    }
  }
  //* userLastNameCheck
  for (const item of userLastName) {
    if (Number(item) || symbolsArr.includes(item)) {
      errorMessage.textContent =
        "There should be without numbers and special symbols in the name!";
      return;
    }
  }

  //* first pass check
  if (userPass.length < 8) {
    errorMessage.textContent =
      "The password must be at least 8 characters long!";
    return;
  }

  //* second pass check
  if (userPass !== userPass2) {
    errorMessage.textContent = "The passwords are not the same!";
    return;
  }

  //* first email check
  const userChecker = new Promise((resolve, reject) => {
    if (usersArray.length === 0) {
      resolve("");
    }
    for (const user of usersArray) {
      if (user.email === userEmail) {
        reject("This user already exists!");
      }
    }
  });

  userChecker
    .then((item) => {
      usersArray.push(
        new User({
          firstName: userFirstName,
          lastName: userLastName,
          email: userEmail,
          pass: userPass.trim(),
        })
      );
      errorMessage.textContent = item;
    })
    .catch((err) => {
      errorMessage.textContent = err;
      return;
    });

  console.log(usersArray);
}
