import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import cytologySlice from "./slices/cytology.slice";
import refSlice from "./slices/ref.slice";
import authSlice from "./slices/auth.slice";
import segmentSlice from "./slices/segment.slice";
import contextSlice from "./slices/context.slice";

import { cytologyApi } from "../service/cytology";
import { rtkQueryErrorLogger } from "../service/middlewares/errorLoger";
import { loaderMiddleware } from "../service/middlewares/loadingHandler";

export const store = configureStore({
    reducer: {
        cytology: cytologySlice.reducer,
        ref: refSlice.reducer,
        auth: authSlice.reducer,
        segment: segmentSlice.reducer,
        context: contextSlice.reducer,
        [cytologyApi.reducerPath]: cytologyApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(cytologyApi.middleware)
            .concat(loaderMiddleware)
            .concat(rtkQueryErrorLogger),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
