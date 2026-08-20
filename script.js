// === ÚNICO LUGAR QUE DEBES EDITAR PARA CAMBIAR EL NÚMERO DE WHATSAPP ===
  const WHATSAPP_NUMBER = "51902956428"; // formato: 51 + número, sin espacios ni +

  document.getElementById('year').textContent = new Date().getFullYear();

  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  });

  // Actualiza automáticamente todos los botones/links de WhatsApp con mensajes de bienvenida
  document.querySelectorAll('.wa-link').forEach(link => {
    const mensajeGeneral = "Hola Odontomark, quisiera agendar una cita. ¿Me ayudan con la disponibilidad?";
    link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensajeGeneral)}`;
  });

  const specialtyTrack = document.getElementById('specialty-track');
  const specialtyCards = [...document.querySelectorAll('.tooth-card')];
  let specialtyIndex = 0;
  let carouselTimer;

  function selectSpecialty(index, scroll = true){
    specialtyIndex = (index + specialtyCards.length) % specialtyCards.length;
    const card = specialtyCards[specialtyIndex];
    specialtyCards.forEach(item => item.classList.remove('active'));
    card.classList.add('active');
    if(scroll){
      const left = card.offsetLeft - (specialtyTrack.clientWidth - card.offsetWidth) / 2;
      specialtyTrack.scrollTo({left, behavior:'smooth'});
    }
  }

  function restartCarousel(){
    window.clearInterval(carouselTimer);
    if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      carouselTimer = window.setInterval(() => selectSpecialty(specialtyIndex + 1), 4200);
    }
  }

  specialtyCards.forEach((card, index) => card.addEventListener('click', () => {
    selectSpecialty(index);
    restartCarousel();
  }));
  document.querySelector('.carousel-btn.prev').addEventListener('click', () => {
    selectSpecialty(specialtyIndex - 1);
    restartCarousel();
  });
  document.querySelector('.carousel-btn.next').addEventListener('click', () => {
    selectSpecialty(specialtyIndex + 1);
    restartCarousel();
  });
  specialtyTrack.addEventListener('mouseenter', () => window.clearInterval(carouselTimer));
  specialtyTrack.addEventListener('mouseleave', restartCarousel);
  restartCarousel();

  const valueItems = [...document.querySelectorAll('.why-item')];
  const valueImage = document.getElementById('about-value-image');
  const valueName = document.getElementById('about-value-name');

  function selectValue(item){
    valueItems.forEach(value => value.classList.remove('active'));
    item.classList.add('active');
    valueImage.classList.add('changing');
    window.setTimeout(() => {
      valueImage.src = item.dataset.image;
      valueImage.alt = item.dataset.alt;
      valueName.textContent = item.dataset.name;
      valueImage.classList.remove('changing');
    }, 180);
  }

  valueItems.forEach(item => {
    item.addEventListener('click', () => selectValue(item));
    item.addEventListener('keydown', event => {
      if(event.key === 'Enter' || event.key === ' '){
        event.preventDefault();
        selectValue(item);
      }
    });
  });

  const teamTrack = document.getElementById('team-track');
  const teamStep = direction => {
    const card = teamTrack.querySelector('.doc-card');
    if(!card) return;
    const gap = parseFloat(getComputedStyle(teamTrack).gap) || 0;
    teamTrack.scrollBy({left:direction * (card.offsetWidth + gap), behavior:'smooth'});
  };
  document.querySelector('.team-btn.prev').addEventListener('click', () => teamStep(-1));
  document.querySelector('.team-btn.next').addEventListener('click', () => teamStep(1));

  const appointmentForm = document.getElementById('appointment-form');

  appointmentForm.addEventListener('submit', event => {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const especialidad = document.getElementById('especialidad').value;
    const mensaje = document.getElementById('mensaje').value.trim();
    const detalle = mensaje ? ` ${mensaje}` : '';
    const texto = `Hola Odontomark, soy ${nombre} (tel: ${telefono}). Me interesa una cita de ${especialidad}.${detalle}`;

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`,
      '_blank',
      'noopener,noreferrer'
    );
  });
