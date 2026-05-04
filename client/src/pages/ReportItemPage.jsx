import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

const ReportItemPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Electronics',
        brand: '',
        color: '',
        location: 'Library',
        area: '',
        dateLost: '',
        timeLost: '',
        contactInfo: user?.email || '',
        mobile: ''
    });
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState({ loading: false, success: false, error: null });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, success: false, error: null });

        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        data.append('type', 'lost');
        if (image) data.append('image', image);

        try {
            const response = await fetch('http://localhost:5000/api/items', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${user.token}` },
                body: data
            });

            if (response.ok) {
                setStatus({ loading: false, success: true, error: null });
                setStep(5);
            } else {
                const errorData = await response.json();
                setStatus({ loading: false, success: false, error: errorData.message || 'Failed to submit.' });
            }
        } catch (error) {
            setStatus({ loading: false, success: false, error: 'Network error.' });
        }
    };

    const renderStepProgress = () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0', marginBottom: '3rem' }}>
            {[1, 2, 3, 4].map((s, idx) => (
                <React.Fragment key={s}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
                        <div style={{ 
                            width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 500, flex_shrink: 0,
                            background: step > s ? 'var(--teal)' : step === s ? 'var(--lime)' : 'rgba(56, 78, 119, 0.5)',
                            color: 'var(--deep)',
                            border: step < s ? '1px solid rgba(139, 190, 178, 0.15)' : 'none'
                        }}>
                            {step > s ? '✓' : s}
                        </div>
                        <span style={{ fontSize: '0.72rem', fontWeight: 500, color: step >= s ? (step > s ? 'var(--teal)' : 'var(--lime)') : 'rgba(139, 190, 178, 0.35)' }}>
                            {['Item', 'Location', 'Details', 'Review'][idx]}
                        </span>
                    </div>
                    {idx < 3 && (
                        <div style={{ flex: 1, height: '1px', background: step > s ? 'var(--teal)' : 'rgba(139, 190, 178, 0.15)', margin: '0 0.5rem' }}></div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );

    return (
        <div style={{ background: 'var(--deep)', minHeight: '100vh', color: 'var(--lime)' }}>
            <Navbar />
            
            <div style={{ display: 'grid', gridTemplateColumns: '40% 60%', minHeight: '100vh' }}>
                {/* LEFT PANEL */}
                <div style={{ background: 'var(--slate)', padding: '8rem 3.5rem 4rem', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'relative', zIndex: 2 }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(13, 6, 48, 0.4)', border: '1px solid rgba(139, 190, 178, 0.2)', color: 'var(--teal)', fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.35rem 0.9rem', borderRadius: '100px', marginBottom: '2rem' }}>
                            📝 Report a Lost Item
                        </div>
                        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '3.2rem', fontWeight: 900, color: 'var(--lime)', lineHeight: 1.1, marginBottom: '1.2rem' }}>
                            Tell us what<br />you <em style={{ fontStyle: 'italic', color: 'var(--teal)' }}>lost.</em>
                        </h1>
                        <p style={{ fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.8, color: 'rgba(230, 249, 175, 0.6)', marginBottom: '3rem', maxWidth: '360px' }}>
                            The more detail you give us, the faster we can match your item. Reports are reviewed hourly — most matches are found within 4 hours.
                        </p>
                    </div>
                </div>

                {/* RIGHT PANEL */}
                <div style={{ background: 'var(--navy)', padding: '8rem 2.5rem 4rem', overflowY: 'auto' }}>
                    {step < 5 && renderStepProgress()}

                    {step === 1 && (
                        <div style={{ animation: 'fadeUp 0.4s ease both' }}>
                            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', color: 'var(--lime)', marginBottom: '0.4rem' }}>What did you lose?</h2>
                            <p style={{ fontSize: '0.85rem', color: 'rgba(139, 190, 178, 0.55)', marginBottom: '2rem' }}>Give us a name and category for your item.</p>
                            
                            <div className="form-group" style={{ marginBottom: '1.3rem' }}>
                                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(139, 190, 178, 0.5)', marginBottom: '0.45rem' }}>Item Name *</label>
                                <input className="form-input" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Black Sony WH-1000XM5 Headphones" style={{ width: '100%', background: 'rgba(13, 6, 48, 0.5)', border: '1px solid rgba(139, 190, 178, 0.18)', borderRadius: '12px', padding: '0.85rem 1rem', color: 'var(--lime)', outline: 'none' }} />
                            </div>

                            <div className="form-group" style={{ marginBottom: '1.3rem' }}>
                                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(139, 190, 178, 0.5)', marginBottom: '0.45rem' }}>Category *</label>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.7rem' }}>
                                    {['Electronics', 'Bags', 'Keys & Cards', 'Clothing', 'Books', 'Accessories', 'Sports Gear', 'Stationery', 'Other'].map(cat => (
                                        <div key={cat} onClick={() => setFormData({...formData, category: cat})} style={{ background: formData.category === cat ? 'rgba(139, 190, 178, 0.1)' : 'rgba(13, 6, 48, 0.4)', border: formData.category === cat ? '1px solid var(--teal)' : '1px solid rgba(139, 190, 178, 0.14)', borderRadius: '12px', padding: '0.9rem 0.5rem', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s' }}>
                                            <span style={{ fontSize: '0.72rem', fontWeight: 500, color: formData.category === cat ? 'var(--teal)' : 'rgba(139, 190, 178, 0.7)' }}>{cat}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(139, 190, 178, 0.5)', marginBottom: '0.45rem' }}>Brand</label>
                                    <input className="form-input" name="brand" value={formData.brand} onChange={handleChange} placeholder="e.g. Sony" style={{ width: '100%', background: 'rgba(13, 6, 48, 0.5)', border: '1px solid rgba(139, 190, 178, 0.18)', borderRadius: '12px', padding: '0.85rem 1rem', color: 'var(--lime)', outline: 'none' }} />
                                </div>
                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(139, 190, 178, 0.5)', marginBottom: '0.45rem' }}>Color</label>
                                    <input className="form-input" name="color" value={formData.color} onChange={handleChange} placeholder="e.g. Black" style={{ width: '100%', background: 'rgba(13, 6, 48, 0.5)', border: '1px solid rgba(139, 190, 178, 0.18)', borderRadius: '12px', padding: '0.85rem 1rem', color: 'var(--lime)', outline: 'none' }} />
                                </div>
                            </div>

                            <button onClick={nextStep} style={{ width: '100%', background: 'var(--lime)', color: 'var(--deep)', padding: '1rem', border: 'none', borderRadius: '100px', fontSize: '1rem', fontWeight: 500, cursor: 'pointer', marginTop: '1.5rem' }}>Continue →</button>
                        </div>
                    )}

                    {step === 2 && (
                        <div style={{ animation: 'fadeUp 0.4s ease both' }}>
                            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', color: 'var(--lime)', marginBottom: '0.4rem' }}>Where did you lose it?</h2>
                            <p style={{ fontSize: '0.85rem', color: 'rgba(139, 190, 178, 0.55)', marginBottom: '2rem' }}>Select the campus location and details.</p>
                            
                            <div className="form-group">
                                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(139, 190, 178, 0.5)', marginBottom: '0.45rem' }}>Campus Location *</label>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', background: 'rgba(13, 6, 48, 0.4)', padding: '1rem', borderRadius: '14px' }}>
                                    {['Library', 'Cafeteria', 'Gymnasium', 'A Block', 'B Block', 'Auditorium', 'Hostel', 'Sports Ground'].map(loc => (
                                        <div key={loc} onClick={() => setFormData({...formData, location: loc})} style={{ background: formData.location === loc ? 'rgba(139, 190, 178, 0.12)' : 'rgba(56, 78, 119, 0.3)', border: formData.location === loc ? '1px solid var(--teal)' : '1px solid rgba(139, 190, 178, 0.12)', borderRadius: '8px', padding: '0.6rem 0.4rem', textAlign: 'center', cursor: 'pointer', fontSize: '0.72rem', color: formData.location === loc ? 'var(--teal)' : 'rgba(139, 190, 178, 0.6)' }}>{loc}</div>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group">
                                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(139, 190, 178, 0.5)', marginBottom: '0.45rem' }}>Specific Area</label>
                                <input className="form-input" name="area" value={formData.area} onChange={handleChange} placeholder="e.g. Floor 2 study area" style={{ width: '100%', background: 'rgba(13, 6, 48, 0.5)', border: '1px solid rgba(139, 190, 178, 0.18)', borderRadius: '12px', padding: '0.85rem 1rem', color: 'var(--lime)', outline: 'none' }} />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(139, 190, 178, 0.5)', marginBottom: '0.45rem' }}>Date Lost *</label>
                                    <input className="form-input" type="date" name="dateLost" value={formData.dateLost} onChange={handleChange} required style={{ width: '100%', background: 'rgba(13, 6, 48, 0.5)', border: '1px solid rgba(139, 190, 178, 0.18)', borderRadius: '12px', padding: '0.85rem 1rem', color: 'var(--lime)', outline: 'none', colorScheme: 'dark' }} />
                                </div>
                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(139, 190, 178, 0.5)', marginBottom: '0.45rem' }}>Approx. Time</label>
                                    <input className="form-input" type="time" name="timeLost" value={formData.timeLost} onChange={handleChange} style={{ width: '100%', background: 'rgba(13, 6, 48, 0.5)', border: '1px solid rgba(139, 190, 178, 0.18)', borderRadius: '12px', padding: '0.85rem 1rem', color: 'var(--lime)', outline: 'none', colorScheme: 'dark' }} />
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '0.8rem', marginTop: '2rem' }}>
                                <button className="btn-back" onClick={prevStep} style={{ background: 'transparent', color: 'var(--teal)', padding: '0.9rem 1.5rem', border: '1px solid rgba(139, 190, 178, 0.25)', borderRadius: '100px', cursor: 'pointer' }}>← Back</button>
                                <button className="btn-next" onClick={nextStep} style={{ flex: 1, background: 'var(--lime)', color: 'var(--deep)', padding: '0.9rem', border: 'none', borderRadius: '100px', cursor: 'pointer' }}>Continue →</button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div style={{ animation: 'fadeUp 0.4s ease both' }}>
                            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', color: 'var(--lime)', marginBottom: '0.4rem' }}>A few more details</h2>
                            <p style={{ fontSize: '0.85rem', color: 'rgba(139, 190, 178, 0.55)', marginBottom: '2rem' }}>Help us identify your item.</p>
                            
                            <div className="form-group">
                                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(139, 190, 178, 0.5)', marginBottom: '0.45rem' }}>Description</label>
                                <textarea className="form-textarea" name="description" value={formData.description} onChange={handleChange} placeholder="Describe any unique features..." style={{ width: '100%', background: 'rgba(13, 6, 48, 0.5)', border: '1px solid rgba(139, 190, 178, 0.18)', borderRadius: '12px', padding: '0.85rem 1rem', color: 'var(--lime)', outline: 'none', minHeight: '100px' }}></textarea>
                            </div>

                            <div className="form-group">
                                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(139, 190, 178, 0.5)', marginBottom: '0.45rem' }}>Photo (Optional)</label>
                                <div className="upload-zone" onClick={() => document.getElementById('fileInput').click()} style={{ background: 'rgba(13, 6, 48, 0.4)', border: '2px dashed rgba(139, 190, 178, 0.18)', borderRadius: '14px', padding: '2rem', textAlign: 'center', cursor: 'pointer' }}>
                                    <span style={{ fontSize: '2.5rem', marginBottom: '0.7rem', display: 'block', opacity: 0.6 }}>📸</span>
                                    <div style={{ fontSize: '0.85rem', color: 'rgba(139, 190, 178, 0.5)' }}>{image ? image.name : 'Click to upload photo'}</div>
                                    <input type="file" id="fileInput" onChange={handleFileChange} hidden accept="image/*" />
                                </div>
                            </div>

                            <div className="form-group">
                                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(139, 190, 178, 0.5)', marginBottom: '0.45rem' }}>Mobile (Optional)</label>
                                <input className="form-input" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="+91 98765 43210" style={{ width: '100%', background: 'rgba(13, 6, 48, 0.5)', border: '1px solid rgba(139, 190, 178, 0.18)', borderRadius: '12px', padding: '0.85rem 1rem', color: 'var(--lime)', outline: 'none' }} />
                            </div>

                            <div style={{ display: 'flex', gap: '0.8rem', marginTop: '2rem' }}>
                                <button className="btn-back" onClick={prevStep} style={{ background: 'transparent', color: 'var(--teal)', padding: '0.9rem 1.5rem', border: '1px solid rgba(139, 190, 178, 0.25)', borderRadius: '100px', cursor: 'pointer' }}>← Back</button>
                                <button className="btn-next" onClick={nextStep} style={{ flex: 1, background: 'var(--lime)', color: 'var(--deep)', padding: '0.9rem', border: 'none', borderRadius: '100px', cursor: 'pointer' }}>Review Report →</button>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div style={{ animation: 'fadeUp 0.4s ease both' }}>
                            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', color: 'var(--lime)', marginBottom: '0.4rem' }}>Review your report</h2>
                            <p style={{ fontSize: '0.85rem', color: 'rgba(139, 190, 178, 0.55)', marginBottom: '2rem' }}>Check the details before submitting.</p>
                            
                            <div style={{ background: 'rgba(13, 6, 48, 0.4)', border: '1px solid rgba(139, 190, 178, 0.12)', borderRadius: '14px', padding: '1.5rem', marginBottom: '1rem' }}>
                                <div style={{ fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(139, 190, 178, 0.4)', marginBottom: '1rem' }}>Item Summary</div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(139, 190, 178, 0.07)' }}>
                                    <span style={{ fontSize: '0.82rem', color: 'rgba(139, 190, 178, 0.5)' }}>Item</span>
                                    <span style={{ fontSize: '0.82rem', color: 'var(--lime)', fontWeight: 500 }}>{formData.title}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(139, 190, 178, 0.07)' }}>
                                    <span style={{ fontSize: '0.82rem', color: 'rgba(139, 190, 178, 0.5)' }}>Location</span>
                                    <span style={{ fontSize: '0.82rem', color: 'var(--lime)', fontWeight: 500 }}>{formData.location}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
                                    <span style={{ fontSize: '0.82rem', color: 'rgba(139, 190, 178, 0.5)' }}>Date</span>
                                    <span style={{ fontSize: '0.82rem', color: 'var(--lime)', fontWeight: 500 }}>{formData.dateLost}</span>
                                </div>
                            </div>

                            {status.error && <div style={{ color: '#ff8888', marginBottom: '1rem', fontSize: '0.85rem' }}>{status.error}</div>}

                            <div style={{ display: 'flex', gap: '0.8rem', marginTop: '2rem' }}>
                                <button className="btn-back" onClick={prevStep} style={{ background: 'transparent', color: 'var(--teal)', padding: '0.9rem 1.5rem', border: '1px solid rgba(139, 190, 178, 0.25)', borderRadius: '100px', cursor: 'pointer' }}>← Back</button>
                                <button className="btn-next" onClick={handleSubmit} disabled={status.loading} style={{ flex: 1, background: 'var(--lime)', color: 'var(--deep)', padding: '0.9rem', border: 'none', borderRadius: '100px', cursor: 'pointer' }}>
                                    {status.loading ? 'Submitting...' : 'Submit Report ✓'}
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 5 && (
                        <div style={{ textAlign: 'center', padding: '2rem 0', animation: 'fadeUp 0.5s ease both' }}>
                            <span style={{ fontSize: '4rem', marginBottom: '1.5rem', display: 'block' }}>🎉</span>
                            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', color: 'var(--lime)', marginBottom: '0.7rem' }}>Report Submitted!</h3>
                            <p style={{ fontSize: '0.9rem', fontWeight: 300, color: 'rgba(139, 190, 178, 0.6)', lineHeight: 1.7, marginBottom: '2rem' }}>Your lost item report has been filed. We'll search our database and notify you of any matches.</p>
                            <Link to="/dashboard" style={{ display: 'block', background: 'var(--lime)', color: 'var(--deep)', padding: '0.9rem 2rem', borderRadius: '100px', textDecoration: 'none', fontWeight: 500, marginBottom: '0.8rem', textAlign: 'center' }}>View in Dashboard →</Link>
                            <Link to="/browse" style={{ display: 'block', background: 'transparent', color: 'var(--teal)', padding: '0.9rem 2rem', borderRadius: '100px', textDecoration: 'none', textAlign: 'center', border: '1px solid rgba(139, 190, 178, 0.3)' }}>Browse Found Items</Link>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ReportItemPage;
