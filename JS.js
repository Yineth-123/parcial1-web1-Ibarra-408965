/* js/app.js
   SPA simple: Muro, Info, Photos, Boxes
   Usa delegación de eventos para que los botones funcionen siempre.
*/

document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ app.js cargado');

  const app = document.getElementById('app');
  const nav = document.querySelector('.main-nav');
  const search = document.getElementById('search');

  if (!app || !nav || !search) {
    console.error('Elementos esenciales no encontrados en el DOM.');
    return;
  }

  // Datos de ejemplo: posts para el "Muro"
  const posts = [
    { id: 1, author: 'María', text: '¡Hola! 💡 “No tengas miedo de empezar de nuevo, porque quizá esta vez construyas algo mejor.”.' },
    { id: 2, author: 'Carlos', text: '🌹 El amor no se busca, se reconoce como el alma reconoce a su reflejo en otro ser.' },
    { id: 3, author: 'Ana', text: 'Foto del día: hermosa puesta de sol.🌞 “Siempre hay un nuevo amanecer para quienes no se rinden.”' }
  ];

  // Estado de la SPA
  const state = {
    section: 'muro', // 'muro' | 'info' | 'photos' | 'boxes'
    query: ''
  };

  // Construye el HTML del panel izquierdo (perfil breve)
  function renderLeft() {
    return `
      <aside class="left-panel" aria-label="Perfil breve">
     <img src="Girasol.jpeg" alt="foto perfil" class="logo">    |
        <h2>Karen_09</h2>
        <p>Cali · Estudiante/Trabajadora</p>
        <hr>
        <p><strong>Información</strong></p>
        <p>Email: karyi09ibarra@gmail.com</p>
        <p>Telefono:3234443128</p>
        <p>En una relación</p>
      </aside>
    `;
  }

  // Sección Muro con filtrado por búsqueda simple
  function renderMuro() {
    const q = state.query.trim().toLowerCase();
    const filtered = posts.filter(p =>
      p.text.toLowerCase().includes(q) || p.author.toLowerCase().includes(q)
    );

    const itemsHtml = filtered.length
      ? filtered.map(p => `
          <article css_style="margin-bottom:12px; padding:8px; border-radius:8px; background:#fbfcff;">
            <strong>${p.author}</strong>
            <p>${p.text}</p>
          </article>
        `).join('')
      : `<p>No se encontraron publicaciones${q ? ' para "' + q + '"' : ''}.</p>`;

    return `
      <h2>Muro</h2>
      <div>
        <label for="postInput" class="visually-hidden">Escribe un post</label>
        <input id="postInput" placeholder="Karen ¿Que tienes para decir hoy?..." style="width:100%;padding:10px;border-radius:8px;border:1px solid #dfeffb;margin-bottom:10px;">
      </div>
      <button onclick="publicar()">Compartir</button>
      ${itemsHtml}
    `;
  }
  // Publicar en el muro
function publicar() {
  let texto = document.getElementById("postText").value.trim();
  if (texto === "") {
    alert("Escribe algo antes de publicar.");
    return;
  }

  let contenedor = document.getElementById("posts");

  // Crear elemento post
  let nuevoPost = document.createElement("div");
  nuevoPost.classList.add("post");
  nuevoPost.innerHTML = `
    <p><strong>Usuario</strong>: ${texto}</p>
    <small>${new Date().toLocaleString()}</small>
    <hr>
  `;

  // Insertar al inicio
  contenedor.prepend(nuevoPost);

  // Limpiar textarea
  document.getElementById("postText").value = "";
}

  function renderInfo() {
    return `
      <h2>Info</h2>
      <dl>
        <dt><strong>Nombre</strong></dt><dd>Karen Yineth Ibarra Guzman</dd>
        <dt><strong>Fecha nacimiento</strong></dt><dd>Junio 09 2006</dd>
        <dt><strong>Educación</strong></dt><dd>Fundación Universitaria Catolica Lumen Gentium</dd>
        <dt><strong>Programa</strong></dt><dd>Desarrollo de software</dd>
        <dt><strong>Trabajo</strong></dt><dd>Empresa Microsoft</dd>
        <dt><strong>Intereses</strong></dt><dd>Desarrollo web, música, deportes </dd>
      </dl>
    `;
  }

  // Mostrar solo la sección seleccionada
function mostrarSeccion(id) {
  let secciones = document.querySelectorAll(".seccion");
  secciones.forEach(sec => sec.css_style.display = "none");

  document.getElementById(id).css_style.display = "block";
}


function renderPosts() {
  return `
    <h2>Muro</h2>
    <input type="text" placeholder="Pon algo aquí..." />
    <button>Compartir</button>
    <div class="post">
      <h4>María</h4>
      <p>¡Hola! Este es mi primer post en el parcial.</p>
    </div>
    <div class="post">
      <h4>Carlos</h4>
      <p>Probando la interfaz, todo funciona.</p>
    </div>
    <div class="post">
      <h4>Ana</h4>
      <p>Foto del día: hermosa puesta de sol.</p>
    </div>
  `;
}

   
  function renderPhotos() {
     // Usa imágenes locales si existen; si no, se mostrarán como rotas rotas en local,
    // pero Vercel servirá las assets subidas correctamente.
  return `
    <h2>Photos</h2>
    <div class="photos-grid">
      <img src="assets/fb2.png" alt="Foto 2" onerror="this.src='https://picsum.photos/300/200?random=2'">
      <img src="assets/fb3.png" alt="Foto 3" onerror="this.src='https://picsum.photos/300/200?random=3'">
      <img src="https://picsum.photos/seed/4/300/200" alt="Foto 4">
      <img src="https://picsum.photos/seed/5/300/200" alt="Foto 5">
      <img src="https://picsum.photos/seed/6/300/200" alt="Foto 6">
      <img src="https://picsum.photos/seed/7/300/200" alt="Foto 7">
    </div>
  `;
}


  function renderBoxes() {
    return `
      <h2>Recientes</h2>
      <div class="boxes">
        <div class="box"><h4> <img src="assets/fb2.png" onerror="this.src='https://picsum.photos/300/200?random=2'"></h4></div>
        <div class="box"><h4> <img src="https://picsum.photos/seed/6/300/200" alt="Foto 1"></h4></div>
        <div class="box"><h4> <img src="assets/fb3.png" onerror="this.src='https://picsum.photos/300/200?random=4'"></h4></div>
        <div class="box"><h4> <img src="assets/fb4.png" onerror="this.src='https://picsum.photos/300/200?random=6'"></h4></div>



      </div>
      </div>
    `;
  }

  // Renderiza la sección principal según state.section
  function renderMainSection() {
    switch (state.section) {
      case 'muro': return renderMuro();
      case 'info': return renderInfo();
      case 'photos': return renderPhotos();
      case 'boxes': return renderBoxes();
      default: return `<p>Sección no encontrada</p>`;
    }
  }

  // Actualiza el atributo aria-pressed de los botones
  function updateNavButtons() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.setAttribute('aria-pressed', btn.dataset.section === state.section ? 'true' : 'false');
    });
  }

  // Render completo del main (left + content)
  function render() {
    app.innerHTML = `
      ${renderLeft()}
      <section class="content-panel" tabindex="-1">
        ${renderMainSection()}
      </section>
    `;
    updateNavButtons();
    // foco en contenido para accesibilidad
    const content = app.querySelector('.content-panel');
    if (content) content.focus();
  }

  // Delegación: un listener para la nav
  nav.addEventListener('click', (evt) => {
    const btn = evt.target.closest('.nav-btn');
    if (!btn) return;
    const section = btn.dataset.section;
    if (!section) return;
    state.section = section;
    render();
  });

  // Soporte teclado (Enter/Space) para botones
  nav.addEventListener('keydown', (evt) => {
    if (evt.key === 'Enter' || evt.key === ' ') {
      const btn = evt.target.closest('.nav-btn');
      if (!btn) return;
      evt.preventDefault();
      state.section = btn.dataset.section;
      render();
    }
  });

  // Búsqueda: si escriben algo, mostramos el muro filtrado
  search.addEventListener('input', (evt) => {
    state.query = evt.target.value || '';
    if (state.section !== 'muro') state.section = 'muro';
    render();
  });

  // Render inicial
  render();
});
