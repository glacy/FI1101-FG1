let chart;

function generarGrafico() {
    const initialPosition = parseFloat(document.getElementById('initialPosition').value);
    const initialVelocity = parseFloat(document.getElementById('initialVelocity').value);
    const acceleration = parseFloat(document.getElementById('acceleration').value);

    const timeArray = generarArrayTiempo();
    const positionArray = generarArrayPosicion(initialPosition, initialVelocity, acceleration, timeArray);

    if (chart) {
        chart.destroy(); // Destruir el gráfico anterior si existe
    }

    const ctx = document.getElementById('chartCanvas').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timeArray,
            datasets: [{
                label: 'Posición vs Tiempo',
                borderColor: 'rgb(75, 192, 192)',
                data: positionArray,
                fill: false
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    scaleLabel: {
                        display: true,
                        labelString: 'Tiempo (s)'
                    }
                },
                y: {
                    type: 'linear',
                    position: 'left',
                    scaleLabel: {
                        display: true,
                        labelString: 'Posición (m)'
                    }
                }
            }
        }
    });
}

function generarArrayTiempo() {
    const timeArray = [];
    for (let t = 0; t <= 10; t += 0.1) {
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
