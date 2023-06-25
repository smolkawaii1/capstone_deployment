import { ApexOptions } from "apexcharts";

export const projectInfoSeries = [
  {
    name: "Last Month",
    data: [1, 2, 5, 10, 3, 2, 7],
  },
  {
    name: "Running Month",
    data: [2, 3, 3, 5, 1, 6, 9],
  },
];

export const projectInfoOptions: ApexOptions = {
  chart: {
    type: "bar",
    toolbar: {
      show: false,
    },
  },
  colors: ["#48C4D3", "#D47D17"],
  plotOptions: {
    bar: {
      // Updated to "line" from "bar"
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
    // curve: "smooth",
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  },
  yaxis: {
    title: {
      text: "Projects Created",
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
      formatter: (val: number) => `${val} Created Projects`,
    },
  },
};
