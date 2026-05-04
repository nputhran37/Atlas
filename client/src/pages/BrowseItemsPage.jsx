import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BrowseItemsPage = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Filtering State
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/items');
                if (!response.ok) throw new Error('Failed to fetch items');
                const data = await response.json();
                setItems(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    // Derived state for filtering
    const filteredItems = items.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              item.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = activeFilter === 'All' || item.category === activeFilter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div style={{ background: 'var(--slate)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            <main style={{ flex: 1, padding: '8rem 2rem 4rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    
                    {/* Header & Search */}
                    <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
                        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '3.5rem', color: 'white', marginBottom: '1rem' }}>
                            Browse <span style={{ color: 'var(--lime)', fontStyle: 'italic' }}>Database</span>
                        </h1>
                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', marginBottom: '2rem' }}>
                            Search through recently reported lost and found items across campus.
                        </p>
                        
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', maxWidth: '600px', margin: '0 auto' }}>
                            <input 
                                type="text" 
                                placeholder="Search items, descriptions..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ flex: 1, padding: '1rem 1.5rem', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.2)', background: 'var(--navy)', color: 'white', fontSize: '1rem' }}
                            />
                        </div>
                    </div>

                    {/* Filter Chips */}
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '3rem' }}>
                        {['All', 'Electronics', 'Bags & Wallets', 'Keys & ID', 'Clothing', 'Other'].map(category => (
                            <button 
                                key={category}
                                onClick={() => setActiveFilter(category)}
                                style={{ 
                                    padding: '0.6rem 1.5rem', 
                                    borderRadius: '100px', 
                                    background: activeFilter === category ? 'var(--teal)' : 'var(--navy)', 
                                    color: activeFilter === category ? 'var(--deep)' : 'white', 
                                    border: `1px solid ${activeFilter === category ? 'var(--teal)' : 'rgba(255,255,255,0.2)'}`,
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    {loading ? (
                        <div style={{ textAlign: 'center', color: 'var(--teal)', fontSize: '1.2rem', padding: '4rem 0' }}>Loading database...</div>
                    ) : error ? (
                        <div style={{ textAlign: 'center', color: '#ff8888', padding: '4rem 0' }}>Error: {error}</div>
                    ) : filteredItems.length === 0 ? (
                        <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', padding: '4rem 0', fontSize: '1.1rem' }}>No items found matching your criteria.</div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                            {filteredItems.map(item => (
                                <div key={item._id} style={{ 
                                    background: 'var(--navy)', 
                                    borderRadius: '20px', 
                                    overflow: 'hidden', 
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
                                >
                                    {/* Image Container */}
                                    <div style={{ height: '200px', background: 'rgba(255,255,255,0.05)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {item.image ? (
                                            <img src={`http://localhost:5000/${item.image.replace(/\\/g, '/')}`} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <span style={{ fontSize: '3rem', opacity: 0.5 }}>📦</span>
                                        )}
                                        
                                        {/* Status Badge */}
                                        <div style={{ 
                                            position: 'absolute', top: '1rem', right: '1rem', 
                                            padding: '0.4rem 1rem', borderRadius: '100px', 
                                            fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em',
                                            background: item.type === 'lost' ? 'rgba(255,100,100,0.2)' : 'rgba(230,249,175,0.2)',
                                            color: item.type === 'lost' ? '#ffaaaa' : 'var(--lime)',
                                            border: `1px solid ${item.type === 'lost' ? 'rgba(255,100,100,0.5)' : 'rgba(230,249,175,0.5)'}`,
                                            backdropFilter: 'blur(4px)'
                                        }}>
                                            {item.type}
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>{item.category}</div>
                                        <h3 style={{ color: 'white', fontSize: '1.3rem', marginBottom: '0.5rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</h3>
                                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', flex: 1 }}>
                                            {item.description}
                                        </p>
                                        
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem' }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>📍 {item.location}</span>
                                            <span>⏱️ {new Date(item.date).toLocaleDateString()}</span>
                                        </div>

                                        <button 
                                            onClick={() => navigate(`/item/${item._id}`)}
                                            style={{ 
                                                width: '100%', padding: '0.8rem', borderRadius: '10px', 
                                                background: 'rgba(255,255,255,0.05)', color: 'var(--teal)', 
                                                border: '1px solid rgba(139,190,178,0.3)', cursor: 'pointer',
                                                fontWeight: '600', transition: 'background 0.2s'
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(139,190,178,0.1)'}
                                            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default BrowseItemsPage;
