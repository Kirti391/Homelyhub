import { accomodationActions } from "./Accomodation-slice";
import {axiosInstance} from  "../../utils/axios";

export const createAccomodation =(accomodationData) => async (dispatch) =>{
    try {
        dispatch(accomodationActions.getAccomodationRequest());
        await axiosInstance.post("/v1/rent/user/newAccommodation", accomodationData);
        dispatch(accomodationActions.getAccomodationCreated());
    } catch (error) {
        const message = error.response?.data?.message ?? error.message ?? "Could not create accommodation.";
        dispatch(accomodationActions.getErrors(message));
        throw new Error(message);
    }
}


export const getAllAccomodation =() => async(dispatch)=>{
    try{
       dispatch(accomodationActions.getAccomodationRequest());
       const{data} = await axiosInstance.get("/v1/rent/user/myAccommodation");
       if (!Array.isArray(data.data)) {
           throw new Error("The accommodation response was invalid.");
       }
       const accom = data.data;
       dispatch(accomodationActions.getAccomodation(accom))
    }catch(error){
          dispatch(accomodationActions.getErrors(
            error.response?.data?.message ?? error.message ?? "Could not load accommodations."
          ))
    }
}