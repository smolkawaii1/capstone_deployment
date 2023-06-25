import React from "react";
import { Typography, Box, Stack } from "@mui/material";
import { useDelete, useGetIdentity, useShow } from "@refinedev/core";
import { useParams, useNavigate } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";
import { CustomButton } from "components";
import { dost1 } from "assets";

const projectDetails = () => {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity();
  const { mutate } = useDelete();
  const { id } = useParams();
  const { queryResult } = useShow();

  const { data, isLoading, isError } = queryResult;

  const projectDetails = data?.data ?? {};

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  console.log(data);
  const startDate = new Date(projectDetails.duration.startDate);
  const endDate = new Date(projectDetails.duration.endDate);
  const outputStartDate = new Date(
    projectDetails.expectOutputDuration.startDate
  );

  const outputEndDate = new Date(projectDetails.expectOutputDuration.endDate);
  const handleDeleteProject = () => {
    const response = confirm("Are you sure you want to delete this project?");
    if (response) {
      mutate(
        {
          resource: "projects",
          id: id as string,
        },
        {
          onSuccess: () => {
            navigate("/projects");
          },
        }
      );
    }
  };

  return (
    <Box
      borderRadius="15px"
      padding="20px"
      bgcolor={"#fcfcfc"}
      width="fit-content"
    >
      <Typography fontSize={25} fontWeight={700} color="#1142d">
        Details
      </Typography>
      <Box
        mt="20px"
        display="flex"
        flexDirection={{ xs: "column", lg: "row" }}
        gap={4}
      >
        <Box flex={1} maxWidth={764}>
          <img
            src={dost1}
            alt={projectDetails.title}
            height={200}
            style={{ objectFit: "cover", borderRadius: "10px" }}
            className="project_details-img"
          />
          <Box mt="15px">
            <Stack>
              <Typography fontSize={22} fontWeight={600} color="#11142d">
                {projectDetails.title}
              </Typography>
              <Typography fontSize={18} fontWeight={500} color="#11142d">
                <Typography fontSize={18} fontWeight={700} color="#11142d">
                  Description:
                </Typography>{" "}
                {projectDetails.description}
              </Typography>
              <Typography fontSize={18} fontWeight={500} color="#11142d">
                <Typography fontSize={18} fontWeight={700} color="#11142d">
                  Fund Allocated:
                </Typography>{" "}
                ₱{projectDetails.fund.toLocaleString()}
              </Typography>
              <Typography fontSize={18} fontWeight={500} color="#11142d">
                <Typography fontSize={18} fontWeight={700} color="#11142d">
                  Funding Source:
                </Typography>{" "}
                {projectDetails.source}
              </Typography>
              <Typography fontSize={18} fontWeight={500} color="#11142d">
                <Typography fontSize={18} fontWeight={700} color="#11142d">
                  Funding Type:
                </Typography>{" "}
                {projectDetails.intext}
              </Typography>
              <Typography fontSize={18} fontWeight={500} color="#11142d">
                <Typography fontSize={18} fontWeight={700} color="#11142d">
                  Duration:
                </Typography>
                {startDate.toLocaleDateString()} -{" "}
                {endDate.toLocaleDateString()}
              </Typography>
              <Typography fontSize={18} fontWeight={500} color="#11142d">
                <Typography fontSize={18} fontWeight={700} color="#11142d">
                  {" "}
                  Status:
                </Typography>{" "}
                {projectDetails.status}
              </Typography>
              <Typography fontSize={18} fontWeight={500} color="#11142d">
                <Typography fontSize={18} fontWeight={700} color="#11142d">
                  Sector:
                </Typography>{" "}
                {projectDetails.sectorType}
              </Typography>
              <Typography fontSize={18} fontWeight={500} color="#11142d">
                <Typography fontSize={18} fontWeight={700} color="#11142d">
                  Objective:
                </Typography>{" "}
                {projectDetails.objective}
              </Typography>
              <Typography fontSize={18} fontWeight={500} color="#11142d">
                <Typography fontSize={18} fontWeight={700} color="#11142d">
                  Activity:
                </Typography>{" "}
                {projectDetails.activity}
              </Typography>
              <Typography fontSize={18} fontWeight={500} color="#11142d">
                Expected Output: {projectDetails.expectOutput}
              </Typography>
              <Typography fontSize={18} fontWeight={500} color="#11142d">
                <Typography fontSize={18} fontWeight={700} color="#11142d">
                  Expected Output Duration:
                </Typography>{" "}
                {outputStartDate.toLocaleDateString()} -{" "}
                {outputEndDate.toLocaleDateString()}
              </Typography>
              <Typography fontSize={18} fontWeight={500} color="#11142d">
                <Typography fontSize={18} fontWeight={700} color="#11142d">
                  Research Center:
                </Typography>
                {projectDetails.college}
              </Typography>
              <Typography fontSize={18} fontWeight={500} color="#11142d">
                <Typography fontSize={18} fontWeight={700} color="#11142d">
                  Report:
                </Typography>
                {projectDetails.file.name}
              </Typography>
            </Stack>
            <Stack
              width="100%"
              mt="25px"
              direction="row"
              flexWrap="wrap"
              gap={2}
            >
              <CustomButton
                title={"Update"}
                backgroundColor="#6acfdb"
                color="#FCFCFC"
                fullWidth
                icon={<Edit />}
                handleClick={() => {
                  navigate(`/projects/edit/${projectDetails._id}`);
                }}
              />
              <CustomButton
                title={"Delete"}
                backgroundColor="#d42e2e"
                color="#FCFCFC"
                fullWidth
                icon={<Delete />}
                handleClick={() => {
                  handleDeleteProject();
                }}
              />
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default projectDetails;
