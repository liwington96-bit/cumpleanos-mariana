const gallery = document.getElementById("gallery");
const music = document.getElementById("music");

const photoNames = Array.from({length:15},(_,i)=>{
  const n=String(i+1).padStart(2,"0");
  return [`foto_${n}.jpg`,`foto_${n}.jpeg`,`foto_${n}.png`,`foto_${n}.webp`];
});

photoNames.forEach((candidates,i)=>{
  const box=document.createElement("div");
  box.className="photo";
  box.innerHTML=`<span>FOTO ${String(i+1).padStart(2,"0")}<br>Agrega tu foto aquí</span>`;
  gallery.appendChild(box);

  let index=0;
  function tryNext(){
    if(index>=candidates.length)return;
    const img=new Image();
    img.src=`assets/fotos/${candidates[index++]}`;
    img.alt=`Recuerdo ${i+1}`;
    img.onload=()=>{
      box.innerHTML="";
      box.appendChild(img);
    };
    img.onerror=tryNext;
  }
  tryNext();
});

const sections=["recuerdos","carta","sorpresa","final"];
function show(id){
  sections.forEach(s=>document.getElementById(s).classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
  window.scrollTo({top:0,behavior:"smooth"});
}
document.getElementById("openBtn").addEventListener("click",()=>{
  music.play().catch(()=>{});
  show("recuerdos");
});
document.getElementById("photosNextBtn").addEventListener("click",()=>{
  show("carta");
  setTimeout(typeMessage,250);
});

const message=`Para mi amor, Mariana ❤️

Hoy es un día muy especial, porque celebramos la vida de una persona que llegó a mi vida para hacerla más bonita: TÚ.

Desde que estás conmigo, muchos momentos tienen un significado diferente. Tu sonrisa, tu forma de ser, nuestras conversaciones, nuestras locuras, los momentos buenos y también aquellos en los que las cosas no han sido tan fáciles… todo forma parte de nuestra historia, una historia que para mí vale muchísimo.

No quiero regalarte solamente palabras bonitas en este día. Quiero que sepas que deseo seguir compartiendo contigo muchos cumpleaños, muchos sueños, muchos viajes, muchas risas y también muchos momentos sencillos que, cuando estamos juntos, se vuelven especiales.

Mi amor, deseo que este nuevo año de vida venga lleno de felicidad, salud, sueños cumplidos y momentos inolvidables. Y, sobre todo, deseo poder estar a tu lado para acompañarte en cada uno de ellos.

Gracias por existir, por ser tú y por permitirme formar parte de tu vida.

Hoy quiero que sonrías, que disfrutes, que te sientas querida y que recuerdes que hay alguien que te ama profundamente y que desea verte feliz.

Feliz cumpleaños, mi amor. ❤️

Que la vida me permita seguir escribiendo nuestra historia contigo, porque si pudiera elegir nuevamente a la persona con quien compartir mi vida, te volvería a elegir a ti.`;


let typed=false;
function typeMessage(){
  if(typed)return;
  typed=true;
  const el=document.getElementById("typedText");
  let i=0;
  const timer=setInterval(()=>{
    el.textContent=message.slice(0,i++);
    if(i>message.length)clearInterval(timer);
  },18);
}
document.getElementById("nextBtn").addEventListener("click",()=>show("sorpresa"));
document.getElementById("sorpresa").addEventListener("transitionend",typeMessage);
document.getElementById("giftBtn").addEventListener("click",()=>{
  show("final"); launchConfetti();
});

function launchConfetti(){
  for(let i=0;i<90;i++){
    const d=document.createElement("div");
    d.textContent=["❤️","✨","💙","💜"][Math.floor(Math.random()*4)];
    d.style.position="fixed";d.style.left=(Math.random()*100)+"vw";d.style.top="-30px";
    d.style.fontSize=(12+Math.random()*18)+"px";d.style.zIndex=20;d.style.pointerEvents="none";
    document.body.appendChild(d);
    const x=(Math.random()*2-1)*180, y=window.innerHeight+80;
    d.animate([{transform:"translate(0,0) rotate(0deg)",opacity:1},
               {transform:`translate(${x}px,${y}px) rotate(${Math.random()*900-450}deg)`,opacity:0}],
               {duration:2200+Math.random()*1800,easing:"cubic-bezier(.2,.8,.2,1)"})
      .onfinish=()=>d.remove();
  }
}

const canvas=document.getElementById("particles"),ctx=canvas.getContext("2d");
let particles=[];
function resize(){
  canvas.width=innerWidth*devicePixelRatio;canvas.height=innerHeight*devicePixelRatio;
  canvas.style.width=innerWidth+"px";canvas.style.height=innerHeight+"px";
  ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
}
function init(){
  particles=Array.from({length:Math.min(100,Math.floor(innerWidth/8))},()=>({
    x:Math.random()*innerWidth,y:Math.random()*innerHeight,
    r:.5+Math.random()*1.7,v:.15+Math.random()*.5,a:.15+Math.random()*.55
  }));
}
function draw(){
  ctx.clearRect(0,0,innerWidth,innerHeight);
  particles.forEach(p=>{
    p.y-=p.v;if(p.y<-5)p.y=innerHeight+5;
    ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle=`rgba(130,190,255,${p.a})`;ctx.fill();
  });
  requestAnimationFrame(draw);
}
addEventListener("resize",()=>{resize();init()});resize();init();draw();
