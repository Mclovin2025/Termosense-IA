// ==================== CONFIGURA TU FIREBASE ====================
// Estos datos los obtienes en:
// Firebase Console > Configuración del proyecto > Tus apps > Agregar app web
// Son públicos por diseño (no son contraseñas), no hay problema en subirlos al repositorio.
const firebaseConfig = {
  apiKey: "AIzaSyDXdpqX1U4IeBTB6LEqUqhh08R0SlY2cgw",
  databaseURL: "https://termosense-ia-898d8-default-rtdb.firebaseio.com",
  projectId: "termosense-ia-898d8"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const tempEl = document.getElementById("temp");
const estadoEl = document.getElementById("estado");
const s1El = document.getElementById("s1");
const s2El = document.getElementById("s2");
const s3El = document.getElementById("s3");

// Escucha cambios en tiempo real en el nodo "temperatura"
db.ref("temperatura").on("value", (snapshot) => {
  const data = snapshot.val();

  if (data && data.valor !== undefined) {
    tempEl.textContent = data.valor.toFixed(1);
    estadoEl.textContent = "Actualizado en tiempo real";

    if (data.sensor1 !== undefined) s1El.textContent = data.sensor1.toFixed(1) + "°C";
    if (data.sensor2 !== undefined) s2El.textContent = data.sensor2.toFixed(1) + "°C";
    if (data.sensor3 !== undefined) s3El.textContent = data.sensor3.toFixed(1) + "°C";
  } else {
    estadoEl.textContent = "Esperando datos del Arduino...";
  }
}, (error) => {
  estadoEl.textContent = "Error de conexión con la base de datos";
  console.error(error);
});

// ==================== GENERAR EL QR DEL SITIO ====================
// Usa un servicio gratuito que genera la imagen del QR a partir de una URL,
// sin necesitar ninguna librería ni lenguaje adicional.
const urlActual = window.location.href;
const qrImg = document.getElementById("qr");
const qrUrl = "https://mclovin2025.github.io/Termosense-IA/" + encodeURIComponent(urlActual);

qrImg.src = qrUrl;

// Si la imagen del QR no logra cargar (por ejemplo, si esa red bloquea el
// servicio), mostramos el enlace como texto en su lugar, para que se note
// el problema en vez de quedar en blanco sin explicación.
qrImg.onerror = () => {
  const aviso = document.createElement("p");
  aviso.style.fontSize = "0.8rem";
  aviso.style.color = "#ffcccb";
  aviso.textContent = "No se pudo cargar la imagen del QR. Comparte este enlace: " + urlActual;
  qrImg.replaceWith(aviso);
};
