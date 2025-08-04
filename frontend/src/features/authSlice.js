const initialState = {
  token:null,
  user:null
};

const authSlice = createSlice({
  name:"auth",
  initialState,
  reducers:{
    setCredentials:(state,action)=>{
      state.token = action.payload.token;
      
    }
   
  }
})