import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="text-center p-5 bg-white rounded shadow">
                <h1>Welcome To Evently!</h1>
                <p>An online platform to book events</p>
                <div>
                    <button onClick={() => navigate('/signup')} className="btn btn-primary m-2">Signup</button>
                    <button onClick={() => navigate('/signin')} className="btn btn-secondary m-2">Login</button>
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;