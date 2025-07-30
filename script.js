const questions = [
  {
    text: "¿Te encuentras con una situación injusta que no te afecta directamente?",
    options: [
      "Actúo inmediatamente",
      "Evalúo las consecuencias",
      "Prefiero no intervenir",
      "Protesto de forma creativa",
      "Depende del día"
    ]
  }
];
const types = ["Enhancer","Conjurer","Transmuter","Manipulator","Specialist"];
const rotation = { 0: [0,1,2,3,4] };
function buildForm() {
  const container = document.getElementById("form-container");
  questions.forEach((q, idx) => {
    const div = document.createElement("div");
    div.className = "question";
    div.innerHTML = `<p>${idx+1}. ${q.text}</p>`;
    q.options.forEach((opt,i) => {
      const id = `q${idx}_opt${i}`;
      div.innerHTML += `<label for="${id}"><input type="radio" name="q${idx}" id="${id}" value="${i}" required />${opt}</label>`;
    });
    container.appendChild(div);
  });
}
function calculateResult() {
  const scores = { Enhancer:0, Conjurer:0, Transmuter:0, Manipulator:0, Specialist:0 };
  questions.forEach((_, idx) => {
    const selected = document.querySelector(`input[name="q${idx}"]:checked`);
    if (selected) {
      const typeIndex = rotation[idx][parseInt(selected.value,10)];
      scores[types[typeIndex]]++;
    }
  });
  const sorted = Object.entries(scores).sort((a,b)=>b[1]-a[1]);
  const primary = sorted[0][0];
  const secondary = sorted[1] ? sorted[1][0] : "—";
  document.getElementById("result").innerHTML = `<h2>🎯 Tu tipo de Nen</h2><p><strong>Primario:</strong> ${primary}</p><p><strong>Secundario:</strong> ${secondary}</p>`;
}
document.getElementById("btn-submit").addEventListener("click", () => calculateResult());
buildForm();
