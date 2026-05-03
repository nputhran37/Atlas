import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
        <div style={{ 
            fontFamily: "'DM Sans', sans-serif", 
            background: 'var(--deep)', 
            color: 'var(--lime)', 
            minHeight: '100vh', 
            display: 'grid', 
            gridTemplateColumns: 'minmax(400px, 1fr) 1.2fr' 
        }}>
            {/* LEFT HERO PANEL */}
            <div className="hero-panel" style={{ 
                background: 'var(--slate)', 
                position: 'relative', 
                overflow: 'hidden', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between', 
                padding: '2.5rem 3.5rem' 
            }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(139, 190, 178, 0.07) 1.5px, transparent 1.5px)', backgroundSize: '28px 28px', pointerEvents: 'none' }}></div>
                <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(ellipse, rgba(56, 78, 119, 0.7) 0%, transparent 60%)', pointerEvents: 'none' }}></div>
                <div style={{ position: 'absolute', bottom: '-15%', left: '-5%', width: '400px', height: '400px', background: 'radial-gradient(ellipse, rgba(139, 190, 178, 0.1) 0%, transparent 65%)', pointerEvents: 'none' }}></div>

                <div style={{ position: 'relative', zIndex: 2 }}>
                    <Link to="/" style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 900, fontStyle: 'italic', color: 'var(--lime)', textDecoration: 'none', letterSpacing: '-0.02em' }}>
                        Atlas
                    </Link>
                </div>

                <div style={{ position: 'relative', zIndex: 2, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 900, lineHeight: 1.1, color: 'var(--lime)', marginBottom: '1.2rem' }}>
                        Join the<br/>community at<br/><em style={{ fontStyle: 'italic', color: 'var(--teal)' }}>DJSCE.</em>
                    </div>
                    <p style={{ fontSize: '0.92rem', fontWeight: 300, color: 'rgba(139, 190, 178, 0.6)', lineHeight: 1.7, maxWidth: '380px', marginBottom: '2.5rem' }}>
                        Create an account to report lost items and help others find their belongings. 
                    </p>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', background: 'rgba(13, 06, 48, 0.4)', border: '1px solid rgba(139, 190, 178, 0.14)', borderRadius: '12px', padding: '0.7rem 1rem', backdropFilter: 'blur(4px)' }}>
                            <span style={{ fontSize: '1.4rem' }}>💼</span>
                            <div style={{ fontSize: '0.78rem', color: 'rgba(230, 249, 175, 0.7)' }}><strong style={{ color: 'var(--lime)', display: 'block', fontWeight: 500 }}>Blue Canvas Tote</strong>Reported · Cafeteria</div>
                            <span style={{ marginLeft: 'auto', fontSize: '0.62rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0.18rem 0.6rem', borderRadius: '100px', background: 'rgba(230, 249, 175, 0.1)', color: 'var(--lime)', border: '1px solid rgba(230, 249, 175, 0.18)' }}>Lost</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', background: 'rgba(13, 06, 48, 0.4)', border: '1px solid rgba(139, 190, 178, 0.14)', borderRadius: '12px', padding: '0.7rem 1rem', backdropFilter: 'blur(4px)' }}>
                            <span style={{ fontSize: '1.4rem' }}>📱</span>
                            <div style={{ fontSize: '0.78rem', color: 'rgba(230, 249, 175, 0.7)' }}><strong style={{ color: 'var(--lime)', display: 'block', fontWeight: 500 }}>iPhone 13 (Blue)</strong>Found · 4th Floor Lab</div>
                            <span style={{ marginLeft: 'auto', fontSize: '0.62rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0.18rem 0.6rem', borderRadius: '100px', background: 'rgba(139, 190, 178, 0.15)', color: 'var(--teal)', border: '1px solid rgba(139, 190, 178, 0.22)' }}>Found</span>
                        </div>
                    </div>
                </div>

                <div style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <div className="hs-item">
                            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 900, color: 'var(--teal)' }}>12k+</div>
                            <div style={{ fontSize: '0.68rem', color: 'rgba(139, 190, 178, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>DJSCE Students</div>
                        </div>
                        <div className="hs-item">
                            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 900, color: 'var(--teal)' }}>350+</div>
                            <div style={{ fontSize: '0.68rem', color: 'rgba(139, 190, 178, 0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Daily Active Users</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT FORM PANEL */}
            <div style={{ background: 'var(--navy)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '3rem 3.5rem', overflowY: 'auto' }}>
                <div style={{ maxWidth: '480px', width: '100%', margin: '0 auto' }}>
                    
                    <div style={{ display: 'flex', background: 'rgba(13, 06, 48, 0.4)', border: '1px solid rgba(139, 190, 178, 0.12)', borderRadius: '100px', padding: '4px', marginBottom: '2rem', gap: '4px' }}>
                        <Link to="/login" style={{ flex: 1, padding: '0.55rem', borderRadius: '100px', border: 'none', background: 'transparent', color: 'rgba(139, 190, 178, 0.5)', fontWeight: 500, cursor: 'pointer', textDecoration: 'none', textAlign: 'center', fontSize: '0.88rem' }}>Sign In</Link>
                        <button style={{ flex: 1, padding: '0.55rem', borderRadius: '100px', border: 'none', background: 'var(--lime)', color: 'var(--deep)', fontWeight: 500, cursor: 'pointer' }}>Create Account</button>
                    </div>

                    <div className="auth-form active">
                        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 700, color: 'var(--lime)', marginBottom: '0.4rem' }}>
                            Join <em style={{ fontStyle: 'italic', color: 'var(--teal)' }}>Atlas.</em>
                        </div>
                        <p style={{ fontSize: '0.85rem', fontWeight: 300, color: 'rgba(139, 190, 178, 0.5)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                            Create your account to start reporting items at DJSCE.
                        </p>

                        {error && <div style={{ background: 'rgba(255,100,100,0.1)', border: '1px solid red', color: '#ff8888', padding: '0.8rem', borderRadius: '10px', marginBottom: '1.5rem', fontSize: '0.85rem' }}>{error}</div>}

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div className="form-group">
                                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(139, 190, 178, 0.45)', marginBottom: '0.35rem' }}>Full Name</label>
                                <input className="form-input" type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Arjun Mehta"
                                    style={{ width: '100%', background: 'rgba(13, 06, 48, 0.5)', border: '1px solid rgba(139, 190, 178, 0.18)', borderRadius: '12px', padding: '0.75rem 1rem', color: 'var(--lime)', outline: 'none' }} />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(139, 190, 178, 0.45)', marginBottom: '0.35rem' }}>Email</label>
                                    <input className="form-input" type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="name@email.com"
                                        style={{ width: '100%', background: 'rgba(13, 06, 48, 0.5)', border: '1px solid rgba(139, 190, 178, 0.18)', borderRadius: '12px', padding: '0.75rem 1rem', color: 'var(--lime)', outline: 'none' }} />
                                </div>
                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(139, 190, 178, 0.45)', marginBottom: '0.35rem' }}>Password</label>
                                    <input className="form-input" type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="••••••••"
                                        style={{ width: '100%', background: 'rgba(13, 06, 48, 0.5)', border: '1px solid rgba(139, 190, 178, 0.18)', borderRadius: '12px', padding: '0.75rem 1rem', color: 'var(--lime)', outline: 'none' }} />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(139, 190, 178, 0.45)', marginBottom: '0.35rem' }}>Year</label>
                                    <select name="year" value={formData.year} onChange={handleChange}
                                        style={{ width: '100%', background: 'rgba(13, 06, 48, 0.5)', border: '1px solid rgba(139, 190, 178, 0.18)', borderRadius: '12px', padding: '0.75rem 1rem', color: 'var(--lime)', outline: 'none' }}>
                                        <option value="FE">FE</option>
                                        <option value="SE">SE</option>
                                        <option value="TE">TE</option>
                                        <option value="BE">BE</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(139, 190, 178, 0.45)', marginBottom: '0.35rem' }}>Division</label>
                                    <input className="form-input" type="text" name="division" value={formData.division} onChange={handleChange} required placeholder="e.g. A"
                                        style={{ width: '100%', background: 'rgba(13, 06, 48, 0.5)', border: '1px solid rgba(139, 190, 178, 0.18)', borderRadius: '12px', padding: '0.75rem 1rem', color: 'var(--lime)', outline: 'none' }} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(139, 190, 178, 0.45)', marginBottom: '0.35rem' }}>Branch</label>
                                <select name="branch" value={formData.branch} onChange={handleChange}
                                    style={{ width: '100%', background: 'rgba(13, 06, 48, 0.5)', border: '1px solid rgba(139, 190, 178, 0.18)', borderRadius: '12px', padding: '0.75rem 1rem', color: 'var(--lime)', outline: 'none' }}>
                                    <option value="Computer Engineering">Computer Engineering</option>
                                    <option value="IT">IT</option>
                                    <option value="EXTC">EXTC</option>
                                    <option value="Mechanical">Mechanical</option>
                                    <option value="Data Science">Data Science</option>
                                    <option value="AI & ML">AI & ML</option>
                                </select>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(139, 190, 178, 0.45)', marginBottom: '0.35rem' }}>SAP ID</label>
                                    <input className="form-input" type="text" name="sapid" value={formData.sapid} onChange={handleChange} required placeholder="6000XXXXXXXX"
                                        style={{ width: '100%', background: 'rgba(13, 06, 48, 0.5)', border: '1px solid rgba(139, 190, 178, 0.18)', borderRadius: '12px', padding: '0.75rem 1rem', color: 'var(--lime)', outline: 'none' }} />
                                </div>
                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(139, 190, 178, 0.45)', marginBottom: '0.35rem' }}>Roll No</label>
                                    <input className="form-input" type="text" name="rollno" value={formData.rollno} onChange={handleChange} required placeholder="e.g. 45"
                                        style={{ width: '100%', background: 'rgba(13, 06, 48, 0.5)', border: '1px solid rgba(139, 190, 178, 0.18)', borderRadius: '12px', padding: '0.75rem 1rem', color: 'var(--lime)', outline: 'none' }} />
                                </div>
                            </div>

                            <button type="submit" disabled={loading} className="btn-submit"
                                style={{ width: '100%', background: 'var(--lime)', color: 'var(--deep)', padding: '0.9rem', border: 'none', borderRadius: '100px', fontSize: '1rem', fontWeight: 500, cursor: 'pointer', marginTop: '0.5rem' }}>
                                {loading ? 'Creating Account...' : 'Create Account →'}
                            </button>

                            <div style={{ fontSize: '0.74rem', color: 'rgba(139, 190, 178, 0.3)', textAlign: 'center', marginTop: '1rem', lineHeight: 1.6 }}>
                                By signing up, you agree to our <a href="#" style={{ color: 'inherit' }}>Terms of Use</a> and <a href="#" style={{ color: 'inherit' }}>Privacy Policy</a>.
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
