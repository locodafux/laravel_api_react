import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext"

export default function Register() {
    const navigate = useNavigate();
    const { setToken } = useContext(AppContext)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [errors, setErrors] = useState({});

    async function handleRegister(e) {
        e.preventDefault();
        const res = await fetch('/api/register', {
            method: 'post',
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        
        if (data.errors) {
            setErrors(data.errors)
        } else {
            localStorage.setItem('token', data.token);
            setToken(data.token);
            navigate("/");
        }
    }
    return (
        <>
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                Register a new account
            </h1>

            <form onSubmit={handleRegister} className="w-1/2 mx-auto space-y-6">
                <div>
                    <input className="auth-input" type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    {errors.name && <p className="error">{errors.name[0]}</p>}
                </div>

                <div>
                    <input className="auth-input" type="text" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    {errors.email && <p className="error">{errors.email[0]}</p>}
                </div>

                <div>
                    <input className="auth-input" type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                    {errors.password && <p className="error">{errors.password[0]}</p>}
                </div>

                <div>
                    <input className="auth-input" type="password" placeholder="Password Confirmation" value={formData.password_confirmation} onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })} />
                </div>

                <button className="auth-button">Register</button>
            </form>
        </>
    )
}