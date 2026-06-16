var SYMBOL_CHARS = {
  triangle: '▲', square: '■', star: '★', water: '≈',
  target: '⊙', compass: '✦', asterisk: '✳', circle: '●'
};

var SYMBOL_COLORS = {
  purple: '#c9aed6', pink: '#f4b8c4', blue: '#89c5d4',
  yellow: '#f9e4a0', orange: '#f5c78e', green: '#a8c5a0', brown: '#c4a882'
};

function applySymbolBackground(symbol, color) {
  if (window.innerWidth <= 800) return;

  function seededRandom(row, col, seed) {
    const x = Math.sin(row * 127.1 + col * 311.7 + (seed || 0) * 419.2) * 43758.5453;
    return x - Math.floor(x);
  }

  const cellW = 180, cellH = 120, svgW = 1600, svgH = 900;
  const cols = Math.ceil(svgW / cellW) + 1;
  const rows = Math.ceil(svgH / cellH) + 1;
  const vw = window.innerWidth;

  let texts = '';
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * cellW + (row % 2 === 1 ? cellW / 2 : 0) + 20 + seededRandom(row, col, 2) * 60 - 30;
      const y = row * cellH + 55 + seededRandom(row, col, 1) * 40 - 20;

      const distFromCenter = Math.abs(x * vw / svgW - vw / 2);
      const t = Math.min(1, distFromCenter / 360);
      const threshold = 0.92 - t * 0.27;

      if (seededRandom(row, col) <= threshold) continue;
      texts += '<text x="' + x + '" y="' + y + '" font-size="18" fill="' + color + '" opacity="0.3" font-family="Georgia,serif">' + symbol + '</text>';
    }
  }

  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + svgW + '" height="' + svgH + '">' + texts + '</svg>';
  const layer = 'url("data:image/svg+xml,' + encodeURIComponent(svg) + '")';
  const existing = getComputedStyle(document.body).backgroundImage;
  document.body.style.backgroundImage = layer + ', ' + existing;
  document.body.style.backgroundRepeat = 'no-repeat, repeat';
  document.body.style.backgroundSize = 'cover, 400px 300px';
  document.body.style.backgroundAttachment = 'fixed, fixed';
  document.body.style.backgroundPosition = 'center, 0 0';
}
