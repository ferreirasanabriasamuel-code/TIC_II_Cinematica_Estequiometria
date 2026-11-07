# Cinemática & Estequiometría — página del trabajo práctico

Página web académica e interactiva con los dos temas del trabajo práctico.
Hecha con **HTML, CSS y JavaScript puro**, sin frameworks ni librerías.

**Samuel Ferreira Sanabria · Isaías Emmanuel Ferreira Mena — Tercer Curso, Turno Tarde**

**Objetivo del proyecto:** diseñar y publicar una página web académica e
interactiva para estudiar y exponer los dos temas del trabajo práctico de TIC II — Cinemática y Estequiometría, reuniendo en un solo lugar la
teoría, el material audiovisual, un banco de imágenes y veinte actividades
interactivas de repaso.

---

## Estructura de la página (Parte 2 de la guía de TIC II)

Cada tema se recorre como una guía de **nueve pasos**, con paridad total
entre Cinemática y Estequiometría:

1. **Introducción** — qué estudia el tema y por qué importa.
2. **Contenido teórico** — bloques con fórmulas y definiciones.
3. **Material de lectura** — material interactivo por tema: el Genially de
   Cinemática y la presentación de Canva de Estequiometría, ambos enlazados.
4. **Video educativo** — video de YouTube con miniatura y **ficha técnica**
   (título, canal, plataforma y duración). El de Cinemática, «La Cinemática -
   TIC II», es creación propia del equipo.
5. **Banco de imágenes** — cinco imágenes por tema con su descripción y
   crédito (listas para agregar el archivo de cada imagen, opcional).
6. **Actividades interactivas** — **diez juegos por tema (20 en total)**,
   cada uno de una categoría distinta.
7. **Más información** — síntesis y **recursos complementarios**: los juegos
   cubren lo interactivo; cada documento académico de la web tiene su botón
   de vidrio "Ver o descargar el recurso" (abre el sitio para visualización
   o descarga) y, debajo, la referencia citada en formato APA.
8. **Autoevaluación** — descripción breve del cuestionario y enlace a
   Google Forms (las preguntas no se listan en la página).
9. **Cierre** — agradecimientos, integrantes y fecha de exposición.

Además, sobre la portada cuelga la píldora negra **“Sobre este proyecto”**
(color negro/grisáceo, centrada sobre la línea central y con el borde
superior de su badge de ícono tocando la intersección de las dos líneas de
la portada: el borde inferior del masthead y la línea vertical; lleva el
enlace **“Conocer más”** a la derecha; en celular queda el cuadrado compacto
en la esquina inferior derecha): al tocarla se abre el diálogo **“Conocer más”**,
centrado y tan ancho como los apartados de los temas, con el objetivo del
proyecto, el recorrido, las actividades, cómo está hecho y cómo se publica.

El sitio completo tiene **modo claro/oscuro**: el interruptor (luna/sol)
vive arriba a la derecha de la portada, en la barra de cada panel y en la
barra de cada juego. La preferencia se guarda en el navegador y, si nunca
se tocó, se usa la del sistema.

---

## Las 20 actividades interactivas

Cinematica (10):

| # | Juego | Categoría |
| --- | --- | --- |
| 1 | Rapidez conceptual | Opción múltiple conceptual |
| 2 | ¿Verdadero o falso? | Verdadero / falso |
| 3 | Ordena el análisis | Ordenar pasos |
| 4 | Memoria de magnitudes | Memoria de pares |
| 5 | Desafío de gráficas | Interpretación de gráficas |
| 6 | Completa la definición | Completar espacios |
| 7 | Clasifica el movimiento | Clasificar (MRU / MRUA / caída libre) |
| 8 | Cálculos al instante | Cálculo con opciones |
| 9 | Adivina el término | Adivinar letra por letra |
| 10 | Empareja los conceptos | Unir dos columnas |

Estequiometría (10):

| # | Juego | Categoría |
| --- | --- | --- |
| 1 | Conceptos en juego | Opción múltiple conceptual |
| 2 | ¿Verdadero o falso? | Verdadero / falso |
| 3 | Ordena la resolución | Ordenar pasos |
| 4 | Memoria estequiométrica | Memoria de pares |
| 5 | Convierte con el mol | Cálculo de conversiones |
| 6 | Completa el concepto | Completar espacios |
| 7 | Clasifica la sustancia | Clasificar (elemento / compuesto / mezcla) |
| 8 | Adivina el término | Adivinar letra por letra |
| 9 | Empareja los conceptos | Unir dos columnas |
| 10 | Balancea la ecuación | Balanceo con coeficientes |

Sin categorías repetidas dentro de cada tema.

---

## Estilo visual (editorial minimalista)

El sitio sigue una estética de **revista digital / app de hábitos**:

- **Alto contraste y mucho espacio en blanco**; márgenes laterales generosos.
- **Títulos en serif editorial** (Playfair Display, interlineado ajustado).
- **Cuerpo de texto pequeño (~14px)** en sans-serif (Inter), color atenuado
  del tema, interlineado amplio.
- **Microcopy** (etiquetas, pasos, botones) en MAYÚSCULAS con letter-spacing
  amplio: “Tema 01 · Física”, “Paso 2 de 9”, “Elegir tema”.
- **Blob orgánico + patrón de puntos**: la única decoración. El blob lleva
  un degradado diagonal con el color del tema (celeste-cian en Cinemática,
  violeta en Estequiometría) y se deforma muy lentamente.
- **Estructura tipo stepper**: título grande arriba → contenido al medio →
  acción abajo. Cada panel tiene una barra superior con flecha de vuelta,
  indicador **“Paso X de 9”** con línea de progreso, botón de **guardar
  posición**, botón de **menú del índice** e **interruptor de modo
  claro/oscuro**.
- **Botones CTA**: vidrio con el color del tema translúcido (GlassSurface,
  react-bits) — mantienen el color de siempre, ahora con el fondo
  refractándose o desenfocándose detrás y el borde brillando — y texto
  corto en mayúsculas, ancho casi completo.
- **Casillas**: cuadrados pequeños sólidos con check blanco, alineados a
  la derecha de cada opción de los juegos.

El **modo oscuro** (excepción pedida por la guía) redefinine las mismas
variables de color en `css/modo-oscuro.css`: fondo noche neutra, texto
claro y acentos cian/violeta más luminosos. El modo claro no se toca en
absoluto.

---

## Capa de animaciones (movimiento premium)

El movimiento vive en dos archivos nuevos —`css/animaciones.css` y
`js/animaciones.js`, con el fondo animado en `js/plasma-wave-react.js`— y sigue
tres reglas: **no cambia colores, tipografía ni estructura**, solo anima
`transform` y `opacity` (nada que provoque reflow), y **todo se degrada**
si el JavaScript no corre (el sitio se ve idéntico, solo sin animaciones).

- **Scroll reveal**: secciones, cabeceras y tarjetas de juegos entran con un
  desvanecido + subida de 18 px al aparecer en pantalla
  (IntersectionObserver). Los grupos de hermanos se escalonan
  90 ms entre sí. Al terminar, el atributo se retira solo.
- **Curva y duraciones**: todas las transiciones usan la curva
  `cubic-bezier(0.16, 1, 0.3, 1)` (definida una vez en `css/base.css` →
  `--curva`), con duraciones de 0,3 a 0,6 s según el elemento.
- **Hover y pulsación**: botones, enlaces y tarjetas crecen levemente al
  pasar el cursor (escala 1.02–1.05 + sombra) y se hunden al pulsar
  (escala 0.97–0.98).
- **Encabezados**: el masthead de la portada (en celular queda fijo) y las
  barras de los paneles y juegos ganan `backdrop-filter: blur(10px)` y una
  sombra ligera al superar ~50 px de scroll, con transición suave. El
  masthead es sticky con z-index 5; la píldora "Sobre este proyecto" (z 6)
  cuelga por encima de él y se puede pulsar entera.
- **Imágenes**: cada imagen aparece con un desenfoque que se disuelve
  (blur-up) cuando termina de cargar, en vez de saltar a la vista.
- **Vidrio (GlassSurface, componente React)**: los botones y la píldora
  "Sobre este proyecto" están hechos con el componente `GlassSurface` de
  react-bits, portado sin JSX a `js/glass-surface-react.js` y montado como
  **isla React 18** junto al fondo PlasmaWave. Cada botón conserva su color:
  una capa de tinte translúcido del tema (cian/violeta) sobre el vidrio.
  La píldora "Sobre este proyecto" lleva el vidrio completo **con
  refracción**: deforma lo que hay detrás de ella (la onda de luz del
  fondo) por sus bordes, como un vidrio real. Los botones de la barra de
  los paneles, los CTA de lectura y autoevaluación, el botón de play del
  video, el interruptor de modo, los "Elegir tema", el botón que abre el
  prompt del video y la tarjeta del diálogo "Conocer más" usan la variante
  esmerilada (desenfoque + brillo + borde de vidrio). El **"Jugar →" de cada
  tarjeta del paso Actividades interactivas** es un chip de vidrio en forma
  de pastilla con tinte del tema (`js/principal.js` lo envuelve al preparar
  el panel; en modo oscuro el tinte se refuerza para que el chip se lea
  como botón sobre la tarjeta oscura). La tarjeta entera sigue siendo el
  enlace: el chip es presentación y el clic navega igual. **Las páginas de
  `juegos/` no cargan React ni el vidrio**: sus botones quedan como
  siempre, de modo que los juegos funcionan aunque no haya conexión a los
  CDN. Todo se degrada solo:
  si el navegador no soporta el filtro SVG o WebGL2, el componente cae a la
  variante esmerilada; si tampoco hay `backdrop-filter`, a un fondo sólido;
  y si React no cargó, los botones quedan exactamente como antes.
- **Fondo animado (PlasmaWave, componente React)**: una onda de luz
  violeta y cian (#A855F7 / #06B6D4) dibujada con WebGL2 detrás de la
  portada, con resplandor, núcleo caliente, grano sutil y una chispa que
  sigue al cursor. Es el componente `PlasmaWave` de react-bits, portado
  sin JSX a `js/plasma-wave-react.js` y montado como **isla React 18**
  (React vendido en `js/react/`, sin paso de build): la configuración y
  la pausa le llegan como props. Si React no está disponible, el montaje
  cae a un fondo estático en CSS con los mismos colores; si el navegador
  no soporta WebGL2, el componente marca su contenedor y se muestra esa
  misma reserva. Reacciona al cursor, se pausa cuando sale de pantalla,
  cuando la pestaña se oculta y cuando un panel está abierto, y con
  *movimiento reducido* se muestra un fotograma quieto. Las **imágenes
  del banco** se muestran en una **galería acordeón** basada en el
  componente `AccordionGallery` de react-bits, montado también como isla
  React (`js/accordion-gallery-react.js`, con GSAP vendido en
  `js/gsap.min.js`): al pasar el cursor —o con foco y flechas del teclado—
  un panel se expande a todo color mientras los demás quedan en gris, con
  inclinación 3D y parallax. Las fotos se muestran con su color natural
  (se quitó la capa de velo oscuro del componente original) y cada
  etiqueta es un pequeño chip de vidrio que garantiza la lectura sobre
  cualquier imagen. Debajo, una leyenda por imagen conserva el
  número, el título, la descripción y el crédito; si ninguna entrada de
  `bancoImagenes` tuviera `archivo`, el banco cae a la rejilla de marcos
  pendientes de siempre.

---

## Cómo abrirla

Doble clic en `index.html` (o abrirlo con cualquier navegador). También
funciona sin conexión a internet: solo el video (YouTube), su miniatura y
los enlaces externos (Genially, Google Forms) necesitan internet.

---

## Verla en el celular

La vía recomendada es abrir directamente el **enlace de GitHub Pages** en
el navegador del celular (Chrome, Safari, etc.):

`https://ferreirasanabriasamuel-code.github.io/tp-cinematica-estequiometria/`

Funciona igual que en la computadora —contenidos, veinte juegos y modo
claro/oscuro—, muestra siempre la versión más reciente del repositorio y
es la única opción que sirve en **iPhone**, donde Safari no abre archivos
HTML guardados localmente.

Si se quiere usar **sin internet**, se puede descargar el repositorio como
ZIP (botón verde **Code → Download ZIP**), descomprimirlo y abrir
`index.html` en la computadora. En **Android** conviene abrirlo con Chrome
tipeando la ruta del archivo en la barra de direcciones (por ejemplo
`file:///sdcard/Download/tp-cinematica-estequiometria/index.html`, ajustando
la carpeta real donde esté guardada), porque el administrador de archivos a
veces no carga las carpetas `css/`, `js/` y `fonts/` relativas y la página
se ve sin estilo. No es un error del sitio: es una restricción de
seguridad de Android.

---

## Estructura de la carpeta

```
tp-cinematica-estequiometria/   ← esta carpeta es el repositorio de GitHub
├── index.html              ← página principal (portada + paneles)
├── README.md               ← este archivo
├── .nojekyll               ← indica a GitHub Pages que publique sin procesar
├── .gitignore              ← archivos del sistema que no se suben
├── css/
│   ├── base.css            ← variables de diseño, tipografía y utilidades
│   ├── portada.css         ← portada dividida y paneles de contenido
│   ├── juego.css           ← estilo común de las páginas de juegos
│   ├── acerca.css          ← card flotante "Sobre este proyecto" + diálogo
│   ├── extras.css          ← ficha, imágenes, autoevaluación, motores nuevos
│   ├── modo-oscuro.css     ← paleta oscura (modo claro/oscuro)
│   ├── animaciones.css     ← capa de movimiento (reveal, hover, encabezados)
│   ├── accordion-gallery.css ← galería acordeón del banco de imágenes
│   ├── plasma-wave.css     ← estilos del fondo PlasmaWave (react-bits)
│   └── glass-surface.css   ← vidrio GlassSurface (react-bits) + integración
├── js/
│   ├── datos.js            ← ★ TODO el contenido se edita acá
│   ├── principal.js        ← render y comportamiento de la portada/paneles
│   ├── motor-juegos.js     ← motores de juego reutilizables (8 tipos)
│   ├── modo.js             ← interruptor de modo claro/oscuro
│   ├── gsap.min.js         ← GSAP 3.12.5 vendido (lo usa la galería acordeón)
│   ├── accordion-gallery-react.js ← galería acordeón del banco (react-bits)
│   ├── plasma-wave-react.js← onda de luz del fondo de la portada (react-bits)
│   ├── glass-surface-react.js ← vidrio de botones y píldora (react-bits)
│   ├── react/              ← React 18 UMD de producción (vendido, sin build)
│   └── animaciones.js      ← scroll reveal, encabezados al scroll, blur-up
├── juegos/                 ← 20 páginas de juego (10 por tema)
│   ├── cinematica-01-rapidez-conceptual.html + .js
│   ├── ...                 (cada juego = su página + su archivo de datos)
│   └── estequiometria-10-balancea-la-ecuacion.html + .js
└── fonts/                  ← fuentes Playfair Display e Inter (licencia OFL)
```

---

## Dónde se cambia cada cosa

| Qué cambiar | Dónde |
| --- | --- |
| Textos, fórmulas, introducción, síntesis | `js/datos.js` (cada tema tiene su bloque) |
| Integrantes, curso, turno, fecha, **objetivo del proyecto** | `js/datos.js` → sección `meta` |
| Card "Sobre este proyecto" y diálogo "Conocer más" | `js/datos.js` → sección `acercaDe` |
| **Material de lectura (Genially)** de un tema | `js/datos.js` → `materialLectura.enlace` |
| **Video de un tema y su ficha técnica** | `js/datos.js` → `idVideoYouTube` y `fichaVideo` (título, canal, duración). El ID es lo que aparece en la URL de YouTube después de `watch?v=` |
| **Nota de producción del video** (resumen) | `js/datos.js` → `notaVideo` del tema |
| **Prompt completo del video** (documento aparte con botón en el Paso 04) | `prompt-video.html` (el botón usa `paginaPromptVideo` de `js/datos.js`) |
| **Imágenes del banco** (título, descripción, archivo y crédito) | `js/datos.js` → `bancoImagenes` de cada tema (5 entradas); los archivos viven en `img/banco/` |
| **Autoevaluación** (descripción y enlace de Forms) | `js/datos.js` → `autoevaluacion` de cada tema |
| **Referencias APA de PDFs** | `js/datos.js` → `recursosComplementarios.referencias` |
| Nombres o descripciones de los juegos | `js/datos.js` → lista `juegos` de cada tema |
| Preguntas / pasos / pares de un juego | `juegos/<juego>.js` (mismo nombre que su `.html`) |
| Agregar o reemplazar un juego completo | sobrescribir el par `.html` + `.js` dentro de `juegos/` y actualizar la lista `juegos` en `js/datos.js` |
| Colores, degradados, radios, espaciados, transiciones | `css/base.css` → bloque `:root` (todo junto, en un solo lugar) |
| Colores del **modo oscuro** | `css/modo-oscuro.css` (solo se aplica con el interruptor) |
| Estilo del blob y del patrón de puntos | `css/base.css` → componentes `.blob` y `.puntos` |

El video incluido hoy:

- **Cinemática:** «La Cinemática - TIC II» — Samuel Ferreira Sanabria
  (creación propia del equipo, subida a su canal, duración 2:00). Debajo de
  la ficha va la nota con un resumen del **prompt** con el que se generó la
  animación HTML del video (`notaVideo`) y un botón «Ver el prompt completo
  del video» que abre el documento aparte `prompt-video.html`, donde el
  prompt está ordenado y con formato.
- **Estequiometría:** «La Estequiometría» — sai_darcy (duración 1:49).

Los motores de juego disponibles (`js/motor-juegos.js`): `quiz`,
`verdadero-falso`, `ordenar`, `memoria`, `completar`, `clasificar`,
`adivina` y `emparejar`.

---

## Marcadores pendientes `[COMPLETAR: …]`

Ya no queda ninguno: todos los campos de `js/datos.js` están completos
(fecha de exposición, videos de ambos temas con su ficha técnica, material
de lectura, enlaces de Google Forms, referencias APA y banco de imágenes
con descripciones y créditos).

Único agregado opcional restante:

1. **Imágenes del banco** → ya tienen archivo: `img/banco/` guarda una
   **recreación propia** de cada ilustración (diagramas dibujados para el
   trabajo, con el crédito «Recreación propia (referencia: …)»). Si el
   equipo prefiere usar las imágenes originales de las fuentes, basta con
   reemplazar los archivos en `img/banco/` (o anotar otra ruta en el campo
   `archivo` de cada entrada de `bancoImagenes`) manteniendo los nombres;
   la galería acordeón y las leyendas se actualizan solas.

Si en el futuro algún enlace vuelve a quedar sin completar, el botón se
muestra en estado pendiente (borde punteado) con la instrucción; no lleva a
ninguna parte.

---

## Cómo publicarla gratis

**Opción A — Netlify Drop (la más simple, sin cuenta):**

1. Entrar a `https://app.netlify.com/drop`.
2. Arrastrar la carpeta completa `tp-cinematica-estequiometria` a la página.
3. Netlify da una URL pública tipo `https://nombre-aleatorio.netlify.app`
   (se puede renombrar gratis). Esa es la dirección para compartir.

**Opción B — GitHub Pages (recomendada):**

En síntesis:

1. Crear un repositorio gratuito en GitHub (p. ej. `tp-cinematica-estequiometria`).
2. Subir el contenido de esta carpeta (en la web: *Add file → Upload files*);
   `index.html` debe quedar en la raíz del repositorio.
3. En *Settings → Pages*, elegir la rama `main` y la carpeta `/ (root)`, y guardar.
4. En unos minutos queda disponible en
   `https://<usuario>.github.io/tp-cinematica-estequiometria/`.

El paquete ya incluye `.nojekyll` (evita que GitHub procese el sitio) y
`.gitignore` (excluye archivos del sistema), así que se puede publicar tal
cual, sin ajustes.

En ambos casos la página funciona igual que en local; el video sigue
abriéndose en YouTube.

---

## Notas técnicas

- **Sin frameworks ni librerías**: solo HTML, CSS y JavaScript vanilla,
  en archivos separados y comentados.
- **Fuentes incluidas** en `fonts/` (Playfair Display para títulos e
  Inter para texto y microcopy, descargadas de Google Fonts con licencia
  abierta SIL OFL — los textos de licencia están en esa carpeta). Si se
  borran, el sitio sigue funcionando con las fuentes del sistema
  (Georgia / Times como respaldo serif).
- **Modo claro/oscuro**: un script mínimo en el `<head>` de cada página
  aplica la preferencia guardada en `localStorage`
  (`'tp-ciencias-modo'`) antes del primer render (sin destello); si no hay
  preferencia, se respeta la del sistema (`prefers-color-scheme`). El
  interruptor es un botón con `aria-pressed` y `aria-label` que se
  actualizan, funciona con teclado y muestra el anillo de foco.
- **Accesibilidad**: las mitades de la portada se activan con Tab + Enter
  o Espacio, tienen anillo de foco visible y `aria-expanded` correcto;
  Esc cierra primero el diálogo “Acerca”, después el menú del índice y al
  final el panel; el tema abierto se refleja en la URL y el botón «atrás»
  del navegador cierra el panel; las animaciones (incluida la deformación
  lenta de los blobs) se desactivan solas si el sistema está configurado
  con «reducir movimiento».
- **Navegación por pasos**: la barra superior de cada panel muestra
  “Paso X de 9 · [sección]” según la sección que se está leyendo, con una
  línea de progreso que crece de 1/9 a 9/9.
- **Guardar posición**: el ícono de marcador de la barra guarda la sección
  en `localStorage`; al reabrir el tema, el panel continúa desde esa
  sección (con un aviso breve en pantalla).
- **Menú del índice**: el ícono de lista despliega el índice de secciones;
  también se cierra con Esc.
- **Enlaces profundos**: `index.html#cinematica` abre el panel del tema;
  `index.html#cinematica-juegos` (y `#estequiometria-juegos`) lo abre
  directamente en la sección de actividades. Los juegos usan ese enlace en
  el ícono de rejilla de su barra superior.
- **En celular** las mitades se apilan, el panel se despliega debajo de su
  mitad y la card “Sobre este proyecto” pasa a ser una franja vertical
  fija pegada al borde derecho, superpuesta sobre las dos mitades.
