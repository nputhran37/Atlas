import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        year: 'FE',
        branch: 'Computer Engineering',
        division: '',
        sapid: '',
        rollno: ''
    });
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
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (response.ok) {
                login(data);
                navigate('/');
            } else {
                setError(data.message || 'Registration failed');
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
            <main style={{ flex: 1, padding: '8rem 2rem', display: 'flex', justifyContent: 'center' }}>
                <div style={{ maxWidth: '600px', width: '100%', background: 'var(--deep)', border: '1px solid rgba(139,190,178,0.2)', padding: '3rem', borderRadius: '20px', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', color: 'var(--lime)', marginBottom: '0.5rem' }}>Create <span style={{ color: 'var(--teal)', fontStyle: 'italic' }}>Account</span></h2>
                    <p style={{ color: 'rgba(230,249,175,0.7)', marginBottom: '2rem' }}>Join the Atlas community at DJSCE.</p>

                    {error && <div style={{ background: 'rgba(255,100,100,0.1)', border: '1px solid red', color: '#ff8888', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem' }}>{error}</div>}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        <div>
                            <label style={{ display: 'block', color: 'var(--teal)', marginBottom: '0.5rem', fontSize: '0.8rem', textTransform: 'uppercase' }}>Full Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required
                                style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(139,190,178,0.2)', borderRadius: '10px', color: 'white' }} />
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', color: 'var(--teal)', marginBottom: '0.5rem', fontSize: '0.8rem', textTransform: 'uppercase' }}>Email</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} required
                                    style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(139,190,178,0.2)', borderRadius: '10px', color: 'white' }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', color: 'var(--teal)', marginBottom: '0.5rem', fontSize: '0.8rem', textTransform: 'uppercase' }}>Password</label>
                                <input type="password" name="password" value={formData.password} onChange={handleChange} required
                                    style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(139,190,178,0.2)', borderRadius: '10px', color: 'white' }} />
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', color: 'var(--teal)', marginBottom: '0.5rem', fontSize: '0.8rem', textTransform: 'uppercase' }}>Year</label>
                                <select name="year" value={formData.year} onChange={handleChange}
                                    style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(139,190,178,0.2)', borderRadius: '10px', color: 'white' }}>
                                    <option value="FE">First Year (FE)</option>
                                    <option value="SE">Second Year (SE)</option>
                                    <option value="TE">Third Year (TE)</option>
                                    <option value="BE">Fourth Year (BE)</option>
                                </select>
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', color: 'var(--teal)', marginBottom: '0.5rem', fontSize: '0.8rem', textTransform: 'uppercase' }}>Branch</label>
                                <select name="branch" value={formData.branch} onChange={handleChange}
                                    style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(139,190,178,0.2)', borderRadius: '10px', color: 'white' }}>
                                    <option value="Computer Engineering">Computer Engineering</option>
                                    <option value="IT">IT</option>
                                    <option value="EXTC">EXTC</option>
                                    <option value="Mechanical">Mechanical</option>
                                    <option value="Data Science">Data Science</option>
                                    <option value="AI \u0026 ML">AI \u0026 ML</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', color: 'var(--teal)', marginBottom: '0.5rem', fontSize: '0.8rem', textTransform: 'uppercase' }}>Division</label>
                                <input type="text" name="division" value={formData.division} onChange={handleChange} required placeholder="e.g. A"
                                    style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(139,190,178,0.2)', borderRadius: '10px', color: 'white' }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', color: 'var(--teal)', marginBottom: '0.5rem', fontSize: '0.8rem', textTransform: 'uppercase' }}>Roll No</label>
                                <input type="text" name="rollno" value={formData.rollno} onChange={handleChange} required
                                    style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(139,190,178,0.2)', borderRadius: '10px', color: 'white' }} />
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', color: 'var(--teal)', marginBottom: '0.5rem', fontSize: '0.8rem', textTransform: 'uppercase' }}>SAP ID</label>
                            <input type="text" name="sapid" value={formData.sapid} onChange={handleChange} required placeholder="600012100XX"
                                style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(139,190,178,0.2)', borderRadius: '10px', color: 'white' }} />
                        </div>

                        <button type="submit" disabled={loading}
                            style={{ background: 'var(--lime)', color: 'var(--deep)', padding: '1rem', borderRadius: '100px', fontSize: '1rem', fontWeight: 'bold', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '1rem' }}>
                            {loading ? 'Creating Account...' : 'Register Now'}
                        </button>

                        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
                            Already have an account? <Link to="/login" style={{ color: 'var(--teal)', textDecoration: 'none' }}>Login here</Link>
                        </p>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default RegisterPage;
