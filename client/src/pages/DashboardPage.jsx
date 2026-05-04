import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DashboardPage = () => {
    const { user } = useAuth();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        fetchMyItems();
    }, []);

    const fetchMyItems = async () => {
        try {
            if (!user?.token) return;
            const response = await fetch('http://localhost:5000/api/items/me', {
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
            const data = await response.json();
            if (response.ok) {
                setItems(data);
            }
        } catch (err) {
            console.error('Error fetching items:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this report?')) return;
        
        try {
            const response = await fetch(`http://localhost:5000/api/items/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
            if (response.ok) {
                setItems(items.filter(item => item._id !== id));
            }
        } catch (err) {
            console.error('Error deleting item:', err);
        }
    };

    const toggleStatus = async (item) => {
        const newStatus = item.status === 'active' ? 'resolved' : 'active';
        try {
            const response = await fetch(`http://localhost:5000/api/items/${item._id}`, {
                method: 'PUT',
                headers: { 
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: newStatus })
            });
            if (response.ok) {
                setItems(items.map(i => i._id === item._id ? { ...i, status: newStatus } : i));
            }
        } catch (err) {
            console.error('Error updating status:', err);
        }
    };

    const lostItems = items.filter(i => i.type === 'lost');
    const foundItems = items.filter(i => i.type === 'found');

    return (
        <div style={{ background: 'var(--deep)', minHeight: '100vh', color: 'var(--lime)' }}>
            <Navbar />

            {/* DASHBOARD HEADER */}
            <div style={{ padding: '7rem 3rem 0', background: 'var(--navy)', borderBottom: '1px solid rgba(139, 190, 178, 0.1)' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--slate)', border: '2px solid var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem' }}>
                            🎓
                        </div>
                        <div>
                            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 700, color: 'var(--lime)' }}>{user?.name}</div>
                            <div style={{ fontSize: '0.85rem', color: 'rgba(139, 190, 178, 0.5)' }}>
                                {user?.email} · SAP ID: {user?.sapid}
                            </div>
                        </div>
                        <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.8rem' }}>
                            <Link to="/report-lost" className="btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}>+ Report Lost</Link>
                            <Link to="/report-found" className="btn-secondary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}>+ Report Found</Link>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '2rem' }}>
                        {['overview', 'lost', 'found'].map(tab => (
                            <button 
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                style={{ 
                                    padding: '1rem 0.5rem', 
                                    background: 'none', 
                                    border: 'none', 
                                    borderBottom: activeTab === tab ? '2px solid var(--lime)' : '2px solid transparent',
                                    color: activeTab === tab ? 'var(--lime)' : 'rgba(139, 190, 178, 0.5)',
                                    fontSize: '0.9rem',
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                    textTransform: 'capitalize',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {tab} {tab !== 'overview' && <span style={{ marginLeft: '6px', fontSize: '0.7rem', background: 'rgba(139, 190, 178, 0.15)', padding: '2px 8px', borderRadius: '10px' }}>{tab === 'lost' ? lostItems.length : foundItems.length}</span>}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem' }}>
                
                {/* OVERVIEW TAB */}
                {activeTab === 'overview' && (
                    <div style={{ animation: 'fadeUp 0.4s ease both' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                            <div style={{ background: 'var(--navy)', border: '1px solid rgba(139, 190, 178, 0.1)', borderRadius: '16px', padding: '1.5rem' }}>
                                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.2rem', fontWeight: 900, color: 'var(--lime)', marginBottom: '0.3rem' }}>{items.length}</div>
                                <div style={{ fontSize: '0.75rem', color: 'rgba(139, 190, 178, 0.45)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Total Reports</div>
                            </div>
                            <div style={{ background: 'var(--navy)', border: '1px solid rgba(139, 190, 178, 0.1)', borderRadius: '16px', padding: '1.5rem' }}>
                                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.2rem', fontWeight: 900, color: 'var(--teal)', marginBottom: '0.3rem' }}>{items.filter(i => i.status === 'resolved').length}</div>
                                <div style={{ fontSize: '0.75rem', color: 'rgba(139, 190, 178, 0.45)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Items Resolved</div>
                            </div>
                        </div>

                        <h3 style={{ fontFamily: "'Playfair Display', serif", marginBottom: '1.5rem', color: 'var(--lime)' }}>Recent Activity</h3>
                        {items.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '3rem', color: 'rgba(139, 190, 178, 0.3)' }}>
                                No reports found. Start by reporting a lost or found item!
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {items.slice(0, 5).map(item => (
                                    <div key={item._id} style={{ background: 'rgba(24, 49, 79, 0.4)', border: '1px solid rgba(139, 190, 178, 0.1)', borderRadius: '16px', padding: '1.2rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                        <div style={{ fontSize: '1.8rem' }}>{item.type === 'lost' ? '❓' : '✨'}</div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: 600, color: 'var(--lime)' }}>{item.title}</div>
                                            <div style={{ fontSize: '0.8rem', color: 'rgba(139, 190, 178, 0.5)' }}>{item.location} · {new Date(item.date).toLocaleDateString()}</div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <span style={{ 
                                                fontSize: '0.7rem', 
                                                padding: '4px 10px', 
                                                borderRadius: '20px', 
                                                background: item.status === 'active' ? 'rgba(139, 190, 178, 0.15)' : 'rgba(230, 249, 175, 0.1)',
                                                color: item.status === 'active' ? 'var(--teal)' : 'var(--lime)',
                                                border: `1px solid ${item.status === 'active' ? 'var(--teal)' : 'var(--lime)'}`,
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.05em'
                                            }}>
                                                {item.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* LOST / FOUND TABS */}
                {(activeTab === 'lost' || activeTab === 'found') && (
                    <div style={{ animation: 'fadeUp 0.4s ease both' }}>
                        <h3 style={{ fontFamily: "'Playfair Display', serif", marginBottom: '1.5rem', color: 'var(--lime)', textTransform: 'capitalize' }}>My {activeTab} Reports</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {(activeTab === 'lost' ? lostItems : foundItems).map(item => (
                                <div key={item._id} style={{ background: 'var(--navy)', border: '1px solid rgba(139, 190, 178, 0.15)', borderRadius: '20px', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '2rem' }}>
                                    <div style={{ width: '60px', height: '60px', background: 'rgba(56, 78, 119, 0.3)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>
                                        {item.category === 'Electronics' ? '📱' : item.category === 'Stationery' ? '✏️' : '📦'}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--lime)', marginBottom: '0.3rem' }}>{item.title}</div>
                                        <div style={{ fontSize: '0.85rem', color: 'rgba(139, 190, 178, 0.6)', display: 'flex', gap: '1.5rem' }}>
                                            <span>📍 {item.location}</span>
                                            <span>📅 {new Date(item.date).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.8rem' }}>
                                        <button 
                                            onClick={() => toggleStatus(item)}
                                            style={{ 
                                                padding: '0.5rem 1rem', 
                                                borderRadius: '100px', 
                                                border: '1px solid var(--teal)', 
                                                background: item.status === 'resolved' ? 'var(--teal)' : 'transparent',
                                                color: item.status === 'resolved' ? 'var(--deep)' : 'var(--teal)',
                                                fontSize: '0.8rem',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s'
                                            }}
                                        >
                                            {item.status === 'active' ? 'Mark Resolved' : 'Reopen Report'}
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(item._id)}
                                            style={{ 
                                                padding: '0.5rem 1rem', 
                                                borderRadius: '100px', 
                                                border: '1px solid #ff8888', 
                                                background: 'transparent',
                                                color: '#ff8888',
                                                fontSize: '0.8rem',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {(activeTab === 'lost' ? lostItems : foundItems).length === 0 && (
                                <div style={{ textAlign: 'center', padding: '4rem', background: 'rgba(24, 49, 79, 0.2)', borderRadius: '20px', border: '1px dashed rgba(139, 190, 178, 0.2)' }}>
                                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📭</div>
                                    <div style={{ color: 'rgba(139, 190, 178, 0.5)' }}>No {activeTab} reports yet.</div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default DashboardPage;
