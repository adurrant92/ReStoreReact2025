import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { User } from "../../app/models/User";
import { loginSchema } from "../../lib/schemas/loginSchema";
import { router } from "../../app/models/routes/Routes";
import { toast } from "react-toastify";

export const accountApi = createApi({
    reducerPath: 'accountApi',   // name of the path for the specific api calls 
    baseQuery: baseQueryWithErrorHandling,
    tagTypes: ['UserInfo'],
    endpoints: (builder) => ({                  // end point define the api call 
        login: builder.mutation<void, loginSchema>({
            query: (creds) => {
                return {
                    url: 'login?useCookies=true',
                    method: 'POST',
                    body: creds
                }
            },
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(accountApi.util.invalidateTags(['UserInfo']))
                } catch (error) {
                    console.log(error);
                    throw error;
                }
            }
        }),
        register: builder.mutation<void, object>({
            query: (creds) => {
                return {
                    url: 'account/register',
                    method: 'POST',
                    body: creds
                }
            },
            async onQueryStarted(_, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                    toast.success('Registration complete please login')
                    router.navigate('/login');
                } catch (error) {
                    console.log(error)
                }
            }

        }),
        userInfo: builder.query<User, void>({
            query: () => 'account/user-info',
            providesTags: ['UserInfo']
        }),
        logout: builder.mutation({
            query: () => ({
                url: 'account/logout',
                method: 'POST'

            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(accountApi.util.invalidateTags(['UserInfo']))
                    router.navigate('/');
                } catch (error) {
                    console.log(error)
                }
            }

        })
    })

})

export const { useLoginMutation, useRegisterMutation,
    useLogoutMutation, useUserInfoQuery, useLazyUserInfoQuery } = accountApi;