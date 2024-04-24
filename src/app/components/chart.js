import React from 'react';
import { Line } from 'react-chartjs-2';

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Sales',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};

const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
        xAxes: [{
            ticks: {
                fontColor: 'rgba(255, 255, 255, 0.7)',
            },
            gridLines: {
                color: 'rgba(255, 255, 255, 0.15)',
            }
        }],
        yAxes: [{
            ticks: {
                fontColor: 'rgba(255, 255, 255, 0.7)',
            },
            gridLines: {
                color: 'rgba(255, 255, 255, 0.15)',
            }
        }]
    }
};

const LineChartExample = () => (
    <div>
        <h2>Sales Chart</h2>
        <Line data={data} options={options} />
    </div>
);

export default LineChartExample;
