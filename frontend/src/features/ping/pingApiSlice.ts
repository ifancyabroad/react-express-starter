// Need to use the React-specific entry point to import `createApi`
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IPingApiResponse {
	message: string;
}

// Define a service using a base URL and expected endpoints
export const pingApiSlice = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: "/api/ping" }),
	reducerPath: "pingApi",
	// Tag types are used for caching and invalidation.
	tagTypes: ["Ping"],
	endpoints: (build) => ({
		// Supply generics for the return type (in this case IPingApiResponse)
		// and the expected query argument. If there is no argument, use `void`
		// for the argument type instead.
		ping: build.query<IPingApiResponse, void>({
			query: () => "",
			providesTags: ["Ping"],
		}),
	}),
});

// Hooks are auto-generated by RTK-Query
// Same as `pingApiSlice.endpoints.ping.useQuery`
export const { usePingQuery } = pingApiSlice;
