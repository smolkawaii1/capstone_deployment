import { useState } from "react";
import { useLogin } from "@refinedev/core";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { CredentialResponse } from "../interfaces/google";
import { dost } from "assets";
import { Snackbar } from "@mui/material";

export const Login: React.FC = () => {
  const { mutate: login } = useLogin<CredentialResponse>({
    v3LegacyAuthProviderCompatible: true,
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(""); // New state for login status

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if the entered credentials are correct
    if (username === "admin" && password === "password") {
      // Call the login function with the credential response
      login({ credential: "admin-credential" });
      setLoginStatus("success"); // Set login status to success
    } else if (username === "rdiadmin" && password === "password") {
      // Call the login function with the credential response
      login({ credential: "rdi-credential" });
      setLoginStatus("success"); // Set login status to success
    } else if (username === "college" && password === "12345") {
      // Call the login function with the credential response
      login({ credential: "college-credential" });
      setLoginStatus("success"); // Set login status to success
    } else {
      setLoginStatus("error"); // Set login status to error
    }
  };

  const handleCloseSnackbar = () => {
    setLoginStatus(""); // Clear login status when snackbar is closed
  };

  return (
    <Box component="div" sx={{ backgroundColor: "#FCFCFC" }}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          backgroundColor: "#FCFCFC",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            <img src={dost} alt="Dost Logo" />
          </div>
          <Typography
            display="flex"
            justifyContent="center"
            fontWeight={700}
            fontSize={20}
          >
            Admin Login
          </Typography>
          <Box mt={4}>
            <form onSubmit={handleSubmit}>
              <FormControl sx={{ mb: 2, width: "100%" }}>
                <InputLabel htmlFor="login-type">Login Type</InputLabel>
                <Select
                  id="login-type"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  label="Login Type"
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="rdiadmin">RDI</MenuItem>
                  <MenuItem value="college">Project</MenuItem>
                </Select>
              </FormControl>
              <TextField
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 2, width: "100%" }}
              />
              <Button type="submit" variant="contained" sx={{ width: "100%" }}>
                Login
              </Button>
            </form>
          </Box>
        </Box>
      </Container>

      <Snackbar
        open={loginStatus !== ""}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={
          loginStatus === "success" ? "Login successful" : "Invalid credentials"
        }
      />
    </Box>
  );
};
