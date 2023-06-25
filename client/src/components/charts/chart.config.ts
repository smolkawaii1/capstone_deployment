import { ApexOptions } from "apexcharts";

export const totalInvestmentsSeries = [
  {
    name: "Last Month",
    data: [100000, 500000, 432212, 1500402, 700321, 29492, 5000],
  },
  {
    name: "Running Month",
    data: [10000, 300000, 232212, 500321, 1300402, 19492, 200000],
  },
];

export const totalInvestmentsOptions: ApexOptions = {
  chart: {
    type: "bar",
    toolbar: {
      show: false,
    },
  },
  colors: ["#48C4D3", "#D47D17"],
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: false,
      columnWidth: "55%",
    },
  },
  dataLabels: {
    enabled: false,
  },
  grid: {
    show: false,
  },
  stroke: {
    width: 4,
  },
  xaxis: {
    categories: totalInvestmentsSeries.map((item) => item.name),
  },
  yaxis: {
    title: {
      text: "₱ (thousands)",
    },
  },
  fill: {
    opacity: 1,
  },
  legend: {
    position: "top",
    horizontalAlign: "right",
  },
  tooltip: {
    y: {
      formatter: (val: number) => `₱ ${val}`,
    },
  },
};
