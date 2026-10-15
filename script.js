const album=document.getElementById('album');
const chapters=[
 {name:'O primeiro sinal',subtitle:'Algumas histórias começam como um sinal vindo de muito longe.',theme:'green',from:1,to:12},
 {name:'Nossa própria constelação',subtitle:'Cada encontro acendeu uma estrela diferente.',theme:'blue',from:13,to:24},
 {name:'Entre nebulosas',subtitle:'Até nas viagens mais improváveis, encontramos um lar.',theme:'pink',from:25,to:36},
 {name:'Até o infinito',subtitle:'A aventura continua — uma memória de cada vez.',theme:'gold',from:37,to:54}
];
const captions=['Um dia especial','Entre estrelas','Nossa aventura','Para lembrar','Uma nova descoberta','Só nós sabemos','Momento inesquecível','Memórias...'];
chapters.forEach((c,k)=>{
 const section=document.createElement('section');section.className=`chapter ${c.theme}`;
 section.innerHTML=`<div class="chapter-head"><span class="number">CAPÍTULO 0${k+1} · REGISTRO GALÁCTICO</span><h2>${c.name}</h2><p>${c.subtitle}</p></div><div class="scraps"></div><div class="chapter-end">FIM DO CAPÍTULO · CONTINUE A VIAGEM</div><div class="doodle one"><svg viewBox="0 0 100 100"><path d="M50 5 58 39 94 50 58 59 50 95 40 60 6 50 40 40Z"/></svg></div>`;
 const grid=section.querySelector('.scraps');
 for(let i=c.from;i<=c.to;i++){
  if(i!==c.from && (i-c.from)%6===0){const q=document.createElement('div');q.className='quote';q.textContent=['O universo é grande, mas algumas memórias são maiores.','O melhor da viagem é quem está ao nosso lado.','Guardamos estrelas em forma de lembranças.', 'O universo é infinito, mas há lembranças que cabem inteiras em um abraço…', 'Algumas estrelas brilham no céu; outras, na nossa memória…', 'Há momentos tão felizes que a memória aprende a iluminar sozinha…'][k%3];grid.append(q)}
  const fig=document.createElement('figure');fig.className='polaroid';fig.style.setProperty('--rotate',`${[-5,4,-3,6,-2,3][i%6]}deg`);fig.style.setProperty('--ratio',i%5===0?'4 / 5':'3 / 4');
  const img=document.createElement('img');img.src=`fotos/foto${i}.jpg`;img.alt=`Fotografia ${i} de 61`;img.loading='lazy';img.onerror=()=>{img.onerror=null;img.src=`fotos/foto${(i-1)%6+1}.jpg`;};
  const tape=document.createElement('span');tape.className='tape';tape.setAttribute('aria-hidden','true');const cap=document.createElement('figcaption');cap.textContent=`${String(i).padStart(2,'0')} · ${captions[(i-1)%captions.length]}`;
  fig.append(tape,img,cap);grid.append(fig);
 }
 album.append(section);
});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{rootMargin:'0px 0px 90px 0px',threshold:.08});document.querySelectorAll('.polaroid').forEach(el=>observer.observe(el));


const musicBtn = document.getElementById('musicBtn');
const toggleMusic = document.getElementById('toggleMusic');
const playerBox = document.getElementById('player');
const audio = document.getElementById('localAudio');
const cassettePlay = document.getElementById('cassettePlay');
const closePlayer = document.getElementById('closePlayer');

function setLabel() {
  const playing = !audio.paused && !audio.ended;

  if (musicBtn) {
    musicBtn.textContent = playing
      ? 'Ⅱ Pausar trilha'
      : '▶ Ligar walkman';
  }

  if (toggleMusic) {
    toggleMusic.textContent = playing
      ? 'Ⅱ Pausar'
      : '▶ Reproduzir';
  }

  document.querySelector('.cassette-image')
    ?.classList.toggle('playing', playing);
}

async function toggle() {
  playerBox?.classList.add('open');

  if (!audio.paused) {
    audio.pause();
    return;
  }

  try {
    await audio.play();
  } catch (error) {
    console.error('Não foi possível reproduzir a música:', error);
    alert('Não foi possível tocar a música. Confira o arquivo musica/sua-musica.mp3.');
    setLabel();
  }
}

audio.addEventListener('play', setLabel);
audio.addEventListener('pause', setLabel);
audio.addEventListener('ended', setLabel);

musicBtn?.addEventListener('click', toggle);
toggleMusic?.addEventListener('click', toggle);

cassettePlay?.addEventListener('click', () => {
  toggle();

  album.scrollIntoView({
    behavior: 'smooth'
  });
});

closePlayer?.addEventListener('click', () => {
  playerBox?.classList.remove('open');
});

setLabel();