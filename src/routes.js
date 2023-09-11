import AdminPanel from "./pages/AdminPanel";
import Login from "./pages/Login";
import DrinksMainPage from "./pages/DrinksMainPage";
import Registration from "./pages/Registration";
import {
  ADMIN_ROUTE,
  DRINKS_ROUTE,
  DRINK_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  VOTE_ROUTE,
} from "./utils/consts";
import DrinkSingle from "./pages/DrinkSingle";
import VotePage from "./pages/VotePage";

export const adminRoutes = [
  { path: ADMIN_ROUTE, Component: <AdminPanel /> },
  {
    path: DRINKS_ROUTE,
    Component: <DrinksMainPage />,
  },
  {
    path: DRINK_ROUTE + "/:id",
    Component: <DrinkSingle />,
  },
  {
    path: VOTE_ROUTE,
    Component: <VotePage />,
  },
];

export const publicUserRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: <Login />,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: <Registration />,
  },
  {
    path: DRINKS_ROUTE,
    Component: <DrinksMainPage />,
  },
  {
    path: DRINK_ROUTE + "/:id",
    Component: <DrinkSingle />,
  },
  {
    path: VOTE_ROUTE,
    Component: <VotePage />,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: <Registration />,
  },
];
export const authorizedUserRoutes = [
  {
    path: REGISTRATION_ROUTE,
    Component: <Registration />,
  },
  {
    path: DRINKS_ROUTE,
    Component: <DrinksMainPage />,
  },
  {
    path: DRINK_ROUTE + "/:id",
    Component: <DrinkSingle />,
  },
  {
    path: VOTE_ROUTE,
    Component: <VotePage />,
  },
];
