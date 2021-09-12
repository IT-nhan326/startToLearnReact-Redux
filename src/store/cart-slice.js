import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    //slice name
    name: 'cart',

    //slice properties
    initialState: {
        items: [],
        totalQuantity: 0,
        totalAmount: 0
    },

    //reducers contains actions to dispatch
    reducers: {
        addItemToCart(state, action){
            //item passed in
            const newItem = action.payload
            
            //check if item is exist on cart already
            const existingItem = state.items.find(item => item.id === newItem.id )
            
            //always add 1 to overall
            state.totalQuantity++
            
            if (!existingItem){
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    title: newItem.title
                })
            }else {
                existingItem.quantity++
                existingItem.totalPrice = existingItem.totalPrice + newItem.price
            }
        },
        
        removeItemFromCart(state, action){
            //takes item's id as parameter
            const id = action.payload
            state.totalQuantity--
            const existingItem = state.items.find(item => item.id === id)

            if (existingItem.quantity === 1){
                state.items = state.items.filter(item => item.id !== id)
            }else {
                existingItem.quantity--
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price
            }
        }
    }
})

export const cartActions = cartSlice.actions

export default cartSlice