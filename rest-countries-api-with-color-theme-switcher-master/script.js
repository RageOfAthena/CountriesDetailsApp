const countries = document.querySelector(".countries");
const searchbtn = document.querySelector(".user_input_btn");
const searchtext = document.querySelector(".user_input_text");
const frame = document.querySelector(".all");
const mode = document.querySelector(".head_mode");
const dropdown = document.querySelector(".user_choice");
const bijoy = document.querySelector(".bijoy");

document.body.classList.add("beforeload");
let array = Array.from(countries.children);

let objectcreate = function (index, output) {
  let object = {
    countryname: output[index]["name"]["common"],
    population: output[index]["population"],
    region: output[index]["region"],
    capital: output[index]["capital"][0],
    image: output[index]["flags"]["svg"],
  };
  return object;
};
let displayCountry = function (output) {
  array.forEach(function (e, i) {
    let object = objectcreate(i, output);
    e.innerHTML = `<div class="countries_box_image">
    <img src="${object.image}" alt="${object.countryname}" class="countries_box_img"/>
    </div>
    <h1 class="countries_box_title">${object.countryname}</h1>
    <p class="countries_box_population"><span class="bold_span">Population: </span>${object.population}</p>
    <p class="countries_box_region"><span class="bold_span">Region: </span>${object.region}</p>
    <p class="countries_box_capital"><span class="bold_span">Capital: </span>${object.capital}</p>`;
  });
};

const fetfunc = async function () {
  try {
    bijoy.classList.add("hidden");
    // sujoy.scrollIntoView();
    let data = await fetch("https://restcountries.com/v3.1/all");
    if (data.ok === false) {
      throw new Error("cannot fetch data");
    }
    let data1 = await data.json();
    bijoy.classList.remove("hidden");
    document.querySelector(".spinner").classList.add("hidden");
    document.body.classList.remove("beforeload");
    displayCountry(data1);
  } catch (e) {
    console.log(e.message);
    // countries.classList.remove("hidden");
    document.querySelector(".spinner").classList.add("hidden");

    document.body.innerHTML = `<div class="btn">
    <svg class="btn_svg">
      <use xlink:href="icon2\\sprite.svg#icon-arrow-long-left"></use>
    </svg>
    <p class="btn_back">Reload</p>
  </div>
  <div class="error">
    <img src="error404.png" alt="404error" class="error_img" />
    <h1 class="error_head">You've a network issue....</h1>
    <p class="error_para1">
      Breathe in and on the out breathe go back and try again.
    </p>
  </div>`;
    if (document.body.classList.contains("newbody")) {
      document.querySelector(".btn_svg").classList.add("strokes");
    }
    const back_btn = document.querySelector(".btn");
    back_btn.addEventListener("click", function (e) {
      window.location.reload();
    });
  }
};

fetfunc();
//////////////////////////////////////////////
array.forEach(function (el) {
  el.style.cursor = "pointer";

  el.addEventListener("click", function (e) {
    const fetchcountry = async function () {
      try {
        // document.body.classList.add("beforeload");
        bijoy.classList.add("hidden");

        document.querySelector(".spinner").classList.remove("hidden");
        // console.log(el.querySelector(".countries_box_title").textContent);
        let data = await fetch(
          `https://restcountries.com/v3.1/name/${
            e.target
              .closest(".countries_box")
              .querySelector(".countries_box_title").textContent
          }`
        );
        if (data.ok === false) {
          throw new Error("cannot fetch data");
        }
        let output = await data.json();
        bijoy.classList.remove("hidden");
        console.log(output);

        let object = {
          countryname: output[0]["name"]["common"],
          native: output[0]["altSpellings"][1],
          population: output[0]["population"],
          region: output[0]["region"],
          subregion: output[0]["subregion"],
          capital: output[0]["capital"][0],
          tld: "." + output[0]["altSpellings"][0].toLowerCase(),
          // currency: Object.values(output[0]["currencies"]["name"]).join(","),
          language: Object.values(output[0]["languages"]).join(","),
          image: output[0]["flags"]["svg"],
          currencies: output[0]["currencies"],
          border: output[0]["borders"],
        };
        //   console.log(object);
        let currency = Object.values(object["currencies"]).map(function (e, i) {
          return e["name"];
        });
        currency = currency.join(",");
        //   console.log(object["border"][0]);

        frame.innerHTML = `
      <div class="btn">
            <svg class="btn_svg">
                <use xlink:href="icon2\\sprite.svg#icon-arrow-long-left"></use>
            </svg>
            <p class="btn_back">Back</p>
      </div>
      <main class="details">
            <img src="${object["image"]}" alt="${object["countryname"]}" class="details_img">
            <div class="details_det">
                <h1 class="details_det_name">${object["countryname"]}</h1>
                <div class="container">

                    <div class="container1">
                        
                        <p class="details_det_native"><span class="bold_span">Native Name: </span>${object["native"]}</p>
                        <p class="details_det_population"><span class="bold_span">Population: </span>${object["population"]}</p>
                        <p class="details_det_region"><span class="bold_span">Region: </span>${object["region"]}</p>
                        <p class="details_det_subregion"><span class="bold_span">Sub Region: </span>${object["subregion"]}</p>
                        <p class="details_det_capital"><span class="bold_span">Capital: </span>${object["capital"]}</p>    
                    </div>
                    <div class="container2">
                        <p class="details_det_domain"><span class="bold_span">Top Level Domain: </span>${object["tld"]}</p>
                        <p class="details_det_currency"><span class="bold_span">Currency: </span>${currency}</p>
                        <p class="details_det_language"><span class="bold_span">Languages: </span>${object["language"]}</p>
                    </div>
                </div>
            </div>
            <div class="details_bc">
                <div class="details_bc_name bold_span">Border Countries</div>
            </div>
        </main>`;
        const parent_dev = document.querySelector(".details_bc");
        if (object["border"]) {
          object["border"].slice(0, 5).forEach(function (e, i) {
            let promise = fetch(`https://restcountries.com/v3.1/alpha/${e}`)
              .then(function (response) {
                return response.json();
              })
              .then(function (r) {
                let dev = document.createElement("div");
                dev.classList.add("details_bc_child");
                dev.textContent = `${r[0]["name"]["common"]}`;
                parent_dev.append(dev);
                document.querySelector(".spinner").classList.add("hidden");
              });
          });
        } else {
          document.querySelector(".spinner").classList.add("hidden");
          let dev = document.createElement("div");
          dev.classList.add("details_bc_child");
          dev.textContent = `none`;
          parent_dev.append(dev);
        }
        const back_btn = document.querySelector(".btn");
        back_btn.addEventListener("click", function (e) {
          window.location.reload();
        });
      } catch (e) {
        document.querySelector(".spinner").classList.add("hidden");
        console.log(e);
        document.body.innerHTML = `<div class="btn">
      <svg class="btn_svg">
        <use xlink:href="icon2\\sprite.svg#icon-arrow-long-left"></use>
      </svg>
      <p class="btn_back">Back</p>
    </div>
    <div class="error">
      <img src="error404.png" alt="404error" class="error_img" />
      <h1 class="error_head">You've found a page that does not exist</h1>
      <p class="error_para1">
        Breathe in and on the out breathe go back and try again.
      </p>
    </div>`;
        if (document.body.classList.contains("newbody")) {
          document.querySelector(".btn_svg").classList.add("strokes");
        }
        const back_btn = document.querySelector(".btn");
        back_btn.addEventListener("click", function (e) {
          window.location.reload();
        });
        // console.log(e);
      }
    };
    fetchcountry();
  });
});
searchbtn.addEventListener("click", function (e) {
  //   console.log(searchtext.value);

  const fetchcountry = async function () {
    try {
      document.querySelector(".spinner").classList.remove("hidden");
      let data = await fetch(
        `https://restcountries.com/v3.1/name/${searchtext.value}`
      );
      // console.log(data);
      if (data.ok === false) {
        throw new Error("cannot fetch data");
      }
      let output = await data.json();

      let object = {
        countryname: output[0]["name"]["common"],
        native: output[0]["altSpellings"][1],
        population: output[0]["population"],
        region: output[0]["region"],
        subregion: output[0]["subregion"],
        capital: output[0]["capital"][0],
        tld: "." + output[0]["altSpellings"][0].toLowerCase(),
        // currency: Object.values(output[0]["currencies"]["name"]).join(","),
        language: Object.values(output[0]["languages"]).join(","),
        image: output[0]["flags"]["svg"],
        currencies: output[0]["currencies"],
        border: output[0]["borders"],
      };
      //   console.log(object);
      let currency = Object.values(object["currencies"]).map(function (e, i) {
        return e["name"];
      });
      currency = currency.join(",");
      //   console.log(object["border"][0]);

      frame.innerHTML = `
      <div class="btn">
            <svg class="btn_svg">
                <use xlink:href="icon2\\sprite.svg#icon-arrow-long-left"></use>
            </svg>
            <p class="btn_back">Back</p>
      </div>
      <main class="details">
            <img src="${object["image"]}" alt="${object["countryname"]}" class="details_img">
            <div class="details_det">
                <h1 class="details_det_name">${object["countryname"]}</h1>
                <div class="container">

                    <div class="container1">
                        
                        <p class="details_det_native"><span class="bold_span">Native Name: </span>${object["native"]}</p>
                        <p class="details_det_population"><span class="bold_span">Population: </span>${object["population"]}</p>
                        <p class="details_det_region"><span class="bold_span">Region: </span>${object["region"]}</p>
                        <p class="details_det_subregion"><span class="bold_span">Sub Region: </span>${object["subregion"]}</p>
                        <p class="details_det_capital"><span class="bold_span">Capital: </span>${object["capital"]}</p>    
                    </div>
                    <div class="container2">
                        <p class="details_det_domain"><span class="bold_span">Top Level Domain: </span>${object["tld"]}</p>
                        <p class="details_det_currency"><span class="bold_span">Currency: </span>${currency}</p>
                        <p class="details_det_language"><span class="bold_span">Languages: </span>${object["language"]}</p>
                    </div>
                </div>
            </div>
            <div class="details_bc">
                <div class="details_bc_name bold_span">Border Countries</div>
            </div>
        </main>`;
      const parent_dev = document.querySelector(".details_bc");
      if (object["border"]) {
        object["border"].slice(0, 5).forEach(function (e, i) {
          let promise = fetch(`https://restcountries.com/v3.1/alpha/${e}`)
            .then(function (response) {
              return response.json();
            })
            .then(function (r) {
              let dev = document.createElement("div");
              dev.classList.add("details_bc_child");
              dev.textContent = `${r[0]["name"]["common"]}`;
              parent_dev.append(dev);
              document.querySelector(".spinner").classList.add("hidden");
            });
        });
      } else {
        document.querySelector(".spinner").classList.add("hidden");
        let dev = document.createElement("div");
        dev.classList.add("details_bc_child");
        dev.textContent = `none`;
        parent_dev.append(dev);
      }
      const back_btn = document.querySelector(".btn");
      back_btn.addEventListener("click", function (e) {
        window.location.reload();
      });
    } catch (e) {
      document.querySelector(".spinner").classList.add("hidden");

      document.body.innerHTML = `<div class="btn">
      <svg class="btn_svg">
        <use xlink:href="icon2\\sprite.svg#icon-arrow-long-left"></use>
      </svg>
      <p class="btn_back">Back</p>
    </div>
    <div class="error">
      <img src="error404.png" alt="404error" class="error_img" />
      <h1 class="error_head">You've found a page that does not exist</h1>
      <p class="error_para1">
        Breathe in and on the out breathe go back and try again.
      </p>
    </div>`;
      if (document.body.classList.contains("newbody")) {
        document.querySelector(".btn_svg").classList.add("strokes");
      }
      const back_btn = document.querySelector(".btn");
      back_btn.addEventListener("click", function (e) {
        window.location.reload();
      });
      // console.log(e);
    }
  };
  fetchcountry();
});
mode.addEventListener("click", function (e) {
  document.body.classList.toggle("newbody");
  document.querySelector(".head_mode_icon").classList.toggle("strokes");
  array.forEach(function (e) {
    e.classList.toggle("newelement");
  });
  document.querySelector(".btn_svg").classList.toggle("strokes");
});
let previous = "";
dropdown.addEventListener("click", function (e) {
  if (e.target.value === "") return;
  // console.log(e.target.value);
  const fetfunc1 = async function () {
    try {
      if (previous !== e.target.value) {
        document.querySelector(".spinner").classList.remove("hidden");
        let data = await fetch(`https://restcountries.com/v3.1/all`);
        if (data.ok === false) {
          throw new Error("cannot fetch data");
        }
        let data1 = await data.json();
        data1 = data1.filter(function (element) {
          if (
            e.target.value === "Americas" &&
            element["region"] === "Americas"
          ) {
            return e;
          } else if (element["continents"][0] === e.target.value) {
            return e;
          }
        });
        console.log(data1);
        document.querySelector(".spinner").classList.add("hidden");
        document.body.classList.remove("beforeload");
        displayCountry(data1);
        previous = e.target.value;
      }
    } catch (e) {
      console.log(e);
    }
  };
  fetfunc1();
});
searchtext.addEventListener("keydown", function (e) {
  //   console.log(searchtext.value);
  if (e.code !== "Enter") {
    console.log("here");
    return;
  }
  const fetchcountry = async function () {
    try {
      document.querySelector(".spinner").classList.remove("hidden");
      let data = await fetch(
        `https://restcountries.com/v3.1/name/${searchtext.value}`
      );
      // console.log(data);
      if (data.ok === false) {
        throw new Error("cannot fetch data");
      }
      let output = await data.json();

      let object = {
        countryname: output[0]["name"]["common"],
        native: output[0]["altSpellings"][1],
        population: output[0]["population"],
        region: output[0]["region"],
        subregion: output[0]["subregion"],
        capital: output[0]["capital"][0],
        tld: "." + output[0]["altSpellings"][0].toLowerCase(),
        // currency: Object.values(output[0]["currencies"]["name"]).join(","),
        language: Object.values(output[0]["languages"]).join(","),
        image: output[0]["flags"]["svg"],
        currencies: output[0]["currencies"],
        border: output[0]["borders"],
      };
      //   console.log(object);
      let currency = Object.values(object["currencies"]).map(function (e, i) {
        return e["name"];
      });
      currency = currency.join(",");
      //   console.log(object["border"][0]);

      frame.innerHTML = `
      <div class="btn">
            <svg class="btn_svg">
                <use xlink:href="icon2\\sprite.svg#icon-arrow-long-left"></use>
            </svg>
            <p class="btn_back">Back</p>
      </div>
      <main class="details">
            <img src="${object["image"]}" alt="${object["countryname"]}" class="details_img">
            <div class="details_det">
                <h1 class="details_det_name">${object["countryname"]}</h1>
                <div class="container">

                    <div class="container1">
                        
                        <p class="details_det_native"><span class="bold_span">Native Name: </span>${object["native"]}</p>
                        <p class="details_det_population"><span class="bold_span">Population: </span>${object["population"]}</p>
                        <p class="details_det_region"><span class="bold_span">Region: </span>${object["region"]}</p>
                        <p class="details_det_subregion"><span class="bold_span">Sub Region: </span>${object["subregion"]}</p>
                        <p class="details_det_capital"><span class="bold_span">Capital: </span>${object["capital"]}</p>    
                    </div>
                    <div class="container2">
                        <p class="details_det_domain"><span class="bold_span">Top Level Domain: </span>${object["tld"]}</p>
                        <p class="details_det_currency"><span class="bold_span">Currency: </span>${currency}</p>
                        <p class="details_det_language"><span class="bold_span">Languages: </span>${object["language"]}</p>
                    </div>
                </div>
            </div>
            <div class="details_bc">
                <div class="details_bc_name bold_span">Border Countries</div>
            </div>
        </main>`;
      const parent_dev = document.querySelector(".details_bc");
      if (object["border"]) {
        object["border"].slice(0, 5).forEach(function (e, i) {
          let promise = fetch(`https://restcountries.com/v3.1/alpha/${e}`)
            .then(function (response) {
              return response.json();
            })
            .then(function (r) {
              let dev = document.createElement("div");
              dev.classList.add("details_bc_child");
              dev.textContent = `${r[0]["name"]["common"]}`;
              parent_dev.append(dev);
              document.querySelector(".spinner").classList.add("hidden");
            });
        });
      } else {
        document.querySelector(".spinner").classList.add("hidden");
        let dev = document.createElement("div");
        dev.classList.add("details_bc_child");
        dev.textContent = `none`;
        parent_dev.append(dev);
      }
      const back_btn = document.querySelector(".btn");
      back_btn.addEventListener("click", function (e) {
        window.location.reload();
      });
    } catch (e) {
      document.querySelector(".spinner").classList.add("hidden");

      document.body.innerHTML = `<div class="btn">
      <svg class="btn_svg">
        <use xlink:href="icon2\\sprite.svg#icon-arrow-long-left"></use>
      </svg>
      <p class="btn_back">Back</p>
    </div>
    <div class="error">
      <img src="error404.png" alt="404error" class="error_img" />
      <h1 class="error_head">You've found a page that does not exist</h1>
      <p class="error_para1">
        Breathe in and on the out breathe go back and try again.
      </p>
    </div>`;
      if (document.body.classList.contains("newbody")) {
        document.querySelector(".btn_svg").classList.add("strokes");
      }
      const back_btn = document.querySelector(".btn");
      back_btn.addEventListener("click", function (e) {
        window.location.reload();
      });
      // console.log(e);
    }
  };
  fetchcountry();
});
