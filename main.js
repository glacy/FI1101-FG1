//
// Place any custom JS here
//
let chart;
// Utils.srand(8);
function generarGrafico() {
    const initialPosition = parseFloat(document.getElementById('initialPosition').value);
    const initialVelocity = parseFloat(document.getElementById('initialVelocity').value);
    const acceleration = parseFloat(document.getElementById('acceleration').value);

    const timeArray = generarArrayTiempo();
    const positionArray = generarArrayPosicion(initialPosition, initialVelocity, acceleration, timeArray);

    if (chart) {
        chart.destroy(); // Destruir el gráfico anterior si existe
    }
	
	// Configurar la anotación con la ecuación
const annotation3 = {
          type: 'label',
          xValue: 2.5,
          yValue: 60,
          backgroundColor: 'rgba(245,245,245)',
          content: ['This is my text', 'This is my text, second line'],
          font: {
            size: 18
          }
        };

const box1 = {
          type: 'box',
          xMin: 1,
          xMax: 5,
          yMin: 50,
          yMax: 70,
          backgroundColor: 'rgba(255, 99, 132, 0.25)'
        };

    const opciones = {
        responsive: true,
		scales: {
		  x: {
			display: true,
			title: {
			  display: true,
			  text: 'Tiempo (s)',
			  color: '#911',
			  font: {
				family: 'Comic Sans MS',
				size: 20,
				weight: 'bold',
				lineHeight: 1.2,
			  },
			  padding: {top: 20, left: 0, right: 0, bottom: 0}
			}
		  },
		  y: {
			display: true,
			title: {
			  display: true,
			  text: 'Posición (m)',
			  color: '#191',
			  font: {
				family: 'Times',
				size: 20,
				style: 'normal',
				lineHeight: 1.2
			  },
			  padding: {top: 30, left: 0, right: 0, bottom: 0}
					}
			}
				},
		plugins: {
        annotation: {
            annotations: {
                annotation3,box1
            }
        }
    }
  }
  
    const ctx = document.getElementById('chartCanvas').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timeArray,
            datasets: [{
                label: 'Posición vs Tiempo',
                borderColor: 'rgb(255, 204, 188)',
                data: positionArray,
                fill: false
            }]
        },
        options: opciones,
		maintainAspectRatio : false,
    });
}

function generarArrayTiempo() {
    const timeArray = [];
    for (let t = 0; t <= 20; t += 0.1) {
        timeArray.push(t.toFixed(2));
    }
    return timeArray;
}

function generarArrayPosicion(initialPosition, initialVelocity, acceleration, timeArray) {
    const positionArray = [];
    timeArray.forEach(t => {
        const position = initialPosition + initialVelocity * t + 0.5 * acceleration * Math.pow(t, 2);
        positionArray.push(position.toFixed(2));
    });
    return positionArray;
}
