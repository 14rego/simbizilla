import { type JSX } from "react";
import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";

interface CustomError {
  message: string;
  statusText?: string;
  status?: number;
}

const ErrorPage = (): JSX.Element => {
  const error = useRouteError();
  let errorMessage: string;
  let errorStatus: number | undefined;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText || error.data?.message || "Unknown Error";
    errorStatus = error.status;
  } else if (error && typeof error === "object" && "message" in error) {
    errorMessage = (error as CustomError).message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    errorMessage = "Unknown Error";
  }

  return (
    <main className="text-center">
      <h2 className="text-lg font-bold">Very sorry, there seems to have been an error.</h2>
      <p>Would you like to try the <Link to="/" className="text-purple-700 underline">dashboard</Link>?</p>
      <p className="mt-6 font-mono text-xs"><strong>{errorStatus && `${errorStatus}: `}</strong>{errorMessage}</p>
    </main>
  )
};

export default ErrorPage;