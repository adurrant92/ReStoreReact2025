import { BaseQueryApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { startLoading, stopLoading } from "../Layout/uiSlice";

const customBaseQuery = fetchBaseQuery({
    baseUrl: 'https://localhost:5001/api'
});

const sleep = () => new Promise(resolve => setTimeout(resolve, 1000));

export const baseQueryWithErrorHandling = async(args: string | FetchArgs, 
    api: BaseQueryApi, extraOptions: object) => {
        // start loading 
        api.dispatch(startLoading());

        await sleep();

        const result = await customBaseQuery(args, api, extraOptions);
        // stop loading 
        api.dispatch(stopLoading());

        if(result.error){
            const {status, data} = result.error;
            console.log({status, data}); // output the oject of the error
        }

        return result

    }