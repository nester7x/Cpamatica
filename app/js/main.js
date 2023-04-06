const header = document.querySelector(".header");
const headerInner = document.querySelector(".header__inner");
const logo = document.querySelector(".logo");
const loginBtn = document.querySelector(".header__login_btn");
const returnBtn = document.querySelectorAll(".returnBtn");
const footer = document.querySelector(".footer");

const slider = document.querySelector(".slider");
const mainScreen = document.querySelector(".mainScreen");
const preloader = document.querySelector(".preloader");

const cleanInputBtn = document.querySelectorAll(".cross");
const input = document.querySelectorAll(".input");

const nameInput = document.querySelector(".name_input");
const cityInput = document.querySelector(".city_input");
const nameInputError = document.querySelector(".name_input_error");
const cityInputError = document.querySelector(".city_input_error");

let userData = {
  gender: "",
  username: "",
  city: "",
};

let currentStep;

window.addEventListener("load", function () {
  preloader.classList.add("disabled");
  mainScreen.classList.remove("disabled");
});

// checking if return buttons is available on current step
function returnIsAble(step) {
  if (step > 2) {
    returnBtn.forEach((item) => {
      item.classList.remove("disabled");
    });
  } else {
    returnBtn.forEach((item) => {
      item.classList.add("disabled");
    });
  }
}

logo.addEventListener('click', () => {
  logo.classList.remove('dark');
  loginBtn.classList.remove("disabled");
  header.classList.remove("underline");
  headerInner.classList.remove("center_content");
  footer.classList.remove("disabled");
  currentStep = 1;
  returnIsAble(currentStep);
  const bullet1 = document.querySelector('.bullet1');
  bullet1.click();
})

// return on previous step
returnBtn.forEach((item) => {
  item.addEventListener("click", () => {
    returnIsAble(currentStep);
    const bullet = document.querySelector(`.bullet${currentStep}`);
    bullet.click();
  });
});

cleanInputBtn.forEach((item) => {
  item.addEventListener("click", () => {
    const label = item.parentNode;
    label.firstElementChild.value = "";
  });
});

const nextButtons = document.querySelectorAll(".slide__button-next");

nextButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    currentStep = parseInt(button.parentElement.id.slice(-1));
    const nextStep = document.getElementById(`step-${currentStep + 1}`);
    if (nextStep) {
      nextStep.lastElementChild.textContent = `Продовжити ${currentStep}/6`;
    }
    returnIsAble(currentStep);

    let errors;
    if (currentStep === 1) {
      loginBtn.classList.add("disabled");
      logo.classList.add('dark');
      headerInner.classList.add("center_content");
      header.classList.add("underline");
      footer.classList.add("disabled");

      userData.gender = button.getAttribute("id");
    } else if (currentStep === 2) {
      nameInputError.textContent = "";
      errors = validation(nameInput.name, nameInput.value);

      if (errors.length === 0) {
        userData.username = nameInput.value;

        cityInput.value = await fetchData("http://ip-api.com/json") || '';

        const bullet3 = document.querySelector(".bullet3");
        bullet3.click();

        returnBtn.forEach((item) => {
          item.classList.remove("disabled");
        });
      } else {
        currentStep = 1;
        nameInputError.textContent = errors;
      }
    } else if (currentStep === 3) {
      cityInputError.textContent = "";
      errors = validation(cityInput.name, cityInput.value);

      if (errors.length === 0) {
        userData.city = cityInput.value;

        // Instead of this you can put userData in database
        localStorage.setItem("userData", JSON.stringify(userData));
        alert(
          `User ${userData.gender}, ${userData.username}, ${userData.city} successfully registered!`
        );

        loginBtn.classList.remove("disabled");
        logo.classList.remove('dark');
        headerInner.classList.remove("center_content");
        header.classList.remove("underline");
        footer.classList.remove("disabled");

        currentStep = 1;
        returnBtn.forEach((item) => {
          item.classList.add("disabled");
        });

        // return us to mainScreen
        const bullet = document.querySelector(`.bullet${currentStep}`);
        bullet.click();

        // clear user data
        userData = {
          gender: "",
          username: "",
          city: "",
        };

        // clear all inputs on page
        input.forEach((item) => {
          item.value = "";
        });
      } else {
        currentStep = 2;
        cityInputError.textContent = errors;
      }
    }
  });
});