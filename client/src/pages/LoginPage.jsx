import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (response.ok) {
                login(data);
                navigate('/');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Network error. Please check if server is running.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ background: 'var(--slate)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <main style={{ flex: 1, padding: '8rem 2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ maxWidth: '450px', width: '100%', background: 'var(--deep)', border: '1px solid rgba(139,190,178,0.2)', padding: '3rem', borderRadius: '20px', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', color: 'var(--lime)', marginBottom: '0.5rem' }}>Welcome <span style={{ color: 'var(--teal)', fontStyle: 'italic' }}>Back</span></h2>
                    <p style={{ color: 'rgba(230,249,175,0.7)', marginBottom: '2.5rem' }}>Sign in to continue to Atlas.</p>

                    {error && <div style={{ background: 'rgba(255,100,100,0.1)', border: '1px solid red', color: '#ff8888', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>{error}</div>}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', color: 'var(--teal)', marginBottom: '0.5rem', fontSize: '0.8rem', textTransform: 'uppercase' }}>Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required
                                style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(139,190,178,0.2)', borderRadius: '10px', color: 'white' }} />
                        </div>

                        <div>
                            <label style={{ display: 'block', color: 'var(--teal)', marginBottom: '0.5rem', fontSize: '0.8rem', textTransform: 'uppercase' }}>Password</label>
                            <input type="password" name="password" value={formData.password} onChange={handleChange} required
                                style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(139,190,178,0.2)', borderRadius: '10px', color: 'white' }} />
                        </div>

                        <button type="submit" disabled={loading}
                            style={{ background: 'var(--lime)', color: 'var(--deep)', padding: '1.2rem', borderRadius: '100px', fontSize: '1.1rem', fontWeight: 'bold', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '1rem' }}>
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>

                        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
                            New here? <Link to="/register" style={{ color: 'var(--teal)', textDecoration: 'none' }}>Create an account</Link>
                        </p>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default LoginPage;
