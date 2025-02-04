import {
  BaseQueryApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query";
import { startLoading, stopLoading } from "../Layout/uiSlice";
import { toast } from "react-toastify";
import { router } from "../models/routes/Routes";

const customBaseQuery = fetchBaseQuery({
  baseUrl: "https://localhost:5001/api",
  credentials: "include",
});

type ErrorResponse = string | { title: string } | { errors: string[] };

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

export const baseQueryWithErrorHandling = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  // start loading
  api.dispatch(startLoading());

  await sleep();

  const result = await customBaseQuery(args, api, extraOptions);
  // stop loading
  api.dispatch(stopLoading());

  if (result.error) {
    console.log(result.error);

    const orginalStatus =
      result.error.status === "PARSING_ERROR" && result.error.originalStatus
        ? result.error.originalStatus
        : result.error.status;

    const responseData = result.error.data as ErrorResponse;

    console.log(result.error);
    switch (orginalStatus) {
      case 400:
        if (typeof responseData === "string") toast.error(responseData);
        else if ("errors" in responseData) {
          throw Object.values(responseData.errors).flat().join(", ");
        } else toast.error(responseData.title);
        break;
      case 401:
        if (typeof responseData === "object" && "title" in responseData)
          // type guard
          toast.error(responseData.title);
        break;
      case 404:
        if (typeof responseData === "object" && "title" in responseData)
          // type guard
          router.navigate("/not-found");
        break;
      case 500:
        if (typeof responseData === "object")
          // type guard
          router.navigate("/server-error", { state: { error: responseData } });
        break;
      default:
        break;
    }
  }

  return result;
};
