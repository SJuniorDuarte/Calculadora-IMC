const data = [
  {
    min: 0,
    max: 18.4,
    classification: "Menor que 18,5",
    info: "Magreza",
    obesity: "0",
  },
  {
    min: 18.5,
    max: 24.9,
    classification: "Entre 18,5 e 24,9",
    info: "Normal",
    obesity: "0",
  },
  {
    min: 25,
    max: 29.9,
    classification: "Entre 25,0 e 29,9",
    info: "Sobrepeso",
    obesity: "I",
  },
  {
    min: 30,
    max: 39.9,
    classification: "Entre 30,0 e 39,9",
    info: "Obesidade",
    obesity: "II",
  },
  {
    min: 40,
    max: 99,
    classification: "Maior que 40,0",
    info: "Obesidade grave",
    obesity: "III",
  },
];

const imcTable = document.querySelector("#imc-table");

const heightInput = document.querySelector("#height");
const weightInput = document.querySelector("#weight");
const calcbtn = document.querySelector("#calc-btn");
const clearbtn = document.querySelector("#clear-btn");
const infoIMC = document.getElementById("imc-info");
const numberIMC = document.querySelector("#imc-number span");
const formContainer = document.getElementById("calc-container");
const resultContainer = document.getElementById("result-container");
const backbtn = document.getElementById("back-btn");

function createTable(data) {
  data.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("table-data");

    const classification = document.createElement("p");
    classification.innerText = item.classification;

    const info = document.createElement("p");
    info.innerText = item.info;

    const obesity = document.createElement("p");
    obesity.innerText = item.obesity;

    div.appendChild(classification);
    div.appendChild(info);
    div.appendChild(obesity);
    imcTable.appendChild(div);
  });
}
const validDigits = (text) => {
  return text.replace(/[^0-9 ,]/g, "");
};
const calcIMC = (weight, height) => {
  const imc = weight / (height * height);
  return imc.toFixed(1);
};

[weightInput, heightInput].forEach((element) => {
  element.addEventListener("input", (e) => {
    const updateValue = validDigits(e.target.value);
    e.target.value = updateValue;
  });
});
const cleanInputs = () => {
  heightInput.value = "";
  weightInput.value = "";
};
createTable(data);

calcbtn.addEventListener("click", (e) => {
  e.preventDefault();
  const weight = +weightInput.value.replace(",", ".");
  const height = +heightInput.value.replace(",", ".");

  if (!weight || !height) return;
  const imc = calcIMC(weight, height);
  let info;
  data.forEach((item) => {
    if (imc >= item.min && imc <= item.max) {
      info = item.info;
    }
  });
  numberIMC.innerText = imc;
  infoIMC.innerText = info;
  if (info == "Obesidade" || info == "Obesidade grave" || info == "Sobrepeso") {
    numberIMC.style.color = "red";
    infoIMC.style.color = "red";
  }
  formContainer.classList.add("hide");
  resultContainer.classList.remove("hide");
  if (!info) return;
});

clearbtn.addEventListener("click", (e) => {
  e.preventDefault();
  cleanInputs();
});
backbtn.addEventListener("click", () => {
  formContainer.classList.remove("hide");
  resultContainer.classList.add("hide");
});
