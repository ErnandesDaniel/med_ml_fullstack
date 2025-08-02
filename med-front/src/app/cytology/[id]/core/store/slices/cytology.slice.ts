import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ICytolgyInfoPatch, ICytologyInfo } from '@cytology/core/types/cytology'

interface uziState {
    cytologyId: number
    cytologyInfo: ICytologyInfo | null
    cytologyInfoEdited: ICytolgyInfoPatch | null
}

const initialState: uziState = {
    cytologyId: 0,
    cytologyInfo: null,
    cytologyInfoEdited: null,
}

const cytologySlice = createSlice({
    name: 'cytologySlice',
    initialState,
    reducers: {
        setCytologyId: (state, action: PayloadAction<number>) => {
            state.cytologyId = action.payload
        },
        setCytologyInfo: (
            state,
            action: PayloadAction<ICytologyInfo | null>
        ) => {
            state.cytologyInfo = action.payload
        },
        setEditedCytologyInfo: (
            state,
            action: PayloadAction<ICytolgyInfoPatch | null>
        ) => {
            state.cytologyInfoEdited = action.payload
        },
    },
})

export const { setCytologyInfo, setCytologyId, setEditedCytologyInfo } =
    cytologySlice.actions

export default cytologySlice
