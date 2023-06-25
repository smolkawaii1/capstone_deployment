import React, { useEffect, useState } from "react";
import { useList } from "@refinedev/core";
import {
  AccountBalanceWallet,
  CorporateFare,
  Biotech,
  EventAvailable,
} from "@mui/icons-material";
import { PieChart, Project } from "components";
import { Box, Typography, Stack } from "@mui/material";
import TotalInvestments from "components/charts/totalInvestments";

const Home = () => {
  const [totalInvestments, setTotalInvestments] = useState(0);
  const [totalProjects, setTotalProjects] = useState(0);
  const [projectsCompleted, setProjectsCompleted] = useState(0);
  const [totalFundingAgencies, setTotalFundingAgencies] = useState(0);

  // Fetch the data from MongoDB using an API endpoint
  useEffect(() => {
    fetch("http://localhost:8080/api/v1/projects")
      .then((response) => response.json())
      .then((data) => {
        // Calculate the dynamic values based on the data
        const totalInvestments = data.reduce(
          (sum: number, project: any) => sum + project.fund,
          0
        );
        const totalProjects = data.length;
        const projectsCompleted = data.filter(
          (project: any) => project.status === "Completed"
        ).length;
        const fundingAgencies = Array.from(
          new Set(data.map((project: any) => project.source))
        );
        const totalFundingAgencies = fundingAgencies.length;

        // Set the state with the dynamic values
        setTotalInvestments(totalInvestments);
        setTotalProjects(totalProjects);
        setProjectsCompleted(projectsCompleted);
        setTotalFundingAgencies(totalFundingAgencies);
      })
      .catch((error) => {
        console.error("Error fetching project data:", error);
      });
  }, []);

  const userType = localStorage.getItem("userType");

  return (
    <Box>
      {userType !== "college" && (
        <>
          <Typography fontSize={25} fontWeight={700} color="#11142D">
            Dashboard
          </Typography>
          <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
            <PieChart
              title="Total Investments"
              value={`₱ ${totalInvestments.toLocaleString()}`}
              series={[]}
              colors={[]}
              icon={
                <AccountBalanceWallet
                  sx={{
                    width: "60px",
                    height: "50px",
                  }}
                />
              }
            />
            <PieChart
              title="Total Projects"
              value={totalProjects.toLocaleString()}
              series={[]}
              colors={[]}
              icon={
                <Biotech
                  sx={{
                    width: "60px",
                    height: "50px",
                    color: "#48C4D3",
                  }}
                />
              }
            />
            <PieChart
              title="Funding Sources"
              value={totalFundingAgencies.toLocaleString()}
              series={[]}
              colors={[]}
              icon={
                <CorporateFare
                  sx={{
                    width: "60px",
                    height: "50px",
                  }}
                />
              }
            />
            <PieChart
              title="Projects Completed"
              value={projectsCompleted.toLocaleString()}
              icon={
                <EventAvailable
                  sx={{
                    width: "60px",
                    height: "50px",
                    color: "#48C4D3",
                  }}
                />
              }
              series={[]}
              colors={[]}
            />
          </Box>
          <Stack
            mt="25px"
            width="100%"
            direction={{ xs: "column", lg: "row" }}
            gap={4}
          ></Stack>
          <TotalInvestments />
          <Project />
        </>
      )}
    </Box>
  );
};

export default Home;
