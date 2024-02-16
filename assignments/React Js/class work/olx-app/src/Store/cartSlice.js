import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: []
    },
    reducers: {
        addToCart: (state, data) => {
            state.cart.push(data.payload)
            console.log('state.cart', state.cart)
        },
        removeCartItem: (state, data) => {
            console.log(data.payload)
            state.cart.splice(data.payload,1)
        }
    }
})

export const { addToCart, removeCartItem } = cartSlice.actions
export default cartSlice