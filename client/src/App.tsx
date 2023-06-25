import React, { useState } from "react";

import { Refine, LegacyAuthProvider as AuthProvider } from "@refinedev/core";
import {
  notificationProvider,
  RefineSnackbarProvider,
  ReadyPage,
  ErrorComponent,
} from "@refinedev/mui";
import { CssBaseline, GlobalStyles } from "@mui/material";
import {
  AccountCircleOutlined,
  CorporateFare,
  Biotech,
} from "@mui/icons-material";
import routerBindings, {
  CatchAllNavigate,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router-v6/legacy";
import axios, { AxiosRequestConfig } from "axios";
import { Title, Sider, Layout, Header } from "components/layout";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { CredentialResponse } from "interfaces/google";
import { parseJwt } from "utils/parse-jwt";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import {
  Login,
  Home,
  AgencyProjects,
  MyProfile,
  ProjectDetails,
  AllProjects,
  CreateProject,
  AgencyProfile,
  EditProject,
  CollegeHome,
  RDIHome,
} from "pages";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (request.headers) {
    request.headers["Authorization"] = `Bearer ${token}`;
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return request;
});

function App() {
  const [userType, setUserType] = useState("");
  const authProvider: AuthProvider = {
    login: async ({ credential }: CredentialResponse) => {
      try {
        // Check if the entered credentials are correct
        if (credential === "admin-credential") {
          localStorage.setItem("token", "admin-token");
          setUserType("admin");
          return {
            success: true,
            redirectTo: "/",
            message: "Login successful",
          };
        } else if (credential === "rdi-credential") {
          localStorage.setItem("token", "rdi-token");
          setUserType("rdi");
          return {
            success: true,
            redirectTo: "/",
            message: "RDI Login successful",
          };
        } else if (credential === "college-credential") {
          localStorage.setItem("token", "college-token");
          setUserType("college");
          return {
            success: true,
            redirectTo: "/",
            message: "College Login successful",
          };
        } else {
          throw new Error("Invalid credentials");
        }
      } catch (error) {
        console.error();
        return {
          success: false,
          message: "Invalid credentials. Please try again.",
        };
      }
    },
    logout: () => {
      const token = localStorage.getItem("token");

      if (token && typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return Promise.resolve();
        });
      }

      return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        return Promise.resolve();
      }
      return Promise.reject();
    },

    getPermissions: async () => null,
    getUserIdentity: async () => {
      const user = localStorage.getItem("user");
      if (user) {
        return Promise.resolve(JSON.parse(user));
      }
    },
  };

  return (
    <ColorModeContextProvider>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <RefineSnackbarProvider>
        <Refine
          dataProvider={dataProvider("http://localhost:8080/api/v1")}
          notificationProvider={notificationProvider}
          ReadyPage={ReadyPage}
          catchAll={<ErrorComponent />}
          resources={[
            {
              name: "projects",
              list: AllProjects,
              show: ProjectDetails,
              create: CreateProject,
              edit: EditProject,
              icon: <Biotech />,
            },
            // {
            //   name: "agencies",
            //   list: AgencyProjects,
            //   show: AgencyProfile,
            //   icon: <CorporateFare />,
            // },
          ]}
          Title={Title}
          Sider={Sider}
          Header={Header}
          Layout={Layout}
          legacyRouterProvider={routerProvider}
          LoginPage={Login}
          legacyAuthProvider={authProvider}
          DashboardPage={
            userType === "college"
              ? CollegeHome
              : userType === "rdi"
              ? RDIHome
              : Home
          }
        />
      </RefineSnackbarProvider>
    </ColorModeContextProvider>
  );
}

export default App;
