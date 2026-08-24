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
  let specialtyPhysicalIndex = specialtyCards.length;
  let carouselTimer;

  specialtyCards.forEach((card, index) => {
    card.dataset.carouselIndex = index;
  });
  specialtyCards.forEach(card => specialtyTrack.append(card.cloneNode(true)));
  [...specialtyCards].reverse().forEach(card => specialtyTrack.prepend(card.cloneNode(true)));

  const allSpecialtyCards = [...specialtyTrack.querySelectorAll('.tooth-card')];

  function centerSpecialty(card, behavior = 'smooth'){
    const left = card.offsetLeft - (specialtyTrack.clientWidth - card.offsetWidth) / 2;
    if(behavior === 'auto'){
      const previousBehavior = specialtyTrack.style.scrollBehavior;
      specialtyTrack.style.scrollBehavior = 'auto';
      specialtyTrack.scrollTo({left, behavior:'auto'});
      specialtyTrack.style.scrollBehavior = previousBehavior;
      return;
    }
    specialtyTrack.scrollTo({left, behavior});
  }

  function normalizeSpecialtyPosition(){
    if(specialtyPhysicalIndex >= specialtyCards.length * 2){
      specialtyPhysicalIndex -= specialtyCards.length;
      centerSpecialty(allSpecialtyCards[specialtyPhysicalIndex], 'auto');
    }else if(specialtyPhysicalIndex < specialtyCards.length){
      specialtyPhysicalIndex += specialtyCards.length;
      centerSpecialty(allSpecialtyCards[specialtyPhysicalIndex], 'auto');
    }
  }

  function selectSpecialty(index, scroll = true){
    specialtyIndex = (index + specialtyCards.length) % specialtyCards.length;
    allSpecialtyCards.forEach(item => {
      item.classList.toggle('active', Number(item.dataset.carouselIndex) === specialtyIndex);
    });
    if(scroll){
      centerSpecialty(allSpecialtyCards[specialtyPhysicalIndex]);
      window.setTimeout(normalizeSpecialtyPosition, 450);
    }
  }

  function stepSpecialty(direction){
    specialtyPhysicalIndex += direction;
    selectSpecialty(specialtyIndex + direction);
  }

  function restartCarousel(){
    window.clearInterval(carouselTimer);
    if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      carouselTimer = window.setInterval(() => stepSpecialty(1), 4200);
    }
  }

  allSpecialtyCards.forEach((card, physicalIndex) => card.addEventListener('click', () => {
    specialtyPhysicalIndex = physicalIndex;
    selectSpecialty(Number(card.dataset.carouselIndex));
    restartCarousel();
  }));
  document.querySelector('.carousel-btn.prev').addEventListener('click', () => {
    stepSpecialty(-1);
    restartCarousel();
  });
  document.querySelector('.carousel-btn.next').addEventListener('click', () => {
    stepSpecialty(1);
    restartCarousel();
  });
  specialtyTrack.addEventListener('mouseenter', () => window.clearInterval(carouselTimer));
  specialtyTrack.addEventListener('mouseleave', restartCarousel);
  window.requestAnimationFrame(() => centerSpecialty(allSpecialtyCards[specialtyPhysicalIndex], 'auto'));
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
  const teamCards = [...teamTrack.querySelectorAll('.doc-card')];
  let teamPhysicalIndex = teamCards.length;

  teamCards.forEach(card => teamTrack.append(card.cloneNode(true)));
  [...teamCards].reverse().forEach(card => teamTrack.prepend(card.cloneNode(true)));

  const allTeamCards = [...teamTrack.querySelectorAll('.doc-card')];
  const teamCardWidth = () => {
    const gap = parseFloat(getComputedStyle(teamTrack).gap) || 0;
    return allTeamCards[0].offsetWidth + gap;
  };
  const setTeamPosition = (index, behavior = 'smooth') => {
    if(behavior === 'auto'){
      const previousBehavior = teamTrack.style.scrollBehavior;
      teamTrack.style.scrollBehavior = 'auto';
      teamTrack.scrollTo({left:index * teamCardWidth(), behavior:'auto'});
      teamTrack.style.scrollBehavior = previousBehavior;
      return;
    }
    teamTrack.scrollTo({left:index * teamCardWidth(), behavior});
  };
  const teamStep = direction => {
    teamPhysicalIndex += direction;
    setTeamPosition(teamPhysicalIndex);
    window.setTimeout(() => {
      if(teamPhysicalIndex >= teamCards.length * 2){
        teamPhysicalIndex -= teamCards.length;
        setTeamPosition(teamPhysicalIndex, 'auto');
      }else if(teamPhysicalIndex < teamCards.length){
        teamPhysicalIndex += teamCards.length;
        setTeamPosition(teamPhysicalIndex, 'auto');
      }
    }, 450);
  };
  document.querySelector('.team-btn.prev').addEventListener('click', () => teamStep(-1));
  document.querySelector('.team-btn.next').addEventListener('click', () => teamStep(1));
  window.requestAnimationFrame(() => setTeamPosition(teamPhysicalIndex, 'auto'));
  window.addEventListener('resize', () => setTeamPosition(teamPhysicalIndex, 'auto'));

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
