import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Characters from "./pages/Characters";
import { CharacterProvider } from "./context/CharacterContext";
import { QueryClient, QueryClientProvider } from "react-query";
import SingleCharacter from "./pages/SingleCharacter";
import SingleLocation from "./pages/SingleLocation";
import SingleEpisode from "./pages/SingleEpisode";
import { handleLogout } from "./helperFunctions/global";
import useAuth from "./hooks/useAuth";

const queryClient = new QueryClient();
function App() {
  const { authenticated, setAuthenticated, loading, user } = useAuth();
  const navigate = useNavigate();
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <CharacterProvider>
        <div>
          {/* Navigation Links */}
          <nav className={`p-4 flex ${authenticated ? 'justify-between' :'justify-end'}`}>
           {
            authenticated && <div className="text-xl">
              <h3>
                <span>Logged as: </span>{" "}
                <span className="font-bold">{user?.displayName}</span>
              </h3>
            </div>
           } 
            <div className="">
              <Link to="/characters" className="mr-4">
                Characters
              </Link>
              <Link
                to="#"
                className="mr-4"
                onClick={() => {
                  handleLogout(setAuthenticated, navigate);
                }}
              >
                Logout
              </Link>
            </div>
          </nav>
          {/* Sve je moglo samo preko user objecta koji vraca firebase ili samo preko tokena, ali posto u zahtevu zadatka stoji da se trazi i token
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
              element={
                authenticated ? <SingleCharacter /> : <Navigate to="/" />
              }
            />
            <Route
              path="/location/:id"
              element={authenticated ? <SingleLocation /> : <Navigate to="/" />}
            />
            <Route
              path="/episode/:id"
              element={authenticated ? <SingleEpisode /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </CharacterProvider>
    </QueryClientProvider>
  );
}

export default App;
