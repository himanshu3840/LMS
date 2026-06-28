import { createSlice } from "@reduxjs/toolkit"

const userSlice=createSlice({
    name:"user",
    initialState:{
        userData:null
    },//setUserData("ankush")<={payload}
    reducers:{// reducers define how state changes
        setUserData:(state,action)=>{
        state.userData=action.payload
        }
    }
})

export const {setUserData}=userSlice.actions// matalb ab hum isse users insert kar sakte hai
export default userSlice.reducer