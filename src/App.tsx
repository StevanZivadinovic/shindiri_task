import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { useEffect, useState } from "react";
import Characters from "./pages/Characters";
import { logout } from "./auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { CharacterProvider } from "./context/CharacterContext";
import { QueryClient, QueryClientProvider } from "react-query";
import SingleCharacter from "./pages/SingleCharacter";
import SingleLocation from "./pages/SingleLocation";
const queryClient = new QueryClient();
function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      const userToken = localStorage.getItem("userToken");

      if (user?.uid || (userToken && userToken?.length > 0)) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  });

  const handleLogout = () => {
    console.log("haj");
    logout();
    setAuthenticated(false);
    navigate("/");
  };
  console.log(authenticated);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <CharacterProvider>
        <div>
          {/* Navigation Links */}
          <nav className="p-4 flex justify-end">
            <Link to="/characters" className="mr-4">
              Characters
            </Link>
            <Link
              to="#"
              className="mr-4"
              onClick={() => {
                handleLogout();
              }}
            >
              Logout
            </Link>
          </nav>
          {/* Sve je moglo samo preko user objecta koji vraca firebase, ali posto u zahtevu zadatka stoji da se trazi i token
  onda sam dodao da uslov za prikazivabje stranice bude i postojanje tokena u localStorage      
*/}
          <Routes>
            <Route
              path="/"
              element={
                authenticated ? <Navigate to="/characters" /> : <Login />
              }
            />
            <Route
              path="/signup"
              element={
                authenticated ? <Navigate to="/characters" /> : <SignUp />
              }
            />

            {/* Protected route */}
            <Route
              path="/characters"
              element={authenticated ? <Characters /> : <Navigate to="/" />}
            />
            <Route
              path="/characters/:id"
              element={authenticated ? <SingleCharacter /> : <Navigate to="/" />}
            />
             <Route
              path="/location/:id"
              element={authenticated ? <SingleLocation /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </CharacterProvider>
    </QueryClientProvider>
  );
}

export default App;
