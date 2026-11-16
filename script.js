const units = {
  temperature: { base: "" },
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
categoryTabs.forEach((tab) => {
  tab.addEventListener("click", () =>
    updateUnitOptions(tab.textContent.toLowerCase()),
  );
});

const fromSelect = document.getElementById("from-unit");
const toSelect = document.getElementById("to-unit");
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
