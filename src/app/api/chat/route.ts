import { NextResponse } from "next/server";

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(text: string): string[] {
  const STOPWORDS = new Set([
    "que", "como", "cuando", "donde", "quien", "cual", "hay", "hay",
    "una", "uno", "unos", "unas", "los", "las", "del", "por", "para",
    "con", "sin", "mas", "pero", "puedo", "puede", "quiero", "necesito",
    "tengo", "tiene", "esto", "esta", "eso", "esa", "ese", "muy", "bien",
    "mal", "algo", "algun", "alguna", "nada", "todo", "toda", "han", "has",
  ]);
  return normalize(text)
    .split(" ")
    .filter((t) => t.length > 2 && !STOPWORDS.has(t));
}

interface KnowledgeEntry {
  id: string;
  weight: number;
  phrases: string[];
  keywords: string[];
  reply: string;
}

const KNOWLEDGE: KnowledgeEntry[] = [

  {
    id: "saludo",
    weight: 6,
    phrases: ["hola", "buenos dias", "buenas tardes", "buenas noches", "hey", "que tal", "como estas", "buenas"],
    keywords: ["hola", "buenos", "buenas", "saludos", "hey"],
    reply: "¡Hola! Bienvenido al soporte de CotizaApp 👋\nEstoy aquí para ayudarte con cualquier duda sobre la app.\n¿En qué puedo ayudarte hoy?",
  },
  {
    id: "gracias",
    weight: 6,
    phrases: ["gracias", "muchas gracias", "te lo agradezco", "perfecto gracias", "ok gracias", "listo gracias"],
    keywords: ["gracias", "agradezco", "genial", "perfecto", "excelente"],
    reply: "¡Con mucho gusto! 😊\nSi tienes otra duda, no dudes en preguntar. Estoy aquí para ayudarte.",
  },

  {
    id: "crear-cotizacion",
    weight: 10,
    phrases: ["crear cotizacion", "nueva cotizacion", "hacer cotizacion", "como creo", "como hago una cotizacion", "iniciar cotizacion", "generar cotizacion"],
    keywords: ["crear", "nueva", "cotizacion", "cotizar", "iniciar", "hacer", "generar", "empezar"],
    reply: "Para crear una cotización:\n1. Desde el panel principal clic en '+ Nueva Cotización'\n2. Llena los datos del cliente\n3. Agrega productos o servicios\n4. Elige una plantilla\n5. Guarda o envía directamente\n\nEl proceso toma menos de 2 minutos. ¿Necesitas ayuda con algún paso específico?",
  },
  {
    id: "enviar-cotizacion",
    weight: 10,
    phrases: ["enviar cotizacion", "mandar cotizacion", "enviar al cliente", "como envio", "como mando", "compartir cotizacion", "reenviar cotizacion"],
    keywords: ["enviar", "mandar", "correo", "email", "cliente", "compartir", "envio"],
    reply: "Para enviar una cotización al cliente:\n1. Abre la cotización\n2. Clic en el botón 'Enviar' (ícono de sobre)\n3. Ingresa el correo del cliente\n4. Personaliza el mensaje si deseas\n5. Clic en 'Confirmar envío'\n\nEl cliente recibirá un PDF con un enlace para aceptar o rechazar la cotización.",
  },
  {
    id: "eliminar-cotizacion",
    weight: 8,
    phrases: ["eliminar cotizacion", "borrar cotizacion", "quitar cotizacion", "eliminar una cotizacion"],
    keywords: ["eliminar", "borrar", "quitar", "suprimir", "borrado"],
    reply: "Para eliminar una cotización:\n1. Ve a 'Mis Cotizaciones'\n2. Pasa el cursor sobre la cotización\n3. Clic en el ícono de papelera\n4. Confirma la acción\n\n⚠️ Las cotizaciones eliminadas no se pueden recuperar.\nSi solo quieres ocultarla temporalmente, usa la opción 'Archivar'.",
  },
  {
    id: "duplicar-cotizacion",
    weight: 7,
    phrases: ["duplicar cotizacion", "copiar cotizacion", "clonar cotizacion", "hacer copia"],
    keywords: ["duplicar", "copiar", "clonar", "copia"],
    reply: "Para duplicar una cotización:\n1. Ve a 'Mis Cotizaciones'\n2. Clic en los tres puntos (...) de la cotización\n3. Selecciona 'Duplicar'\n\nSe creará una copia exacta que puedes editar libremente sin afectar la original.",
  },

  {
    id: "agregar-producto",
    weight: 8,
    phrases: ["agregar producto", "anadir producto", "insertar producto", "nuevo producto", "agregar servicio", "anadir servicio"],
    keywords: ["agregar", "anadir", "insertar", "producto", "servicio", "articulo", "item"],
    reply: "Para agregar un producto o servicio:\n1. Dentro de la cotización clic en '+ Agregar producto'\n2. Busca por nombre o código\n3. Selecciona y ajusta la cantidad y precio\n\nSi el producto no está en tu catálogo, puedes escribirlo manualmente en el campo de nombre.",
  },
  {
    id: "cambiar-precio",
    weight: 9,
    phrases: ["cambiar precio", "modificar precio", "actualizar precio", "editar precio", "cambiar el costo"],
    keywords: ["precio", "costo", "tarifa", "monto", "valor", "importe", "cobrar"],
    reply: "Para cambiar el precio de un producto:\n1. Abre la cotización\n2. Clic directamente sobre el campo de precio del producto\n3. Edita el valor\n\nEl subtotal y total se recalculan automáticamente.\n💡 Si el campo está bloqueado, el producto viene de un catálogo con precios fijos — edítalo desde 'Mi Catálogo'.",
  },
  {
    id: "descuento",
    weight: 7,
    phrases: ["agregar descuento", "aplicar descuento", "dar descuento", "poner descuento", "como descuento", "quiero dar descuento"],
    keywords: ["descuento", "rebaja", "promocion", "oferta", "porcentaje", "reducir precio"],
    reply: "Para aplicar descuentos:\n• Por producto: en cada línea hay un campo '%Desc', ingresa el porcentaje ahí\n• Descuento global: al final de la tabla busca 'Descuento total'\n\nLos totales se actualizan automáticamente al ingresar el descuento.",
  },
  {
    id: "impuesto",
    weight: 7,
    phrases: ["agregar impuesto", "configurar iva", "agregar iva", "como pongo impuesto", "impuesto en cotizacion"],
    keywords: ["iva", "impuesto", "tax", "fiscal", "gravado", "exento", "isr"],
    reply: "Para configurar impuestos:\n1. Ve a 'Configuración' → 'Impuestos'\n2. Define tu tasa (ej. IVA 16%)\n3. Al crear cotizaciones puedes activar/desactivar el impuesto por producto o de forma global al final del documento.",
  },

  {
    id: "elegir-plantilla",
    weight: 9,
    phrases: ["elegir plantilla", "seleccionar plantilla", "cambiar plantilla", "que plantilla uso", "como selecciono plantilla"],
    keywords: ["plantilla", "template", "formato", "estilo", "diseno", "elegir", "seleccionar"],
    reply: "Para elegir una plantilla:\n1. Al crear o editar una cotización, busca 'Diseño' en la barra lateral\n2. Selecciona la plantilla que prefieras\n3. Puedes previsualizar cada una antes de aplicarla\n\n💡 Los cambios de plantilla no afectan cotizaciones ya enviadas.",
  },
  {
    id: "editar-plantilla",
    weight: 10,
    phrases: ["no puedo editar", "no me deja editar", "no edita", "no puedo modificar plantilla", "editar plantilla"],
    keywords: ["editar", "plantilla", "modificar", "edicion"],
    reply: "Para editar una plantilla:\n1. Ve a 'Mis Plantillas'\n2. Selecciona la plantilla\n3. Clic en 'Editar'\n\n⚠️ Si el botón está desactivado, puede ser que:\n• No tienes permisos de administrador\n• La plantilla es una predeterminada del sistema (solo puedes duplicarla y editar la copia)",
  },
  {
    id: "personalizar",
    weight: 8,
    phrases: ["personalizar app", "personalizar aplicacion", "cambiar apariencia", "cambiar colores", "como personalizo"],
    keywords: ["personalizar", "apariencia", "tema", "colores", "branding", "identidad"],
    reply: "Para personalizar CotizaApp con tu marca:\n1. Ve a 'Configuración' → 'Mi Empresa'\n2. Sube tu logo\n3. Define tus colores corporativos\n4. Completa los datos de tu empresa\n\nEstos cambios se reflejarán automáticamente en todas tus cotizaciones.",
  },

  {
    id: "pdf",
    weight: 8,
    phrases: ["descargar pdf", "exportar pdf", "generar pdf", "ver pdf", "donde veo el pdf", "donde esta el pdf", "obtener pdf"],
    keywords: ["pdf", "descargar", "exportar", "imprimir", "documento", "archivo"],
    reply: "Para descargar el PDF:\n1. Abre la cotización\n2. Clic en 'Descargar PDF' o en el ícono de descarga ↓\n\nEl PDF incluye tu logo, datos del cliente, productos, descuentos y totales.\n💡 También puedes imprimirlo directamente desde el navegador con Ctrl+P.",
  },

  {
    id: "logo",
    weight: 7,
    phrases: ["cambiar logo", "subir logo", "agregar logo", "mi logo no aparece", "logo empresa"],
    keywords: ["logo", "imagen", "marca", "empresa", "subir", "logotipo"],
    reply: "Para subir o cambiar tu logo:\n1. Ve a 'Configuración' → 'Mi Empresa'\n2. En la sección 'Logo' clic en 'Subir imagen'\n3. Selecciona tu archivo\n\n📌 Formatos aceptados: PNG o JPG\n📌 Tamaño máximo: 2MB\n📌 Recomendado: fondo transparente (PNG)",
  },

  {
    id: "moneda",
    weight: 7,
    phrases: ["cambiar moneda", "otra moneda", "en dolares", "en pesos", "moneda diferente", "usar dolares"],
    keywords: ["moneda", "divisa", "dolar", "peso", "euro", "usd", "mxn", "currency"],
    reply: "Para cambiar la moneda:\n• En una cotización específica: busca el campo 'Moneda' en la configuración de esa cotización\n• Como moneda predeterminada: 'Configuración' → 'Preferencias' → 'Moneda por defecto'\n\nCotizaApp soporta MXN, USD, EUR y otras divisas principales.",
  },

  {
    id: "no-guarda",
    weight: 10,
    phrases: ["no guarda", "no se guarda", "no puedo guardar", "error al guardar", "perdi los cambios", "no graba"],
    keywords: ["guardar", "guardado", "grabar", "salvar", "perdido", "cambios"],
    reply: "Si la cotización no guarda, sigue estos pasos:\n1. Verifica tu conexión a internet\n2. Asegúrate de que todos los campos obligatorios estén llenos:\n   • Nombre del cliente\n   • Al menos un producto\n3. Intenta guardar nuevamente\n4. Si el problema persiste, recarga la página (F5) — tus cambios pueden estar guardados como borrador\n\n¿Ves algún mensaje de error específico? Eso nos ayuda a identificar el problema más rápido.",
  },

  {
    id: "error-tecnico",
    weight: 8,
    phrases: ["no carga", "no funciona", "error en la pagina", "pantalla blanca", "muy lento", "fallo el sistema", "app caida"],
    keywords: ["error", "fallo", "falla", "problema", "carga", "blanco", "lento", "colgado", "trabado"],
    reply: "Si la aplicación presenta errores, intenta esto:\n1. Recarga la página (F5 o Ctrl+R)\n2. Limpia la caché del navegador (Ctrl+Shift+Del)\n3. Prueba en modo incógnito\n4. Prueba con otro navegador\n\n⚠️ Si ves un código de error (500, 403, 404), anótalo y compártelo con soporte técnico — acelera mucho el diagnóstico.",
  },

  {
    id: "contrasena",
    weight: 7,
    phrases: ["olvide contrasena", "no recuerdo contrasena", "cambiar contrasena", "no puedo entrar", "no puedo iniciar sesion", "recuperar cuenta"],
    keywords: ["contrasena", "password", "clave", "acceso", "login", "sesion", "entrar", "olvide"],
    reply: "Para recuperar tu contraseña:\n1. En la pantalla de inicio de sesión clic en '¿Olvidaste tu contraseña?'\n2. Ingresa tu correo registrado\n3. Revisa tu bandeja de entrada (incluyendo la carpeta de spam)\n4. Sigue el enlace del correo para crear una nueva contraseña\n\n⏱️ El enlace expira en 30 minutos. Si no llega, intenta de nuevo o contacta soporte.",
  },
  {
    id: "cuenta-correo",
    weight: 6,
    phrases: ["cambiar correo", "actualizar correo", "cambiar email", "cambiar datos cuenta"],
    keywords: ["correo", "email", "cuenta", "perfil", "datos", "actualizar"],
    reply: "Para actualizar tu correo o datos de cuenta:\n1. Ve a 'Configuración' → 'Mi Perfil'\n2. Edita los campos que necesitas\n3. Clic en 'Guardar cambios'\n\n📧 Si cambias el correo, recibirás un enlace de verificación al nuevo correo antes de que el cambio sea efectivo.",
  },

  {
    id: "planes",
    weight: 9,
    phrases: ["que planes hay", "tipos de planes", "planes disponibles", "cuanto cuesta", "precio del plan", "plan gratuito", "plan de pago", "que incluye el plan"],
    keywords: ["plan", "planes", "gratuito", "gratis", "pago", "suscripcion", "premium", "pro", "mensual", "anual"],
    reply: "CotizaApp ofrece diferentes planes según el tamaño de tu negocio.\nPara ver precios y características actualizadas:\n• Ve a 'Configuración' → 'Plan y Facturación'\n• O visita la sección de Precios en la página principal\n\n¿Quieres saber qué incluye algún plan en particular?",
  },
  {
    id: "cancelar",
    weight: 9,
    phrases: ["cancelar suscripcion", "cancelar cuando quiera", "puedo cancelar", "darme de baja", "dejar de usar", "como cancelo"],
    keywords: ["cancelar", "suscripcion", "baja", "dejar", "membresia", "contrato"],
    reply: "Sí, puedes cancelar en cualquier momento sin penalización.\n\nPara cancelar:\n1. Ve a 'Configuración' → 'Plan y Facturación'\n2. Clic en 'Cancelar suscripción'\n3. Confirma la acción\n\n✅ Seguirás teniendo acceso completo hasta el último día del período ya pagado.",
  },
  {
    id: "factura",
    weight: 7,
    phrases: ["necesito factura", "donde esta mi factura", "descargar factura", "factura de pago"],
    keywords: ["factura", "recibo", "comprobante", "pago", "cobro", "cargo"],
    reply: "Para ver o descargar tus facturas:\n1. Ve a 'Configuración' → 'Plan y Facturación'\n2. En la sección 'Historial de pagos' encontrarás todas tus facturas\n3. Clic en 'Descargar' junto a la factura que necesitas\n\n¿No encuentras una factura específica? Contacta a soporte con la fecha del pago.",
  },
];

function findBestMatch(input: string): string | null {
  const normalizedInput = normalize(input);
  const tokens = tokenize(input);

  let bestScore = 0;
  let bestReply: string | null = null;

  for (const entry of KNOWLEDGE) {
    let score = 0;

    for (const phrase of entry.phrases) {
      if (normalizedInput.includes(normalize(phrase))) {
        score += entry.weight * 3;
      }
    }

    for (const keyword of entry.keywords) {
      const nk = normalize(keyword);
      if (normalizedInput.includes(nk)) {
        score += entry.weight;
      }

      for (const token of tokens) {
        if (nk.includes(token) && token.length > 3) {
          score += Math.floor(entry.weight / 2);
        }
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestReply = entry.reply;
    }
  }

  return bestScore >= 5 ? bestReply : null;
}

const SUPPORT_MESSAGE =
  "No encontré una respuesta exacta para tu consulta. 🤔\n\n" +
  "Puedes intentar reformular tu pregunta, o si prefieres atención personalizada, " +
  "contacta a nuestro equipo de soporte técnico:\n\n" +
  "📧 soporte@cotizaapp.com\n" +
  "💬 Chat en vivo: disponible en días hábiles de 9am a 6pm\n\n" +
  "Responderemos a la brevedad posible.";

const FALLBACKS = [
  "No entendí bien tu pregunta. Intenta ser más específico, por ejemplo:\n• 'cómo creo una cotización'\n• 'no puedo guardar'\n• 'cómo envío al cliente'\n\nO si prefieres, contacta a soporte: 📧 soporte@cotizaapp.com",
  "Hmm, no tengo información exacta sobre eso.\n\nPuedes preguntar sobre: cotizaciones, plantillas, productos, PDF, planes o problemas técnicos.\n\n¿No encuentras lo que buscas? Escríbenos a soporte@cotizaapp.com 📧",
  SUPPORT_MESSAGE,
];

let fallbackIndex = 0;
function getFallback(): string {
  const msg = FALLBACKS[fallbackIndex % FALLBACKS.length];
  fallbackIndex++;
  return msg;
}


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message } = body;

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { reply: "Por favor escribe un mensaje para poder ayudarte." },
        { status: 400 }
      );
    }

    if (message.trim().length > 500) {
      return NextResponse.json(
        { reply: "Tu mensaje es muy largo. Por favor resume tu pregunta en una oración." },
        { status: 400 }
      );
    }

    const reply = findBestMatch(message) ?? getFallback();

    return NextResponse.json({ reply });

  } catch (error) {
    console.error("[ChatAyuda] Error inesperado:", error);
    return NextResponse.json(
      {
        reply:
          "Ocurrió un error inesperado. Por favor intenta de nuevo.\n\nSi el problema persiste, contacta a soporte: soporte@cotizaapp.com",
      },
      { status: 500 }
    );
  }
}

