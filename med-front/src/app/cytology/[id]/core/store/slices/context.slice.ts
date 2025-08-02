import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface contextState {
    error?: string;
    isLoading: Record<string, boolean[]>;
}

const initialState: contextState = {
    error: undefined,
    isLoading: {},
};

const contextSlice = createSlice({
    name: "contextSlice",
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<string | undefined>) => {
            state.error = action.payload;
        },
        addLoading: (state, action: PayloadAction<string>) => {
            const prevState = state.isLoading;
            const actionName = action.payload;

            if (action.payload in prevState) {
                const prevAction = prevState[actionName];
                prevAction.push(true);

                state.isLoading = { ...prevState, [actionName]: prevAction };
            } else {
                state.isLoading = { ...prevState, [actionName]: [true] };
            }
        },
        removeLoading: (state, action: PayloadAction<string>) => {
            const newState = { ...state.isLoading };
            const actionName = action.payload;

            if (actionName in newState) {
                if (newState[actionName].length > 1) {
                    newState[actionName].pop();
                } else {
                    delete newState[actionName];
                }

                state.isLoading = newState;
            }
        },
        removeAllLoadings: (state) => {
            state.isLoading = {};
        },
    },
});

export const { setError, addLoading, removeLoading, removeAllLoadings } = contextSlice.actions;

export default contextSlice;
