import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";

import { setError } from "../../store";

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        api.dispatch(
            setError((action.payload as { error?: string })?.error || "Что-то пошло не так")
        );
    }

    return next(action);
};
