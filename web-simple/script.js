document.addEventListener('DOMContentLoaded', function() {
  // Анимация неоновых волн в hero через canvas
  const canvas = document.getElementById('heroWave');
  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = 180;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  function drawWaves() {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width,canvas.height);
    let w = canvas.width;
    let t = Date.now() / 800;
    // Основная волна
    ctx.save();
    ctx.globalAlpha = 0.93;
    ctx.beginPath();
    for(let x=0;x<=w;x+=5){
      let y = 70 + Math.sin(t + x/75)*26 + Math.cos(t/2+x/130)*11;
      if(x===0) ctx.moveTo(x,y);
      else ctx.lineTo(x,y);
    }
    ctx.strokeStyle = 'url(#cyberWave1)';
    ctx.shadowColor = "#68b3ff99";
    ctx.shadowBlur = 20;
    ctx.lineWidth = 7;
    ctx.stroke();
    ctx.restore();
    // Вторая волна
    ctx.save();
    ctx.beginPath();
    for(let x=0;x<=w;x+=5){
      let y = 110 + Math.cos(t + x/80)*17 + Math.sin(t/2.2+x/97)*6;
      if(x===0) ctx.moveTo(x,y);
      else ctx.lineTo(x,y);
    }
    ctx.strokeStyle = "#ffe298";
    ctx.globalAlpha = 0.56;
    ctx.shadowColor = "#ffe298";
    ctx.shadowBlur = 10;
    ctx.lineWidth = 4.5;
    ctx.stroke();
    ctx.restore();
    requestAnimationFrame(drawWaves);
  }
  drawWaves();

  // Звёзды (starfield, просто прикол)
  function createStarfield() {
    const starfield = document.querySelector('.starfield');
    starfield.innerHTML = '';
    const n = 28 + Math.floor(window.innerWidth / 30);
    for(let i=0; i<n; i++) {
      let s = document.createElement('div');
      s.className = 'star-dot';
      let size = Math.random() * 2.3 + 0.8;
      s.style.width = s.style.height = size+'px';
      s.style.top = Math.random()*80 + 7 + '%';
      s.style.left = Math.random()*95 + '%';
      s.style.background = 'radial-gradient(circle, #fff '+(40+Math.random()*30)+'%, #68b3ff 100%)';
      s.style.animation = `star-flicker ${(1.5+Math.random()*2.5).toFixed(2)}s infinite alternate ${Math.random()*1.3}s`;
      starfield.appendChild(s);
    }
  }
  createStarfield();
  window.addEventListener('resize', createStarfield);

  // Звёздочки анимируются через CSS
  const starStyle = document.createElement('style');
  starStyle.textContent = `
    @keyframes star-flicker {
      0% { opacity: 0.75; filter: blur(0);}
      60% { opacity: 0.95; filter: blur(1px);}
      100% { opacity: 0.73; filter: blur(0);}
    }
  `;
  document.head.appendChild(starStyle);

  // Появление карточек анимировано
  document.querySelectorAll('.anim-card').forEach((card,i)=>{
    setTimeout(()=>card.classList.add('anim-card'),130 + 150*i);
  });

  // Тарифы (по клику)
  let tariff = 200, tariffName = "Обычный ПК";
  let promo = 0, pricePerHour = 200;
  document.querySelectorAll('.tariff-cell').forEach(cell => {
    cell.onclick = function() {
      document.querySelectorAll('.tariff-cell').forEach(c=>c.classList.remove('selected'));
      this.classList.add('selected');
      tariff = +this.getAttribute('data-price');
      tariffName = this.getAttribute('data-name');
      pricePerHour = tariff;
      updateBooking();
    };
  });
  document.querySelector('.tariff-cell').classList.add('selected');

  // Часы (10–23)
  const startHour = 10, endHour = 23;
  const timesList = document.getElementById('times-list');
  let selectedStart = startHour, selectedEnd = startHour + 1;
  function renderTimes() {
    timesList.innerHTML = '';
    for(let i = startHour; i < endHour; i++) {
      let cell = document.createElement('div');
      cell.className = 'time-cell';
      cell.textContent = i + ':00';
      cell.setAttribute('data-hour', i);
      timesList.appendChild(cell);
      cell.onclick = function() {
        timesList.querySelectorAll('.time-cell').forEach(c=>c.classList.remove('selected'));
        selectedStart = i;
        selectedEnd = Math.min(i+1, endHour);
        cell.classList.add('selected');
        updateBooking();
      }
    }
    timesList.querySelectorAll('.time-cell')[0].classList.add('selected');
    selectedStart = startHour;
    selectedEnd = startHour + 1;
  }
  renderTimes();

  // Промокод (анимированное появление)
  const promoTrigger = document.getElementById('showPromoBtn');
  const promoArea = document.getElementById('promoArea');
  promoArea.classList.remove('active');
  promoTrigger.onclick = () => {
    promoArea.classList.toggle('active');
    if(promoArea.classList.contains('active')) {
      setTimeout(()=>document.getElementById('promoInput').focus(),220);
      promoTrigger.style.display = 'none';
    }
  };
  document.getElementById('promoBtn').onclick = () => {
    const val = document.getElementById('promoInput').value.trim().toUpperCase();
    if (val === "GAME10") {
      promo = 0.10;
      updateBooking();
      document.getElementById('promoInput').style.borderColor = "#42e695";
    } else {
      promo = 0;
      updateBooking();
      document.getElementById('promoInput').style.borderColor = "#ff416c";
    }
  };

  // Обновление итоговой суммы
  function updateBooking() {
    let cells = Array.from(timesList.querySelectorAll('.time-cell.selected'));
    selectedStart = +cells[0].getAttribute('data-hour');
    selectedEnd = selectedStart+1;
    let h = selectedEnd-selectedStart;
    document.getElementById('tariffName').textContent = tariffName;
    document.getElementById('bookingTime').textContent = `${selectedStart}:00–${selectedEnd}:00`;
    document.getElementById('bookingHours').textContent = `(${h} ${h==1?'час':'часа'})`;
    let total = pricePerHour * h;
    if(promo) total = Math.floor(total * (1-promo));
    document.getElementById('bookingPrice').textContent = total;
  }
  updateBooking();

  // Отправка формы (фейк)
  document.getElementById('bookingForm').onsubmit = function(e) {
    e.preventDefault();
    let s = document.getElementById('bookingSuccess');
    s.textContent = "Спасибо за бронирование! Ждём тебя :)";
    setTimeout(()=>s.textContent='', 4200);
  };
});
