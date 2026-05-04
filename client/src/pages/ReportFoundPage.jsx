import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

const ReportFoundPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Electronics',
        color: '',
        location: 'Library',
        area: '',
        dateFound: '',
        timeFound: '',
        contactInfo: user?.email || '',
        handoverPreference: 'drop_point', // 'meetup' or 'drop_point'
        dropPointSelect: 'Security Desk',
        customDetails: '',
    });
    
    const [questions, setQuestions] = useState(['', '']);
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState({ loading: false, success: false, error: null });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleQuestionChange = (index, value) => {
        const newQuestions = [...questions];
        newQuestions[index] = value;
        setQuestions(newQuestions);
    };

    const addQuestion = () => {
        if (questions.length < 5) setQuestions([...questions, '']);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const filledQuestions = questions.filter(q => q.trim() !== '');
        if (filledQuestions.length < 2) {
            setStatus({ loading: false, success: false, error: 'Please provide at least 2 verification questions.' });
            return;
        }

        setStatus({ loading: true, success: false, error: null });

        let finalHandoverDetails = formData.customDetails;
        if (formData.handoverPreference === 'drop_point' && formData.dropPointSelect !== 'Other') {
            finalHandoverDetails = formData.dropPointSelect;
        }

        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        data.append('type', 'found');
        data.append('dateLost', formData.dateFound); // Map to DB schema
        data.append('timeLost', formData.timeFound); // Map to DB schema
        data.append('handoverDetails', finalHandoverDetails);
        data.append('questions', JSON.stringify(filledQuestions));
        if (image) data.append('image', image);

        try {
            const response = await fetch('http://localhost:5000/api/items', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${user.token}` },
                body: data,
            });

            if (response.ok) {
                setStatus({ loading: false, success: true, error: null });
            } else {
                const errorData = await response.json();
                setStatus({ loading: false, success: false, error: errorData.message || 'Failed to submit.' });
            }
        } catch (error) {
            setStatus({ loading: false, success: false, error: 'Network error.' });
        }
    };

    return (
        <div style={{ background: 'var(--deep)', minHeight: '100vh', color: 'var(--lime)' }}>
            <Navbar />
            
            <div style={{ display: 'grid', gridTemplateColumns: '40% 60%', minHeight: '100vh' }}>
                {/* LEFT PANEL */}
                <div style={{ background: 'var(--navy)', padding: '8rem 3.5rem 4rem', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: '20%', right: '-15%', width: '400px', height: '400px', background: 'radial-gradient(ellipse, rgba(139, 190, 178, 0.1) 0%, transparent 65%)', pointerEvents: 'none' }}></div>
                    <div style={{ position: 'relative', zIndex: 2 }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(139, 190, 178, 0.1)', border: '1px solid rgba(139, 190, 178, 0.22)', color: 'var(--teal)', fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.35rem 0.9rem', borderRadius: '100px', marginBottom: '2rem' }}>
                            🤝 Found Something?
                        </div>
                        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '3rem', fontWeight: 900, color: 'var(--lime)', lineHeight: 1.1, marginBottom: '1.2rem' }}>
                            Help someone<br />get it <em style={{ fontStyle: 'italic', color: 'var(--teal)' }}>back.</em>
                        </h1>
                        <p style={{ fontSize: '0.92rem', fontWeight: 300, lineHeight: 1.8, color: 'rgba(139, 190, 178, 0.6)', marginBottom: '2.5rem', maxWidth: '360px' }}>
                            Found an item on campus? Log it here and we'll track down its owner. It only takes two minutes and makes a real difference.
                        </p>
                        
                        <div style={{ background: 'rgba(139, 190, 178, 0.06)', border: '1px solid rgba(139, 190, 178, 0.15)', borderRadius: '18px', padding: '1.5rem' }}>
                            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', fontWeight: 700, color: 'var(--lime)', marginBottom: '0.5rem' }}>🌟 The Atlas Community</div>
                            <div style={{ fontSize: '0.82rem', fontWeight: 300, color: 'rgba(139, 190, 178, 0.55)', lineHeight: 1.7, marginBottom: '1.2rem' }}>Every submission helps someone — it might be a wallet, a laptop, or a set of house keys.</div>
                            <div style={{ display: 'flex', gap: '1.5rem' }}>
                                <div><div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', color: 'var(--teal)' }}>1,240</div><div style={{ fontSize: '0.7rem', color: 'rgba(139, 190, 178, 0.4)' }}>Items Returned</div></div>
                                <div><div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', color: 'var(--teal)' }}>89%</div><div style={{ fontSize: '0.7rem', color: 'rgba(139, 190, 178, 0.4)' }}>Recovery Rate</div></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT PANEL */}
                <div style={{ background: 'var(--navy)', padding: '8rem 2.5rem 4rem', overflowY: 'auto' }}>
                    <div style={{ fontSize: '1.5rem', fontFamily: "'Playfair Display', serif", fontWeight: 700, color: 'var(--lime)', marginBottom: '0.4rem' }}>Log a Found Item</div>
                    <p style={{ fontSize: '0.85rem', color: 'rgba(139, 190, 178, 0.5)', marginBottom: '2rem' }}>Tell us what you found and where.</p>

                    <form onSubmit={handleSubmit}>
                        <div style={{ color: 'var(--teal)', fontSize: '0.9rem', marginBottom: '1rem', fontFamily: "'Playfair Display', serif" }}>📦 Item Information</div>
                        <div className="form-group" style={{ marginBottom: '1.3rem' }}>
                            <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 500, color: 'rgba(139, 190, 178, 0.5)', marginBottom: '0.45rem' }}>Item Name *</label>
                            <input className="form-input" name="title" value={formData.title} onChange={handleChange} required placeholder="e.g. Black Sony Headphones" style={{ width: '100%', background: 'rgba(13, 6, 48, 0.5)', border: '1px solid rgba(139, 190, 178, 0.18)', borderRadius: '12px', padding: '0.85rem 1rem', color: 'var(--lime)', outline: 'none' }} />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.3rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.72rem', color: 'rgba(139, 190, 178, 0.5)', marginBottom: '0.45rem' }}>Category *</label>
                                <select name="category" value={formData.category} onChange={handleChange} style={{ width: '100%', background: 'rgba(13, 6, 48, 0.5)', border: '1px solid rgba(139, 190, 178, 0.18)', borderRadius: '12px', padding: '0.85rem 1rem', color: 'var(--lime)', outline: 'none' }}>
                                    <option>Electronics</option>
                                    <option>Bags & Luggage</option>
                                    <option>Keys & Cards</option>
                                    <option>Clothing</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.72rem', color: 'rgba(139, 190, 178, 0.5)', marginBottom: '0.45rem' }}>Color</label>
                                <input className="form-input" name="color" value={formData.color} onChange={handleChange} placeholder="e.g. Black" style={{ width: '100%', background: 'rgba(13, 6, 48, 0.5)', border: '1px solid rgba(139, 190, 178, 0.18)', borderRadius: '12px', padding: '0.85rem 1rem', color: 'var(--lime)', outline: 'none' }} />
                            </div>
                        </div>

                        <div className="form-group" style={{ marginBottom: '1.3rem' }}>
                            <label style={{ display: 'block', fontSize: '0.72rem', color: 'rgba(139, 190, 178, 0.5)', marginBottom: '0.45rem' }}>Description *</label>
                            <textarea className="form-textarea" name="description" value={formData.description} onChange={handleChange} required placeholder="Distinguishing marks, labels..." style={{ width: '100%', background: 'rgba(13, 6, 48, 0.5)', border: '1px solid rgba(139, 190, 178, 0.18)', borderRadius: '12px', padding: '0.85rem 1rem', color: 'var(--lime)', outline: 'none', resize: 'vertical', minHeight: '90px' }}></textarea>
                        </div>

                        <div style={{ color: 'var(--teal)', fontSize: '0.9rem', marginBottom: '1rem', marginTop: '2rem', fontFamily: "'Playfair Display', serif" }}>📍 Location & Time</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.3rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.72rem', color: 'rgba(139, 190, 178, 0.5)', marginBottom: '0.45rem' }}>Campus Location *</label>
                                <select name="location" value={formData.location} onChange={handleChange} style={{ width: '100%', background: 'rgba(13, 6, 48, 0.5)', border: '1px solid rgba(139, 190, 178, 0.18)', borderRadius: '12px', padding: '0.85rem 1rem', color: 'var(--lime)', outline: 'none' }}>
                                    <option>Library</option>
                                    <option>Cafeteria</option>
                                    <option>Gymnasium</option>
                                    <option>A Block</option>
                                    <option>B Block</option>
                                    <option>Hostel</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.72rem', color: 'rgba(139, 190, 178, 0.5)', marginBottom: '0.45rem' }}>Specific Spot</label>
                                <input className="form-input" name="area" value={formData.area} onChange={handleChange} placeholder="e.g. Floor 2" style={{ width: '100%', background: 'rgba(13, 6, 48, 0.5)', border: '1px solid rgba(139, 190, 178, 0.18)', borderRadius: '12px', padding: '0.85rem 1rem', color: 'var(--lime)', outline: 'none' }} />
                            </div>
                        </div>

                        <div style={{ color: 'var(--teal)', fontSize: '0.9rem', marginBottom: '1rem', marginTop: '2rem', fontFamily: "'Playfair Display', serif" }}>🛡️ Verification Questions</div>
                        <p style={{ fontSize: '0.75rem', color: 'rgba(139, 190, 178, 0.5)', marginBottom: '1rem' }}>Ask 2-5 questions only the real owner could answer.</p>
                        {questions.map((q, idx) => (
                            <div key={idx} style={{ marginBottom: '0.8rem' }}>
                                <input className="form-input" value={q} onChange={(e) => handleQuestionChange(idx, e.target.value)} placeholder={`Question ${idx + 1}`} style={{ width: '100%', background: 'rgba(13, 6, 48, 0.5)', border: '1px solid rgba(139, 190, 178, 0.18)', borderRadius: '12px', padding: '0.85rem 1rem', color: 'var(--lime)', outline: 'none' }} />
                            </div>
                        ))}
                        {questions.length < 5 && (
                            <button type="button" onClick={addQuestion} style={{ width: '100%', background: 'transparent', color: 'var(--lime)', border: '1px dashed var(--lime)', borderRadius: '10px', padding: '0.6rem', cursor: 'pointer', fontSize: '0.8rem' }}>+ Add Question</button>
                        )}

                        <div style={{ color: 'var(--teal)', fontSize: '0.9rem', marginBottom: '1rem', marginTop: '2rem', fontFamily: "'Playfair Display', serif" }}>🏢 Handover Method</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                            {[
                                { id: 'drop_point', title: 'Security Desk', sub: 'Hand it to Block C Security Desk.' },
                                { id: 'meetup', title: 'Contact Me', sub: 'I will coordinate with the owner.' }
                            ].map(opt => (
                                <div key={opt.id} onClick={() => setFormData({...formData, handoverPreference: opt.id})} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', background: formData.handoverPreference === opt.id ? 'rgba(139, 190, 178, 0.08)' : 'rgba(13, 6, 48, 0.4)', border: formData.handoverPreference === opt.id ? '1px solid var(--teal)' : '1px solid rgba(139, 190, 178, 0.14)', borderRadius: '12px', padding: '1rem 1.2rem', cursor: 'pointer' }}>
                                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2px solid var(--teal)', flexShrink: 0, marginTop: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {formData.handoverPreference === opt.id && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--teal)' }}></div>}
                                    </div>
                                    <div>
                                        <strong style={{ display: 'block', fontSize: '0.88rem', color: 'var(--lime)' }}>{opt.title}</strong>
                                        <span style={{ fontSize: '0.78rem', color: 'rgba(139, 190, 178, 0.5)' }}>{opt.sub}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {status.error && <div style={{ color: '#ff8888', marginTop: '1rem', fontSize: '0.85rem' }}>{status.error}</div>}

                        <button type="submit" disabled={status.loading} style={{ width: '100%', background: 'var(--lime)', color: 'var(--deep)', padding: '1rem', border: 'none', borderRadius: '100px', fontSize: '1rem', fontWeight: 500, cursor: 'pointer', marginTop: '2rem' }}>
                            {status.loading ? 'Uploading...' : 'Submit Found Item →'}
                        </button>
                    </form>
                </div>
            </div>

            {status.success && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(13, 6, 48, 0.92)', backdropFilter: 'blur(10px)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ background: 'var(--navy)', border: '1px solid rgba(139, 190, 178, 0.2)', borderRadius: '28px', padding: '3rem', maxWidth: '440px', width: '90%', textAlign: 'center' }}>
                        <span style={{ fontSize: '4rem', display: 'block', marginBottom: '1.5rem' }}>🤝</span>
                        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.9rem', color: 'var(--lime)', marginBottom: '0.7rem' }}>Thank you!</div>
                        <p style={{ fontSize: '0.88rem', color: 'rgba(139, 190, 178, 0.6)', lineHeight: 1.7, marginBottom: '2rem' }}>Your found item has been logged. We're already searching for its owner.</p>
                        <button onClick={() => navigate('/dashboard')} style={{ display: 'block', width: '100%', background: 'var(--lime)', color: 'var(--deep)', padding: '0.9rem', borderRadius: '100px', fontWeight: 500, cursor: 'pointer', border: 'none', marginBottom: '0.7rem' }}>View in Dashboard →</button>
                        <button onClick={() => navigate('/browse')} style={{ display: 'block', width: '100%', background: 'transparent', color: 'var(--teal)', padding: '0.9rem', borderRadius: '100px', border: '1px solid rgba(139, 190, 178, 0.25)', cursor: 'pointer' }}>Browse All Items</button>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default ReportFoundPage;
