/* ---- Mobile menu ---- */ // En esta sección se manejan los eventos para abrir y cerrar el menú. También guarda datos automáticamente al hacer clic en un enlace del menú, que luego podrá utiilzar//
const menuBtn = document.getElementById('menuBtn'); 
const mobileNav = document.getElementById('mobileNav');
const menuClose = document.getElementById('menuClose');

menuBtn.addEventListener('click', () => mobileNav.classList.add('open'));
menuClose.addEventListener('click', () => mobileNav.classList.remove('open'));
mobileNav.querySelectorAll('a').forEach(a =>
a.addEventListener('click', () => mobileNav.classList.remove('open'))
); //En esta sección se configura la palabra "open" para que se añada al monento de abrir el menú, y que se oculte al cerrarlo. Activa la opción en el CSS//

/* ---- Navbar shadow on scroll ---- */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
navbar.style.boxShadow = window.scrollY > 20
? '0 4px 24px rgba(11,61,110,.12)'
: 'none';
}); //En esta sección se configura la sombra del menú al hacer scroll. //

/* ---- Scroll reveal ---- */ //En esta sección se configuran los elementos que serán revelados, y los guarda en una lista//
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
entries.forEach(e => {
if (e.isIntersecting) {
e.target.classList.add('visible');
revealObs.unobserve(e.target);
}
});
}, { threshold: 0.12 }); //Esta parte trabaja con un API, el cual cambia el estado del elemento a "visible" y luego a "invisible"//
revealEls.forEach(el => revealObs.observe(el)); //Esta parte se encarga de permitir al usuario observar cada elemento.//

/* ---- Counter animation ---- */ //En toda esta sección se configuran los fps de animación, y también permite animaciones más suaves, evitando el sobrecargar el navegador con muchas cosas.//
function animateCount(el, target, suffix) {
let start = 0;
const step = target / 60;
const tick = () => {
start = Math.min(start + step, target);
const display = target >= 100 ? Math.round(start).toLocaleString() : Math.round(start);
el.innerHTML = `${display}<span>${suffix}</span>`;  
if (start < target) requestAnimationFrame(tick);
};
requestAnimationFrame(tick);
}

const statObs = new IntersectionObserver((entries) => {
entries.forEach(e => {
if (e.isIntersecting) {
const el = e.target;
const target = parseInt(el.dataset.target);
const span = el.querySelector('span');
animateCount(el, target, span ? span.textContent : '');
statObs.unobserve(el);
}
});
}, { threshold: 0.5 });
document.querySelectorAll('.stat-value[data-target]').forEach(el => statObs.observe(el)); //convierte valores string a number en el HTML//

/* ---- Map marker tooltips ---- */ //En esta sección se configuran las sugerencias de herramientas para los marcadores del mapa//
const tooltip = document.getElementById('mapTooltip');
const canvas = document.getElementById('mapCanvas');
document.querySelectorAll('.map-marker').forEach(marker => {
marker.addEventListener('mouseenter', (e) => {
const tip = marker.dataset.tip;
tooltip.textContent = tip; //Muestra una información emergente posicionada al pasar el cursor sobre los marcadores del mapa.//
tooltip.classList.add('visible');

const canvasRect = canvas.getBoundingClientRect(); //Devuelve el valor original del tamaño y la posicción de los elementos.,//
const markerRect = marker.getBoundingClientRect();
const x = markerRect.left - canvasRect.left + markerRect.width / 2;
const y = markerRect.top - canvasRect.top - 36;
tooltip.style.left = `${x - tooltip.offsetWidth / 2}px`;
tooltip.style.top = `${y}px`;
});
marker.addEventListener('mouseleave', () => {
tooltip.classList.remove('visible');
});
});

/* ---- Action cards subtle entrance ---- */ //Activa cierta sincronización en la visualzación de las cards//
document.querySelectorAll('.action-card').forEach((card, i) => {
card.style.transitionDelay = `${i * 0.08}s`;
});

const map = L.map('map', {
  center: [8.3957, -82.4317], // lat, lng
  zoom: 13,
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors',
  maxZoom: 19,
}).addTo(map);

map.on('click', function (e) {
  const { lat, lng } = e.latlng;
  L.marker([lat, lng]).addTo(map).bindPopup(`${lat}, ${lng}`).openPopup();
});
