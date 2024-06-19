import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Student from "./components/Student/Student";
import Staff from "./components/Staff";
import Admin from "./components/Admin";
import LayOut from "./components/Layout";
import NoPage from "./components/NoPage";
import ApplyLeave from "./components/Student/ApplyLeave";
import ViewLeave from "./components/Student/ViewLeave";
import ViewLeaveBalance from "./components/Student/ViewLeaveBalance";
import Profile from "./components/Student/Profile";
import EditProfile from "./components/Student/EditProfile";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" index element={<SignIn />} />
        <Route path="/" element={<LayOut />}>
          <Route path="/student" element={<Student />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/applyleave" element={<ApplyLeave />} />
          <Route path="/viewleave" element={<ViewLeave />} />
          <Route path="/viewleavebalance" element={<ViewLeaveBalance />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/editProfile" element={<EditProfile />} />
        </Route>
        <Route path="*" element={<NoPage />} />
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
