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

const funFacts = {
  temperature: [
    "Water boils at 100 °C at sea level, but only about 70 °C at the top of Mount Everest.",
    "-40 is the one temperature where Celsius and Fahrenheit are equal.",
    "Absolute zero (0 K, or -273.15 °C) is the coldest temperature possible.",
    "The surface of the Sun is about 5,500 °C.",
    "Normal human body temperature is about 37 °C (98.6 °F).",
  ],
  length: [
    "Light travels about 300,000 km in one second.",
    "The Moon is about 384,400 km from Earth.",
    "One mile is exactly 1,609.344 meters.",
    "The Earth's equator is about 40,075 km around.",
    "A nanometer is about 100,000 times thinner than a human hair.",
  ],
  mass: [
    "A paperclip weighs about 1 gram.",
    "An average adult blue whale weighs around 100 to 150 tonnes.",
    "The kilogram is now defined using a fixed value of the Planck constant, not a metal cylinder.",
    "A liter of water has a mass of about 1 kilogram.",
    "On the Moon you'd weigh about one sixth of your weight on Earth, but your mass stays the same.",
  ],
  speed: [
    "Sound travels at about 343 m/s in air at room temperature.",
    "The fastest land animal, the cheetah, can reach about 100 km/h.",
    "A knot is one nautical mile per hour, used by ships and aircraft.",
    "The International Space Station moves at about 28,000 km/h.",
    "Nothing with mass can reach the speed of light, about 299,792,458 m/s.",
  ],
  energy: [
    "One food Calorie is actually 1 kilocalorie, or 4,184 joules.",
    "A single lightning bolt can carry around 1 billion joules.",
    "A 100 W light bulb uses 0.1 kWh of energy every hour.",
    "Burning one gram of fat releases about 9 kcal, more than double a gram of carbs.",
    "One BTU is roughly the energy released by burning a single wooden match.",
  ],
  pressure: [
    "Standard atmospheric pressure at sea level is 1 atm, or 101,325 Pa.",
    "Blood pressure is measured in mmHg, and 120/80 is a typical healthy reading.",
    "Pressure at the bottom of the Mariana Trench is over 1,000 times atmospheric pressure.",
    "Car tires are usually inflated to about 32 psi.",
    "Pressure drops as you climb, which is why your ears pop on a plane.",
  ],
};

const getRandomFact = (category) => {
  return funFacts[category][
    Math.floor(Math.random() * funFacts[category].length)
  ];
};

const categoryTabs = document.querySelectorAll(".category-tabs button");
const randomFactParagraph = document.getElementById("fun-fact");
randomFactParagraph.innerText = getRandomFact("pressure");
let currentCategory;

categoryTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    categoryTabs.forEach((tab) => tab.classList.remove("active"));
    currentCategory = tab.textContent.toLowerCase();
    randomFactParagraph.innerText = `${getRandomFact(currentCategory)} !`;
    updateUnitOptions(tab.textContent.toLowerCase());
    tab.classList.add("active");
  });
});

const fromInput = document.getElementById("from-value");
const toInput = document.getElementById("to-value");

const fromSelect = document.getElementById("from-unit");
const toSelect = document.getElementById("to-unit");

const convertFromTo = () => {
  const value = parseFloat(fromInput.value);
  if (Number.isNaN(value)) {
    fromInput.value = "";
    return;
  }
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
  const value = parseFloat(toInput.value);
  if (Number.isNaN(value)) {
    fromInput.value = "";
    return;
  }  if (currentCategory == "temperature") {
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
