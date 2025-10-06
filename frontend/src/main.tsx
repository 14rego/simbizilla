import { Provider } from "react-redux";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import App from "./App.tsx";
import { store } from "./store";
import SignIn from "./components/sign/SignIn.tsx";
import SignUp from "./components/sign/SignUp.tsx";
import Dashboard from "./components/account/Dashboard.tsx";
import SignOut from "./components/sign/SignOut.tsx";
import ErrorPage from "./components/layout/Error.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/sign/up",
        element: <SignUp />,
      },
      {
        path: "/sign/in",
        element: <SignIn />,
      },
      {
        path: "/sign/out",
        element: <SignOut />,
      },
      {
        path: "/error",
        element: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);