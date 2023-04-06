async function fetchData(api) {
  let city;

  try {
    await preloader.classList.remove("disabled");
    await slider.classList.add("disabled");
    await fetch(api)
      .then((response) => response.json())
      .then((data) => {
        city = data.city;
      })
      .catch((error) => console.error(error));
  } finally {
    await preloader.classList.add("disabled");
    await slider.classList.remove("disabled");
  }

  return city;
}