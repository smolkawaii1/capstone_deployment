import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import ReactApexChart from "react-apexcharts";

const Project = () => {
  const [projectData, setProjectData] = useState([]);
  const [years, setYears] = useState<string[]>([]);
  const [completedSeries, setCompletedSeries] = useState<number[]>([]);
  const [ongoingSeries, setOngoingSeries] = useState<number[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/projects")
      .then((response) => response.json())
      .then((data) => {
        const projectsByYear: Record<
          string,
          { completed: number; ongoing: number }
        > = {};
        data.forEach(
          (project: {
            duration: { startDate: string | number | Date };
            status: string;
          }) => {
            const year = new Date(project.duration.startDate)
              .getFullYear()
              .toString();
            if (!projectsByYear[year]) {
              projectsByYear[year] = { completed: 0, ongoing: 0 };
            }
            if (project.status === "Completed") {
              projectsByYear[year].completed++;
            } else if (project.status === "On-going") {
              projectsByYear[year].ongoing++;
            }
          }
        );

        const years = Object.keys(projectsByYear).sort();
        const completedSeries = years.map(
          (year) => projectsByYear[year].completed
        );
        const ongoingSeries = years.map((year) => projectsByYear[year].ongoing);

        setProjectData(data);
        setYears(years);
        setCompletedSeries(completedSeries);
        setOngoingSeries(ongoingSeries);
      })
      .catch((error) => {
        console.error("Error fetching project data:", error);
      });
  }, []);

  const options: any = {
    chart: {
      type: "bar", // Make sure this value is "bar"
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
      categories: years,
      title: {
        text: "Years",
      },
    },
    yaxis: {
      title: {
        text: "Number of Projects",
      },
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val} Projects`,
      },
    },
  };

  const series = [
    { name: "Completed", data: completedSeries },
    { name: "On-going", data: ongoingSeries },
  ];

  return (
    <Box
      p={4}
      bgcolor="#f6f6f6"
      id="chart"
      minWidth={490}
      display="flex"
      flexDirection="column"
      borderRadius="15px"
    >
      <Typography fontSize={18} fontWeight={600} color="#11142d">
        Total Projects
      </Typography>

      <Stack my="20px" direction="column" gap={4}>
        <Typography fontSize={28} fontWeight={700} color="#11142d">
          {projectData.length.toLocaleString()}
        </Typography>
      </Stack>
      {projectData.length > 0 && (
        <ReactApexChart
          series={series}
          type="bar"
          height={310}
          options={options}
        />
      )}
    </Box>
  );
};

export default Project;
