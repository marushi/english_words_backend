import ReactDOM from 'react-dom/client';
import '../src/index.css';
import React from 'react';

const App = () => {
    return (
        <React.StrictMode>
            <div>
                <h1>Sign In</h1>
                <hr />
                <a href="http://localhost:53000/authentication/sign_in">Sign In with Google</a>
            </div>
        </React.StrictMode >
    );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);