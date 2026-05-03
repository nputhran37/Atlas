import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ReportFoundPage = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Electronics',
        location: '',
        contactInfo: '',
        dateFound: '',
        timeFound: '',
        handoverPreference: 'drop_point', // 'meetup' or 'drop_point'
        dropPointSelect: 'Security Desk', // predefined option
        customDetails: '', // For 'Other' drop point or 'meetup' location
    });
    
    const [questions, setQuestions] = useState(['', '']); // Start with 2 empty questions
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
        if (questions.length < 5) {
            setQuestions([...questions, '']);
        }
    };

    const removeQuestion = (index) => {
        if (questions.length > 2) {
            const newQuestions = questions.filter((_, i) => i !== index);
            setQuestions(newQuestions);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation: Ensure min 2 questions are filled
        const filledQuestions = questions.filter(q => q.trim() !== '');
        if (filledQuestions.length < 2) {
            setStatus({ loading: false, success: false, error: 'You must provide at least 2 verification questions.' });
            return;
        }

        setStatus({ loading: true, success: false, error: null });

        // Determine final handover details string
        let finalHandoverDetails = formData.customDetails;
        if (formData.handoverPreference === 'drop_point' && formData.dropPointSelect !== 'Other') {
            finalHandoverDetails = formData.dropPointSelect;
        } else if (!finalHandoverDetails.trim()) {
            setStatus({ loading: false, success: false, error: 'Please provide handover location details.' });
            return;
        }

        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('category', formData.category);
        data.append('type', 'found'); // Hardcode
        data.append('location', formData.location);
        data.append('contactInfo', formData.contactInfo);
        data.append('dateLost', formData.dateFound); // Map to DB schema
        data.append('timeLost', formData.timeFound); // Map to DB schema
        data.append('handoverPreference', formData.handoverPreference);
        data.append('handoverDetails', finalHandoverDetails);
        
        // Append array
        filledQuestions.forEach(q => data.append('questions[]', q));
        
        if (image) {
            data.append('image', image);
        }

        try {
            const response = await fetch('http://localhost:5000/api/items', {
                method: 'POST',
                body: data,
            });

            if (response.ok) {
                setStatus({ loading: false, success: true, error: null });
                setFormData({
                    title: '', description: '', category: 'Electronics', location: '', 
                    contactInfo: '', dateFound: '', timeFound: '', 
                    handoverPreference: 'drop_point', dropPointSelect: 'Security Desk', customDetails: ''
                });
                setQuestions(['', '']);
                setImage(null);
                document.getElementById('image-upload').value = "";
            } else {
                const errorData = await response.json();
                setStatus({ loading: false, success: false, error: errorData.message || 'Failed to submit.' });
            }
        } catch (error) {
            setStatus({ loading: false, success: false, error: 'Network error. Make sure your backend is running.' });
        }
    };

    return (
        <div style={{ 
            background: 'var(--navy)', 
            backgroundImage: 'radial-gradient(rgba(230, 249, 175, 0.1) 1.5px, transparent 1.5px)',
            backgroundSize: '32px 32px',
            minHeight: '100vh', display: 'flex', flexDirection: 'column' 
        }}>
            <Navbar />
            
            <main style={{ flex: 1, padding: '8rem 2rem', display: 'flex', justifyContent: 'center' }}>
                <div style={{ maxWidth: '650px', width: '100%', background: 'var(--deep)', border: '1px solid rgba(230, 249, 175, 0.2)', padding: '3rem', borderRadius: '20px', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', color: 'var(--lime)', marginBottom: '0.5rem' }}>Report <span style={{ color: 'var(--teal)', fontStyle: 'italic' }}>Found Item</span></h2>
                    <p style={{ color: 'rgba(230,249,175,0.7)', marginBottom: '2rem' }}>Help return this item securely. We'll ask the claimant your verification questions.</p>
                    
                    {status.success && (
                        <div style={{ background: 'rgba(230,249,175,0.1)', border: '1px solid var(--lime)', color: 'var(--lime)', padding: '1rem', borderRadius: '10px', marginBottom: '2rem' }}>
                            Item successfully reported! It is now LIVE on the platform.
                        </div>
                    )}
                    {status.error && (
                        <div style={{ background: 'rgba(255,100,100,0.1)', border: '1px solid red', color: '#ff8888', padding: '1rem', borderRadius: '10px', marginBottom: '2rem' }}>
                            {status.error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        
                        {/* Basic Details */}
                        <div style={{ borderBottom: '1px solid rgba(139,190,178,0.2)', paddingBottom: '1.5rem', marginBottom: '0.5rem' }}>
                            <h3 style={{ color: 'var(--teal)', marginBottom: '1.5rem', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>1. Basic Details</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', color: 'white', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Item Name</label>
                                    <input type="text" name="title" value={formData.title} onChange={handleChange} required
                                        style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(139,190,178,0.2)', borderRadius: '10px', color: 'white', fontSize: '1rem' }} />
                                </div>
                                
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ display: 'block', color: 'white', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Category</label>
                                        <select name="category" value={formData.category} onChange={handleChange}
                                            style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(139,190,178,0.2)', borderRadius: '10px', color: 'white', fontSize: '1rem' }}>
                                            <option value="Electronics">Electronics</option>
                                            <option value="Bags & Wallets">Bags & Wallets</option>
                                            <option value="Keys & ID">Keys & ID</option>
                                            <option value="Clothing">Clothing</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ display: 'block', color: 'white', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Upload Image</label>
                                        <input type="file" id="image-upload" accept="image/*" onChange={handleFileChange}
                                            style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px dashed rgba(139,190,178,0.4)', borderRadius: '10px', color: 'var(--teal)' }} />
                                    </div>
                                </div>

                                <div>
                                    <label style={{ display: 'block', color: 'white', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Description</label>
                                    <textarea name="description" value={formData.description} onChange={handleChange} required rows="3"
                                        style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(139,190,178,0.2)', borderRadius: '10px', color: 'white', fontSize: '1rem', resize: 'vertical' }} />
                                </div>

                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ display: 'block', color: 'white', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Date Found</label>
                                        <input type="date" name="dateFound" value={formData.dateFound} onChange={handleChange} required
                                            style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(139,190,178,0.2)', borderRadius: '10px', color: 'white', colorScheme: 'dark' }} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ display: 'block', color: 'white', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Approx Time</label>
                                        <input type="time" name="timeFound" value={formData.timeFound} onChange={handleChange} required
                                            style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(139,190,178,0.2)', borderRadius: '10px', color: 'white', colorScheme: 'dark' }} />
                                    </div>
                                </div>

                                <div>
                                    <label style={{ display: 'block', color: 'white', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Where did you find it?</label>
                                    <input type="text" name="location" value={formData.location} onChange={handleChange} required placeholder="e.g., Library 2nd Floor"
                                        style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(139,190,178,0.2)', borderRadius: '10px', color: 'white', fontSize: '1rem' }} />
                                </div>
                                
                                <div>
                                    <label style={{ display: 'block', color: 'white', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Your Email</label>
                                    <input type="email" name="contactInfo" value={formData.contactInfo} onChange={handleChange} required
                                        style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(139,190,178,0.2)', borderRadius: '10px', color: 'white', fontSize: '1rem' }} />
                                </div>
                            </div>
                        </div>

                        {/* Verification Questions */}
                        <div style={{ borderBottom: '1px solid rgba(139,190,178,0.2)', paddingBottom: '1.5rem', marginBottom: '0.5rem' }}>
                            <h3 style={{ color: 'var(--teal)', marginBottom: '0.5rem', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>2. Verification Questions</h3>
                            <p style={{ fontSize: '0.85rem', color: 'rgba(230,249,175,0.7)', marginBottom: '1.5rem' }}>Ask 2-5 free-text questions that only the real owner would know. (e.g. "What color is the zipper?")</p>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {questions.map((q, index) => (
                                    <div key={index} style={{ display: 'flex', gap: '0.5rem' }}>
                                        <input type="text" value={q} onChange={(e) => handleQuestionChange(index, e.target.value)} 
                                            placeholder={`Question ${index + 1}`} required={index < 2} // First 2 are required
                                            style={{ flex: 1, padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(139,190,178,0.2)', borderRadius: '10px', color: 'white' }} />
                                        
                                        {index >= 2 && (
                                            <button type="button" onClick={() => removeQuestion(index)}
                                                style={{ background: 'rgba(255,100,100,0.1)', color: '#ff8888', border: '1px solid #ff8888', borderRadius: '10px', padding: '0 1rem', cursor: 'pointer' }}>
                                                ✕
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            
                            {questions.length < 5 && (
                                <button type="button" onClick={addQuestion}
                                    style={{ marginTop: '1rem', background: 'transparent', color: 'var(--lime)', border: '1px dashed var(--lime)', borderRadius: '10px', padding: '0.8rem', width: '100%', cursor: 'pointer', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.05em' }}>
                                    + Add Another Question
                                </button>
                            )}
                        </div>

                        {/* Handover Preference */}
                        <div>
                            <h3 style={{ color: 'var(--teal)', marginBottom: '1.5rem', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>3. Handover Method</h3>
                            
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                                <label style={{ flex: 1, cursor: 'pointer', background: formData.handoverPreference === 'drop_point' ? 'rgba(139,190,178,0.2)' : 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '10px', border: formData.handoverPreference === 'drop_point' ? '1px solid var(--teal)' : '1px solid rgba(139,190,178,0.2)', textAlign: 'center', color: 'white' }}>
                                    <input type="radio" name="handoverPreference" value="drop_point" checked={formData.handoverPreference === 'drop_point'} onChange={handleChange} style={{ display: 'none' }} />
                                    Drop Point
                                </label>
                                <label style={{ flex: 1, cursor: 'pointer', background: formData.handoverPreference === 'meetup' ? 'rgba(139,190,178,0.2)' : 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '10px', border: formData.handoverPreference === 'meetup' ? '1px solid var(--teal)' : '1px solid rgba(139,190,178,0.2)', textAlign: 'center', color: 'white' }}>
                                    <input type="radio" name="handoverPreference" value="meetup" checked={formData.handoverPreference === 'meetup'} onChange={handleChange} style={{ display: 'none' }} />
                                    In-person Meetup
                                </label>
                            </div>

                            {formData.handoverPreference === 'drop_point' ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <select name="dropPointSelect" value={formData.dropPointSelect} onChange={handleChange}
                                        style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(139,190,178,0.2)', borderRadius: '10px', color: 'white', fontSize: '1rem' }}>
                                        <option value="Security Desk">Security Desk</option>
                                        <option value="Library Helpdesk">Library Helpdesk</option>
                                        <option value="Student Union Office">Student Union Office</option>
                                        <option value="Other">Other...</option>
                                    </select>
                                    
                                    {formData.dropPointSelect === 'Other' && (
                                        <input type="text" name="customDetails" value={formData.customDetails} onChange={handleChange} placeholder="Specify drop point..." required
                                            style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(139,190,178,0.2)', borderRadius: '10px', color: 'white', fontSize: '1rem' }} />
                                    )}
                                </div>
                            ) : (
                                <input type="text" name="customDetails" value={formData.customDetails} onChange={handleChange} placeholder="Suggest a safe meetup location (e.g. Campus Cafe)" required
                                    style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(139,190,178,0.2)', borderRadius: '10px', color: 'white', fontSize: '1rem' }} />
                            )}
                        </div>

                        <button type="submit" disabled={status.loading}
                            style={{ background: 'var(--teal)', color: 'var(--deep)', padding: '1.2rem', borderRadius: '100px', fontSize: '1.1rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', border: 'none', cursor: status.loading ? 'not-allowed' : 'pointer', marginTop: '1rem', transition: 'transform 0.2s' }}>
                            {status.loading ? 'Uploading...' : 'Submit Found Item'}
                        </button>
                    </form>
                </div>
            </main>
            
            <Footer />
        </div>
    );
};

export default ReportFoundPage;
