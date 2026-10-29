
import {
  Outlet,
  createRootRoute,
  createRoute,
  redirect,
} from "@tanstack/react-router";

import LoginPage from "../Pages/Loginpage";
import DashboardLayout from "../Pages/DashboardLayout";

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

// login page
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",

  beforeLoad: () => {
    const user = localStorage.getItem("user");

    if (user) {
      throw redirect({ to: "/dashboard" });
    }
  },

  component: LoginPage,
});

// dashbord and navbar
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",

  beforeLoad: () => {
    const user = localStorage.getItem("user");

    if (!user) {
      throw redirect({ to: "/login" });
    }
  },

  component: DashboardLayout,
});

// site
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",

  beforeLoad: () => {
    const user = localStorage.getItem("user");

    if (user) {
      throw redirect({ to: "/dashboard" });
    }

    throw redirect({ to: "/login" });
  },
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  dashboardRoute,
]);
