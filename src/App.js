import { Route, Routes } from "react-router-dom";
import Signup from "./Authentication/Signup";
import Signin from "./Authentication/Signin";
import Events from "./Events/Events";
import WelcomePage from "./Welcome/Welcome";
import { AuthProvider } from "./AuthContext";
import Users from "./AllUsers/Users";
import Bookings from "./AllBookings/Bookings";
import MyBookings from "./MyBookings/MyBookings";
import Profile from "./MyProfile/Profile";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" Component={WelcomePage}></Route>
        <Route path="/signup" Component={Signup}></Route>
        <Route path="/signin" Component={Signin}></Route>
        <Route path="/events" Component={Events}></Route>
        <Route path="/users" Component={Users}></Route>
        <Route path="/bookings" Component={Bookings}></Route>
        <Route path="/mybookings" Component={MyBookings}></Route>
        <Route path="/profile" Component={Profile}></Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
