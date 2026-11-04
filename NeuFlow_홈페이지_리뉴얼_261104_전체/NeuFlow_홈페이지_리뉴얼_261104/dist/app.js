const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
function closeMenu(){menuButton.setAttribute('aria-expanded','false');nav.classList.remove('open');menuButton.querySelector('.sr-only').textContent='메뉴 열기';}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);menuButton.querySelector('.sr-only').textContent=open?'메뉴 닫기':'메뉴 열기';});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){closeMenu();menuButton.focus();}});
window.matchMedia('(min-width:851px)').addEventListener('change',e=>{if(e.matches)closeMenu();});

const featureCopy={
  structure:{label:'01 / 혈관 구조 정보',title:'분석 대상 혈관의 위치와 형태',description:'3차원 혈관 영상과 관심 영역을 살펴봅니다. 의료진과 환자가 같은 혈관 정보를 보며 검사 결과를 이해합니다.'},
  sig:{label:'02 / SIG 정량정보',title:'혈관의 형태와 정량정보를 함께',description:'혈관별 SIG와 관심 영역의 정보를 확인합니다. 혈류 관련 특성을 수치로 살펴보고 뇌혈관 상태를 설명합니다.'},
  risk:{label:'03 / 위험신호 해석',title:'정량값에 임상적 의미를 더해',description:'SIG 기반 정보와 급성 뇌졸중의 연관성을 바탕으로, 분석 수치와 위험신호의 의미를 함께 살펴봅니다.'},
  clinical:{label:'04 / 임상 정보와 함께 검토',title:'환자의 상태를 함께 고려하는 해석',description:'의료진이 증상, 병력, 혈압·혈당 등 위험요인과 다른 검사 결과에 비추어 보고서를 검토합니다.'}
};
document.querySelectorAll('[data-feature]').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('[data-feature]').forEach(item=>{const active=item===button;item.classList.toggle('active',active);item.setAttribute('aria-pressed',String(active));});
  const copy=featureCopy[button.dataset.feature];
  document.querySelector('#focus-label').textContent=copy.label;
  document.querySelector('#focus-title').textContent=copy.title;
  document.querySelector('#focus-description').textContent=copy.description;
}));

const dialog=document.querySelector('#image-dialog');
document.querySelector('[data-image-open]').addEventListener('click',()=>{dialog.showModal();document.body.style.overflow='hidden';});
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{document.body.style.overflow='';});

const observedSections=[...document.querySelectorAll('main>section[id]')].filter(s=>s.id!=='contact');
if('IntersectionObserver'in window){
  const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){nav.querySelectorAll('a').forEach(a=>{if(a.getAttribute('href')==='#'+entry.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}});},{rootMargin:'-20% 0px -55% 0px',threshold:0});
  observedSections.forEach(s=>observer.observe(s));
}
