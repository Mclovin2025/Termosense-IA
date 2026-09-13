let tempMin = Infinity;
let tempMax = -Infinity;
let historialLecturas = [];

const ctx = document.getElementById('graficoTemperatura').getContext('2d');
const grafico = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [], 
    datasets: [{
      label: 'Temperatura °C',
      data: [],
      borderColor: '#ff5722',
      backgroundColor: 'rgba(255, 87, 34, 0.1)',
      fill: true,
      tension: 0.4
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: false }
    },
  }
});


function actualizarDatosUI(temperatura) {
  document.getElementById('temp-actual').innerText = `${temperatura.toFixed(1)} °C`;

  if (temperatura < tempMin) tempMin = temperatura;
  if (temperatura > tempMax) tempMax = temperatura;

  document.getElementById('temp-min').innerText = `${tempMin.toFixed(1)} °C`;
  document.getElementById('temp-max').innerText = `${tempMax.toFixed(1)} °C`;

  const bannerAlerta = document.getElementById('alerta-incendio');
  if (temperatura >= 45) {
    bannerAlerta.classList.remove('oculta');
  } else {
    bannerAlerta.classList.add('oculta');
  }

  analizarPrediccion(temperatura);

  const hora = new Date().toLocaleTimeString();
  grafico.data.labels.push(hora);
  grafico.data.datasets[0].data.push(temperatura);

  if (grafico.data.labels.length > 10) {
    grafico.data.labels.shift();
    grafico.data.datasets[0].data.shift();
  }

  grafico.update();
}

function analizarPrediccion(nuevaTemp) {
  historialLecturas.push(nuevaTemp);
  if (historialLecturas.length > 5) historialLecturas.shift();

  if (historialLecturas.length >= 3) {
    const cambio = historialLecturas[historialLecturas.length - 1] - historialLecturas[0];

    if (cambio > 1.5) {
      document.getElementById('prediccion').innerText = " La temperatura está subiendo rápidamente. Se prevé un ambiente caluroso.";
    } else if (cambio < -1.5) {
      document.getElementById('prediccion').innerText = " La temperatura va en descenso. Se anticipa un ambiente más fresco.";
    } else {
      document.getElementById('prediccion').innerText = " Temperatura estable. Sin cambios bruscos detectados.";
    }
  }
}

setInterval(() => {
  const tempSimulada = 22 + Math.random() * 6;
  actualizarDatosUI(tempSimulada);
}, 3000);