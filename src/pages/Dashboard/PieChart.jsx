import React, { useEffect } from 'react'
import Chart from 'chart.js'
const PieGraph = (props) => {

    useEffect(() => {
        var ctx = document.getElementById("pieChart")
        var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Masaya', 'Managua', 'Rivas', 'Granada', 'Esteli', 'Carazo'],
                datasets: [{
                    label: 'Solicitudes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    })

    return (
        <div className="card">
            <canvas id="pieChart"></canvas>
        </div>
    )
}
export default PieGraph