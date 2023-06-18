import { createSlice , createAsyncThunk,PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios'

type Products = {
    id:number,
    title:string,
    price:number,
    image:string,
    category:string

}

type InitialState = {
    loading:boolean,
    error:string,
    products:Products[]
}

const initialState:InitialState = {
    loading:false,
    products:[],
    error:''
}

export const fetchProducts = createAsyncThunk('product/fetchProducts',async (cat:string)=>{
    return axios
    .get('https://fakestoreapi.com/products/'+cat)
    .then ((response) => response.data)
})

//Genarated pending, fulfilled,rejected action types
const productSlice = createSlice({
    name:'product',
    initialState,
    reducers:{},
    extraReducers : builder =>{
        builder.addCase(fetchProducts.pending,state =>{
            state.loading = true
        })
        builder.addCase(fetchProducts.fulfilled,(state,action:PayloadAction<Products[]>) =>{
            state.loading = false
            state.error = ''
            state.products = action.payload
        })
        builder.addCase(fetchProducts.rejected,(state,action) =>{
            state.error = action.error.message || 'something went wrong'
        })
    }
});

export default productSlice.reducer;