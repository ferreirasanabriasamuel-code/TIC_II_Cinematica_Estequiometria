/* ==========================================================================
   js/datos.js · CONTENIDO EDITABLE DEL SITIO
   --------------------------------------------------------------------------
   Todo lo que se ve en la página sale de este archivo. principal.js lo lee
   y construye la interfaz. Si se edita un texto aquí, no hace falta tocar
   ningún otro archivo.

   Orden de los paneles (nueve pasos por tema):
     1. Introducción            → introduccion
     2. Contenido teórico       → teoria               (3 a 6 bloques)
     3. Material de lectura     → materialLectura      (enlace Genially)
     4. Video educativo         → idVideoYouTube + fichaVideo
     5. Banco de imágenes       → bancoImagenes     (5 con crédito)
     6. Actividades interactivas → juegos          (10 juegos)
     7. Más información        → masInformacion + recursosComplementarios (APA)
     8. Autoevaluación         → autoevaluacion   (descripción breve + Google Forms)
     9. Cierre                 → cierre
   ========================================================================== */

window.DATOS = {

  /* ------------------------- Datos generales ------------------------- */
  meta: {
    integrantes: [
      'Samuel Ferreira Sanabria',
      'Isaías Emmanuel Ferreira Mena',
    ],
    curso: 'Tercer Curso',
    turno: 'Turno Tarde',
    // Se muestra en el diálogo "Conocer más", debajo del curso y el turno.
    carrera: 'Lic. en Educación de la Física y la Química',
    // Aparece en el cierre de ambos temas.
    fecha: '12 de noviembre del 2026',

    // Objetivo del proyecto: se muestra explícitamente en la portada (card
    // "Sobre este proyecto") y en el diálogo "Acerca de este proyecto".
    objetivo:
      'Diseñar y publicar una página web académica e interactiva destinada al ' +
      'estudio y la exposición de los dos temas del trabajo práctico de Ciencias, ' +
      'Cinemática y Estequiometría. El proyecto reúne en un mismo lugar el desarrollo ' +
      'teórico de cada tema, el material audiovisual de apoyo, un banco de imágenes ' +
      'con fines ilustrativos y veinte actividades interactivas de repaso, con el ' +
      'propósito de facilitar el estudio autónomo y la preparación de la exposición ' +
      'oral ante el curso.',
  },

  /* --------------------- Acerca de este proyecto --------------------- */
  /* Card flotante de la portada + diálogo con el detalle completo.
     Los párrafos del diálogo pueden ser texto suelto o bloques con
     subtítulo ({ subtitulo, texto }) para organizar la versión extensa. */
  acercaDe: {
    etiqueta: 'TIC II · Trabajo final',
    titulo: 'Sobre este proyecto',
    resumen:
      'Página web académica e interactiva para el estudio de la Cinemática y la ' +
      'Estequiometría: desarrollo teórico, material audiovisual, banco de imágenes ' +
      'y veinte actividades de repaso.',

    /* Contenido del diálogo "Conocer más" */
    parrafos: [
      'Este sitio constituye el trabajo final de la materia TIC II. Su objetivo es ' +
      'reunir, en una única página publicada en la web, todos los recursos elaborados ' +
      'para el trabajo práctico de Ciencias: el desarrollo teórico de cada tema, un ' +
      'material de lectura interactivo, un video educativo acompañado de su ficha ' +
      'técnica, un banco de imágenes con fines ilustrativos y veinte actividades de ' +
      'repaso concebidas como juegos. De este modo, el contenido queda disponible en ' +
      'cualquier momento y desde cualquier dispositivo, tanto para el estudio ' +
      'individual como para el acompañamiento de la exposición oral.',
      {
        subtitulo: 'El recorrido',
        texto:
          'Cada tema se presenta como una guía de nueve pasos: Introducción, Teoría, ' +
          'Material de lectura, Video educativo, Banco de imágenes, Actividades ' +
          'interactivas, Más información, Autoevaluación y Cierre. La barra superior ' +
          'indica en todo momento el paso en el que se encuentra el lector, permite ' +
          'guardar la posición de lectura para continuar más tarde y recuerda la ' +
          'preferencia entre el modo claro y el modo oscuro.',
      },
      {
        subtitulo: 'Las actividades',
        texto:
          'La parte práctica está formada por veinte actividades interactivas, diez ' +
          'por cada tema, programadas manualmente en JavaScript. Entre ellas se ' +
          'incluyen cuestionarios de opción múltiple, ejercicios de verdadero o ' +
          'falso, la ordenación de los pasos de un análisis, juegos de memoria, ' +
          'clasificación de conceptos, definiciones para completar, adivinanzas de ' +
          'términos, emparejamiento de conceptos, cálculos de aplicación rápida y el ' +
          'balanceo de ecuaciones químicas. Las actividades se abren sobre la misma ' +
          'página y funcionan tanto en teléfonos celulares como en computadoras.',
      },
      {
        subtitulo: 'Cómo está hecho',
        texto:
          'El sitio está construido manualmente con HTML, CSS y JavaScript puro, sin ' +
          'frameworks ni librerías externas. Las tipografías utilizadas (Playfair ' +
          'Display e Inter) se incluyen dentro del proyecto junto con sus licencias, ' +
          'de manera que el diseño se mantiene idéntico con o sin conexión a ' +
          'internet. Solo el video educativo y el material de lectura externo ' +
          'requieren acceso a la red.',
      },
      {
        subtitulo: 'Publicación',
        texto:
          'El código fuente del proyecto se encuentra en un repositorio de GitHub y ' +
          'el sitio está publicado como página web mediante GitHub Pages. De esta ' +
          'forma se accede mediante un enlace desde cualquier teléfono celular o ' +
          'computadora, sin necesidad de instalar programas adicionales.',
      },
    ],
  },

  /* ----------------------------- Temas ------------------------------- */
  temas: {

    /* ============================ CINEMÁTICA ========================= */
    cinematica: {
      id: 'cinematica',
      numero: '01',
      titulo: 'Cinemática',
      bajada: 'Descripción del movimiento: posición, velocidad y aceleración en función del tiempo.',

      /* 1. Introducción */
      introduccion:
        '¿Dónde se encuentra un cuerpo en cada instante? ¿Con qué rapidez se desplaza? ¿Cómo ' +
        'varía su velocidad a lo largo del tiempo? La cinemática es la rama de la mecánica que ' +
        'responde estas preguntas, ya que se ocupa de describir el movimiento en función del ' +
        'tiempo sin analizar las causas que lo originan, es decir, sin considerar las fuerzas ' +
        'que lo producen. Constituye el primer gran paso en el estudio físico del movimiento y ' +
        'la base conceptual sobre la que se apoyan el resto de la mecánica y buena parte de la ' +
        'física clásica. En este trabajo se presentan sus conceptos fundamentales, los tipos de ' +
        'movimiento rectilíneo más importantes y las herramientas gráficas que permiten ' +
        'interpretarlos.',

      /* 2. Contenido teórico (3 a 6 bloques) */
      teoria: [
        {
          subtitulo: 'Qué estudia la cinemática',
          texto:
            'La cinemática es la rama de la mecánica que describe cómo se mueven los cuerpos a ' +
            'lo largo del tiempo, sin ocuparse de las fuerzas que provocan dicho movimiento, ' +
            'cuyo análisis corresponde a la dinámica. Para llevar a cabo esa descripción se ' +
            'apoya en tres elementos fundamentales: la posición, que indica el lugar donde se ' +
            'encuentra el cuerpo en cada instante; la trayectoria, que es la línea que dibuja ' +
            'el conjunto de posiciones sucesivas de su recorrido; y un sistema de referencia ' +
            'desde el cual se miden todas las magnitudes, ya que el movimiento siempre se ' +
            'define respecto de un observador.',
        },
        {
          subtitulo: 'Distancia recorrida y desplazamiento',
          texto:
            'La distancia recorrida es una magnitud escalar que mide la totalidad del camino ' +
            'efectivamente avanzado sobre la trayectoria, cualquiera sea su dirección. El ' +
            'desplazamiento, en cambio, es una magnitud vectorial que une el punto inicial con ' +
            'el punto final del movimiento. Un ejemplo sencillo permite apreciar la ' +
            'diferencia: un automóvil que completa una vuelta entera a una manzana recorre una ' +
            'distancia considerable, pero su desplazamiento es nulo porque termina exactamente ' +
            'donde comenzó. Sobre esta distinción se apoyan dos conceptos relacionados: la ' +
            'rapidez, que es escalar, y la velocidad media, que es vectorial y se calcula de ' +
            'la siguiente manera:',
          formula: 'v = Δx / Δt',
        },
        {
          subtitulo: 'Aceleración media',
          texto:
            'La aceleración media indica qué tan rápido cambia la velocidad de un cuerpo con ' +
            'el paso del tiempo. Si un automóvil pasa de 0 a 100 km/h, el dato relevante no es ' +
            'solo el cambio de velocidad, sino el tiempo que emplea en lograrlo: cuanto menor ' +
            'es ese intervalo, mayor es la aceleración. Se trata, por lo tanto, de una ' +
            'magnitud que relaciona la variación de la velocidad con el tiempo empleado en ' +
            'producirla. Su unidad en el Sistema Internacional es el metro por segundo al ' +
            'cuadrado (m/s²) y se calcula del siguiente modo:',
          formula: 'a = Δv / Δt',
        },
        {
          subtitulo: 'MRU: movimiento rectilíneo uniforme',
          texto:
            'En el movimiento rectilíneo uniforme la velocidad permanece constante y la ' +
            'aceleración es nula. El móvil recorre, en consecuencia, distancias iguales en ' +
            'tiempos iguales, sobre una trayectoria recta y en un mismo sentido. Se trata del ' +
            'movimiento más simple de describir y sirve como punto de partida para el estudio ' +
            'de los movimientos más complejos. La posición del móvil en cada instante se ' +
            'obtiene con la siguiente ecuación:',
          formula: 'x = x<sub>0</sub> + v · t',
        },
        {
          subtitulo: 'MRUA: movimiento rectilíneo uniformemente acelerado',
          texto:
            'En el movimiento rectilíneo uniformemente acelerado la aceleración permanece ' +
            'constante, de modo que la velocidad varía en cantidades iguales en intervalos de ' +
            'tiempo iguales. Este tipo de movimiento también recibe el nombre de MRUV ' +
            '(rectilíneo uniformemente variado). Corresponde, por ejemplo, al movimiento de ' +
            'un cuerpo que acelera o frena de manera regular sobre una recta. Sus dos ' +
            'ecuaciones principales son las siguientes:',
          formula: [
            'v = v<sub>0</sub> + a · t',
            'x = x<sub>0</sub> + v<sub>0</sub> · t + ½ · a · t<sup>2</sup>',
          ],
        },
        {
          subtitulo: 'Caída libre y lectura de gráficas',
          texto:
            'Cuando se desprecia la resistencia del aire, todos los cuerpos situados cerca de ' +
            'la superficie terrestre caen con la misma aceleración, g ≈ 9,8 m/s², dirigida ' +
            'hacia abajo, independientemente de su masa. Por esta razón, la caída libre se ' +
            'considera un caso particular del movimiento rectilíneo uniformemente acelerado. ' +
            'En lo que respecta a las gráficas, conviene recordar dos reglas de lectura ' +
            'fundamentales: en una gráfica posición contra tiempo, la pendiente representa la ' +
            'velocidad; y en una gráfica velocidad contra tiempo, la pendiente representa la ' +
            'aceleración, mientras que el área bajo la curva corresponde al desplazamiento ' +
            'realizado. Para la velocidad en la caída libre se utiliza:',
          formula: 'v = v<sub>0</sub> + g · t',
        },
      ],

      /* 3. Material de lectura (Genially). El enlace se abre en pestaña
         nueva. */
      materialLectura: {
        descripcion:
          'Material de lectura interactivo sobre Cinemática elaborado en Genially. Se trata ' +
          'de una guía visual que acompaña el desarrollo teórico de esta página y que puede ' +
          'consultarse tanto desde un teléfono celular como desde una computadora.',
        // Enlace del Genially de Cinemática.
        enlace: 'https://view.genially.com/6ad1102d9eaf812283d6e55c',
      },

      /* 4. Video educativo: ID + ficha técnica + nota de producción.
         «La Cinemática - TIC II» es creación propia del equipo (canal de
         Samuel Ferreira Sanabria). */
      idVideoYouTube: 'QELxlPYPYEI',
      fichaVideo: {
        titulo: 'La Cinemática - TIC II',
        canal: 'Samuel Ferreira Sanabria',
        plataforma: 'YouTube (se abre en una pestaña nueva)',
        duracion: '2:00',
      },
      /* Nota de producción del video (Paso 04). El prompt COMPLETO y ordenado
         vive en el documento aparte «prompt-video.html»; aquí solo va un
         resumen de una línea + un botón que abre ese documento. */
      notaVideo:
        'Flujo de trabajo en tres etapas para la producción de un video educativo de ' +
        'aproximadamente dos minutos: generación de un HTML autocontenido, creación de la ' +
        'narración con ElevenLabs y exportación final en formato MP4, con un diseño ' +
        'monocromático, composición centrada y escalado fluido basado en unidades cqw.',
      paginaPromptVideo: 'prompt-video.html',

      /* 5. Banco de imágenes: 5 por tema, con título, descripción y crédito.
         Se muestran en una galería acordeón (AccordionGallery): las entradas
         con «archivo» son los paneles del acordeón y todas llevan su leyenda
         debajo. El campo «archivo» sigue siendo opcional: si falta en todas,
         se muestra la rejilla de marcos pendientes. */
      bancoImagenes: [
        { archivo: 'img/banco/cine-01-desplazamiento.png',
          titulo: 'Desplazamiento y trayectoria',
          descripcion: 'Diferencia entre la trayectoria recorrida y el desplazamiento neto.',
          credito: 'Vector de posición y trayectoria en un plano. Recreación propia (referencia: Wikimedia Commons).' },
        { archivo: 'img/banco/cine-02-xt-mru.png',
          titulo: 'Gráfica x–t en MRU',
          descripcion: 'Posición contra tiempo en el MRU: recta de pendiente constante.',
          credito: 'Gráfica posición contra tiempo (x-t) en MRU. Recreación propia (referencia: Física Lab).' },
        { archivo: 'img/banco/cine-03-vt-mrua.png',
          titulo: 'Gráfica v–t en MRUA',
          descripcion: 'Velocidad contra tiempo en el MRUA: crecimiento proporcional al tiempo.',
          credito: 'Gráfica velocidad contra tiempo (v-t) en MRUA. Recreación propia (referencia: Khan Academy).' },
        { archivo: 'img/banco/cine-04-tiro-parabolico.png',
          titulo: 'Tiro parabólico',
          descripcion: 'Un MRU horizontal combinado con una caída libre vertical.',
          credito: 'Tiro parabólico como composición de movimientos. Recreación propia (referencia: Encyclopaedia Britannica).' },
        { archivo: 'img/banco/cine-05-espaciado-puntos.png',
          titulo: 'Espaciado de puntos en el movimiento',
          descripcion: 'Puntos equidistantes frente a puntos cada vez más separados.',
          credito: 'Diagrama de movimiento (ticker-timer y estroboscopía). Recreación propia (referencia: HyperPhysics, Georgia State University).' },
      ],
      masInformacion:
        'El desarrollo de esta página aborda el movimiento rectilíneo desde sus conceptos ' +
        'fundamentales hasta los casos de mayor aplicación práctica: el movimiento rectilíneo ' +
        'uniforme, el movimiento rectilíneo uniformemente acelerado y la caída libre, junto con ' +
        'la interpretación de gráficas de posición y de velocidad. El material de lectura y el ' +
        'video educativo de este panel desarrollan cada idea con ejemplos resueltos paso a paso, ' +
        'y las diez actividades interactivas constituyen una herramienta de repaso previo a la ' +
        'exposición.',

      recursosComplementarios: {
        nota:
          'Los recursos complementarios de carácter interactivo están cubiertos por las diez ' +
          'actividades de este panel. Como material complementario de lectura se ofrecen a ' +
          'continuación documentos académicos de la web: cada botón abre el sitio para su ' +
          'visualización o descarga, y debajo figura la referencia citada según las normas ' +
          'APA, séptima edición:',
        referencias: [
          'Torroba, P. L., Devece, E., Trípoli, M. de las M. y Aquilano, L. (2016). Cinemática y el análisis de una función: una propuesta didáctica para su articulación en el contexto de una facultad de ingeniería. SEDICI, Universidad Nacional de La Plata. http://sedici.unlp.edu.ar/handle/10915/78874',
          'Díaz-Solórzano, S. y González-Díaz, L. (2010). Reflexiones sobre los conceptos velocidad y rapidez de una partícula en física. Revista Mexicana de Física E, 56(2). http://www.scielo.org.mx/scielo.php?script=sci_arttext&pid=S1870-35422010000200005',
        ],
      },

      /* 6. Juegos: diez actividades, una por categoría (cada tarjeta lleva
         a su propia página). */
      juegos: [
        {
          nombre: 'Rapidez conceptual',
          descripcion: 'Cuestionario de opción múltiple sobre los conceptos fundamentales del movimiento.',
          archivo: 'juegos/cinematica-01-rapidez-conceptual.html',
        },
        {
          nombre: '¿Verdadero o falso?',
          descripcion: 'Evaluación de afirmaciones sobre cinemática, para identificar cuáles son correctas y cuáles no.',
          archivo: 'juegos/cinematica-02-verdadero-o-falso.html',
        },
        {
          nombre: 'Ordena el análisis',
          descripcion: 'Ordenación de los pasos que se siguen para resolver un problema de cinemática.',
          archivo: 'juegos/cinematica-03-ordena-el-analisis.html',
        },
        {
          nombre: 'Memoria de magnitudes',
          descripcion: 'Juego de memoria para asociar magnitudes con sus unidades y fórmulas correspondientes.',
          archivo: 'juegos/cinematica-04-memoria-de-magnitudes.html',
        },
        {
          nombre: 'Desafío de gráficas',
          descripcion: 'Interpretación de gráficas de movimiento y de la información que cada una proporciona.',
          archivo: 'juegos/cinematica-05-desafio-de-graficas.html',
        },
        {
          nombre: 'Completa la definición',
          descripcion: 'Selección de la palabra que falta en cada definición propia de la cinemática.',
          archivo: 'juegos/cinematica-06-completa-la-definicion.html',
        },
        {
          nombre: 'Clasifica el movimiento',
          descripcion: 'Clasificación de situaciones cotidianas según correspondan a MRU, MRUA o caída libre.',
          archivo: 'juegos/cinematica-07-clasifica-el-movimiento.html',
        },
        {
          nombre: 'Cálculos al instante',
          descripcion: 'Cálculos de aplicación rápida de velocidad, distancia y aceleración mediante las fórmulas del panel.',
          archivo: 'juegos/cinematica-08-calculos-al-instante.html',
        },
        {
          nombre: 'Adivina el término',
          descripcion: 'Deducción progresiva de términos de la cinemática, letra por letra y con pistas de apoyo.',
          archivo: 'juegos/cinematica-09-adivina-el-termino.html',
        },
        {
          nombre: 'Empareja los conceptos',
          descripcion: 'Asociación de cada concepto de la cinemática con la característica que lo define.',
          archivo: 'juegos/cinematica-10-empareja-conceptos.html',
        },
      ],

      /* 8. Autoevaluación: descripción breve + botón de Google Forms.
         A pedido, no se listan las preguntas en la página: el cuestionario
         se descubre al abrirlo. */
      autoevaluacion: {
        descripcion:
          'Este apartado está destinado a la autoevaluación, donde se invita a ' +
          'reflexionar de manera honesta y personal sobre el propio desempeño, los ' +
          'aprendizajes alcanzados y los aspectos que aún podrían fortalecerse a lo ' +
          'largo del proceso.',
        enlaceForms: 'https://docs.google.com/forms/d/e/1FAIpQLSdVMxSUd7x3L7-HrcZJZGpoyEwY24JEDB2PaMg-kpStLkc0Aw/viewform?usp=publish-editor',
      },

      /* 9. Cierre */
      cierre: {
        titulo: '¡Muchas gracias!',
        texto:
          'Agradecemos a nuestra docente el acompañamiento constante durante el ' +
          'desarrollo de nuestra página web y a nuestros compañeros la atención y ' +
          'las preguntas realizadas. Esperamos que esta página contribuya al repaso ' +
          'claro y ordenado de los dos temas del trabajo práctico.',
      },
    },

    /* =========================== ESTEQUIOMETRÍA ======================= */
    estequiometria: {
      id: 'estequiometria',
      numero: '02',
      titulo: 'Estequiometría',
      bajada: 'Las cantidades de una reacción química: moles, masas y volúmenes en proporción definida.',

      /* 1. Introducción */
      introduccion:
        'Si conocemos la cantidad de reactivo disponible, ¿qué cantidad de producto podemos ' +
        'obtener? La estequiometría es la rama de la química que estudia las relaciones ' +
        'cuantitativas de masa y volumen entre las sustancias que participan en una reacción ' +
        'química. Su herramienta central es la ecuación química balanceada y su unidad de trabajo ' +
        'fundamental es el mol. A partir de estos dos elementos es posible pasar de la ' +
        'descripción cualitativa de una reacción a los cálculos concretos, es decir, a predecir ' +
        'cuánto reactivo se consume y cuánto producto se obtiene. En este trabajo se presentan ' +
        'los conceptos de mol, masa molar y volumen molar, y se aplica el cálculo estequiométrico ' +
        'al análisis del reactivo limitante y del rendimiento de una reacción.',

      /* 2. Contenido teórico (3 a 6 bloques) */
      teoria: [
        {
          subtitulo: 'Qué estudia la estequiometría',
          texto:
            'La estequiometría es la rama de la química que estudia las relaciones cuantitativas ' +
            'de masa y volumen entre reactivos y productos de una reacción: permite determinar ' +
            'cuánto reactivo se necesita y cuánto producto se puede obtener. El término ' +
            'proviene del griego stoikheion, que significa elemento, y metron, que significa ' +
            'medida. Su punto de partida es siempre la ecuación química balanceada, ya que sin ' +
            'ella no es posible establecer proporción alguna entre las sustancias ' +
            'intervenientes.',
        },
        {
          subtitulo: 'El mol y el número de Avogadro',
          texto:
            'El mol es la unidad de cantidad de sustancia del Sistema Internacional. Un mol ' +
            'contiene tantas entidades elementales (átomos, moléculas o iones) como átomos hay ' +
            'en 12 gramos de carbono 12, cantidad conocida como número de Avogadro. Así como ' +
            'una docena equivale a doce unidades, un mol equivale a 6,022 × 10²³ entidades. ' +
            'Esta unidad permite contar partículas infinitamente pequeñas a partir de masas ' +
            'medibles en el laboratorio. La relación entre el número de partículas y la ' +
            'cantidad de sustancia se expresa así:',
          formula: 'n = N / N<sub>A</sub>',
        },
        {
          subtitulo: 'Masa molar',
          texto:
            'La masa molar es la masa de un mol de sustancia y se expresa en gramos por mol ' +
            '(g/mol). Coincide numéricamente con la masa atómica o molecular relativa de la ' +
            'sustancia. Por ejemplo, la masa molar del agua (H₂O) se obtiene sumando las ' +
            'masas de sus átomos: 2 × 1 u + 16 u, lo que da aproximadamente 18 g/mol. La masa ' +
            'molar es la herramienta que permite convertir una masa medida en gramos a una ' +
            'cantidad de sustancia en moles, y viceversa:',
          formula: 'n = m / M',
        },
        {
          subtitulo: 'La ecuación química balanceada',
          texto:
            'Los coeficientes de una ecuación química balanceada indican la proporción en moles ' +
            'en la que reaccionan los reactivos y se forman los productos. En la reacción ' +
            '2 H₂ + O₂ → 2 H₂O, por cada 2 moles de hidrógeno que reaccionan con 1 mol de ' +
            'oxígeno se forman 2 moles de agua. Estas proporciones no son arbitrarias: ' +
            'responden a la ley de conservación de la masa, enunciada por Lavoisier, según la ' +
            'cual la materia no se crea ni se destruye en una reacción química, y a la ley de ' +
            'las proporciones definidas de Proust.',
        },
        {
          subtitulo: 'Reactivo limitante y rendimiento',
          texto:
            'El reactivo limitante es aquel que se consume por completo en primer lugar y que, ' +
            'por lo tanto, determina la cantidad máxima de producto que puede formarse; el ' +
            'reactivo que queda sin consumirse se denomina reactivo en exceso. En la práctica ' +
            'experimental, la cantidad de producto obtenida suele ser menor que la cantidad ' +
            'teórica calculada, debido a pérdidas, reacciones secundarias o condiciones ' +
            'imperfectas. El rendimiento porcentual compara ambas cantidades del siguiente ' +
            'modo:',
          formula: 'rendimiento (%) = (m<sub>real</sub> / m<sub>teórica</sub>) · 100',
        },
        {
          subtitulo: 'Volumen molar de los gases',
          texto:
            'En condiciones normales de presión y temperatura (0 °C y 1 atm), un mol de ' +
            'cualquier gas ocupa aproximadamente el mismo volumen, equivalente a 22,4 litros. ' +
            'Esta regularidad, conocida como volumen molar, incorpora las conversiones de ' +
            'volumen a los cálculos estequiométricos y resulta de especial utilidad cuando las ' +
            'sustancias intervenientes se encuentran en estado gaseoso:',
          formula: 'V = n · 22,4 L/mol (en CNPT)',
        },
      ],

      /* 3. Material de lectura (Canva) */
      materialLectura: {
        descripcion:
          'Material de lectura interactivo sobre Estequiometría elaborado en Canva. ' +
          'Constituye la guía visual del tema y acompaña el desarrollo teórico y los cálculos ' +
          'presentados en esta página.',
        // Enlace del material de lectura de Estequiometría.
        enlace: 'https://canva.link/tey5ycjk3ldnpe6',
      },

      /* 4. Video educativo: creación propia del equipo (canal sai_darcy). */
      idVideoYouTube: 'o3w05MX95eg',
      fichaVideo: {
        titulo: 'La Estequiometría',
        canal: 'sai_darcy',
        plataforma: 'YouTube (se abre en una pestaña nueva)',
        duracion: '1:49',
      },

      /* 5. Banco de imágenes: 5 por tema, con título, descripción y crédito.
         Se muestran en una galería acordeón (AccordionGallery): las entradas
         con «archivo» son los paneles del acordeón y todas llevan su leyenda
         debajo. El campo «archivo» sigue siendo opcional: si falta en todas,
         se muestra la rejilla de marcos pendientes. */
      bancoImagenes: [
        { archivo: 'img/banco/est-01-conservacion.png',
          titulo: 'Conservación de la materia',
          descripcion: 'Los átomos se conservan antes y después de la reacción.',
          credito: 'Balanceo de ecuaciones químicas a nivel molecular. Recreación propia (referencia: Chem LibreTexts).' },
        { archivo: 'img/banco/est-02-mol-avogadro.png',
          titulo: 'El mol y el número de Avogadro',
          descripcion: 'La relación entre moles, moléculas y gramos.',
          credito: 'El concepto de mol y el número de Avogadro. Recreación propia (referencia: Compound Interest).' },
        { archivo: 'img/banco/est-03-reactivo-limitante.png',
          titulo: 'Reactivo limitante y en exceso',
          descripcion: 'El reactivo limitante se consume por completo; el otro queda en exceso.',
          credito: 'Reactivo limitante y reactivo en exceso. Recreación propia (referencia: Khan Academy).' },
        { archivo: 'img/banco/est-04-mapa-conversiones.png',
          titulo: 'Mapa de conversiones molares',
          descripcion: 'La ruta de conversión entre masa, moles y producto.',
          credito: 'Relaciones molares estequiométricas (mapa de conversiones). Recreación propia (referencia: ScienceNotes).' },
        { archivo: 'img/banco/est-05-titulacion.png',
          titulo: 'Montaje de titulación ácido-base',
          descripcion: 'Bureta, matraz e indicador para una titulación ácido-base.',
          credito: 'Montaje experimental de titulación ácido-base. Recreación propia (referencia: Wikimedia Commons).' },
      ],

      /* 7. Más información + recursos complementarios en APA */
      masInformacion:
        'El recorrido de esta página abarca desde el concepto de mol hasta los cálculos con ' +
        'ecuaciones químicas balanceadas, e incluye el análisis del reactivo limitante y el ' +
        'cálculo del rendimiento de una reacción. El material de lectura y el video educativo ' +
        'presentan ejemplos resueltos que ilustran cada procedimiento, y las diez actividades ' +
        'interactivas permiten practicar las conversiones entre masa, moles y partículas hasta ' +
        'adquirir dominio del método estequiométrico.',

      recursosComplementarios: {
        nota:
          'Los recursos complementarios de carácter interactivo están cubiertos por las diez ' +
          'actividades de este panel. Como material complementario de lectura se ofrecen a ' +
          'continuación documentos académicos de la web: cada botón abre el sitio para su ' +
          'visualización o descarga, y debajo figura la referencia citada según las normas ' +
          'APA, séptima edición:',
        referencias: [
          'Raviolo, A. y Lerzo, G. (2016). Enseñanza de la estequiometría: uso de analogías y comprensión conceptual. Educación Química, 27, 195-204. https://www.scielo.org.mx/scielo.php?script=sci_arttext&pid=S0187-893X2016000300195',
          'García García, J. L. (2020). El álgebra de la estequiometría. Educación Química, 31(1), 138-150. https://doi.org/10.22201/fq.18708404e.2020.1.70021',
        ],
      },

      /* 6. Juegos: diez actividades, una por categoría. */
      juegos: [
        {
          nombre: 'Conceptos en juego',
          descripcion: 'Cuestionario de opción múltiple sobre el mol, la masa molar y los coeficientes estequiométricos.',
          archivo: 'juegos/estequiometria-01-conceptos-en-juego.html',
        },
        {
          nombre: '¿Verdadero o falso?',
          descripcion: 'Evaluación de afirmaciones sobre moles, reacciones químicas y rendimiento.',
          archivo: 'juegos/estequiometria-02-verdadero-o-falso.html',
        },
        {
          nombre: 'Ordena la resolución',
          descripcion: 'Ordenación de los pasos que se siguen en un cálculo estequiométrico completo.',
          archivo: 'juegos/estequiometria-03-ordena-la-resolucion.html',
        },
        {
          nombre: 'Memoria estequiométrica',
          descripcion: 'Juego de memoria para asociar cada término de la estequiometría con su definición.',
          archivo: 'juegos/estequiometria-04-memoria-estequiometrica.html',
        },
        {
          nombre: 'Convierte con el mol',
          descripcion: 'Cálculos de aplicación rápida entre masa, cantidad de sustancia y número de partículas.',
          archivo: 'juegos/estequiometria-05-convierte-con-el-mol.html',
        },
        {
          nombre: 'Completa el concepto',
          descripcion: 'Selección de la palabra que falta en cada definición propia de la estequiometría.',
          archivo: 'juegos/estequiometria-06-completa-el-concepto.html',
        },
        {
          nombre: 'Clasifica la sustancia',
          descripcion: 'Clasificación de sustancias cotidianas como elementos, compuestos o mezclas.',
          archivo: 'juegos/estequiometria-07-clasifica-la-sustancia.html',
        },
        {
          nombre: 'Adivina el término',
          descripcion: 'Deducción progresiva de términos de la estequiometría, letra por letra y con pistas de apoyo.',
          archivo: 'juegos/estequiometria-08-adivina-el-termino.html',
        },
        {
          nombre: 'Empareja los conceptos',
          descripcion: 'Asociación de cada concepto de la estequiometría con la definición que le corresponde.',
          archivo: 'juegos/estequiometria-09-empareja-conceptos.html',
        },
        {
          nombre: 'Balancea la ecuación',
          descripcion: 'Selección de los coeficientes que balancean correctamente cada ecuación química propuesta.',
          archivo: 'juegos/estequiometria-10-balancea-la-ecuacion.html',
        },
      ],

      /* 8. Autoevaluación: descripción breve + botón de Google Forms.
         A pedido, no se listan las preguntas en la página: el cuestionario
         se descubre al abrirlo. */
      autoevaluacion: {
        descripcion:
          'Este apartado está destinado a la autoevaluación, donde se invita a ' +
          'reflexionar de manera honesta y personal sobre el propio desempeño, los ' +
          'aprendizajes alcanzados y los aspectos que aún podrían fortalecerse a lo ' +
          'largo del proceso.',
        enlaceForms: 'https://docs.google.com/forms/d/e/1FAIpQLSdUMVBjcBEatp9f9f0BSpfnYoOTupDilf34-rwQyl4Vuq6Tkg/viewform?usp=publish-editor',
      },

      /* 9. Cierre */
      cierre: {
        titulo: '¡Muchas gracias!',
        texto:
          'Agradecemos a nuestra docente el acompañamiento constante durante el ' +
          'desarrollo de nuestra página web y a nuestros compañeros la atención y ' +
          'las preguntas realizadas. Esperamos que esta página contribuya al repaso ' +
          'claro y ordenado de los dos temas del trabajo práctico.',
      },
    },
  },
};
