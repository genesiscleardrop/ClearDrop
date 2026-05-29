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
/*const tooltip = document.getElementById('mapTooltip');
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
});*/

/* ---- Action cards subtle entrance ---- */ //Activa cierta sincronización en la visualzación de las cards//
/*document.querySelectorAll('.action-card').forEach((card, i) => {
card.style.transitionDelay = `${i * 0.08}s`;
});*/


/*const map = L.map('map', {
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
});*/

/* ---- Google Maps ---- */
function initMap() {
  const panama = { lat: 8.994, lng: -79.519 };

  const mapStyles = [
    { featureType: 'water',       elementType: 'geometry',   stylers: [{ color: '#B8E4FC' }] },
    { featureType: 'landscape',   elementType: 'geometry',   stylers: [{ color: '#C8E6A0' }] },
    { featureType: 'road',        elementType: 'geometry',   stylers: [{ color: '#ffffff' }, { weight: 0.8 }] },
    { featureType: 'road',        elementType: 'labels.text.fill', stylers: [{ color: '#3A5368' }] },
    { featureType: 'poi',         elementType: 'all',        stylers: [{ visibility: 'off' }] },
    { featureType: 'transit',     elementType: 'all',        stylers: [{ visibility: 'off' }] },
    { featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{ color: '#7AAD55' }, { weight: 1 }] },
    { featureType: 'administrative', elementType: 'labels.text.fill', stylers: [{ color: '#0B3D6E' }] }
  ];

  const map = new google.maps.Map(document.getElementById('googleMap'), {
    center: panama,
    zoom: 7,
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
    zoomControlOptions: { position: google.maps.ControlPosition.RIGHT_BOTTOM }
  });

  const locations = [
    { lat: 8.994,  lng: -79.519, label: 'Fuga activa – Panamá Ciudad', color: '#EF5350' },
    { lat: 9.359,  lng: -79.900, label: 'Resuelto – Colón',            color: '#4CAF78' },
    { lat: 7.964,  lng: -80.527, label: 'En proceso – Chitré',         color: '#FFC107' },
    { lat: 7.762,  lng: -80.272, label: 'Distribución – Las Tablas',   color: '#29B6F6' },
    { lat: 8.427,  lng: -82.433, label: 'Resuelto – David',            color: '#4CAF78' },
    { lat: 8.517,  lng: -80.351, label: 'Fuga activa – Penonomé',      color: '#EF5350' }
  ];

  const infoWindow = new google.maps.InfoWindow();

  locations.forEach(loc => {
    const marker = new google.maps.Marker({
      position: { lat: loc.lat, lng: loc.lng },
      map,
      title: loc.label,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: loc.color,
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 2,
        scale: 9
      }
    });

    marker.addListener('click', () => {
      infoWindow.setContent(
        `<div style="font-family:'DM Sans',sans-serif;font-size:.82rem;font-weight:600;color:#0D2233;padding:.15rem .2rem">${loc.label}</div>`
      );
      infoWindow.open(map, marker);
    });
  });
}

/* ---- Action cards subtle entrance ---- */
document.querySelectorAll('.action-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.08}s`;
});

