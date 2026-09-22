/* =========================================================
   ÚTILHUB V15 — NOVA FLOW ADVANCED
   Sin IA • Sin servidor • Herramientas locales + servicios web
   ========================================================= */

"use strict";

/* =========================================================
   CONFIGURACIÓN
   ========================================================= */

const STORAGE_KEY = "utilhub-v15-advanced";

const DEFAULT_STATE = {
  theme: "dark",
  motion: true,
  performance: false,
  effects: true,
  mode: "COSMIC",
  favorites: [],
  recent: [],
  notes: "",
  tasks: [],
  shopping: []
};

let state = loadState();

const tools = [
  {
    id: "calculator",
    name: "Calculadora",
    icon: "🧮",
    desc: "Realiza operaciones matemáticas.",
    cat: "calc"
  },
  {
    id: "percentage",
    name: "Porcentaje",
    icon: "📊",
    desc: "Calcula porcentajes rápidamente.",
    cat: "calc"
  },
  {
    id: "discount",
    name: "Descuento",
    icon: "🏷️",
    desc: "Calcula el precio final con descuento.",
    cat: "calc"
  },
  {
    id: "rule3",
    name: "Regla de 3",
    icon: "📐",
    desc: "Resuelve reglas de tres simples.",
    cat: "calc"
  },
  {
    id: "length",
    name: "Longitud",
    icon: "📏",
    desc: "Convierte unidades de longitud.",
    cat: "convert"
  },
  {
    id: "weight",
    name: "Peso",
    icon: "⚖️",
    desc: "Convierte unidades de peso.",
    cat: "convert"
  },
  {
    id: "volume",
    name: "Volumen",
    icon: "🧪",
    desc: "Convierte unidades de volumen.",
    cat: "convert"
  },
  {
    id: "temperature",
    name: "Temperatura",
    icon: "🌡️",
    desc: "Convierte °C, °F y K.",
    cat: "convert"
  },
  {
    id: "timeconvert",
    name: "Tiempo",
    icon: "⌛",
    desc: "Convierte unidades de tiempo.",
    cat: "convert"
  },
  {
    id: "currency",
    name: "Monedas",
    icon: "💱",
    desc: "Consulta tasas de cambio.",
    cat: "convert"
  },
  {
    id: "datediff",
    name: "Diferencia de fechas",
    icon: "📅",
    desc: "Calcula días entre dos fechas.",
    cat: "time"
  },
  {
    id: "age",
    name: "Edad",
    icon: "🎂",
    desc: "Calcula la edad a partir de una fecha.",
    cat: "time"
  },
  {
    id: "timer",
    name: "Temporizador",
    icon: "⏱️",
    desc: "Cuenta atrás personalizada.",
    cat: "time"
  },
  {
    id: "stopwatch",
    name: "Cronómetro",
    icon: "⏲️",
    desc: "Cronómetro con precisión.",
    cat: "time"
  },
  {
    id: "clock",
    name: "Reloj",
    icon: "🕐",
    desc: "Muestra la hora actual.",
    cat: "time"
  },
  {
    id: "focus",
    name: "Enfoque",
    icon: "🎯",
    desc: "Temporizador para concentrarte.",
    cat: "time"
  },
  {
    id: "text",
    name: "Texto",
    icon: "📝",
    desc: "Cuenta y transforma texto.",
    cat: "text"
  },
  {
    id: "dictionary",
    name: "Diccionario",
    icon: "📖",
    desc: "Busca definiciones de palabras.",
    cat: "text"
  },
  {
    id: "notes",
    name: "Notas",
    icon: "📒",
    desc: "Guarda notas en tu dispositivo.",
    cat: "organize"
  },
  {
    id: "tasks",
    name: "Tareas",
    icon: "✅",
    desc: "Organiza tus tareas.",
    cat: "organize"
  },
  {
    id: "shoppinglist",
    name: "Lista de compras",
    icon: "🛒",
    desc: "Crea una lista de compras.",
    cat: "organize"
  },
  {
    id: "password",
    name: "Contraseña",
    icon: "🔐",
    desc: "Genera contraseñas aleatorias.",
    cat: "useful"
  },
  {
    id: "random",
    name: "Aleatorio",
    icon: "🎲",
    desc: "Genera números aleatorios.",
    cat: "useful"
  },
  {
    id: "qr",
    name: "Código QR",
    icon: "▦",
    desc: "Genera códigos QR.",
    cat: "useful"
  },
  {
    id: "food",
    name: "Comidas",
    icon: "🍔",
    desc: "Busca comida, restaurantes y recetas.",
    cat: "food"
  },
  {
    id: "shopping",
    name: "Compras",
    icon: "🛍️",
    desc: "Busca productos y tiendas.",
    cat: "shopping"
  }
];

/* =========================================================
   ESTADO
   ========================================================= */

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return structuredCloneSafe(DEFAULT_STATE);
    }

    return {
      ...structuredCloneSafe(DEFAULT_STATE),
      ...JSON.parse(saved)
    };
  } catch (error) {
    console.warn("No se pudo cargar el estado:", error);
    return structuredCloneSafe(DEFAULT_STATE);
  }
}

function structuredCloneSafe(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn("No se pudo guardar:", error);
  }
}

/* =========================================================
   UTILIDADES
   ========================================================= */

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function $(selector) {
  return document.querySelector(selector);
}

function $all(selector) {
  return [...document.querySelectorAll(selector)];
}

function toast(message) {
  const box = $("#toast");

  if (!box) return;

  box.textContent = message;
  box.classList.add("show");

  clearTimeout(toast.timer);

  toast.timer = setTimeout(() => {
    box.classList.remove("show");
  }, 2600);
}

function copyText(text) {
  if (!text) return;

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard
      .writeText(text)
      .then(() => toast("Copiado correctamente."))
      .catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const area = document.createElement("textarea");
  area.value = text;
  area.style.position = "fixed";
  area.style.opacity = "0";

  document.body.appendChild(area);
  area.select();

  try {
    document.execCommand("copy");
    toast("Copiado correctamente.");
  } catch {
    toast("No se pudo copiar.");
  }

  area.remove();
}

function formatNumber(value) {
  if (!Number.isFinite(value)) return "—";

  return new Intl.NumberFormat("es-PE", {
    maximumFractionDigits: 8
  }).format(value);
}

/* =========================================================
   TEMA
   ========================================================= */

function applyTheme() {
  document.body.classList.toggle("light", state.theme === "light");

  const btn = $("#themeBtn");

  if (btn) {
    btn.textContent = state.theme === "light" ? "🌙" : "☀️";
  }
}

function toggleTheme() {
  state.theme = state.theme === "dark" ? "light" : "dark";

  saveState();
  applyTheme();

  toast(
    state.theme === "light"
      ? "Modo claro activado."
      : "Modo oscuro activado."
  );
}

/* =========================================================
   ANIMACIONES
   ========================================================= */

function applyMotion() {
  document.body.classList.toggle("motionOff", !state.motion);

  const btn = $("#motionBtn");

  if (btn) {
    btn.textContent = state.motion ? "✦" : "○";
  }
}

function toggleMotion() {
  state.motion = !state.motion;

  saveState();
  applyMotion();

  toast(
    state.motion
      ? "Animaciones activadas."
      : "Animaciones desactivadas."
  );
}

function applyPerformance() {
  document.body.classList.toggle(
    "performanceMode",
    state.performance
  );

  const input = $("#performanceToggle");

  if (input) {
    input.checked = state.performance;
  }
}

function applyEffects() {
  const input = $("#effectsToggle");

  if (input) {
    input.checked = state.effects;
  }

  $("#glow")?.style.setProperty(
    "opacity",
    state.effects ? "1" : "0"
  );
}

/* =========================================================
   MODAL
   ========================================================= */

function openModal(title, body) {
  const modal = $("#modal");
  const titleBox = $("#modalTitle");
  const bodyBox = $("#modalBody");

  if (!modal || !titleBox || !bodyBox) return;

  titleBox.textContent = title;
  bodyBox.innerHTML = body;

  modal.classList.remove("hidden");

  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = $("#modal");

  if (!modal) return;

  modal.classList.add("hidden");
  document.body.style.overflow = "";
}

function rememberRecent(id) {
  state.recent = [
    id,
    ...state.recent.filter(item => item !== id)
  ].slice(0, 10);

  saveState();
}

/* =========================================================
   CALCULADORA
   ========================================================= */

function safeMath(expression) {
  let exp = String(expression || "")
    .replaceAll(",", ".")
    .replace(/\s+/g, "");

  if (!exp) return null;

  if (!/^[0-9+\-*/().%]+$/.test(exp)) {
    return null;
  }

  exp = exp.replace(
    /(\d+(?:\.\d+)?)%/g,
    "($1/100)"
  );

  const tokens = exp.match(
    /(?:\d+(?:\.\d+)?)|[+\-*/().]/g
  );

  if (!tokens) return null;

  const output = [];
  const operators = [];

  const precedence = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2
  };

  for (const token of tokens) {
    if (!Number.isNaN(Number(token))) {
      output.push(Number(token));
      continue;
    }

    if (token === "(") {
      operators.push(token);
      continue;
    }

    if (token === ")") {
      while (
        operators.length &&
        operators[operators.length - 1] !== "("
      ) {
        output.push(operators.pop());
      }

      if (
        operators.pop() !== "("
      ) {
        return null;
      }

      continue;
    }

    while (
      operators.length &&
      operators[operators.length - 1] !== "(" &&
      precedence[operators[operators.length - 1]] >=
        precedence[token]
    ) {
      output.push(operators.pop());
    }

    operators.push(token);
  }

  while (operators.length) {
    const op = operators.pop();

    if (op === "(" || op === ")") {
      return null;
    }

    output.push(op);
  }

  const stack = [];

  for (const token of output) {
    if (typeof token === "number") {
      stack.push(token);
      continue;
    }

    const b = stack.pop();
    const a = stack.pop();

    if (
      typeof a !== "number" ||
      typeof b !== "number"
    ) {
      return null;
    }

    let result;

    if (token === "+") result = a + b;
    if (token === "-") result = a - b;
    if (token === "*") result = a * b;

    if (token === "/") {
      if (b === 0) return null;
      result = a / b;
    }

    stack.push(result);
  }

  if (stack.length !== 1) return null;

  return stack[0];
}

function calculatorHTML() {
  return `
    <form class="toolForm" id="calcForm">
      <label>Operación</label>

      <input
        id="calcInput"
        placeholder="Ejemplo: 25 * 4 + 10"
        autocomplete="off"
      >

      <div class="formActions">
        <button class="primary" type="submit">
          Calcular
        </button>

        <button
          class="secondary"
          type="button"
          id="calcCopy"
        >
          Copiar
        </button>
      </div>

      <div class="resultBox">
        <div id="calcResult" class="resultBig">—</div>
      </div>
    </form>
  `;
}

function setupCalculator() {
  $("#calcForm")?.addEventListener("submit", event => {
    event.preventDefault();

    const input = $("#calcInput");
    const result = $("#calcResult");

    const value = safeMath(input.value);

    if (value === null) {
      result.textContent = "Operación inválida";
      return;
    }

    result.textContent = formatNumber(value);
  });

  $("#calcCopy")?.addEventListener("click", () => {
    copyText($("#calcResult")?.textContent);
  });
}

/* =========================================================
   PORCENTAJE
   ========================================================= */

function percentageHTML() {
  return `
    <form class="toolForm" id="percentForm">

      <div class="formRow">

        <div>
          <label>Porcentaje</label>
          <input id="percentA" type="number" step="any" placeholder="20">
        </div>

        <div>
          <label>De</label>
          <input id="percentB" type="number" step="any" placeholder="150">
        </div>

      </div>

      <button class="primary" type="submit">
        Calcular
      </button>

      <div class="resultBox">
        <div id="percentResult" class="resultBig">—</div>
      </div>

    </form>
  `;
}

function setupPercentage() {
  $("#percentForm")?.addEventListener("submit", e => {
    e.preventDefault();

    const a = Number($("#percentA").value);
    const b = Number($("#percentB").value);

    if (!Number.isFinite(a) || !Number.isFinite(b)) {
      $("#percentResult").textContent = "Datos inválidos";
      return;
    }

    $("#percentResult").textContent =
      formatNumber((a / 100) * b);
  });
}

/* =========================================================
   DESCUENTO
   ========================================================= */

function discountHTML() {
  return `
    <form class="toolForm" id="discountForm">

      <div class="formRow">

        <div>
          <label>Precio</label>
          <input id="discountPrice" type="number" step="any">
        </div>

        <div>
          <label>Descuento %</label>
          <input id="discountPercent" type="number" step="any">
        </div>

      </div>

      <button class="primary" type="submit">
        Calcular
      </button>

      <div class="resultBox" id="discountResult">
        Introduce los datos.
      </div>

    </form>
  `;
}

function setupDiscount() {
  $("#discountForm")?.addEventListener("submit", e => {
    e.preventDefault();

    const price = Number($("#discountPrice").value);
    const percent = Number($("#discountPercent").value);

    if (!Number.isFinite(price) || !Number.isFinite(percent)) {
      $("#discountResult").textContent = "Datos inválidos";
      return;
    }

    const saved = price * percent / 100;
    const finalPrice = price - saved;

    $("#discountResult").innerHTML = `
      <b>Descuento:</b> ${formatNumber(saved)}<br>
      <b>Precio final:</b>
      <span class="resultBig">${formatNumber(finalPrice)}</span>
    `;
  });
}

/* =========================================================
   REGLA DE 3
   ========================================================= */

function rule3HTML() {
  return `
    <form class="toolForm" id="ruleForm">

      <div class="formRow">

        <div>
          <label>A</label>
          <input id="ruleA" type="number" step="any">
        </div>

        <div>
          <label>B</label>
          <input id="ruleB" type="number" step="any">
        </div>

      </div>

      <div>
        <label>C</label>
        <input id="ruleC" type="number" step="any">
      </div>

      <button class="primary" type="submit">
        Resolver
      </button>

      <div class="resultBox">
        <div id="ruleResult" class="resultBig">X = —</div>
      </div>

    </form>
  `;
}

function setupRule3() {
  $("#ruleForm")?.addEventListener("submit", e => {
    e.preventDefault();

    const a = Number($("#ruleA").value);
    const b = Number($("#ruleB").value);
    const c = Number($("#ruleC").value);

    if (
      !Number.isFinite(a) ||
      !Number.isFinite(b) ||
      !Number.isFinite(c) ||
      a === 0
    ) {
      $("#ruleResult").textContent = "Datos inválidos";
      return;
    }

    const x = b * c / a;

    $("#ruleResult").textContent =
      `X = ${formatNumber(x)}`;
  });
}

/* =========================================================
   CONVERSORES
   ========================================================= */

const conversions = {
  length: {
    title: "Conversor de longitud",
    units: {
      m: 1,
      km: 1000,
      cm: 0.01,
      mm: 0.001,
      in: 0.0254,
      ft: 0.3048
    }
  },

  weight: {
    title: "Conversor de peso",
    units: {
      kg: 1,
      g: 0.001,
      mg: 0.000001,
      lb: 0.45359237,
      oz: 0.0283495231
    }
  },

  volume: {
    title: "Conversor de volumen",
    units: {
      l: 1,
      ml: 0.001,
      m3: 1000,
      cm3: 0.001,
      gal: 3.785411784
    }
  },

  timeconvert: {
    title: "Conversor de tiempo",
    units: {
      s: 1,
      min: 60,
      h: 3600,
      day: 86400,
      week: 604800
    }
  }
};

function converterHTML(type) {
  const data = conversions[type];

  const options = Object.keys(data.units)
    .map(unit => `<option value="${unit}">${unit}</option>`)
    .join("");

  return `
    <form class="toolForm" id="converterForm">

      <label>Valor</label>
      <input
        id="convValue"
        type="number"
        step="any"
        value="1"
      >

      <div class="formRow">

        <div>
          <label>Desde</label>
          <select id="convFrom">
            ${options}
          </select>
        </div>

        <div>
          <label>Hacia</label>
          <select id="convTo">
            ${options}
          </select>
        </div>

      </div>

      <button class="primary" type="submit">
        Convertir
      </button>

      <div class="resultBox">
        <div id="convResult" class="resultBig">—</div>
      </div>

    </form>
  `;
}

function setupConverter(type) {
  $("#converterForm")?.addEventListener("submit", e => {
    e.preventDefault();

    const value = Number($("#convValue").value);
    const from = $("#convFrom").value;
    const to = $("#convTo").value;

    if (!Number.isFinite(value)) {
      $("#convResult").textContent = "Dato inválido";
      return;
    }

    const units = conversions[type].units;

    const base = value * units[from];
    const result = base / units[to];

    $("#convResult").textContent =
      formatNumber(result);
  });
}

/* =========================================================
   TEMPERATURA
   ========================================================= */

function temperatureHTML() {
  return `
    <form class="toolForm" id="tempForm">

      <label>Valor</label>
      <input id="tempValue" type="number" step="any" value="0">

      <div class="formRow">

        <div>
          <label>Desde</label>
          <select id="tempFrom">
            <option value="C">Celsius</option>
            <option value="F">Fahrenheit</option>
            <option value="K">Kelvin</option>
          </select>
        </div>

        <div>
          <label>Hacia</label>
          <select id="tempTo">
            <option value="C">Celsius</option>
            <option value="F">Fahrenheit</option>
            <option value="K">Kelvin</option>
          </select>
        </div>

      </div>

      <button class="primary" type="submit">
        Convertir
      </button>

      <div class="resultBox">
        <div id="tempResult" class="resultBig">—</div>
      </div>

    </form>
  `;
}

function setupTemperature() {
  $("#tempForm")?.addEventListener("submit", e => {
    e.preventDefault();

    const value = Number($("#tempValue").value);
    const from = $("#tempFrom").value;
    const to = $("#tempTo").value;

    if (!Number.isFinite(value)) {
      $("#tempResult").textContent = "Dato inválido";
      return;
    }

    let celsius;

    if (from === "C") celsius = value;
    if (from === "F") celsius = (value - 32) * 5 / 9;
    if (from === "K") celsius = value - 273.15;

    let result;

    if (to === "C") result = celsius;
    if (to === "F") result = celsius * 9 / 5 + 32;
    if (to === "K") result = celsius + 273.15;

    $("#tempResult").textContent =
      formatNumber(result);
  });
}

/* =========================================================
   MONEDAS
   ========================================================= */

function currencyHTML() {
  return `
    <form class="toolForm" id="currencyForm">

      <label>Cantidad</label>
      <input
        id="currencyAmount"
        type="number"
        step="any"
        value="1"
      >

      <div class="formRow">

        <div>
          <label>Desde</label>
          <select id="currencyFrom">
            <option>PEN</option>
            <option>USD</option>
            <option>EUR</option>
            <option>GBP</option>
            <option>BRL</option>
            <option>MXN</option>
            <option>CLP</option>
            <option>ARS</option>
          </select>
        </div>

        <div>
          <label>Hacia</label>
          <select id="currencyTo">
            <option>USD</option>
            <option>PEN</option>
            <option>EUR</option>
            <option>GBP</option>
            <option>BRL</option>
            <option>MXN</option>
            <option>CLP</option>
            <option>ARS</option>
          </select>
        </div>

      </div>

      <button class="primary" type="submit">
        Consultar
      </button>

      <div class="resultBox" id="currencyResult">
        Necesita conexión a Internet.
      </div>

    </form>
  `;
}

async function setupCurrency() {
  $("#currencyForm")?.addEventListener("submit", async e => {
    e.preventDefault();

    const amount = Number($("#currencyAmount").value);
    const from = $("#currencyFrom").value;
    const to = $("#currencyTo").value;
    const result = $("#currencyResult");

    if (!Number.isFinite(amount)) {
      result.textContent = "Cantidad inválida";
      return;
    }

    result.innerHTML = `
      <div class="loading">Consultando tasa...</div>
    `;

    try {
      const response = await fetch(
        `https://open.er-api.com/v6/latest/${encodeURIComponent(from)}`
      );

      if (!response.ok) {
        throw new Error("HTTP " + response.status);
      }

      const data = await response.json();

      if (
        data.result !== "success" ||
        !data.rates ||
        !data.rates[to]
      ) {
        throw new Error("Tasa no disponible");
      }

      const rate = data.rates[to];
      const converted = amount * rate;

      result.innerHTML = `
        <b>${formatNumber(amount)} ${esc(from)}</b>
        =
        <span class="resultBig">
          ${formatNumber(converted)} ${esc(to)}
        </span>
        <br>
        <small>
          1 ${esc(from)} = ${formatNumber(rate)} ${esc(to)}
        </small>
      `;
    } catch (error) {
      console.error(error);

      result.innerHTML = `
        <div class="empty">
          No se pudo consultar la tasa.
          <br>
          <small>
            Revisa tu conexión a Internet.
          </small>
        </div>
      `;
    }
  });
}

/* =========================================================
   FECHAS
   ========================================================= */

function dateDiffHTML() {
  return `
    <form class="toolForm" id="dateDiffForm">

      <div class="formRow">

        <div>
          <label>Fecha inicial</label>
          <input id="dateStart" type="date">
        </div>

        <div>
          <label>Fecha final</label>
          <input id="dateEnd" type="date">
        </div>

      </div>

      <button class="primary" type="submit">
        Calcular
      </button>

      <div class="resultBox">
        <div id="dateDiffResult" class="resultBig">—</div>
      </div>

    </form>
  `;
}

function setupDateDiff() {
  $("#dateDiffForm")?.addEventListener("submit", e => {
    e.preventDefault();

    const start = new Date($("#dateStart").value);
    const end = new Date($("#dateEnd").value);

    if (
      Number.isNaN(start.getTime()) ||
      Number.isNaN(end.getTime())
    ) {
      $("#dateDiffResult").textContent = "Fechas inválidas";
      return;
    }

    const days = Math.abs(
      Math.round(
        (end - start) / 86400000
      )
    );

    $("#dateDiffResult").textContent =
      `${formatNumber(days)} días`;
  });
}

function ageHTML() {
  return `
    <form class="toolForm" id="ageForm">

      <label>Fecha de nacimiento</label>

      <input
        id="birthDate"
        type="date"
      >

      <button class="primary" type="submit">
        Calcular edad
      </button>

      <div class="resultBox">
        <div id="ageResult" class="resultBig">—</div>
      </div>

    </form>
  `;
}

function setupAge() {
  $("#ageForm")?.addEventListener("submit", e => {
    e.preventDefault();

    const birth = new Date($("#birthDate").value);
    const now = new Date();

    if (Number.isNaN(birth.getTime())) {
      $("#ageResult").textContent = "Fecha inválida";
      return;
    }

    let age =
      now.getFullYear() -
      birth.getFullYear();

    const month =
      now.getMonth() -
      birth.getMonth();

    if (
      month < 0 ||
      (
        month === 0 &&
        now.getDate() < birth.getDate()
      )
    ) {
      age--;
    }

    if (age < 0) {
      $("#ageResult").textContent =
        "La fecha no puede ser futura.";
      return;
    }

    $("#ageResult").textContent =
      `${age} años`;
  });
}

/* =========================================================
   TEMPORIZADOR
   ========================================================= */

let timerInterval = null;
let timerEnd = 0;

function timerHTML() {
  return `
    <div class="toolForm">

      <div class="formRow">

        <div>
          <label>Minutos</label>
          <input id="timerMin" type="number" min="0" value="0">
        </div>

        <div>
          <label>Segundos</label>
          <input id="timerSec" type="number" min="0" value="30">
        </div>

      </div>

      <div class="resultBox">
        <div id="timerDisplay" class="resultBig">00:30</div>
      </div>

      <div class="formActions">

        <button class="primary" id="timerStart">
          Iniciar
        </button>

        <button class="secondary" id="timerReset">
          Reiniciar
        </button>

      </div>

    </div>
  `;
}

function setupTimer() {
  const min = $("#timerMin");
  const sec = $("#timerSec");
  const display = $("#timerDisplay");

  function getTotal() {
    const m = Math.max(
      0,
      Number(min.value) || 0
    );

    const s = Math.max(
      0,
      Number(sec.value) || 0
    );

    return Math.floor(m * 60 + s);
  }

  function show(seconds) {
    const safe = Math.max(0, seconds);

    const m = Math.floor(safe / 60);
    const s = safe % 60;

    display.textContent =
      `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }

  function reset() {
    clearInterval(timerInterval);
    timerInterval = null;

    show(getTotal());
  }

  min.addEventListener("input", reset);
  sec.addEventListener("input", reset);

  $("#timerStart").addEventListener("click", () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
      toast("Temporizador pausado.");
      return;
    }

    const total = getTotal();

    if (total <= 0) {
      toast("Introduce un tiempo mayor que cero.");
      return;
    }

    timerEnd = Date.now() + total * 1000;

    timerInterval = setInterval(() => {
      const remaining = Math.max(
        0,
        Math.ceil(
          (timerEnd - Date.now()) / 1000
        )
      );

      show(remaining);

      if (remaining <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        toast("⏰ Temporizador terminado.");
      }
    }, 200);

    toast("Temporizador iniciado.");
  });

  $("#timerReset").addEventListener(
    "click",
    reset
  );

  show(getTotal());
}

/* =========================================================
   CRONÓMETRO
   ========================================================= */

let stopwatchInterval = null;
let stopwatchStart = 0;
let stopwatchElapsed = 0;

function stopwatchHTML() {
  return `
    <div class="toolForm">

      <div class="resultBox">
        <div id="stopwatchDisplay" class="resultBig">
          00:00.0
        </div>
      </div>

      <div class="formActions">

        <button class="primary" id="stopwatchStart">
          Iniciar
        </button>

        <button class="secondary" id="stopwatchReset">
          Reiniciar
        </button>

      </div>

    </div>
  `;
}

function setupStopwatch() {
  const display = $("#stopwatchDisplay");

  function render() {
    const elapsed = stopwatchElapsed +
      (
        stopwatchInterval
          ? Date.now() - stopwatchStart
          : 0
      );

    const tenths =
      Math.floor(elapsed / 100) % 10;

    const seconds =
      Math.floor(elapsed / 1000) % 60;

    const minutes =
      Math.floor(elapsed / 60000);

    display.textContent =
      `${String(minutes).padStart(2, "0")}:` +
      `${String(seconds).padStart(2, "0")}.` +
      `${tenths}`;
  }

  $("#stopwatchStart").addEventListener(
    "click",
    () => {

      if (stopwatchInterval) {

        stopwatchElapsed +=
          Date.now() - stopwatchStart;

        clearInterval(stopwatchInterval);
        stopwatchInterval = null;

        $("#stopwatchStart").textContent =
          "Continuar";

      } else {

        stopwatchStart = Date.now();

        stopwatchInterval =
          setInterval(render, 80);

        $("#stopwatchStart").textContent =
          "Pausar";
      }

      render();
    }
  );

  $("#stopwatchReset").addEventListener(
    "click",
    () => {

      clearInterval(stopwatchInterval);

      stopwatchInterval = null;
      stopwatchStart = 0;
      stopwatchElapsed = 0;

      $("#stopwatchStart").textContent =
        "Iniciar";

      render();
    }
  );

  render();
}

/* =========================================================
   RELOJ
   ========================================================= */

function clockHTML() {
  return `
    <div class="toolForm">

      <div class="resultBox">
        <div id="clockDisplay" class="resultBig">
          --:--:--
        </div>

        <p id="clockDate">
          —
        </p>
      </div>

    </div>
  `;
}

function setupClock() {
  const display = $("#clockDisplay");
  const dateBox = $("#clockDate");

  function update() {
    const now = new Date();

    display.textContent =
      now.toLocaleTimeString("es-PE");

    dateBox.textContent =
      now.toLocaleDateString(
        "es-PE",
        {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric"
        }
      );
  }

  update();

  const interval = setInterval(update, 1000);

  $("#modal").dataset.clockInterval =
    String(interval);
}

/* =========================================================
   MODO ENFOQUE
   ========================================================= */

let focusInterval = null;
let focusEnd = 0;

function focusHTML() {
  return `
    <div class="toolForm">

      <label>Minutos de enfoque</label>

      <input
        id="focusMinutes"
        type="number"
        min="1"
        value="25"
      >

      <div class="resultBox">
        <div id="focusDisplay" class="resultBig">
          25:00
        </div>
      </div>

      <div class="formActions">

        <button class="primary" id="focusStart">
          Iniciar
        </button>

        <button class="secondary" id="focusReset">
          Reiniciar
        </button>

      </div>

    </div>
  `;
}

function setupFocus() {
  const input = $("#focusMinutes");
  const display = $("#focusDisplay");

  function format(seconds) {
    const safe = Math.max(0, seconds);

    return `${String(Math.floor(safe / 60)).padStart(2, "0")}:` +
      `${String(safe % 60).padStart(2, "0")}`;
  }

  function reset() {
    clearInterval(focusInterval);
    focusInterval = null;

    const total =
      Math.max(1, Number(input.value) || 25) * 60;

    display.textContent = format(total);
  }

  input.addEventListener("input", reset);

  $("#focusStart").addEventListener("click", () => {

    if (focusInterval) {
      clearInterval(focusInterval);
      focusInterval = null;
      toast("Enfoque pausado.");
      return;
    }

    const total =
      Math.max(1, Number(input.value) || 25) * 60;

    focusEnd = Date.now() + total * 1000;

    focusInterval = setInterval(() => {

      const remaining = Math.max(
        0,
        Math.ceil(
          (focusEnd - Date.now()) / 1000
        )
      );

      display.textContent =
        format(remaining);

      if (remaining <= 0) {
        clearInterval(focusInterval);
        focusInterval = null;

        toast("🎯 Sesión de enfoque terminada.");
      }

    }, 200);

    toast("Modo enfoque iniciado.");
  });

  $("#focusReset").addEventListener(
    "click",
    reset
  );

  reset();
}

/* =========================================================
   TEXTO
   ========================================================= */

function textHTML() {
  return `
    <form class="toolForm" id="textForm">

      <label>Texto</label>

      <textarea
        id="textInput"
        placeholder="Escribe o pega un texto..."
      ></textarea>

      <div class="formActions">
        <button
          class="secondary"
          type="button"
          id="textUpper"
        >
          MAYÚSCULAS
        </button>

        <button
          class="secondary"
          type="button"
          id="textLower"
        >
          minúsculas
        </button>

        <button
          class="secondary"
          type="button"
          id="textCopy"
        >
          Copiar
        </button>
      </div>

      <div class="resultBox" id="textResult">
        Escribe algo para ver estadísticas.
      </div>

    </form>
  `;
}

function setupText() {
  const input = $("#textInput");
  const result = $("#textResult");

  function update() {
    const text = input.value;

    const characters = text.length;

    const noSpaces =
      text.replace(/\s/g, "").length;

    const words =
      text.trim()
        ? text.trim().split(/\s+/).length
        : 0;

    const lines =
      text
        ? text.split(/\n/).length
        : 0;

    result.innerHTML = `
      <b>Caracteres:</b> ${characters}<br>
      <b>Sin espacios:</b> ${noSpaces}<br>
      <b>Palabras:</b> ${words}<br>
      <b>Líneas:</b> ${lines}
    `;
  }

  input.addEventListener("input", update);

  $("#textUpper").addEventListener(
    "click",
    () => {
      input.value =
        input.value.toUpperCase();

      update();
    }
  );

  $("#textLower").addEventListener(
    "click",
    () => {
      input.value =
        input.value.toLowerCase();

      update();
    }
  );

  $("#textCopy").addEventListener(
    "click",
    () => copyText(input.value)
  );

  update();
}

/* =========================================================
   DICCIONARIO — CORREGIDO
   ========================================================= */

function dictionaryHTML() {
  return `
    <form class="toolForm" id="dictForm">

      <label>Palabra</label>

      <input
        id="dictWord"
        placeholder="Ejemplo: escuela"
        autocomplete="off"
      >

      <button class="primary" type="submit">
        Buscar definición
      </button>

      <div id="dictResult" class="resultBox">
        Escribe una palabra.
      </div>

    </form>
  `;
}

async function dictionary() {
  const word =
    document.getElementById("dictWord")?.value.trim();

  const box =
    document.getElementById("dictResult");

  if (!box) return;

  if (!word) {
    box.innerHTML = `
      <div class="empty">
        Escribe una palabra para buscar.
      </div>
    `;

    return;
  }

  box.innerHTML = `
    <div class="loading">
      Buscando “${esc(word)}”...
    </div>
  `;

  const searchWord =
    word.split(/\s+/)[0];

  const languages = ["es", "en"];

  try {

    let data = null;
    let usedLang = "es";

    for (const lang of languages) {

      const url =
        `https://api.dictionaryapi.dev/api/v2/entries/` +
        `${lang}/${encodeURIComponent(searchWord)}`;

      const response =
        await fetch(url, {
          headers: {
            Accept: "application/json"
          }
        });

      if (response.ok) {

        const json =
          await response.json();

        if (
          Array.isArray(json) &&
          json.length
        ) {
          data = json[0];
          usedLang = lang;
          break;
        }
      }
    }

    if (!data) {

      box.innerHTML = `
        <div class="empty">
          No encontré “${esc(searchWord)}”.
          <br>
          Prueba con otra palabra.
        </div>
      `;

      return;
    }

    const phonetic =
      data.phonetic ||
      data.phonetics?.find(
        item => item.text
      )?.text ||
      "";

    const meanings =
      Array.isArray(data.meanings)
        ? data.meanings
        : [];

    const html =
      meanings
        .slice(0, 5)
        .map(meaning => {

          const definitions =
            Array.isArray(
              meaning.definitions
            )
              ? meaning.definitions
              : [];

          return `
            <article class="dictMeaning">

              <strong>
                ${esc(
                  meaning.partOfSpeech ||
                  "Significado"
                )}
              </strong>

              ${
                definitions
                  .slice(0, 4)
                  .map(definition => `
                    <div class="dictDef">

                      <p>
                        ${esc(
                          definition.definition ||
                          ""
                        )}
                      </p>

                      ${
                        definition.example
                          ? `
                            <small>
                              Ejemplo:
                              ${esc(
                                definition.example
                              )}
                            </small>
                          `
                          : ""
                      }

                    </div>
                  `)
                  .join("")
              }

            </article>
          `;
        })
        .join("");

    box.innerHTML = `
      <div class="dictHead">

        <h3>
          ${esc(
            data.word ||
            searchWord
          )}
        </h3>

        ${
          phonetic
            ? `<span>${esc(phonetic)}</span>`
            : ""
        }

        <small>
          Idioma:
          ${
            usedLang === "es"
              ? "Español"
              : "Inglés"
          }
        </small>

      </div>

      ${
        html ||
        `
          <div class="empty">
            No hay definiciones disponibles.
          </div>
        `
      }
    `;

  } catch (error) {

    console.error(
      "Dictionary error:",
      error
    );

    box.innerHTML = `
      <div class="empty">

        No se pudo conectar con el diccionario.

        <br>

        <small>
          Revisa tu conexión a Internet
          e inténtalo de nuevo.
        </small>

      </div>
    `;
  }
}

function setupDictionary() {
  $("#dictForm")?.addEventListener(
    "submit",
    event => {
      event.preventDefault();
      dictionary();
    }
  );
}

/* =========================================================
   NOTAS
   ========================================================= */

function notesHTML() {
  return `
    <div class="toolForm">

      <label>Mis notas</label>

      <textarea
        id="notesInput"
        placeholder="Escribe aquí..."
      >${esc(state.notes)}</textarea>

      <div class="formActions">

        <button
          class="primary"
          id="saveNotes"
        >
          Guardar
        </button>

        <button
          class="secondary"
          id="clearNotes"
        >
          Borrar
        </button>

      </div>

    </div>
  `;
}

function setupNotes() {
  $("#saveNotes").addEventListener(
    "click",
    () => {
      state.notes =
        $("#notesInput").value;

      saveState();

      toast("Notas guardadas.");
    }
  );

  $("#clearNotes").addEventListener(
    "click",
    () => {

      $("#notesInput").value = "";

      state.notes = "";

      saveState();

      toast("Notas borradas.");
    }
  );
}

/* =========================================================
   TAREAS
   ========================================================= */

function tasksHTML() {
  return `
    <div class="toolForm">

      <div class="formRow">

        <input
          id="taskInput"
          placeholder="Nueva tarea..."
        >

        <button
          class="primary"
          id="addTask"
        >
          Añadir
        </button>

      </div>

      <div id="taskList" class="list"></div>

    </div>
  `;
}

function renderTasks() {
  const list = $("#taskList");

  if (!list) return;

  if (!state.tasks.length) {
    list.innerHTML = `
      <div class="empty">
        No tienes tareas todavía.
      </div>
    `;

    return;
  }

  list.innerHTML =
    state.tasks
      .map(
        (task, index) => `
          <div class="listItem ${
            task.done ? "done" : ""
          }">

            <input
              type="checkbox"
              data-task-check="${index}"
              ${task.done ? "checked" : ""}
            >

            <span>
              ${esc(task.text)}
            </span>

            <button
              data-task-delete="${index}"
            >
              ✕
            </button>

          </div>
        `
      )
      .join("");
}

function setupTasks() {
  $("#addTask").addEventListener(
    "click",
    () => {

      const input = $("#taskInput");
      const text = input.value.trim();

      if (!text) return;

      state.tasks.push({
        text,
        done: false
      });

      input.value = "";

      saveState();
      renderTasks();
    }
  );

  $("#taskInput").addEventListener(
    "keydown",
    event => {
      if (event.key === "Enter") {
        event.preventDefault();
        $("#addTask").click();
      }
    }
  );

  $("#taskList").addEventListener(
    "click",
    event => {

      const check =
        event.target.closest(
          "[data-task-check]"
        );

      const remove =
        event.target.closest(
          "[data-task-delete]"
        );

      if (check) {

        const index =
          Number(
            check.dataset.taskCheck
          );

        state.tasks[index].done =
          check.checked;

        saveState();
        renderTasks();
      }

      if (remove) {

        const index =
          Number(
            remove.dataset.taskDelete
          );

        state.tasks.splice(index, 1);

        saveState();
        renderTasks();
      }
    }
  );

  renderTasks();
}

/* =========================================================
   LISTA DE COMPRAS
   ========================================================= */

function shoppingListHTML() {
  return `
    <div class="toolForm">

      <div class="formRow">

        <input
          id="shoppingListInput"
          placeholder="Ejemplo: arroz"
        >

        <button
          class="primary"
          id="addShoppingItem"
        >
          Añadir
        </button>

      </div>

      <div
        id="shoppingList"
        class="list"
      ></div>

    </div>
  `;
}

function renderShoppingList() {
  const list = $("#shoppingList");

  if (!list) return;

  if (!state.shopping.length) {
    list.innerHTML = `
      <div class="empty">
        Tu lista está vacía.
      </div>
    `;

    return;
  }

  list.innerHTML =
    state.shopping
      .map(
        (item, index) => `
          <div class="listItem ${
            item.done ? "done" : ""
          }">

            <input
              type="checkbox"
              data-shop-check="${index}"
              ${item.done ? "checked" : ""}
            >

            <span>
              ${esc(item.text)}
            </span>

            <button
              data-shop-delete="${index}"
            >
              ✕
            </button>

          </div>
        `
      )
      .join("");
}

function setupShoppingList() {
  $("#addShoppingItem").addEventListener(
    "click",
    () => {

      const input =
        $("#shoppingListInput");

      const text =
        input.value.trim();

      if (!text) return;

      state.shopping.push({
        text,
        done: false
      });

      input.value = "";

      saveState();
      renderShoppingList();
    }
  );

  $("#shoppingListInput").addEventListener(
    "keydown",
    event => {

      if (event.key === "Enter") {
        event.preventDefault();
        $("#addShoppingItem").click();
      }

    }
  );

  $("#shoppingList").addEventListener(
    "click",
    event => {

      const check =
        event.target.closest(
          "[data-shop-check]"
        );

      const remove =
        event.target.closest(
          "[data-shop-delete]"
        );

      if (check) {

        const index =
          Number(
            check.dataset.shopCheck
          );

        state.shopping[index].done =
          check.checked;

        saveState();
        renderShoppingList();
      }

      if (remove) {

        const index =
          Number(
            remove.dataset.shopDelete
          );

        state.shopping.splice(
          index,
          1
        );

        saveState();
        renderShoppingList();
      }

    }
  );

  renderShoppingList();
}

/* =========================================================
   GENERADOR DE CONTRASEÑAS
   ========================================================= */

function passwordHTML() {
  return `
    <div class="toolForm">

      <label>Longitud</label>

      <input
        id="passwordLength"
        type="number"
        min="4"
        max="128"
        value="16"
      >

      <label>
        <input
          id="passwordNumbers"
          type="checkbox"
          checked
        >
        Números
      </label>

      <label>
        <input
          id="passwordSymbols"
          type="checkbox"
          checked
        >
        Símbolos
      </label>

      <button
        class="primary"
        id="generatePassword"
      >
        Generar
      </button>

      <div class="resultBox">

        <div
          id="passwordResult"
          class="resultBig"
        >
          —
        </div>

        <button
          class="secondary"
          id="copyPassword"
        >
          Copiar
        </button>

      </div>

    </div>
  `;
}

function secureRandom(max) {
  if (
    window.crypto &&
    crypto.getRandomValues
  ) {
    const array =
      new Uint32Array(1);

    crypto.getRandomValues(array);

    return array[0] % max;
  }

  return Math.floor(
    Math.random() * max
  );
}

function generatePassword() {
  const length =
    Math.min(
      128,
      Math.max(
        4,
        Number(
          $("#passwordLength").value
        ) || 16
      )
    );

  let chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
    "abcdefghijklmnopqrstuvwxyz";

  if ($("#passwordNumbers").checked) {
    chars += "0123456789";
  }

  if ($("#passwordSymbols").checked) {
    chars += "!@#$%^&*()-_=+[]{}";
  }

  let password = "";

  for (let i = 0; i < length; i++) {
    password +=
      chars[
        secureRandom(chars.length)
      ];
  }

  $("#passwordResult").textContent =
    password;
}

function setupPassword() {
  $("#generatePassword").addEventListener(
    "click",
    generatePassword
  );

  $("#copyPassword").addEventListener(
    "click",
    () => {
      copyText(
        $("#passwordResult").textContent
      );
    }
  );

  generatePassword();
}

/* =========================================================
   ALEATORIO
   ========================================================= */

function randomHTML() {
  return `
    <form class="toolForm" id="randomForm">

      <div class="formRow">

        <div>
          <label>Mínimo</label>
          <input
            id="randomMin"
            type="number"
            value="1"
          >
        </div>

        <div>
          <label>Máximo</label>
          <input
            id="randomMax"
            type="number"
            value="100"
          >
        </div>

      </div>

      <button
        class="primary"
        type="submit"
      >
        Generar
      </button>

      <div class="resultBox">
        <div
          id="randomResult"
          class="resultBig"
        >
          —
        </div>
      </div>

    </form>
  `;
}

function setupRandom() {
  $("#randomForm").addEventListener(
    "submit",
    event => {

      event.preventDefault();

      let min =
        Number($("#randomMin").value);

      let max =
        Number($("#randomMax").value);

      if (
        !Number.isFinite(min) ||
        !Number.isFinite(max)
      ) {
        $("#randomResult").textContent =
          "Datos inválidos";

        return;
      }

      if (min > max) {
        [min, max] = [max, min];
      }

      const result =
        Math.floor(
          Math.random() *
            (max - min + 1)
        ) + min;

      $("#randomResult").textContent =
        String(result);
    }
  );
}

/* =========================================================
   QR
   ========================================================= */

function qrHTML() {
  return `
    <form class="toolForm" id="qrForm">

      <label>Texto o enlace</label>

      <input
        id="qrText"
        placeholder="https://ejemplo.com"
      >

      <button
        class="primary"
        type="submit"
      >
        Generar QR
      </button>

      <div
        class="resultBox"
        id="qrResult"
      >
        Introduce un texto o enlace.
      </div>

    </form>
  `;
}

function setupQR() {
  $("#qrForm").addEventListener(
    "submit",
    event => {

      event.preventDefault();

      const text =
        $("#qrText").value.trim();

      const result =
        $("#qrResult");

      if (!text) {
        result.textContent =
          "Escribe algo primero.";

        return;
      }

      const url =
        `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(text)}`;

      result.innerHTML = `
        <img
          src="${url}"
          alt="Código QR generado"
          style="
            display:block;
            width:260px;
            max-width:100%;
            margin:auto;
            border-radius:12px;
          "
        >

        <p style="margin-top:12px;">
          ${esc(text)}
        </p>
      `;
    }
  );
}

/* =========================================================
   COMIDAS
   ========================================================= */

function foodHTML() {
  return `
    <div class="toolForm">

      <label>¿Qué quieres buscar?</label>

      <input
        id="foodQuery"
        placeholder="Ejemplo: hamburguesas, pizza, recetas..."
      >

      <label>Zona o ciudad</label>

      <input
        id="foodLocation"
        placeholder="Ejemplo: Lima"
      >

      <div class="formActions">

        <button
          class="primary"
          id="foodSearch"
        >
          Buscar comida
        </button>

        <button
          class="secondary"
          id="foodRecipes"
        >
          Buscar recetas
        </button>

      </div>

      <div class="resultBox">
        <div class="linkGrid">

          <a
            id="foodGoogle"
            class="bigLink"
            href="#"
            target="_blank"
            rel="noopener"
          >
            <b>🍔 Google Maps</b>
            <small>Restaurantes y comida</small>
          </a>

          <a
            id="foodRappi"
            class="bigLink"
            href="https://www.rappi.com.pe/"
            target="_blank"
            rel="noopener"
          >
            <b>🛵 Rappi</b>
            <small>Pedidos realizados por ti</small>
          </a>

          <a
            id="foodPedidos"
            class="bigLink"
            href="https://www.pedidosya.com.pe/"
            target="_blank"
            rel="noopener"
          >
            <b>🍕 PedidosYa</b>
            <small>Pedidos realizados por ti</small>
          </a>

          <a
            id="foodRecipeLink"
            class="bigLink"
            href="#"
            target="_blank"
            rel="noopener"
          >
            <b>👨‍🍳 Recetas</b>
            <small>Buscar recetas</small>
          </a>

        </div>
      </div>

    </div>
  `;
}

function setupFood() {
  function updateLinks() {

    const query =
      $("#foodQuery").value.trim() ||
      "comida";

    const location =
      $("#foodLocation").value.trim();

    const search =
      `${query} ${location}`.trim();

    $("#foodGoogle").href =
      `https://www.google.com/maps/search/${encodeURIComponent(search)}`;

    $("#foodRecipeLink").href =
      `https://www.google.com/search?q=${encodeURIComponent(
        "receta " + query
      )}`;

    toast("Búsqueda preparada.");
  }

  $("#foodSearch").addEventListener(
    "click",
    updateLinks
  );

  $("#foodRecipes").addEventListener(
    "click",
    () => {

      const query =
        $("#foodQuery").value.trim() ||
        "comida";

      window.open(
        `https://www.google.com/search?q=${encodeURIComponent(
          "receta " + query
        )}`,
        "_blank",
        "noopener"
      );
    }
  );
}

/* =========================================================
   COMPRAS
   ========================================================= */

function shoppingHTML() {
  return `
    <div class="toolForm">

      <label>Producto</label>

      <input
        id="shoppingQuery"
        placeholder="Ejemplo: audífonos, mochila..."
      >

      <button
        class="primary"
        id="shoppingSearch"
      >
        Buscar producto
      </button>

      <div class="resultBox">

        <div class="linkGrid">

          <a
            id="shoppingGoogle"
            class="bigLink"
            href="#"
            target="_blank"
            rel="noopener"
          >
            <b>🔎 Google Shopping</b>
            <small>Comparar productos</small>
          </a>

          <a
            id="shoppingMercado"
            class="bigLink"
            href="#"
            target="_blank"
            rel="noopener"
          >
            <b>🛒 Mercado Libre</b>
            <small>Buscar productos</small>
          </a>

          <a
            id="shoppingFalabella"
            class="bigLink"
            href="#"
            target="_blank"
            rel="noopener"
          >
            <b>🏬 Falabella</b>
            <small>Buscar productos</small>
          </a>

          <a
            id="shoppingWeb"
            class="bigLink"
            href="#"
            target="_blank"
            rel="noopener"
          >
            <b>🌐 Búsqueda web</b>
            <small>Encontrar otras opciones</small>
          </a>

        </div>

      </div>

    </div>
  `;
}

function setupShopping() {
  $("#shoppingSearch").addEventListener(
    "click",
    () => {

      const query =
        $("#shoppingQuery").value.trim();

      if (!query) {
        toast("Escribe un producto.");
        return;
      }

      const encoded =
        encodeURIComponent(query);

      $("#shoppingGoogle").href =
        `https://www.google.com/search?tbm=shop&q=${encoded}`;

      $("#shoppingMercado").href =
        `https://listado.mercadolibre.com.pe/${encoded}`;

      $("#shoppingFalabella").href =
        `https://www.falabella.com.pe/falabella-pe/search?Ntt=${encoded}`;

      $("#shoppingWeb").href =
        `https://www.google.com/search?q=${encoded}`;

      toast("Búsquedas preparadas.");
    }
  );
}

/* =========================================================
   CENTRO DE HERRAMIENTAS
   ========================================================= */

function toolTemplate(tool) {
  return `
    <article
      class="toolCard"
      data-tool="${tool.id}"
      data-cat="${tool.cat}"
    >

      <div class="toolIcon">
        ${tool.icon}
      </div>

      <h3>
        ${esc(tool.name)}
      </h3>

      <p>
        ${esc(tool.desc)}
      </p>

      <button
        class="toolOpen"
        data-open="${tool.id}"
        title="Abrir"
      >
        →
      </button>

    </article>
  `;
}

function renderTools(
  category = "all",
  query = ""
) {
  const grid = $("#toolGrid");

  if (!grid) return;

  const normalized =
    query.trim().toLowerCase();

  const filtered =
    tools.filter(tool => {

      const categoryMatch =
        category === "all" ||
        tool.cat === category;

      const queryMatch =
        !normalized ||
        tool.name
          .toLowerCase()
          .includes(normalized) ||
        tool.desc
          .toLowerCase()
          .includes(normalized);

      return categoryMatch && queryMatch;
    });

  grid.innerHTML =
    filtered.map(toolTemplate).join("");

  $("#resultCount").textContent =
    `${filtered.length} herramienta${
      filtered.length === 1 ? "" : "s"
    }`;

  $all("[data-open]").forEach(
    button => {
      button.addEventListener(
        "click",
        () => openTool(button.dataset.open)
      );
    }
  );
}

/* =========================================================
   ABRIR HERRAMIENTAS
   ========================================================= */

function openTool(id) {
  const tool =
    tools.find(item => item.id === id);

  if (!tool) return;

  rememberRecent(id);

  let body = "";

  switch (id) {

    case "calculator":
      body = calculatorHTML();
      break;

    case "percentage":
      body = percentageHTML();
      break;

    case "discount":
      body = discountHTML();
      break;

    case "rule3":
      body = rule3HTML();
      break;

    case "length":
    case "weight":
    case "volume":
    case "timeconvert":
      body = converterHTML(id);
      break;

    case "temperature":
      body = temperatureHTML();
      break;

    case "currency":
      body = currencyHTML();
      break;

    case "datediff":
      body = dateDiffHTML();
      break;

    case "age":
      body = ageHTML();
      break;

    case "timer":
      body = timerHTML();
      break;

    case "stopwatch":
      body = stopwatchHTML();
      break;

    case "clock":
      body = clockHTML();
      break;

    case "focus":
      body = focusHTML();
      break;

    case "text":
      body = textHTML();
      break;

    case "dictionary":
      body = dictionaryHTML();
      break;

    case "notes":
      body = notesHTML();
      break;

    case "tasks":
      body = tasksHTML();
      break;

    case "shoppinglist":
      body = shoppingListHTML();
      break;

    case "password":
      body = passwordHTML();
      break;

    case "random":
      body = randomHTML();
      break;

    case "qr":
      body = qrHTML();
      break;

    case "food":
      body = foodHTML();
      break;

    case "shopping":
      body = shoppingHTML();
      break;

    default:
      body = `
        <div class="empty">
          Herramienta no disponible.
        </div>
      `;
  }

  openModal(tool.name, body);

  setTimeout(() => {
    setupTool(id);
  }, 0);
}

/* =========================================================
   CONFIGURAR HERRAMIENTA ABIERTA
   ========================================================= */

function setupTool(id) {

  switch (id) {

    case "calculator":
      setupCalculator();
      break;

    case "percentage":
      setupPercentage();
      break;

    case "discount":
      setupDiscount();
      break;

    case "rule3":
      setupRule3();
      break;

    case "length":
    case "weight":
    case "volume":
    case "timeconvert":
      setupConverter(id);
      break;

    case "temperature":
      setupTemperature();
      break;

    case "currency":
      setupCurrency();
      break;

    case "datediff":
      setupDateDiff();
      break;

    case "age":
      setupAge();
      break;

    case "timer":
      setupTimer();
      break;

    case "stopwatch":
      setupStopwatch();
      break;

    case "clock":
      setupClock();
      break;

    case "focus":
      setupFocus();
      break;

    case "text":
      setupText();
      break;

    case "dictionary":
      setupDictionary();
      break;

    case "notes":
      setupNotes();
      break;

    case "tasks":
      setupTasks();
      break;

    case "shoppinglist":
      setupShoppingList();
      break;

    case "password":
      setupPassword();
      break;

    case "random":
      setupRandom();
      break;

    case "qr":
      setupQR();
      break;

    case "food":
      setupFood();
      break;

    case "shopping":
      setupShopping();
      break;
  }
}

/* =========================================================
   BÚSQUEDA
   ========================================================= */

function setupSearch() {
  const input = $("#search");

  if (!input) return;

  input.addEventListener(
    "input",
    () => {
      renderTools(
        currentCategory,
        input.value
      );
    }
  );
}

let currentCategory = "all";

function setupCategories() {
  $all(
    "#categories button"
  ).forEach(button => {

    button.addEventListener(
      "click",
      () => {

        $all(
          "#categories button"
        ).forEach(
          item => item.classList.remove("active")
        );

        button.classList.add("active");

        currentCategory =
          button.dataset.cat;

        renderTools(
          currentCategory,
          $("#search")?.value || ""
        );
      }
    );

  });
}

/* =========================================================
   ATAJOS
   ========================================================= */

function setupShortcuts() {

  document.addEventListener(
    "keydown",
    event => {

      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
      ) {

        event.preventDefault();

        $("#search")?.focus();
      }

      if (event.key === "Escape") {
        closeModal();
      }
    }
  );

  $all("[data-scroll]").forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          const target =
            document.getElementById(
              button.dataset.scroll
            );

          target?.scrollIntoView({
            behavior:
              state.motion
                ? "smooth"
                : "auto"
          });

        }
      );

    }
  );
}

/* =========================================================
   EXPORTAR / IMPORTAR
   ========================================================= */

function exportData() {

  const data = JSON.stringify(
    state,
    null,
    2
  );

  const blob =
    new Blob(
      [data],
      {
        type:"application/json"
      }
    );

  const url =
    URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;
  link.download =
    "utilhub-v15-datos.json";

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);

  toast("Datos exportados.");
}

function importData(file) {

  if (!file) return;

  const reader =
    new FileReader();

  reader.onload = () => {

    try {

      const imported =
        JSON.parse(
          reader.result
        );

      state = {
        ...structuredCloneSafe(
          DEFAULT_STATE
        ),
        ...imported
      };

      saveState();

      applyTheme();
      applyMotion();
      applyPerformance();
      applyEffects();

      toast("Datos importados.");

    } catch {

      toast(
        "El archivo no es válido."
      );
    }
  };

  reader.readAsText(file);
}

/* =========================================================
   NOVA FLOW — CANVAS
   ========================================================= */

function nova() {

  const canvas =
    document.getElementById("nova");

  if (!canvas) return;

  const ctx =
    canvas.getContext("2d");

  let width = 0;
  let height = 0;

  let mouse = {
    x: -1000,
    y: -1000,
    active: false
  };

  let particles = [];

  let lastTime = performance.now();
  let frames = 0;
  let fpsTime = lastTime;

  function resize() {

    const dpr =
      Math.min(
        window.devicePixelRatio || 1,
        2
      );

    width =
      window.innerWidth;

    height =
      window.innerHeight;

    canvas.width =
      width * dpr;

    canvas.height =
      height * dpr;

    canvas.style.width =
      width + "px";

    canvas.style.height =
      height + "px";

    ctx.setTransform(
      dpr,
      0,
      0,
      dpr,
      0,
      0
    );

    createParticles();
  }

  function particleCount() {

    if (!state.effects) {
      return 0;
    }

    if (state.performance) {
      return Math.min(
        35,
        Math.floor(
          (width * height) / 26000
        )
      );
    }

    return Math.min(
      100,
      Math.floor(
        (width * height) / 11000
      )
    );
  }

  function createParticles() {

    particles = [];

    const count =
      particleCount();

    for (let i = 0; i < count; i++) {

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx:
          (Math.random() - .5) *
          .35,
        vy:
          (Math.random() - .5) *
          .35,
        size:
          Math.random() * 2.2 +
          .5,
        alpha:
          Math.random() * .65 +
          .15,
        phase:
          Math.random() * Math.PI * 2
      });
    }
  }

  function colors() {

    if (state.mode === "AURORA") {
      return [
        "34,211,238",
        "52,211,153",
        "167,139,250"
      ];
    }

    if (state.mode === "PULSE") {
      return [
        "59,130,246",
        "124,58,237",
        "244,114,182"
      ];
    }

    return [
      "34,211,238",
      "59,130,246",
      "124,58,237"
    ];
  }

  function draw(time) {

    ctx.clearRect(
      0,
      0,
      width,
      height
    );

    if (!state.effects) {
      requestAnimationFrame(draw);
      return;
    }

    const palette =
      colors();

    const t =
      time * .001;

    for (const p of particles) {

      if (state.motion) {

        p.x += p.vx;
        p.y += p.vy;

        p.x +=
          Math.sin(
            t +
            p.phase
          ) * .05;

        p.y +=
          Math.cos(
            t +
            p.phase
          ) * .05;

      }

      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      if (p.y < -10) p.y = height + 10;
      if (p.y > height + 10) p.y = -10;

      let px = p.x;
      let py = p.y;

      if (
        mouse.active &&
        state.motion
      ) {

        const dx =
          mouse.x - p.x;

        const dy =
          mouse.y - p.y;

        const distance =
          Math.hypot(dx, dy);

        if (distance < 150) {

          const force =
            (150 - distance) /
            150;

          px -=
            dx *
            force *
            .015;

          py -=
            dy *
            force *
            .015;
        }
      }

      const color =
        palette[
          Math.floor(
            p.phase * 10
          ) % palette.length
        ];

      ctx.beginPath();

      ctx.fillStyle =
        `rgba(${color},${p.alpha})`;

      ctx.arc(
        px,
        py,
        p.size,
        0,
        Math.PI * 2
      );

      ctx.fill();
    }

    if (
      !state.performance &&
      particles.length
    ) {

      for (
        let i = 0;
        i < particles.length;
        i++
      ) {

        for (
          let j = i + 1;
          j < particles.length;
          j++
        ) {

          const a =
            particles[i];

          const b =
            particles[j];

          const dx =
            a.x - b.x;

          const dy =
            a.y - b.y;

          const distance =
            Math.hypot(dx, dy);

          if (distance < 100) {

            const alpha =
              (1 - distance / 100) *
              .10;

            ctx.beginPath();

            ctx.strokeStyle =
              `rgba(34,211,238,${alpha})`;

            ctx.lineWidth = .5;

            ctx.moveTo(
              a.x,
              a.y
            );

            ctx.lineTo(
              b.x,
              b.y
            );

            ctx.stroke();
          }
        }
      }
    }

    frames++;

    if (
      time - fpsTime >= 1000
    ) {

      const fps =
        Math.round(
          frames *
          1000 /
          (time - fpsTime)
        );

      if ($("#fps")) {
        $("#fps").textContent =
          String(fps);
      }

      frames = 0;
      fpsTime = time;
    }

    lastTime = time;

    requestAnimationFrame(draw);
  }

  window.addEventListener(
    "resize",
    resize
  );

  window.addEventListener(
    "pointermove",
    event => {

      mouse.x =
        event.clientX;

      mouse.y =
        event.clientY;

      mouse.active = true;

      const glow =
        $("#glow");

      if (
        glow &&
        state.effects
      ) {

        glow.style.left =
          event.clientX + "px";

        glow.style.top =
          event.clientY + "px";
      }
    },
    {
      passive:true
    }
  );

  window.addEventListener(
    "pointerleave",
    () => {
      mouse.active = false;
    }
  );

  window.addEventListener(
    "click",
    event => {

      if (
        !state.effects ||
        state.performance
      ) {
        return;
      }

      const amount = 8;

      for (let i = 0; i < amount; i++) {

        particles.push({
          x:event.clientX,
          y:event.clientY,
          vx:
            (Math.random() - .5) *
            2,
          vy:
            (Math.random() - .5) *
            2,
          size:
            Math.random() * 2 + 1,
          alpha:.8,
          phase:
            Math.random() *
            Math.PI *
            2
        });
      }

      if (particles.length > 140) {
        particles.splice(
          0,
          particles.length - 140
        );
      }
    }
  );

  resize();

  requestAnimationFrame(draw);
}

/* =========================================================
   NOVA MODES
   ========================================================= */

function updateModeUI() {

  const modeLabel =
    $("#modeLabel");

  const novaMode =
    $("#novaMode");

  if (modeLabel) {
    modeLabel.textContent =
      state.mode;
  }

  if (novaMode) {
    novaMode.textContent =
      state.mode;
  }
}

function changeNovaMode() {

  const modes = [
    "COSMIC",
    "AURORA",
    "PULSE"
  ];

  const index =
    modes.indexOf(state.mode);

  state.mode =
    modes[
      (index + 1) %
      modes.length
    ];

  saveState();
  updateModeUI();

  toast(
    `NOVA ${state.mode}`
  );
}

/* =========================================================
   INICIALIZACIÓN
   ========================================================= */

function setupGlobalEvents() {

  $("#themeBtn")?.addEventListener(
    "click",
    toggleTheme
  );

  $("#motionBtn")?.addEventListener(
    "click",
    toggleMotion
  );

  $("#modeBtn")?.addEventListener(
    "click",
    changeNovaMode
  );

  $("#performanceToggle")?.addEventListener(
    "change",
    event => {

      state.performance =
        event.target.checked;

      saveState();
      applyPerformance();

      toast(
        state.performance
          ? "Modo rendimiento activado."
          : "Modo rendimiento desactivado."
      );
    }
  );

  $("#effectsToggle")?.addEventListener(
    "change",
    event => {

      state.effects =
        event.target.checked;

      saveState();
      applyEffects();

      toast(
        state.effects
          ? "Efectos NOVA activados."
          : "Efectos NOVA desactivados."
      );
    }
  );

  $("#exportBtn")?.addEventListener(
    "click",
    exportData
  );

  $("#importFile")?.addEventListener(
    "change",
    event => {
      importData(
        event.target.files?.[0]
      );
    }
  );

  $("#closeModal")?.addEventListener(
    "click",
    closeModal
  );

  $(".modalBackdrop")?.addEventListener(
    "click",
    closeModal
  );

  $("#commandBtn")?.addEventListener(
    "click",
    () => {
      $("#search")?.focus();
    }
  );
}

function init() {

  applyTheme();
  applyMotion();
  applyPerformance();
  applyEffects();

  updateModeUI();

  renderTools();

  setupSearch();
  setupCategories();
  setupShortcuts();
  setupGlobalEvents();

  nova();

  if (
    "serviceWorker" in navigator
  ) {
    window.addEventListener(
      "load",
      () => {

        navigator.serviceWorker
          .register("./sw.js")
          .catch(error => {
            console.warn(
              "Service Worker:",
              error
            );
          });

      }
    );
  }

  $("#toolCount").textContent =
    String(tools.length);

  console.log(
    `ÚtilHub V15 iniciado — ${tools.length} herramientas`
  );
}

if (
  document.readyState === "loading"
) {
  document.addEventListener(
    "DOMContentLoaded",
    init
  );
} else {
  init();
}
