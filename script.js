"use strict";

// slider variables
const slider = document.querySelector(".js-slider");
const charLength = document.querySelector(".js-length-number");

// password generation variables
const generateBtn = document.querySelector(".js-btn-generate");

// condition checkboxes variables
const uppercaseCon = document.querySelector(".js-uppercase");
const lowercaseCon = document.querySelector(".js-lowercase");
const numbersCon = document.querySelector(".js-numbers");
const symbolsCon = document.querySelector(".js-symbols");

// output and copy variable
const passwordOutput = document.querySelector(".js-password");
const copyBtn = document.querySelector(".js-copy");
const inputCapture = document.querySelector(".js-input-capture");
const copySuccess = document.querySelector(".js-copied-notification");
const copyIcon = document.querySelector(".copy-icon");

// strength bars variables
const bar1 = document.querySelector(".bar-1");
const bar2 = document.querySelector(".bar-2");
const bar3 = document.querySelector(".bar-3");
const bar4 = document.querySelector(".bar-4");
const conCheckbox = document.querySelectorAll(".js-checkbox");
const strengthName = document.querySelector(".js-strength-name");

// character pool function
const characters = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
  lowercase: "abcdefghijklmnopqrstuvwxyz".split(""),
  numbers: "0123456789".split(""),
  symbols: "!@#$%^&*()_-+=[]{}>|/;:'<,.?/".split(""),
};

const conditions = {
  uppercase: uppercaseCon,
  lowercase: lowercaseCon,
  numbers: numbersCon,
  symbols: symbolsCon,
};

const charPool = [];

function updateCharPool() {
  charPool.length = 0;
  for (const conditionName in conditions) {
    if (conditions[conditionName].checked) {
      charPool.push(characters[conditionName]);
    }
  }
  charPool[0] = charPool[0].concat(...charPool.slice(1));
  charPool.splice(1);
  console.log(charPool);
}

function generatePassword(length) {
  let randomChars = [];

  length = slider.value;

  if (
    uppercaseCon.checked == false &&
    lowercaseCon.checked == false &&
    numbersCon.checked == false &&
    symbolsCon.checked == false
  ) {
    passwordOutput.textContent = "CHOOSE CONDITIONS";
    passwordOutput.classList.add("fade-out-color");
    setTimeout(() => {
      passwordOutput.classList.remove("fade-out-color");
    }, 2000);
  }

  if (charPool[0] != 0) {
    let password = "";
    for (let i = 0; i < length; i++) {
      randomChars = Math.floor(Math.random() * charPool[0].length);
      const selectedChars = charPool[0][randomChars];
      password += selectedChars;
      passwordOutput.textContent = password;
      inputCapture.value = passwordOutput.textContent;
    }
    console.log(password);
  }
}

for (const conditionName in conditions) {
  conditions[conditionName].addEventListener("change", updateCharPool);
}

function updateStrength() {
  let checkedCount = 0;

  conCheckbox.forEach((checkbox) => {
    if (checkbox.checked) {
      checkedCount++;
    }
  });

  if (checkedCount <= 4 && slider.value < 10) {
    bar1.classList.add("bar-red");

    bar1.classList.remove("bar-yellow", "bar-orange", "bar-green");
    bar2.classList.remove("bar-yellow", "bar-orange", "bar-green");
    bar3.classList.remove("bar-yellow", "bar-orange", "bar-green");
    bar4.classList.remove("bar-yellow", "bar-orange", "bar-green");
    strengthName.textContent = "TOO WEAK!";
  } else if (checkedCount == 0 && slider.value > 10) {
    bar1.classList.add("bar-red");

    bar1.classList.remove("bar-yellow", "bar-orange", "bar-green");
    bar2.classList.remove("bar-yellow", "bar-orange", "bar-green");
    bar3.classList.remove("bar-yellow", "bar-orange", "bar-green");
    bar4.classList.remove("bar-yellow", "bar-orange", "bar-green");
    strengthName.textContent = "TOO WEAK!";
  } else if (checkedCount == 4 && slider.value >= 10 && slider.value <= 10) {
    bar1.classList.add("bar-orange");
    bar2.classList.add("bar-orange");

    bar1.classList.remove("bar-yellow", "bar-green");
    bar2.classList.remove("bar-yellow", "bar-green");
    bar3.classList.remove("bar-yellow", "bar-green");
    strengthName.textContent = "WEAK";
  } else if (checkedCount == 4 && slider.value >= 13 && slider.value <= 14) {
    bar1.classList.add("bar-yellow");
    bar2.classList.add("bar-yellow");
    bar3.classList.add("bar-yellow");

    bar1.classList.remove("bar-red", "bar-orange", "bar-green");
    bar2.classList.remove("bar-red", "bar-orange", "bar-green");
    bar3.classList.remove("bar-red", "bar-orange", "bar-green");
    bar4.classList.remove("bar-red", "bar-orange", "bar-green");
    strengthName.textContent = "MEDIUM";
  } else if (checkedCount == 4 && slider.value >= 15) {
    bar1.classList.add("bar-green");
    bar2.classList.add("bar-green");
    bar3.classList.add("bar-green");
    bar4.classList.add("bar-green");
    strengthName.textContent = "STRONG";
  } else if (checkedCount <= 3 && slider.value >= 15) {
    bar1.classList.add("bar-red");

    bar1.classList.remove("bar-green");
    bar2.classList.remove("bar-green");
    bar3.classList.remove("bar-green");
    bar4.classList.remove("bar-green");

    strengthName.textContent = "TOO WEAK!";
  }
}

conCheckbox.forEach((checkbox) => {
  checkbox.addEventListener("change", updateStrength);
});

slider.addEventListener("input", updateStrength);

generateBtn.addEventListener("click", generatePassword);

// slider color change
let x = parseInt(slider.value);

slider.addEventListener("input", () => {
  x = parseInt(slider.value) * 4.8;
  const color = `linear-gradient(90deg, #a4ffaf ${x}%, #18171f ${x}%)`;
  slider.style.background = color;
  console.log(color);
  charLength.innerHTML = slider.value;
});

// copy to clipboard function
function copyToClipboard() {
  let pwToCopy = inputCapture.value;

  if (inputCapture.value == "") {
    passwordOutput.textContent = "CREATE A PASSWORD";
    passwordOutput.classList.add("fade-out-color");
    setTimeout(() => {
      passwordOutput.classList.remove("fade-out-color");
    }, 2000);
    console.log("YOU NEED TO CREATE A PASSWORD FIRST");
    return false;
  }

  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(pwToCopy)
      .then(function () {
        copySuccess.classList.remove("inactive");
        setTimeout(function () {
          copySuccess.classList.add("inactive");
        }, 1000);
        console.log("PASSWORD COPIED", inputCapture.value);
      })
      .catch(function (err) {
        console.error("UNABLE TO COPY THE PASSWORD", err);
      });
  } else {
    alert("Clipboard functionality unsupported by this browser");
  }
}

copyBtn.addEventListener("click", copyToClipboard);
