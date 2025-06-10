// --- Волны для красоты, как у Apple ---
const svg = document.getElementById('wavesvg');
const lines = 4;
const colors = ['#e9f7fa','#f9ca24','#7ed6df','#ff7979'];
let w = window.innerWidth;

function drawWaves() {
  svg.innerHTML = '';
  w = window.innerWidth;
  for(let j=0;j<lines;j++) {
    const p = [];
    const amp = 9 + Math.random()*11;
    const freq = .0025 + Math.random()*0.0015;
    const speed = 1.1 + j*0.36;
    for(let x=0;x<=w;x+=40) {
      const y = 80 + Math.sin((Date.now()/1000 + x*freq + j*1.7)*speed)*amp + j*18;
      p.push(`${x},${y.toFixed(1)}`);
    }
    svg.innerHTML += `<polyline points="${p.join(' ')}" fill="none" stroke="${colors[j%colors.length]}" stroke-width="2" opacity="${0.22-j*0.06}"/>`;
  }
  requestAnimationFrame(drawWaves);
}
drawWaves();
window.onresize = () => { w = window.innerWidth; };

// --- Отзывы (можно добавить свои) ---
const reviews = [
  { text: "Спасибо, ребёнок теперь с удовольствием идет на занятия! Очень уютная атмосфера и сильные педагоги.", name: "Анна, мама Лизы" },
  { text: "Сын научился считать и читать за 2 месяца, хотя раньше не хотел даже пробовать. Спасибо школе!", name: "Игорь, папа Вовы" },
  { text: "Больше всего понравилось, что с детьми занимаются в игровой форме. Очень довольны!", name: "Юлия, мама Саши" }
];

function renderReviews() {
  const container = document.getElementById('reviewsList');
  container.innerHTML = reviews.map((r,i) => `
    <div class="review-card" style="animation-delay:${0.15*i}s;">
      “${r.text}”
      <div class="review-name">— ${r.name}</div>
    </div>
  `).join('');
}
renderReviews();

// --- Форма (имитация отправки) ---
document.getElementById('contactForm').onsubmit = function(e) {
  e.preventDefault();
  document.getElementById('formSuccess').textContent = "Спасибо! Мы свяжемся с вами в течение дня.";
  setTimeout(()=>document.getElementById('formSuccess').textContent='', 4000);
  this.reset();
};
