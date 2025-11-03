import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext"

export default function Login() {
    const navigate = useNavigate();
    const { setToken } = useContext(AppContext)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    async function handleLogin(e) {
        e.preventDefault();
        const res = await fetch('/api/login', {
            method: 'post',
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        
        console.log(data);
        if (data.errors) {
            setErrors(data.errors)
        } else {
            localStorage.setItem('token', data.token);
            setToken(data.token);
        }
    }
    return (
        <>
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
               Login to your account
            </h1>

            <form onSubmit={handleLogin} className="w-1/2 mx-auto space-y-6">

                <div>
                    <input className="auth-input" type="text" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    {errors.email && <p className="error">{errors.email[0]}</p>}
                </div>

                <div>
                    <input className="auth-input" type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                    {errors.password && <p className="error">{errors.password[0]}</p>}
                </div>

                <button className="auth-button">Login</button>
            </form>
        </>
    )
}
