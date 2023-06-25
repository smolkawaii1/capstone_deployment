import React, { useMemo } from "react";
import { Add } from "@mui/icons-material";
import {
  Box,
  Stack,
  TextField,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ProjectCard, CustomButton } from "components";
import { useTable } from "@refinedev/core";

const AllProjects = () => {
  const navigate = useNavigate();
  const {
    tableQueryResult: { data, isLoading, isError },
    current,
    setCurrent,
    setPageSize,
    pageCount,
    sorter,
    setSorter,
    filters,
    setFilters,
  } = useTable();
  const allProjects = data?.data ?? [];

  const currentFund = sorter.find((item) => item.field === "fund")?.order;

  const toggleSort = (field: string) => {
    setSorter([{ field, order: currentFund === "asc" ? "desc" : "asc" }]);
  };

  const currentFilterValues = useMemo(() => {
    const logicalFilters = filters.flatMap((item) =>
      "field" in item ? item : []
    );

    return {
      title: logicalFilters.find((item) => item.field === "title")?.value || "",
      sectorType:
        logicalFilters.find((item) => item.field === "sectorType")?.value || "",
    };
  }, [filters]);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error...</Typography>;
  return (
    <Box>
      <Box
        mt="20px"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
        }}
      >
        <Stack direction="column" width="100%">
          <Typography fontSize={25} fontWeight={700} color="#11142d">
            {!allProjects.length ? "There are no Research" : "All Research"}
          </Typography>
          <Box
            mb={2}
            mt={3}
            display="flex"
            width="84%"
            justifyContent="space-between"
            flexWrap="wrap"
          >
            <Box
              display="flex"
              gap={2}
              flexWrap="wrap"
              mb={{ xs: "20px", sm: 0 }}
            >
              <CustomButton
                title={`Sort by Fund ${currentFund === "asc" ? "↑" : "↓"}`}
                handleClick={() => toggleSort("fund")}
                backgroundColor="#48C4D3"
                color="#fcfcfc"
              />
              <TextField
                variant="outlined"
                color="info"
                placeholder="Research Titles"
                value={currentFilterValues.title}
                onChange={(e) => {
                  setFilters([
                    {
                      field: "title",
                      operator: "contains",
                      value: e.currentTarget.value
                        ? e.currentTarget.value
                        : undefined,
                    },
                  ]);
                }}
              />

              <Select
                variant="outlined"
                color="info"
                displayEmpty
                required
                inputProps={{ "aria-label": "Without label" }}
                defaultValue=""
                value={currentFilterValues.sectorType}
                onChange={(e) => {
                  console.log("Selected sectorType:", e.target.value); // Log the selected sectorType value
                  setFilters(
                    [
                      {
                        field: "sectorType",
                        operator: "eq",
                        value: e.target.value,
                      },
                    ],
                    "replace"
                  );
                }}
              >
                <MenuItem value="">All</MenuItem>
                {["AANR", "DRRCCA", "Health", "IEET", "NIBRA"].map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
              {allProjects.length > 0 && (
                <Select
                  variant="outlined"
                  color="info"
                  displayEmpty
                  required
                  inputProps={{ "aria-label": "Without label" }}
                  defaultValue={10}
                  onChange={(e) =>
                    setPageSize(e.target.value ? Number(e.target.value) : 10)
                  }
                >
                  {[10, 20, 30, 40, 50].map((size) => (
                    <MenuItem key={size} value={size}>
                      Show {size}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </Box>
          </Box>
        </Stack>
      </Box>

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <CustomButton
          title="Add Project"
          handleClick={() => navigate("/projects/create")}
          backgroundColor="#48C4D3"
          color="#fcfcfc"
          icon={<Add />}
        />
      </Stack>
      <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {allProjects?.map((project) => (
          <ProjectCard
            key={project._id}
            id={project._id}
            title={project.title}
            fund={project.fund.toLocaleString()}
            source={project.source}
            proponent={project.proponent}
            duration={project.duration}
            sectorType={project.sectorType}
            status={project.status}
          />
        ))}
      </Box>
    </Box>
  );
};

export default AllProjects;
