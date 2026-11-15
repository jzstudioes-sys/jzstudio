/* JZ Studio · interacciones (sin dependencias) */
(function () {
  "use strict";

  /* Cabecera: se compacta al hacer scroll */
  var cab = document.getElementById("cabecera");
  function alScroll() { if (cab) cab.classList.toggle("cabecera--scroll", window.scrollY > 24); avance(); }
  window.addEventListener("scroll", alScroll, { passive: true });

  /* Configurador: vista previa de la web del visitante */
  var SECTORES = {
    barberia:    { nombre: "Barbería",    lema: "Cortes con oficio.",             fondo: "#151210", tinta: "#F4EBDD", acento: "#C8894D", hero: "radial-gradient(circle at 70% 30%,#7a4e2b,#211710 70%)", lista: [["Corte clásico", "14 €"], ["Corte + barba", "20 €"], ["Afeitado a navaja", "12 €"]] },
    restaurante: { nombre: "Restaurante", lema: "Cocina de casa, cada día.",      fondo: "#FFF6EC", tinta: "#2B1D16", acento: "#C2461F", hero: "radial-gradient(circle at 70% 75%,#ffb15e,#d65a28 45%,#6b200e)", lista: [["Menú del día", "13 €"], ["Raciones para compartir", "desde 8 €"], ["Postres caseros", "5 €"]] },
    tatuajes:    { nombre: "Estudio de tatuaje", lema: "Tu idea. Nuestra tinta.", fondo: "#0B0B0B", tinta: "#FFFFFF", acento: "#E5484D", hero: "radial-gradient(circle at 30% 30%,#3a1214,#0b0b0b 70%)", lista: [["Diseño personalizado", "Gratis"], ["Fine line", "desde 60 €"], ["Realismo", "a presupuesto"]] },
    taller:      { nombre: "Taller",      lema: "Tu coche, en buenas manos.",     fondo: "#F2F4F7", tinta: "#13202E", acento: "#1F5FBF", hero: "radial-gradient(circle at 70% 30%,#3d7be0,#13315f 70%)", lista: [["Revisión completa", "desde 59 €"], ["Cambio de aceite", "desde 45 €"], ["Diagnosis", "25 €"]] },
    estetica:    { nombre: "Centro de estética", lema: "Tu momento de cuidarte.", fondo: "#FFF5F6", tinta: "#3A1F27", acento: "#C2577A", hero: "radial-gradient(circle at 70% 30%,#f4b6c6,#b24f70 70%)", lista: [["Manicura semipermanente", "18 €"], ["Limpieza facial", "40 €"], ["Depilación láser", "a consultar"]] },
    clinica:     { nombre: "Clínica",     lema: "Tu sonrisa, en confianza.",      fondo: "#F1F8F7", tinta: "#0F2D2A", acento: "#159A8C", hero: "radial-gradient(circle at 70% 30%,#5fd1c2,#0f6e65 70%)", lista: [["Primera visita", "Gratis"], ["Limpieza dental", "45 €"], ["Ortodoncia invisible", "a consultar"]] }
  };
  var ICONOS = window.JZ_ICONOS || {}, WA = window.JZ_WA || "";
  var tel = document.getElementById("telefono"), inNombre = document.getElementById("nombre");
  var cta = document.getElementById("config-cta");
  var $ = function (id) { return document.getElementById(id); };

  function sectorActual() { var r = document.querySelector('input[name="sector"]:checked'); return r ? r.value : "barberia"; }
  function pintar() {
    if (!tel) return;
    var k = sectorActual(), s = SECTORES[k], nombre = (inNombre.value || "").trim() || "Tu negocio";
    tel.dataset.sector = k;
    tel.style.setProperty("--m-fondo", s.fondo); tel.style.setProperty("--m-tinta", s.tinta);
    tel.style.setProperty("--m-acento", s.acento); tel.style.setProperty("--m-hero", s.hero);
    $("mini-nombre").textContent = nombre;
    $("mini-etq").textContent = s.nombre + " · Rivas";
    $("mini-lema").textContent = s.lema;
    $("mini-icono").innerHTML = ICONOS[k] || "";
    $("mini-lista").innerHTML = s.lista.map(function (f) { return "<li><span>" + f[0] + "</span><b>" + f[1] + "</b></li>"; }).join("");
    var msg = "Hola Juan, me gustaría una propuesta de web para mi negocio: " + nombre + " (" + s.nombre.toLowerCase() + ").";
    if (cta) cta.href = "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg);
    tel.classList.remove("telefono--cambio"); void tel.offsetWidth; tel.classList.add("telefono--cambio");
  }
  var form = $("config");
  if (form) {
    form.addEventListener("input", pintar);
    form.addEventListener("submit", function (e) { e.preventDefault(); });
    pintar();
  }

  /* Comparador antes / después */
  var comp = $("comparador"), rango = $("rango");
  if (comp && rango) rango.addEventListener("input", function () { comp.style.setProperty("--pos", rango.value + "%"); });

  /* Proceso: la línea avanza con el scroll */
  var pasos = $("pasos");
  function avance() {
    if (!pasos) return;
    var r = pasos.getBoundingClientRect(), vh = window.innerHeight || 800;
    var p = Math.min(1, Math.max(0, (vh * 0.75 - r.top) / r.height));
    pasos.style.setProperty("--avance", p.toFixed(3));
  }
  alScroll();
})();

/* Hora local del estudio */
(function () {
  var el = document.getElementById("hora"); if (!el) return;
  function pinta() {
    try { el.textContent = new Intl.DateTimeFormat("es-ES", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Madrid" }).format(new Date()); } catch (e) {}
  }
  pinta(); setInterval(pinta, 30000);
})();
