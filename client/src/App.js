import React from "react";
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
import Homefeed from "./pages/Homefeed";
import CocktailPage from "./pages/CocktailPage";
import CocktailCheckinPage from "./pages/CocktailCheckinPage";
import CocktailCheckins from "./pages/CocktailCheckins";

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
              path="/checkin/cocktail/:cocktailId"
              exact
              element={
                <AuthenticatedRoute>
                  <CocktailCheckinPage />
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
              path="/location/:locationId/checkins"
              exact
              element={
                <AuthenticatedRoute>
                  <LocationCheckins />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/cocktail/:cocktailId/checkins"
              exact
              element={
                <AuthenticatedRoute>
                  <CocktailCheckins />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/cocktail/:cocktailId"
              exact
              element={
                <AuthenticatedRoute>
                  <CocktailPage />
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
