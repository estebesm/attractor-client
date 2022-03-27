import './App.css';
import {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Auth from "./pages/auth/Auth";
import Profile from "./pages/profile/Profile";
import {getToken, getUser} from "./api/api";
import Repositories from "./pages/repositories/Repositories";
import Users from "./pages/users/Users";
import User from "./pages/user/User";
import Loading from "./components/loading/Loading";

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getToken()
            .then(token => {
                sessionStorage.setItem("token", token.toString());
                return token;
            })
            .then(token => getUser(token))
            .then(user => {
                setUser(user);
            });
        setLoading(false);
    }, []);

    return (
        <BrowserRouter>
            {loading ?
                <Loading/>
                :
                <div className="App">
                    {user ?
                        <Routes>
                            <Route path='/repositories' element={<Repositories user={user}/>}/>
                            <Route path='/profile' element={<Profile user={user} setUser={setUser}/>}/>}/>
                            <Route path='/users' element={<Users/>}/>
                            <Route path='/users/:user' element={<User/>}/>
                            <Route path='*' element={<Navigate to={`/profile`}/>}/>
                        </Routes>
                        :
                        <Auth/>
                    }
                </div>
            }
        </BrowserRouter>
    );
}

export default App;
