# Introducción

Este repositorio es una actividad de la asignatura IPO (Interacción Personal Ordenador). La asignatura IPO se imparte en las titulaciones de informática de la Universidad de Sevilla.

La actividad tiene como cometido completar el proyecto web inacabado del repositorio atendiendo a unos objetivos que se detallan en este documento.

La aplicación se inspira en la técnica de aprendizaje basada en tarjetas
[Wikipedia: Flash Cards](https://es.wikipedia.org/wiki/Flash_cards)

Las tarjetas permiten aglutinar una doble información relacionada:

- El anverso puede mostrar una pregunta, un concepto, una imagen, etc.
- El reverso mostraría la respuesta, la explicación, el significado, etc.

El proceso consiste en repasar las tarjetas de una en una de forma que:

1. Se observa el anverso de la tarjeta (sin mirar su reverso),
2. Se propone mentalmente cual sería su reverso
3. Se da la vuelta a la tarjeta para validar la propuesta mental
   Para que el proceso sea eficaz hay que contemplar otros factores como la frecuencia,
   el número de tarjetas, etc.

Aunque la técnica tiene muchas aplicaciones, es una técnica empleada en la adquisición
de vocabulario de lenguas no maternas

La aplicación permite las siguientes interacciones:

- Selección de Mazo: Se ofrece un listado con los mazos de tarjetas disponible (las tarjetas están almacenadas en mazos.js). Al seleccionar un mazo, las tarjetas del mazo se muestran en un visor (en verdad, sólo es visible una tarjeta de todas las del mazo). Cada vez que se cambia de mazo, las tarjetas se barajan para que no se muestren siempre en el mismo orden.
- Interacción con el visor: El visor muestra una tarjeta del mazo (tarjeta activa) pero admite
  - avanzar/retroceder en las tarjetas del mazo para cambiar la tarjera activa
  - dar la vuelta a la tarjeta activa (para ver su anverso o su reverso)

# Contenido

La carperta _www_ incluye los ficheros de partida: _index.html_, _script.js_ y _style.css_.

Para garantizar una mayor independencia en el desarrollo de la aplicación, el modelo (información de los mazos disponibles) está recogido en _data/mazos.js_ que exporta una variable mazos con la colección de mazos disponibles. El fichero _script.js_ es incluido en _index.html_ como modulo (_type=module_) y desde el mismo se importa la variable _mazos_ de _data/mazos.js_

Los cambios se harán fundamentalmente en _style.css_ y _script.js_. En general, consistirán en:

- añadir declaraciones en las reglas CSS preexistentes
- completar funciones vacías en JS. Para su fácil identificación, los nombres de las funciones a completar comenzarán con tres subrayados. Ej.: \_\_\_funcionVacia()

Se admitirán cambios puntuales en la hoja CSS:

- que obedezcan a alguna observación realizada explícitamente en la actividad
- para fomentar la comprensión de la interacción o realzar la estética (márgenes, sombras, redondeado de esquinas, etc.)
- para dotar de un diseño cromático y tipográfico personal al proyecto.

Los cambios en _index.html_ serán admitidos sólo en el caso de que la solución aportada suponga una modificación significativa de la composición del proyecto que requiera dicha intervención.

# Identificación del trabajo:

- script.js: Se actualizará el nombre del equipo de laboratorio en la variable

            const nombreDelEquipoDeLaboratorio = "XXXXXX";

- style.css: Se actualizará el nombre del equipo de laboratorio en la cabecera

             /* EQUIPO <<XXXXXXX>> */

# Objetivos:

El objetivo de la actividad es el aprendizaje de las dos siguientes técnicas:

- transformaciones en CSS [MDN: trasnsfomr](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)
- [MDN: Módulos en JS](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

Como objetivos globales (ya tenido en cuenta en actividades anterirores):

- aprender a combinar de forma oportuna Grid, Flexbox y Flujo Normal
- el uso apropiado de las unidades de medida espaciales en el diseño (em, rem, %, ...)
- la estilización de los elementos como apoyo a la comprensión de la interacción (ej.: ¿cómo hacer notar al usuario que sus acciones son correctas?)
- la flexibilidad en el diseño: _var()_, _calc()_, _clamp(min, preferente, max)_

# Indicaciones

El estilo de codificación en el proyecto se apoya en las siguientes características:

- Atributo id: reservar este atributo para el acceso en JS de elementos HTML
- Atributo class: reservar las clases fundamentalmente para estilizar con CSS los elementos HTML
- [Notación BEM](https://getbem.com/) para seleccionar en CSS los elementos HTML
- Notación hsl() para codificar los colores
- Elemento :root para aunar las variables del diseño cromático y tipográfico
- Variables: Generalizar los estilos CSS mediante el uso de variables var() y la función calc()
- Uso preferente de unidades de longitud flexibles (em, rem, vh, vw, %)
- Criterio homogéneo de organización y nomenclatura
  - En reglas y declaraciones en CSS
  - En variables/funciones en JS
  - Notación camello en los nombres en JS
- Comentarios
  - incluir las referencias utilizadas para el diseño o codificación (MDN, Youtube, Stackoverflow , Coolors, etc.)
  - comentar los aspectos que faciliten la lectura del código cuando sea necesario, evitando los comentarios triviales que se limitan a reescribir el código
