const units = {
  temperature: {
    base: "C",
    units: {
      C: { toBase: (v) => v, fromBase: (v) => v },
      K: { toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
      F: {
        toBase: (v) => ((v - 32) * 5) / 9,
        fromBase: (v) => (v * 9) / 5 + 32,
      },
    },
  },
  length: {
    base: "m",
    units: {
      mm: 0.001,
      cm: 0.01,
      m: 1,
      km: 1000,
      in: 0.0254,
      ft: 0.3048,
      yd: 0.9144,
      mi: 1609.344,
    },
  },
  mass: {
    base: "kg",
    units: {
      mg: 0.000001,
      g: 0.001,
      kg: 1,
      t: 1000,
      oz: 0.028349523125,
      lb: 0.45359237,
    },
  },
  speed: {
    base: "m/s",
    units: {
      "m/s": 1,
      "km/h": 1 / 3.6,
      mph: 0.44704,
      kn: 0.5144444444444445,
      "ft/s": 0.3048,
    },
  },
  energy: {
    base: "J",
    units: {
      J: 1,
      kJ: 1000,
      cal: 4.184,
      kcal: 4184,
      Wh: 3600,
      kWh: 3600000,
      BTU: 1055.05585262,
    },
  },
  pressure: {
    base: "Pa",
    units: {
      Pa: 1,
      kPa: 1000,
      bar: 100000,
      atm: 101325,
      psi: 6894.757293168,
      mmHg: 133.322387415,
    },
  },
};

const categoryTabs = document.querySelectorAll(".category-tabs button");
let currentCategory;
categoryTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    categoryTabs.forEach((tab) => tab.classList.remove("active"));
    currentCategory = tab.textContent.toLowerCase();
    updateUnitOptions(tab.textContent.toLowerCase());
    tab.classList.add("active");
  });
});

const fromInput = document.getElementById("from-value");
const toInput = document.getElementById("to-value");

const fromSelect = document.getElementById("from-unit");
const toSelect = document.getElementById("to-unit");
const convertFromTo = () => {
  const value = Number(fromInput.value);
  if (currentCategory == "temperature") {
    const celsius = units["temperature"].units[fromSelect.value].toBase(value);
    toInput.value =
      units["temperature"].units[toSelect.value].fromBase(celsius);
  } else {
    toInput.value =
      (value * units[currentCategory].units[fromSelect.value]) /
      units[currentCategory].units[toSelect.value];
  }
};

const convertToFrom = () => {
  const value = Number(toInput.value);
  if (currentCategory == "temperature") {
    const celsius = units["temperature"].units[toSelect.value].toBase(value);
    fromInput.value =
      units["temperature"].units[fromSelect.value].fromBase(celsius);
  } else {
    fromInput.value =
      (value * units[currentCategory].units[toSelect.value]) /
      units[currentCategory].units[fromSelect.value];
  }
};

fromInput.addEventListener("input", convertFromTo);
toInput.addEventListener("input", convertToFrom);
fromSelect.addEventListener("change", convertFromTo);
toSelect.addEventListener("change", convertToFrom);

const updateUnitOptions = (category) => {
  fromSelect.replaceChildren();
  toSelect.replaceChildren();
  Object.keys(units[category].units).forEach((u) => {
    const option = document.createElement("option");
    option.textContent = u;
    option.value = u;
    fromSelect.append(option);
    toSelect.append(option.cloneNode(true));
  });
};
