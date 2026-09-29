import "./App.css";
import Main from "./components/home/Main";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";//enables routing in react-what component to show

import PropertyList from "./components/home/PropertyList"
import PropertyListing from "./components/propertyListing/PropertyListing";

import Login from "./components/user/Login";
import Signup from "./components/user/Signup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { userActions } from "./store/User/user-slice";
import { currentUser } from "./store/User/user-action";
import LoadingSpinner from "./components/LoadingSpinner";
import EditProfile from "./components/user/EditProfile";
import Profile from "./components/user/Profile";

import BookingDetails from "./components/myBookings/BookingDetails";
import MyBookings from "./components/myBookings/MyBookings";
import Payment from "./components/payment/Payment"
import NotFound from "./components/NotFound"

import Accomodation from "./components/accomodation/Accomodation"
import AccomodationForm from "./components/accomodation/AccomodationForm"
import ForgotPassword from "./components/user/ForgetPassword";
import ResetPassword from "./components/user/ResetPassword";
import UpdatePassword from "./components/user/UpdatePassword";

const PrivateRoute = ({ children }) => {
  const { authChecked, user } = useSelector((state) => state.user);

  if (!authChecked) {
    return <LoadingSpinner />;
  }

  return user ? children : <Navigate to="/login" replace />;
};

function App() {
const dispatch=useDispatch();
const {errors}=useSelector((state)=>state.user)
useEffect(()=>{
  if(errors){
    dispatch(userActions.clearErrors());
  }
},[dispatch, errors]);

useEffect(() => {
  dispatch(currentUser());
}, [dispatch]);

  return (
    <div className="App">
      {/* <Main/> */}
     <Router>
      <Routes>
        <Route path="/" element={<Main/>}>
          <Route index element={<PropertyList/>}/>
          <Route path="propertylist/:id" element={<PropertyListing/>}/>

          {/* user routes  */}
          <Route path="login" element={<Login/>}/>
          <Route path="signup" element={<Signup/>}/>
          <Route path="profile" element={<Profile/>}/>
          <Route path="editprofile" element={<PrivateRoute><EditProfile /></PrivateRoute>} />
          {/* Booking route  */}
          <Route path="user/mybookings" element={<PrivateRoute><MyBookings /></PrivateRoute>} />
          <Route path="user/mybookings/:bookingId" element={<PrivateRoute><BookingDetails /></PrivateRoute>} />
           
           {/* Payment Route  */}
          <Route path="payment/:propertyId" element={<PrivateRoute><Payment /></PrivateRoute>} />
                 
            {/* 404 Not found  */}
            <Route path="*" element={<NotFound/>}/>

            {/* Accomodation Routes  */}
            <Route path="accomodation" element={<PrivateRoute><Accomodation /></PrivateRoute>} />
            <Route path="accomodationform" element={<PrivateRoute><AccomodationForm /></PrivateRoute>} />

          </Route>
            <Route path="/user/forgotPassword" element={<ForgotPassword />} />
  <Route path="/user/resetPassword/:token" element={<ResetPassword />} />
  <Route path="/user/updatePassword" element={<UpdatePassword />} />

      </Routes>
     </Router>

    </div>
  );
}

export default App;
