import { categoryConstants } from "../actions/constants"

const initState = {
    categories:[],
    loading:false,
    error:null
}
export default (state =initState,action) =>{
    switch(action.type){
        case categoryConstants.GET_ALL_CATEGORY_SUCCESS:
            state={
                ...state,
                categories:action.payload.categories,
                loading:true
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
            state = {
                ...state,
                loading:true
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
            state = {
                ...initState,
                loading:false,
                

            }
            break;
        case categoryConstants.GET_ALL_CATEGORY_FAILURE:
            state ={
                ...initState
            }
        
    }

    return state
}