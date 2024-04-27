"use client"

import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function App() {
    const canvasEl1 = useRef(null);
    const canvasEl2 = useRef(null);

    const colors = {
        purple: {
            default: "rgba(149, 76, 233, 1)",
            half: "rgba(149, 76, 233, 0.5)",
            quarter: "rgba(149, 76, 233, 0.25)",
            zero: "rgba(149, 76, 233, 0)"
        },
        indigo: {
            default: "rgba(75, 192, 192, 1)",
            half: "rgba(75, 192, 192, 0.5)",
            quarter: "rgba(75, 192, 192, 0.25)",
            zero: "rgba(75, 192, 192, 0)"
        }
    };

    useEffect(() => {
        const ctx1 = canvasEl1.current.getContext("2d");
        const ctx2 = canvasEl2.current.getContext("2d");

        const gradient1 = ctx1.createLinearGradient(0, 16, 0, 600);
        gradient1.addColorStop(0, colors.purple.half);
        gradient1.addColorStop(0.65, colors.purple.quarter);
        gradient1.addColorStop(1, colors.purple.zero);

        const gradient2 = ctx2.createLinearGradient(0, 16, 0, 600);
        gradient2.addColorStop(0, colors.indigo.half);
        gradient2.addColorStop(0.65, colors.indigo.quarter);
        gradient2.addColorStop(1, colors.indigo.zero);

        const weight1 = [60.0, 60.2, 59.1, 61.4, 59.9, 60.2, 59.8, 58.6, 59.6, 59.2, , 58.6, 58.2];
        const weight2 = [58.0, 59.2, 58.1, 60.4, 58.9, 59.2, 58.8, 57.6, 58.6, 58.2, 58.6, 58.2];

        const labels = [
            "Jan",
            "feb",
            "mar",
            "apr",
            "may",
            "jun",
            "jul",
            "aug",
            "sep",
            "oct",
            "nov",
            "dec",

        ];

        const data1 = {
            labels: labels,
            datasets: [
                {
                    backgroundColor: gradient1,
                    label: "Invoices",
                    data: weight1,
                    fill: true,
                    borderWidth: 2,
                    borderColor: colors.purple.default,
                    lineTension: 0.2,
                    pointBackgroundColor: colors.purple.default,
                    pointRadius: 3
                }
            ]
        };

        const data2 = {
            labels: labels,
            datasets: [
                {
                    backgroundColor: gradient2,
                    label: "Payments",
                    data: weight2,
                    fill: true,
                    borderWidth: 2,
                    borderColor: colors.indigo.default,
                    lineTension: 0.2,
                    pointBackgroundColor: colors.indigo.default,
                    pointRadius: 3
                }
            ]
        };

        const config1 = {
            type: "line",
            data: data1
        };

        const config2 = {
            type: "bar",
            data: data2
        };

        const myLineChart1 = new Chart(ctx1, config1);
        const myLineChart2 = new Chart(ctx2, config2);

        return function cleanup() {
            myLineChart1.destroy();
            myLineChart2.destroy();
        };
    }, []);

    return (
        <div className="App" style={{ display: "flex" }}>
            <div style={{ flex: 1 }}>
                <span>Invoices</span>
                <canvas id="myChart1" ref={canvasEl1} height="100" />
            </div>
            <div style={{ flex: 1 }}>
                <span>Payments</span>
                <canvas id="myChart2" ref={canvasEl2} height="100" />
            </div>
        </div>
    );
}
