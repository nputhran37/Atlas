import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ReportItemPage = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Electronics', // default
        location: '',
        contactInfo: '',
        dateLost: '',
        timeLost: '',
    });
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState({ loading: false, success: false, error: null });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, success: false, error: null });

        // Build FormData for multipart/form-data request
        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('category', formData.category);
        data.append('type', 'lost'); // Hardcode to 'lost'
        data.append('location', formData.location);
        data.append('contactInfo', formData.contactInfo);
        data.append('dateLost', formData.dateLost);
        data.append('timeLost', formData.timeLost);
        
        if (image) {
            data.append('image', image);
        }

        try {
            const response = await fetch('http://localhost:5000/api/items', {
                method: 'POST',
                body: data, // No Content-Type header needed, fetch sets it automatically with boundary
            });

            if (response.ok) {
                setStatus({ loading: false, success: true, error: null });
                setFormData({ title: '', description: '', category: 'Electronics', location: '', contactInfo: '', dateLost: '', timeLost: '' });
                setImage(null);
                document.getElementById('image-upload').value = ""; // Reset file input
            } else {
                const errorData = await response.json();
                setStatus({ loading: false, success: false, error: errorData.message || 'Failed to submit.' });
            }
        } catch (error) {
            setStatus({ loading: false, success: false, error: 'Network error. Make sure your backend is running and connected to MongoDB.' });
        }
    };

    return (
        <div style={{ 
            background: 'var(--slate)', 
            backgroundImage: 'radial-gradient(rgba(139, 190, 178, 0.15) 1.5px, transparent 1.5px)',
            backgroundSize: '32px 32px',
            minHeight: '100vh', 
            display: 'flex', 
            flexDirection: 'column' 
        }}>
            <Navbar />
            
            <main style={{ flex: 1, padding: '8rem 2rem', display: 'flex', justifyContent: 'center' }}>
                <div style={{ maxWidth: '600px', width: '100%', background: 'var(--deep)', border: '1px solid rgba(139, 190, 178, 0.2)', padding: '3rem', borderRadius: '20px', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', color: 'var(--teal)', marginBottom: '0.5rem' }}>Report <span style={{ color: 'var(--lime)', fontStyle: 'italic' }}>Lost Item</span></h2>
                    <p style={{ color: 'rgba(230,249,175,0.7)', marginBottom: '2rem' }}>Provide as many details as possible so we can match it when found.</p>
                    
                    {status.success && (
                        <div style={{ background: 'rgba(230,249,175,0.1)', border: '1px solid var(--lime)', color: 'var(--lime)', padding: '1rem', borderRadius: '10px', marginBottom: '2rem' }}>
                            Item successfully reported! We'll notify you if a match is found.
                        </div>
                    )}

                    {status.error && (
                        <div style={{ background: 'rgba(255,100,100,0.1)', border: '1px solid red', color: '#ff8888', padding: '1rem', borderRadius: '10px', marginBottom: '2rem' }}>
                            {status.error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        
                        <div>
                            <label style={{ display: 'block', color: 'var(--teal)', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Item Name</label>
                            <input type="text" name="title" value={formData.title} onChange={handleChange} required
                                style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(139,190,178,0.2)', borderRadius: '10px', color: 'white', fontSize: '1rem' }} 
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', color: 'var(--teal)', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Category</label>
                            <select name="category" value={formData.category} onChange={handleChange}
                                style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(139,190,178,0.2)', borderRadius: '10px', color: 'white', fontSize: '1rem' }}>
                                <option value="Electronics">Electronics</option>
                                <option value="Bags & Wallets">Bags & Wallets</option>
                                <option value="Keys & ID">Keys & ID</option>
                                <option value="Clothing">Clothing</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', color: 'var(--teal)', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Description</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} required rows="4"
                                style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(139,190,178,0.2)', borderRadius: '10px', color: 'white', fontSize: '1rem', resize: 'vertical' }} 
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', color: 'var(--teal)', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Where did you lose it?</label>
                            <input type="text" name="location" value={formData.location} onChange={handleChange} required placeholder="e.g., Library 2nd Floor, Canteen"
                                style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(139,190,178,0.2)', borderRadius: '10px', color: 'white', fontSize: '1rem' }} 
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', color: 'var(--teal)', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date Lost</label>
                                <input type="date" name="dateLost" value={formData.dateLost} onChange={handleChange} required
                                    style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(139,190,178,0.2)', borderRadius: '10px', color: 'white', fontSize: '1rem', colorScheme: 'dark' }} 
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', color: 'var(--teal)', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Approx Time</label>
                                <input type="time" name="timeLost" value={formData.timeLost} onChange={handleChange} required
                                    style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(139,190,178,0.2)', borderRadius: '10px', color: 'white', fontSize: '1rem', colorScheme: 'dark' }} 
                                />
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', color: 'var(--teal)', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Your Email</label>
                            <input type="email" name="contactInfo" value={formData.contactInfo} onChange={handleChange} required
                                style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(139,190,178,0.2)', borderRadius: '10px', color: 'white', fontSize: '1rem' }} 
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', color: 'var(--teal)', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Upload Image (Optional)</label>
                            <input type="file" id="image-upload" accept="image/*" onChange={handleFileChange}
                                style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px dashed rgba(139,190,178,0.4)', borderRadius: '10px', color: 'var(--teal)', fontSize: '0.9rem' }} 
                            />
                        </div>

                        <button type="submit" disabled={status.loading}
                            style={{ background: 'var(--lime)', color: 'var(--deep)', padding: '1.2rem', borderRadius: '100px', fontSize: '1.1rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', border: 'none', cursor: status.loading ? 'not-allowed' : 'pointer', marginTop: '1rem', transition: 'opacity 0.2s' }}>
                            {status.loading ? 'Submitting...' : 'Submit Report'}
                        </button>
                    </form>
                </div>
            </main>
            
            <Footer />
        </div>
    );
};

export default ReportItemPage;
