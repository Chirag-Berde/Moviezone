import { createSlice } from '@reduxjs/toolkit'

export const homeSlice = createSlice({
    name: 'counter',
    initialState: {
        url: {},
        genres: {}
    },
    reducers: {
        getApiConfiguration: (state, action) => {
            state.url = action.payload
        },
        getGeneres: (state, action) => {
            state.genres = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { getApiConfiguration,getGeneres } = homeSlice.actions

export default homeSlice.reducer