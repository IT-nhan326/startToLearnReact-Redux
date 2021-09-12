import { createSlice } from '@reduxjs/toolkit'


//a slice of store where contains actions trigger rendering

const uiSlice = createSlice ({
    name: 'ui',
    initialState: { cartIsVisible: false },
    reducers: {
        toggle(state){
            //get the latest state
            state.cartIsVisible = !state.cartIsVisible
        }
    }
})

//dispatch uiSlice action to control UI-state
export const uiActions = uiSlice.actions

export default uiSlice