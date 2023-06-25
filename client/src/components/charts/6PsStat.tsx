import React, { useEffect, useState } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const SixPsStat = () => {
  const [total6PsData, setTotal6PsData] = useState<any[]>([]);
  const [years, setYears] = useState<string[]>([]);
  const [publicationSeries, setPublicationSeries] = useState<number[]>([]);
  const [patentSeries, setPatentSeries] = useState<number[]>([]);
  const [productSeries, setProductSeries] = useState<number[]>([]);
  const [peopleServicesSeries, setPeopleServicesSeries] = useState<number[]>(
    []
  );
  const [placesPartnershipSeries, setPlacesPartnershipSeries] = useState<
    number[]
  >([]);
  const [policySeries, setPolicySeries] = useState<number[]>([]);
  const [othersSeries, setOthersSeries] = useState<number[]>([]);

  const [maxOutputs, setMaxOutputs] = useState(0);
  const [minOutputs, setMinOutputs] = useState(0);
  const [averageOutputs, setAverageOutputs] = useState(0);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/projects")
      .then((response) => response.json())
      .then((data) => {
        const sixPsByYear: any = {};

        data.forEach((sixP: any) => {
          const year = new Date(sixP.duration.startDate)
            .getFullYear()
            .toString();

          if (!sixPsByYear[year]) {
            sixPsByYear[year] = {
              publication: 0,
              patent: 0,
              product: 0,
              peopleServices: 0,
              placesPartnership: 0,
              policy: 0,
              others: 0,
            };
          }

          if (sixP.expectOutput === "Publication") {
            sixPsByYear[year].publication++;
          } else if (sixP.expectOutput === "Patent") {
            sixPsByYear[year].patent++;
          } else if (sixP.expectOutput === "Product") {
            sixPsByYear[year].product++;
          } else if (sixP.expectOutput === "PeopleServices") {
            sixPsByYear[year].peopleServices++;
          } else if (sixP.expectOutput === "PlacesPartnership") {
            sixPsByYear[year].placesPartnership++;
          } else if (sixP.expectOutput === "Policy") {
            sixPsByYear[year].policy++;
          } else if (sixP.expectOutput === "Others") {
            sixPsByYear[year].others++;
          }
        });

        const sortedYears = Object.keys(sixPsByYear).sort();
        const publicationSeries = sortedYears.map(
          (year) => sixPsByYear[year].publication
        );
        const patentSeries = sortedYears.map(
          (year) => sixPsByYear[year].patent
        );
        const productSeries = sortedYears.map(
          (year) => sixPsByYear[year].product
        );
        const peopleServicesSeries = sortedYears.map(
          (year) => sixPsByYear[year].peopleServices
        );
        const placesPartnershipSeries = sortedYears.map(
          (year) => sixPsByYear[year].placesPartnership
        );
        const policySeries = sortedYears.map(
          (year) => sixPsByYear[year].policy
        );
        const othersSeries = sortedYears.map(
          (year) => sixPsByYear[year].others
        );

        setTotal6PsData(data);
        setYears(sortedYears);
        setPublicationSeries(publicationSeries);
        setPatentSeries(patentSeries);
        setProductSeries(productSeries);
        setPeopleServicesSeries(peopleServicesSeries);
        setPlacesPartnershipSeries(placesPartnershipSeries);
        setPolicySeries(policySeries);
        setOthersSeries(othersSeries);

        const outputCounts = [
          ...publicationSeries,
          ...patentSeries,
          ...productSeries,
          ...peopleServicesSeries,
          ...placesPartnershipSeries,
          ...policySeries,
          ...othersSeries,
        ];

        let max = 0;
        let min = 0;
        let average = 0;

        if (outputCounts.length > 0) {
          max = Math.max(...outputCounts);
          min = Math.min(...outputCounts);
          const sum = outputCounts.reduce((a, b) => a + b, 0);
          average = sum / outputCounts.length;
        }

        setMaxOutputs(max);
        setMinOutputs(min);
        setAverageOutputs(average);
      })
      .catch((error) => {
        console.error("Error fetching total 6Ps data:", error);
      });
  }, []);

  const options: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    colors: [
      "#48C4D3",
      "#D47D17",
      "#7A56A3",
      "#F5A623",
      "#60A917",
      "#FF6680",
      "#C74D46",
    ],
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
      categories: years,
      title: {
        text: "Years",
      },
    },
    yaxis: {
      title: {
        text: "Number of Expected Outputs",
      },
    },
    tooltip: {
      y: {
        formatter: (val: any) => `${val} Projects`,
      },
    },
  };

  const series = [
    { name: "Publication", data: publicationSeries },
    { name: "Patent", data: patentSeries },
    { name: "Product", data: productSeries },
    { name: "People & Services", data: peopleServicesSeries },
    { name: "Places & Partnership", data: placesPartnershipSeries },
    { name: "Policy", data: policySeries },
    { name: "Others", data: othersSeries },
  ];

  const statisticsOptions: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    colors: ["#E91E63"],
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
      categories: ["Maximum", "Minimum", "Average"],
      title: {
        text: "Statistics",
      },
    },
    yaxis: {
      title: {
        text: "Number of Expected Outputs",
      },
    },
    tooltip: {
      y: {
        formatter: (val: any) => `${val} Projects`,
      },
    },
  };

  const statisticsSeries = [
    {
      name: "Outputs",
      data: [maxOutputs, minOutputs, averageOutputs],
    },
  ];

  const getMaxOutputsInsight = () => {
    if (maxOutputs === 0) {
      return "No outputs found.";
    } else {
      return `Maximum outputs: ${maxOutputs}.`;
    }
  };

  const getMinOutputsInsight = () => {
    if (minOutputs === 0) {
      return "No minimum outputs found.";
    } else {
      return `Minimum outputs: ${minOutputs}.`;
    }
  };

  const getAverageOutputsInsight = () => {
    if (averageOutputs === 0) {
      return "No outputs found.";
    } else {
      return `Average outputs: ${averageOutputs.toFixed(2)}.`;
    }
  };

  const renderCharts = () => {
    if (total6PsData.length > 0) {
      return (
        <>
          <Grid item xs={12} md={6}>
            <ReactApexChart
              options={options}
              series={series}
              type="bar"
              height={350}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" color="primary" gutterBottom>
                Insights:
              </Typography>
              <Typography variant="body1" gutterBottom>
                {getMaxOutputsInsight()}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {getMinOutputsInsight()}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {getAverageOutputsInsight()}
              </Typography>
            </Grid>
            <ReactApexChart
              options={statisticsOptions}
              series={statisticsSeries}
              type="bar"
              height={250}
            />
          </Grid>
        </>
      );
    } else {
      return (
        <Grid item xs={12}>
          <Typography variant="body1" gutterBottom>
            No data available.
          </Typography>
        </Grid>
      );
    }
  };

  return (
    <Box p={4}>
      <Typography fontWeight={700} variant="h5" color="black" gutterBottom>
        6Ps Expected Outputs
      </Typography>

      <Grid container spacing={2}>
        {renderCharts()}

        {/* Display descriptive analysis */}
      </Grid>
    </Box>
  );
};

export default SixPsStat;
