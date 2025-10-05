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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <SignUp />,
      },
      {
        path: "/sign/up",
        element: <SignUp />,
      },
      {
        path: "/sign/in",
        element: <SignIn />,
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