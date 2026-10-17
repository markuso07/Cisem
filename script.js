/* ==========================================
   CISEM - JAVASCRIPT PRINCIPAL
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {

    console.log("CISEM: página cargada correctamente.");

    /* ==========================================
       1. AÑO AUTOMÁTICO DEL PIE DE PÁGINA
       ========================================== */

    const anio = document.getElementById("anio");

    if (anio) {
        anio.textContent = new Date().getFullYear();
    }


    /* ==========================================
       2. NAVEGACIÓN SUAVE
       ========================================== */

    const enlaces = document.querySelectorAll('a[href^="#"]');

    enlaces.forEach((enlace) => {

        enlace.addEventListener("click", (evento) => {

            const destino = enlace.getAttribute("href");

            if (!destino || destino === "#") {
                return;
            }

            const seccion = document.querySelector(destino);

            if (seccion) {
                evento.preventDefault();

                seccion.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        });

    });


    /* ==========================================
       3. VIDEOS DE LA PÁGINA
       ========================================== */

    const videosGaleria = document.querySelectorAll(".galeria video");

    videosGaleria.forEach((video) => {

        video.setAttribute("playsinline", "");

        video.addEventListener("play", () => {

            videosGaleria.forEach((otroVideo) => {

                if (otroVideo !== video) {
                    otroVideo.pause();
                }

            });

        });

        video.addEventListener("error", () => {

            console.error(
                "No se pudo cargar el video:",
                video.currentSrc
            );

        });

    });


    /* ==========================================
       4. FORMULARIO DE PRESUPUESTO POR WHATSAPP
       ========================================== */

    const formulario = document.getElementById(
        "formulario-presupuesto"
    );

    if (formulario) {

        formulario.addEventListener("submit", (evento) => {

            evento.preventDefault();

            const nombre = document.getElementById("nombre").value.trim();
            const telefono = document.getElementById("telefono").value.trim();
            const servicio = document.getElementById("servicio").value;
            const ubicacion = document.getElementById("ubicacion").value.trim();
            const mensaje = document.getElementById("mensaje").value.trim();

            // Comprobar los campos obligatorios
            if (!nombre || !telefono || !servicio || !mensaje) {

                alert("Por favor, completá todos los campos obligatorios.");

                return;
            }

            // Preparar la consulta
            const textoWhatsApp = `
Hola CISEM, quisiera solicitar un presupuesto.

Nombre: ${nombre}
Teléfono: ${telefono}
Servicio: ${servicio}
Ubicación: ${ubicacion || "No especificada"}

Detalles del proyecto:
${mensaje}
            `.trim();

            // Número de WhatsApp que ya utiliza tu página
            const numeroWhatsApp = "59899457090";

            const enlaceWhatsApp =
                `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(textoWhatsApp)}`;

            // Abrir WhatsApp con la consulta preparada
            window.open(
                enlaceWhatsApp,
                "_blank",
                "noopener,noreferrer"
            );

        });

    }


    /* ==========================================
       5. BOTÓN VOLVER ARRIBA
       ========================================== */

    const botonArriba = document.getElementById("volver-arriba");

    if (botonArriba) {

        const comprobarDesplazamiento = () => {

            if (window.scrollY > 400) {
                botonArriba.classList.add("visible");
            } else {
                botonArriba.classList.remove("visible");
            }

        };

        window.addEventListener("scroll", comprobarDesplazamiento);

        comprobarDesplazamiento();

        botonArriba.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }

});