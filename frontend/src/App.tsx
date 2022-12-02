import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { apiService } from './service/apiService';
import './global.scss';

import { 
    Login,
    Profile,
    Explore,
    Reservations,
    Restaurant,
    Signup,
    EditUser
} from './pages';
import { useEffect, useState } from 'react';
import { IUser } from './types';
import { Spinner } from './components';

function App() {
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiService.continueSession().then(res =>{
            if(res.succes){
                setUser(res.data);
            }
            setLoading(false);
        })
    }, [])
    
    if (loading){
        return (<Spinner/>)
    }

    return (
        <BrowserRouter>
            {!user && (
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login setUser={setUser}/>} />
                    <Route path="/*" element={<Navigate to={'/login'}/>} />
                </Routes>
            )}

            {user && (
                <Routes>
                    <Route path="/" element={<Explore />} />
                    <Route path="/reservations" element={<Reservations />} />
                    <Route path="/restaurant/:id" element={<Restaurant  />} />
                    <Route path="/profile" element={<Profile user={user} setUser={setUser}/>} />
                    <Route path="/editUser" element= {<EditUser user={user} setUser={setUser}/>} />
                    <Route path="/*" element={<Navigate to={'/'}/>} />
                </Routes>
            )}
        </BrowserRouter>
    );
}

export default App;
