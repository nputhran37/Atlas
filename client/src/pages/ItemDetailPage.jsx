import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

const ItemDetailPage = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [claimStatus, setClaimStatus] = useState({ submitting: false, success: false, error: null });

    useEffect(() => {
        fetchItem();
    }, [id]);

    const fetchItem = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/items`);
            const data = await response.json();
            const foundItem = data.find(i => i._id === id);
            if (foundItem) {
                setItem(foundItem);
                setAnswers(new Array(foundItem.questions?.length || 0).fill(''));
            }
        } catch (err) {
            console.error('Error fetching item:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleClaimSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            navigate('/login');
            return;
        }

        setClaimStatus({ submitting: true, success: false, error: null });

        try {
            const response = await fetch('http://localhost:5000/api/claims', {
                method: 'POST',
                headers: { 
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ itemId: id, answers })
            });

            const data = await response.json();
            if (response.ok) {
                setClaimStatus({ submitting: false, success: true, error: null });
                setTimeout(() => setShowModal(false), 3000);
            } else {
                setClaimStatus({ submitting: false, success: false, error: data.message });
            }
        } catch (err) {
            setClaimStatus({ submitting: false, success: false, error: 'Network error.' });
        }
    };

    if (loading) return <div style={{ background: 'var(--deep)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--lime)' }}>Loading...</div>;
    if (!item) return <div style={{ background: 'var(--deep)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--lime)' }}>Item not found.</div>;

    return (
        <div style={{ background: 'var(--deep)', minHeight: '100vh', color: 'var(--lime)' }}>
            <Navbar />

            <div style={{ padding: '7rem 3rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
                <div style={{ fontSize: '0.78rem', color: 'rgba(139, 190, 178, 0.45)', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
                    <span style={{ opacity: 0.3 }}>›</span>
                    <Link to="/browse" style={{ color: 'inherit', textDecoration: 'none' }}>Browse Items</Link>
                    <span style={{ opacity: 0.3 }}>›</span>
                    {item.title}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1.2fr', gap: '4rem', maxWidth: '1100px', margin: '0 auto', padding: '0 3rem 5rem' }}>
                
                {/* LEFT: Image */}
                <div>
                    <div style={{ background: 'rgba(56, 78, 119, 0.25)', border: '1px solid rgba(139, 190, 178, 0.14)', borderRadius: '24px', height: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8rem', marginBottom: '1.5rem', position: 'relative', overflow: 'hidden' }}>
                        {item.image ? (
                            <img src={`http://localhost:5000/${item.image}`} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            <span>{item.type === 'lost' ? '❓' : '🎁'}</span>
                        )}
                        <span style={{ position: 'absolute', top: '1.2rem', left: '1.2rem', padding: '0.35rem 0.9rem', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', background: item.type === 'found' ? 'rgba(139, 190, 178, 0.2)' : 'rgba(230, 249, 175, 0.1)', color: item.type === 'found' ? 'var(--teal)' : 'var(--lime)', border: '1px solid currentColor' }}>
                            {item.type}
                        </span>
                    </div>
                </div>

                {/* RIGHT: Info */}
                <div>
                    <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.8rem', fontWeight: 900, color: 'var(--lime)', lineHeight: 1.1, marginBottom: '0.6rem' }}>{item.title}</h1>
                    <p style={{ fontSize: '0.95rem', fontWeight: 300, color: 'rgba(139, 190, 178, 0.6)', marginBottom: '2rem' }}>
                        Reported {new Date(item.date).toLocaleDateString()} · {item.category}
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                        <div style={{ background: 'rgba(24, 49, 79, 0.5)', border: '1px solid rgba(139, 190, 178, 0.1)', borderRadius: '14px', padding: '1rem 1.2rem' }}>
                            <div style={{ fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(139, 190, 178, 0.45)', marginBottom: '0.35rem' }}>Location</div>
                            <div style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--lime)' }}>📍 {item.location}</div>
                        </div>
                        <div style={{ background: 'rgba(24, 49, 79, 0.5)', border: '1px solid rgba(139, 190, 178, 0.1)', borderRadius: '14px', padding: '1rem 1.2rem' }}>
                            <div style={{ fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(139, 190, 178, 0.45)', marginBottom: '0.35rem' }}>Status</div>
                            <div style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--teal)' }}>✓ Active</div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', fontWeight: 700, color: 'var(--teal)', marginBottom: '0.7rem' }}>Description</h3>
                        <p style={{ fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.8, color: 'rgba(230, 249, 175, 0.65)' }}>{item.description}</p>
                    </div>

                    <div style={{ background: 'rgba(139, 190, 178, 0.06)', border: '1px solid rgba(139, 190, 178, 0.18)', borderRadius: '20px', padding: '2rem' }}>
                        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 700, color: 'var(--lime)', marginBottom: '0.5rem' }}>Is this yours?</h3>
                        <p style={{ fontSize: '0.85rem', fontWeight: 300, color: 'rgba(139, 190, 178, 0.55)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                            {item.type === 'found' 
                                ? "If you lost this item, you can file a claim by answering the security questions set by the person who found it." 
                                : "If you have found this item, please contact the owner using the button below."}
                        </p>
                        
                        {item.type === 'found' ? (
                            <button 
                                onClick={() => user ? setShowModal(true) : navigate('/login')}
                                style={{ width: '100%', background: 'var(--lime)', color: 'var(--deep)', padding: '1rem', border: 'none', borderRadius: '100px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'all 0.2s' }}
                            >
                                🙋 Claim This Item
                            </button>
                        ) : (
                            <button 
                                onClick={() => window.location.href = `mailto:${item.contactInfo}`}
                                style={{ width: '100%', background: 'var(--teal)', color: 'var(--deep)', padding: '1rem', border: 'none', borderRadius: '100px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                            >
                                💬 Contact Owner
                            </button>
                        )}
                        <div style={{ fontSize: '0.75rem', color: 'rgba(139, 190, 178, 0.35)', textAlign: 'center', marginTop: '1rem' }}>
                            Claims are reviewed by the reporter. You'll be notified of the outcome.
                        </div>
                    </div>
                </div>
            </div>

            {/* CLAIM MODAL */}
            {showModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(13, 6, 48, 0.85)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                    <div style={{ background: 'var(--navy)', border: '1px solid rgba(139, 190, 178, 0.2)', borderRadius: '24px', padding: '2.5rem', width: '100%', maxWidth: '500px', position: 'relative', animation: 'fadeUp 0.3s ease both' }}>
                        <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: '1.2rem', right: '1.2rem', background: 'rgba(139, 190, 178, 0.1)', border: 'none', color: 'var(--teal)', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer' }}>✕</button>
                        
                        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', color: 'var(--lime)', marginBottom: '0.5rem' }}>Verify Ownership</h3>
                        <p style={{ fontSize: '0.88rem', color: 'rgba(139, 190, 178, 0.6)', marginBottom: '1.5rem' }}>Answer these questions to help the reporter verify you are the owner.</p>

                        {claimStatus.success ? (
                            <div style={{ textAlign: 'center', padding: '2rem' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
                                <h4 style={{ color: 'var(--lime)', marginBottom: '0.5rem' }}>Claim Submitted!</h4>
                                <p style={{ color: 'rgba(139, 190, 178, 0.6)' }}>Your answers have been sent. Check your dashboard for updates.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleClaimSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                {item.questions.map((q, idx) => (
                                    <div key={idx}>
                                        <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>Question {idx + 1}: {q}</label>
                                        <textarea 
                                            required
                                            value={answers[idx]}
                                            onChange={(e) => {
                                                const newAnswers = [...answers];
                                                newAnswers[idx] = e.target.value;
                                                setAnswers(newAnswers);
                                            }}
                                            style={{ width: '100%', background: 'rgba(13, 6, 48, 0.5)', border: '1px solid rgba(139, 190, 178, 0.2)', borderRadius: '12px', padding: '0.8rem 1rem', color: 'var(--lime)', outline: 'none', resize: 'none' }}
                                            rows="2"
                                            placeholder="Your answer..."
                                        />
                                    </div>
                                ))}

                                {claimStatus.error && <div style={{ color: '#ff8888', fontSize: '0.85rem' }}>{claimStatus.error}</div>}

                                <button 
                                    type="submit" 
                                    disabled={claimStatus.submitting}
                                    style={{ background: 'var(--lime)', color: 'var(--deep)', padding: '1rem', border: 'none', borderRadius: '100px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', marginTop: '1rem' }}
                                >
                                    {claimStatus.submitting ? 'Submitting...' : 'Submit Claim →'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default ItemDetailPage;
