import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Signin from "./pages/Signin";
import GlobalStyles from "./GlobalStyles";
import { AuthenticatedRoute } from "./auth/AuthenticatedRoute";
import { AuthProvider } from "./auth/AuthContext";
import LocationPage from "./pages/LocationPage";
import CheckinPage from "./pages/CheckinPage";
import MyCheckins from "./pages/MyCheckins";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <GlobalStyles />
      <div>
        <AuthProvider>
          <Header />
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
                // <AuthenticatedRoute>
                <LocationPage />
                // </AuthenticatedRoute>
              }
            />
            <Route
              path="/checkin/:locationId"
              exact
              element={
                // <AuthenticatedRoute>
                <CheckinPage />
                // </AuthenticatedRoute>
              }
            />
            <Route
              path="/my-checkins"
              exact
              element={
                // <AuthenticatedRoute>
                <MyCheckins />
                // </AuthenticatedRoute>
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
