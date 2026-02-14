// -------------------------------------------------------
// VARIABLES GLOBALES
// -------------------------------------------------------
let nameBinaryBuffer = {};
let lastNameBinaryUpdate = 0;
const NAME_BINARY_INTERVAL = 300;
let brightTimers = {};
const BRIGHT_DURATION = 8000;

const canvas = document.getElementById('matrix-canvas');
const ctx    = canvas.getContext('2d');

// -------------------------------------------------------
// LETRAS — definidas PRIMERO para que todo lo demás pueda usarlas
// -------------------------------------------------------
const digitalLetters = {
  'A': [[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1]],
  'B': [[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0]],
  'C': [[0,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[0,1,1,1,1]],
  'D': [[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0]],
  'E': [[1,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,0],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,1]],
  'F': [[1,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0]],
  'G': [[0,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0],[1,0,1,1,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],
  'H': [[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1]],
  'I': [[1,1,1,1,1],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[1,1,1,1,1]],
  'J': [[0,0,1,1,1],[0,0,0,1,0],[0,0,0,1,0],[0,0,0,1,0],[1,0,0,1,0],[1,0,0,1,0],[0,1,1,0,0]],
  'K': [[1,0,0,1,0],[1,0,1,0,0],[1,1,0,0,0],[1,1,0,0,0],[1,0,1,0,0],[1,0,0,1,0],[1,0,0,0,1]],
  'L': [[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,1]],
  'M': [[1,0,0,0,1],[1,1,0,1,1],[1,0,1,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1]],
  'N': [[1,0,0,0,1],[1,1,0,0,1],[1,0,1,0,1],[1,0,0,1,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1]],
  'O': [[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],
  'P': [[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0],[1,0,0,0,0],[1,0,0,0,0],[1,0,0,0,0]],
  'Q': [[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,1,0,1],[1,0,0,1,0],[0,1,1,0,1]],
  'R': [[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0],[1,0,1,0,0],[1,0,0,1,0],[1,0,0,0,1]],
  'S': [[0,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0],[0,1,1,1,0],[0,0,0,0,1],[0,0,0,0,1],[1,1,1,1,0]],
  'T': [[1,1,1,1,1],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]],
  'U': [[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],
  'V': [[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,0,1,0],[0,0,1,0,0]],
  'W': [[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,1,0,1],[1,0,1,0,1],[1,1,0,1,1],[1,0,0,0,1]],
  'X': [[1,0,0,0,1],[0,1,0,1,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,1,0,1,0],[1,0,0,0,1]],
  'Y': [[1,0,0,0,1],[1,0,0,0,1],[0,1,0,1,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]],
  'Z': [[1,1,1,1,1],[0,0,0,0,1],[0,0,0,1,0],[0,0,1,0,0],[0,1,0,0,0],[1,0,0,0,0],[1,1,1,1,1]],
};

// -------------------------------------------------------
// Ancho en columnas de un texto (depende de digitalLetters)
// -------------------------------------------------------
function textWidthCols(text) {
  let total = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === ' ') {
      total += 3;
    } else {
      const m = digitalLetters[char];
      total += m ? m[0].length : 5;
    }
    if (i < text.length - 1 && text[i] !== ' ' && text[i + 1] !== ' ') {
      total += 1; // letter spacing
    }
  }
  return total;
}

// -------------------------------------------------------
// RESPONSIVE: fontSize según ancho de pantalla
// -------------------------------------------------------
function getResponsiveFontSize() {
  const w = window.innerWidth;
  if (w < 400)  return 6;
  if (w < 600)  return 7;
  if (w < 800)  return 9;
  if (w < 1024) return 10;
  return 12;
}

let fontSize = getResponsiveFontSize();
let columns  = Math.floor(window.innerWidth / fontSize);
let drops    = Array(columns).fill(1);

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  fontSize = getResponsiveFontSize();
  columns  = Math.floor(window.innerWidth / fontSize);
  drops    = Array(columns).fill(1);
  brightTimers = {};
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// -------------------------------------------------------
// Genera el set de posiciones iluminadas para un texto
// -------------------------------------------------------
function getTextMask(text, startRow) {
  const totalWidth = textWidthCols(text);
  const startCol   = Math.floor((columns - totalWidth) / 2);
  const brightSet  = new Set();
  let col = startCol;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === ' ') { col += 3; continue; }
    const matrix = digitalLetters[char] || [];
    const w = matrix.length > 0 ? matrix[0].length : 5;
    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < w; x++) {
        if (matrix[y][x]) brightSet.add(`${col + x},${startRow + y}`);
      }
    }
    col += w;
    if (i < text.length - 1 && text[i + 1] !== ' ') col += 1;
  }
  return brightSet;
}

// -------------------------------------------------------
// ROSA PIXEL ART — contorno sin relleno
// -------------------------------------------------------
function getRoseMask(startRow) {
  const rose = [
    "000001110000000",
    "000011111000000",
    "000110000110000",
    "001000000010000",
    "011000000001000",
    "010000000001000",
    "010000000001000",
    "011001000001000",
    "001100101001000",
    "000110011011000",
    "000011111100000",
    "000001100000000",
    "000001100000000",
    "000001111110000",
    "000000100001000",
    "000000100000100",
    "000001000001100",
    "000001100000000",
    "000000110000000",
    "000000110000000",
    "000001100000000",
    "001111100000000",
    "011000010000000",
    "100000100000000",
    "011000100000000",
    "000110100000000",
    "000001100000000",
    "000000110000000",
  ];
  const roseWidth = rose[0].length;
  const startCol  = Math.floor((columns - roseWidth) / 2);
  const brightSet = new Set();
  for (let y = 0; y < rose.length; y++)
    for (let x = 0; x < rose[y].length; x++)
      if (rose[y][x] === '1') brightSet.add(`${startCol + x},${startRow + y}`);
  return brightSet;
}

// Combina varios sets
function combineMasks(...masks) {
  const combined = new Set();
  for (const mask of masks) for (const pos of mask) combined.add(pos);
  return combined;
}

// -------------------------------------------------------
// LAYOUT: calcula posiciones de cada elemento
// "FELIZ VALENTINE" se parte en 2 líneas si no cabe
// -------------------------------------------------------
function getCombinedMask() {
  const rows = Math.floor(canvas.height / fontSize);

  // Margen superior: 10% de la pantalla, mínimo 4 filas
  const topMargin = Math.max(4, Math.floor(rows * 0.10));

  // ¿Cabe "FELIZ VALENTINE" con al menos 3 cols de margen a cada lado?
  const availableCols = columns - 6;
  const needsTwoLines = textWidthCols('FELIZ VALENTINE') > availableCols;

  let maskTitulo, rowNombre;

  if (needsTwoLines) {
    // Línea 1: FELIZ  — línea 2: VALENTINE
    const rowLine1 = topMargin;
    const rowLine2 = rowLine1 + 7 + 1;       // 7 filas letra + 1 gap
    maskTitulo = combineMasks(
      getTextMask('FELIZ',     rowLine1),
      getTextMask('VALENTINE', rowLine2)
    );
    rowNombre = rowLine2 + 7 + 3;            // PELIROSI debajo con 3 de gap
  } else {
    maskTitulo = getTextMask('NAME', topMargin);
    rowNombre  = topMargin + 7 + 3;
  }

  // ROSA: empieza al 53% de la pantalla, pero nunca choca con PELIROSI
  const rowRosa = Math.max(rowNombre + 7 + 4, Math.floor(rows * 0.53));

  return combineMasks(
    maskTitulo,
    getTextMask('PELIROSI', rowNombre),
    getRoseMask(rowRosa)
  );
}

// -------------------------------------------------------
// Loop principal de animación
// -------------------------------------------------------
function drawMatrix() {
  const now = Date.now();

  if (now - lastNameBinaryUpdate > NAME_BINARY_INTERVAL) {
    nameBinaryBuffer = {};
    for (const key in brightTimers) {
      nameBinaryBuffer[key] = Math.random() > 0.5 ? '1' : '0';
    }
    lastNameBinaryUpdate = now;
  }

  ctx.fillStyle = 'rgba(10, 10, 10, 0.15)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = fontSize + 'px Consolas, monospace';

  const mask = getCombinedMask();

  for (let i = 0; i < drops.length; i++) {
    const row  = drops[i];
    const text = Math.random() > 0.5 ? '1' : '0';

    if (mask.has(`${i},${row}`)) {
      ctx.save();
      ctx.shadowColor = '#fff';
      ctx.shadowBlur  = 32;
      ctx.fillStyle   = '#ffffff';
      ctx.fillText(((i + row) % 2 === 0) ? '1' : '0', i * fontSize, row * fontSize);
      ctx.restore();
      brightTimers[`${i},${row}`] = now + BRIGHT_DURATION;
    } else {
      ctx.fillStyle = '#00ff00';
      ctx.fillText(text, i * fontSize, row * fontSize);
    }

    if (row * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }

  // Brillo residual de la máscara
  for (const key in brightTimers) {
    const [col, row] = key.split(',').map(Number);
    if (mask.has(`${col},${row}`) && brightTimers[key] > now) {
      ctx.save();
      ctx.shadowColor  = '#fff';
      ctx.shadowBlur   = 32;
      ctx.globalAlpha  = Math.max(0.2, (brightTimers[key] - now) / BRIGHT_DURATION);
      ctx.fillStyle    = '#ffffff';
      ctx.fillText(nameBinaryBuffer[key] || '0', col * fontSize, row * fontSize);
      ctx.restore();
    } else if (brightTimers[key] <= now) {
      delete brightTimers[key];
    }
  }
}

setInterval(drawMatrix, 50);