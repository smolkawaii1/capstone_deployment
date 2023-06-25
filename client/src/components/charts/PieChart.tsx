import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { PieChartProps } from "interfaces/home";
import ReactApexChart from "react-apexcharts";

const PieChart = ({ title, value, icon }: PieChartProps) => {
  return (
    <Box
      id="chart"
      flex={1}
      display="flex"
      bgcolor="#151515"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      pl={3.5}
      py={2}
      gap={2}
      borderRadius="15px"
      minHeight="110px"
      width="fit-content"
      sx={{}}
    >
      <Stack direction="column">
        <Typography fontSize={14} color="#fcfcfc">
          {title}
        </Typography>
        <Typography fontSize={24} fontWeight={700} mt={1} color="#fcfcfc">
          {value}
        </Typography>
      </Stack>
      <ReactApexChart
        options={{
          chart: { type: "donut" },

          legend: { show: false },
          dataLabels: { enabled: false },
          stroke: {
            colors: ["#000"],
          },
        }}
        type="donut"
        width="0px"
      />
      <Typography
        fontSize={24}
        fontWeight={700}
        mt={1}
        color="#FF8A00"
        pr="50px"
      >
        {icon}
      </Typography>
    </Box>
  );
};

export default PieChart;
