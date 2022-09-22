// ---------------------------------------------------------------------------------
// PREAMBULO
// ---------------------------------------------------------------------------------
// El premabulo tiene como cometido la identificación de la autoría del trabajo
// El nombre será mostrada en el elemento HTML #equipo de la página web
// Cada equipo debe actualizar la constante con su nombre de equipo

const nombreDelEquipoDeLaboratorio = "XXXXX";
document.getElementById("equipo").textContent = nombreDelEquipoDeLaboratorio;

// ---------------------------------------------------------------------------------
// PROYECTO Tarjetas
// ---------------------------------------------------------------------------------

// La aplicación se inspira en la técnica de aprendizaje basada en tarjetas
//  https://es.wikipedia.org/wiki/Flash_cards

// Las tarjetas permiten aglutinar una doble información relacionada:
//     - El anverso puede mostrar una pregunta, un concepto, una imagen, etc.
//     - El reverso mostraría la respuesta, la explicación, el significado, etc.
// El proceso consiste en repasar las tarjetas de una en una de forma que:
//      1) Se observa el anverso de la tarjeta (sin mirar su reverso),
//      2) Se propone mentalmente cual sería su reverso
//      3) Se da la vuelta a la tarjeta para validar la propuesta mental
// Para que el proceso sea eficaz hay que contemplar otros factores como la frecuencia,
// el número de tarjetas, etc.

// Aunque la técnica tiene muchas aplicaciones, es una técnica empleada en la adquisición
// de vocabulario de lenguas no maternas

// La aplicación permite las siguientes interacciones:
//  - Selección de Mazo: Se ofrece un listado con los mazos de tarjetas disponible
//    (las tarjetas están almacenadas en mazos.js). Al seleccionar una mazo, las
//    tarjetas del mazo se muestran en un visor (en verdas, sólo es visible una tarjeta de todas
//    las del mazo. Cada vez que se cambia de mazo, las tarjetas
//    se barajan para que no se muestren siempre en el mismo orden.

//  - Interaccion con el visor: El visor muestra una tarjeta del mazo (tarjeta activa) pero admite
//      - avanzar/retroceder en las tarjetas del mazo para cambiar la tarjera activa
//      - dar la vuelta a la tarjeta activa (para ver su anverso o su reverso)

// ---------------------------------------------------------------------------------
// VARIABLES
// ---------------------------------------------------------------------------------

import { mazos } from "./data/mazos.js";

// -------------  Variables global

// En mazos.js se define la variable mazos
//  Es un objeto con la siguiente estructura
//        { <nombre-del-mazo-1> : [ {anverso: <anverso-1>, reverso: <reverso-1>}, .....],
//        { <nombre-del-mazo-2> : [ {anverso: <anverso-2>}, {reverso: <reverso-2>}, ....,],

//  Las propiedades <nombre-de-mazo> son los nombres de los mazos
//  Los valores de las propiedade son array de tarjetas,
//  Las tarjetas son objetos con dos propiedades anverso y reverso
//  La variable informa de los mazos disponibles y da las tarjetas que hay en cada mazo

// -------------  Variables de interacción

// Para cambiar las tarjetas que se mostrarán en el visor
const panelMazos = document.getElementById("mazos");
panelMazos.addEventListener("click", (e) => seleccionaMazo(e.target.id));

// Para avanzar a la siguinte tarjeta en el visor
const anteriorBtn = document.getElementById("anterior");
anteriorBtn.addEventListener("click", ___muestraTarjetaAnterior);

// Para retroceder a la siguinte tarjeta en el visor
const siguienteBtn = document.getElementById("siguiente");
siguienteBtn.addEventListener("click", ___muestraTarjetaSiguiente);

// Para darle la vuelta a la tarjeta activa
const visorDeTarjetas = document.getElementById("visorDeTarjetas");
visorDeTarjetas.addEventListener("click", ___volteaTarjeta);

//  -------------------  Variables y constantes

let numeroDeTarjetaActiva = 0;
let numeroDeTarjetasDelMazo = 0;

// Clases CSS para dar estilo a las tarjetas
const claseTarjetaActiva = "tarjeta tarjeta--activa";
const claseParaVoltearUnaTarjeta = "tarjeta--volteo";
const claseTarjetaEnLaDerecha = "tarjeta tarjeta--derecha";
const claseTarjetaEnLaIzquierda = "tarjeta tarjeta--izquierda";

// ---------------------------------------------------------------------------------
// FUNCIONES
// ---------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------
//  Funcion principal
// ---------------------------------------------------------------------------------

function comienzo() {
  // Prepara la aplicación mostrando los mazos disponibles y proponiendo
  // de partida que se ha seleccionado el primer mazo.

  if (mazos !== null) {
    const nombreMazos = Object.keys(mazos);

    // Muestra los mazos disponibles en el panel de los mazos
    panelMazos.innerHTML = nombreMazos
      .map((m) => {
        return `<button class="mazo" id="${m}">${m.toUpperCase()}</button>`;
      })
      .join("");

    // Selecciona el primer mazo
    seleccionaMazo(nombreMazos[0]);
  }
}

// ---------------------------------------------------------------------------------
//  Funciones auxiliares
// ---------------------------------------------------------------------------------

function seleccionaMazo(nombre) {
  // Partiendo del mazo seleccionado se actualiza
  //  - las cartas mostradas en el visor
  //  - la información respecto a la navegación
  //  - las variables numeroDeTarjetaActiva y numeroDeTarjetasDelMazo

  //  Funciones internas

  // Devuelve el array con sus elementos ordenados aleatoriamente
  function baraja(array) {
    let aux = [];
    // Se crea un array auxiliar de pares (valor,random) donde:
    //   -  el primer componente (valor) conserva los valores del array
    //   -  el segundo componente (random) es un númeo generado aleatoriamente
    aux = array.map((v) => ({ valor: v, random: Math.random() }));

    // Se ordena el array de pares respecto al par aleatorio random
    aux = aux.sort((a, b) => a.random - b.random);

    // Se suprime el componente aleatorio del par, manteniendo los valores de partida del array
    aux = aux.map((par) => par.valor);

    return aux;
  }

  // Genera el contendio HTML de una tarjeta (con anverso y reverso)
  function generaTarjetaHTML(tarjeta, index) {
    const tarjetaAnversoHTML = `<div class="tarjeta--anverso">${tarjeta.anverso}</div>`;
    const tarjetaReversoHTML = `<div class="tarjeta--reverso">${tarjeta.reverso}</div>`;
    const contenidoTarjeta = tarjetaAnversoHTML + tarjetaReversoHTML;

    return (
      `<div class="${claseTarjetaEnLaDerecha}" data-index="${index}">` + contenidoTarjeta + "</div>"
    );
  }

  // Genera el contendio HTML del visor con todas las tarjetas
  function actualizaPanelVisorDeTarjetas(tarjetas) {
    // Añade al visor los elementos HTML correspondientes
    // a todas las tarjetas del mazo

    // Se apoya en otra función que genera sucesivammente un elemento HTML para cada tarjeta

    const tarjetasHTML = tarjetas.map((tarjeta, index) => generaTarjetaHTML(tarjeta, index));
    visorDeTarjetas.innerHTML = tarjetasHTML.join("");
  }

  // Principio de la función

  // Recupera las tarjetas del mazo seleccionado
  // y las baraja para que no se muestren siempre en el mismo orden
  const tarjetas = mazos[nombre];
  const tarjetasBarajadas = baraja(tarjetas);
  // Añade las tarjetas al panel visor de tarjetas
  actualizaPanelVisorDeTarjetas(tarjetasBarajadas);
  numeroDeTarjetasDelMazo = tarjetas.length;

  // Selecciona la primera tarjeta como activa
  numeroDeTarjetaActiva = 0;
  const selector = `[data-index="0"]`;
  const primeraTarjeta = document.querySelector(selector);
  primeraTarjeta.classList = claseTarjetaActiva;

  // Se actualiza el número de tarjeta en la referencia de navegación
  actualizaPanelDeNavegacion();
}

function actualizaPanelDeNavegacion() {
  // Muestra en el panel de navegación
  // el número de la tarjeta visible (activa) y cuantas tarjeta tiene el mazo
  const referencia = document.getElementById("referencia");
  referencia.textContent = `${numeroDeTarjetaActiva + 1}/${numeroDeTarjetasDelMazo}`;
}

// ---------------------------------------------------------------------------------
// Funciones para gestion de eventos

function ___muestraTarjetaAnterior() {
  // Solo es coherente mover a la derecha una tarjeta que no sea la primera del mazo
  // El efecto de desplazamiento se obtiene actualizando los estilos de las tarjeta implicadas
  //    - la activa se desplaza a la derecha
  //    - y la anterior a la activa se convierte en visible (activa)
  // También debe actualizarse el panel de navegación y las variable numeroDeTarjetaActiva
}

function ___muestraTarjetaSiguiente() {
  // Solo es posible mover a la izquierda una tarjeta que no
  // sea la última del mazo
  // El efecto de desplazamiento se obtiene actualizando los estilos de las tarjeta implicadas:
  //   -  la activa se desplace a la izquierda
  //   -  la siguiente a la activa se convierte en visible (activa)
  // También debe actualizarse el panel de navegación y las variable numeroDeTarjetaActiva
}

function ___volteaTarjeta() {
  // Cambia el estilo de la tarjeta activa para darle la vuelta
}

// ---------------------------------------------------------------------------------
// Principio del programa

comienzo();
