import React from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  Stack,
} from "@mui/material";
import { ProjectCardProps } from "interfaces/project";
import { dost } from "assets";
import Diversity2Icon from "@mui/icons-material/Diversity2";
const ProjectCard = ({
  id,
  title,
  fund,
  source,
  duration,
  proponent,
  sectorType,
  status,
}: ProjectCardProps) => {
  return (
    <Card
      component={Link}
      to={`/projects/show/${id}`}
      sx={{
        maxWidth: "330px",
        padding: "10px",
        "&:hover": {
          boxShadow: "0 22px 45px 2px rgba(255, 87, 34, 0.5)",
        },
        cursor: "pointer",
      }}
      elevation={0}
    >
      <CardMedia
        component="img"
        alt="DOST"
        image={dost}
        height={210}
        sx={{
          borderRadius: "10px",
        }}
      ></CardMedia>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "10px",
          paddingX: "5px",
        }}
      >
        <Stack direction="column" gap={1}>
          <Typography fontSize={16} fontWeight={600} color="#11142d">
            {title}
          </Typography>
          <Stack direction="row" gap={0.5} alignItems="flex-start">
            <Diversity2Icon sx={{ fontSize: 16, color: "#11142d", mt: 0.5 }} />
            <Typography fontSize={14} color="#808191">
              {sectorType}
            </Typography>
          </Stack>
          <Typography fontSize={14} color="#808191">
            Status: {status}
          </Typography>
        </Stack>
        <Box
          px={1.5}
          py={0.5}
          borderRadius={1}
          bgcolor="#FF8A00"
          height="fit-content"
        >
          <Typography fontSize={12} fontWeight={600} color="#fcfcfc">
            ₱{fund}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
