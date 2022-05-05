import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Signin from "./pages/Signin";
import GlobalStyles from "./GlobalStyles";
import { AuthenticatedRoute } from "./auth/AuthenticatedRoute";
import { AuthProvider } from "./auth/AuthContext";
import LocationPage from "./pages/LocationPage";
import CheckinPage from "./pages/CheckinPage";
import UserCheckins from "./pages/UserCheckins";
import Header from "./components/Header";
import UnstirrdLogo from "./Unstirrd.png";
import LocationCheckins from "./pages/LocationCheckins";
import MyProfilePage from "./pages/MyProfilePage";
import ProfilePage from "./pages/ProfilePage";
import Homefeed from "./pages/Homefeed";

function App() {
  return (
    <Router>
      <GlobalStyles />
      <div>
        <AuthProvider>
          <Header UnstirrdLogo={UnstirrdLogo} />
          <Routes>
            <Route
              path="/"
              exact
              element={
                <AuthenticatedRoute>
                  <HomePage />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/location/:locationId"
              exact
              element={
                <AuthenticatedRoute>
                  <LocationPage />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/checkin/:locationId"
              exact
              element={
                <AuthenticatedRoute>
                  <CheckinPage />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/profile/:userId/checkins"
              exact
              element={
                <AuthenticatedRoute>
                  <UserCheckins />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/my-profile"
              exact
              element={
                <AuthenticatedRoute>
                  <MyProfilePage />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/profile/:userId"
              exact
              element={
                <AuthenticatedRoute>
                  <ProfilePage />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/location/:locationId/checkins"
              exact
              element={
                <AuthenticatedRoute>
                  <LocationCheckins />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/homefeed"
              exact
              element={
                <AuthenticatedRoute>
                  <Homefeed />
                </AuthenticatedRoute>
              }
            />

            <Route path="/signin" element={<Signin />}></Route>
          </Routes>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
