import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./Homepage";
import Signin from "./Signin";
import GlobalStyles from "./GlobalStyles";
import { AuthenticatedRoute } from "./auth/AuthenticatedRoute";
import { AuthProvider } from "./auth/AuthContext";

function App() {
  return (
    <Router>
      <GlobalStyles />
      <div>
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              exact
              element={
                <AuthenticatedRoute>
                  <Homepage />
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
