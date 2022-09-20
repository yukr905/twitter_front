import { createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "..//../axios"

export const fetchPosts= createAsyncThunk('posts/fetchPosts', async()=>{
    const {data} = await axios.get("/posts")
    return data
})
export const fetchTags= createAsyncThunk('posts/fetchTags', async()=>{
    const {data} = await axios.get("/tags")
    return data
})
export const fetchRemovePosts= createAsyncThunk('posts/fetchRemovePosts', async(id)=>{
    const {data} = await axios.delete(`/posts/${id}`)
    return data
})


const initialState={
    posts:{
        items:[],
        status:"loading"
    },
    tags:{
        items:[],
        status:"loading"
    }
}

const postSlice = createSlice({
    name:"posts",
    initialState,
    reducers:{ },
    extraReducers:{
        [fetchPosts.pending]:(state,actions)=>{
            state.posts.items =[]
            state.posts.status ="loading"

        },
        [fetchPosts.fulfilled]:(state,actions)=>{
            state.posts.items =actions.payload
            state.posts.status ="loaded"
            
        },
        [fetchPosts.rejected]:(state)=>{
            state.posts.items =[]
            state.posts.status ="error"
            
        },
        [fetchTags.pending]:(state,actions)=>{
            state.tags.items =[]
            state.tags.status ="loading"

        },
        [fetchTags.fulfilled]:(state,actions)=>{
            state.tags.items =actions.payload
            state.tags.status ="loaded"
            
        },
        [fetchTags.rejected]:(state)=>{
            state.tags.items =[]
            state.tags.status ="error"
            
        },
        [fetchRemovePosts.pending]:(state,actions)=>{
            state.posts.items=state.posts.items.filter(obj=>obj.id===actions.meta.arg)
        },
    }
    
})

export const  postsReducer = postSlice.reducer