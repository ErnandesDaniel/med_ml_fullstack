import { isRejectedWithValue, isFulfilled, isPending } from '@reduxjs/toolkit'
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit'

import { addLoading, removeLoading } from '../../store'

export const loaderMiddleware: Middleware =
    (api: MiddlewareAPI) => (next) => (action) => {
        if (isPending(action)) {
            const actionMetaArgs = action.meta.arg as { queryCacheKey: string }
            api.dispatch(addLoading(actionMetaArgs.queryCacheKey))
        } else if (isFulfilled(action) || isRejectedWithValue(action)) {
            const actionMetaArgs = action.meta.arg as { queryCacheKey: string }
            api.dispatch(removeLoading(actionMetaArgs.queryCacheKey))
        }

        return next(action)
    }
