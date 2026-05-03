import React from 'react';

const ReportCTA = () => {
    return (
        <div style={{ background: 'var(--deep)' }}>
            <section className="report-section">
                <div className="report-text">
                    <p className="section-label">Lost Something?</p>
                    <h2>File a Report in Under a Minute</h2>
                    <p>The sooner you report, the better your chances. Our team checks submissions every hour and alerts you the moment your item is found.</p>
                    <a href="#" className="btn-primary">Report a Lost Item →</a>
                </div>

                <div className="report-card">
                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontWeight: 700, color: 'var(--lime)', marginBottom: '1.5rem' }}>
                        Quick Report
                    </p>
                    <div className="form-row">
                        <label className="form-label">Item Name</label>
                        <input className="form-input" type="text" placeholder="e.g. Black Sony headphones" />
                    </div>
                    <div className="form-row-split">
                        <div>
                            <label className="form-label">Category</label>
                            <select className="form-input" style={{ cursor: 'pointer', appearance: 'auto' }}>
                                <option style={{ background: 'var(--navy)' }}>Electronics</option>
                                <option style={{ background: 'var(--navy)' }}>Bags</option>
                                <option style={{ background: 'var(--navy)' }}>Keys</option>
                                <option style={{ background: 'var(--navy)' }}>Clothing</option>
                                <option style={{ background: 'var(--navy)' }}>Books</option>
                            </select>
                        </div>
                        <div>
                            <label className="form-label">Last Seen At</label>
                            <input className="form-input" type="text" placeholder="Library, Canteen..." />
                        </div>
                    </div>
                    <div className="form-row">
                        <label className="form-label">Your Student Email</label>
                        <input className="form-input" type="email" placeholder="yourname@westfield.edu" />
                    </div>
                    <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}>
                        Submit Report →
                    </button>
                </div>
            </section>
        </div>
    );
};

export default ReportCTA;
