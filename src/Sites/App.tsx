import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Scripts from './ApiCalls';

function App() {
    let navigate = useNavigate();

    const Login = async () => {
        const loginValue = (document.getElementById("Login") as HTMLInputElement).value;
        let data = await Scripts.getAllUsers();
        const userFound = data.find((user: { username: string, id: number }) => user.username == loginValue);

        if (userFound != null) {
            navigate("/MainView/" + userFound.id);
        } else {
            alert("Niepoprawne dane");
        }
    };

    return (
        <div className="App">
            <p id="Gelerianka">Galerianka</p>
            <input id="Login" placeholder="Login" />
            <button id="LoginButton" onClick={Login}>Zaloguj</button>
        </div>
    );
}

export default App;
