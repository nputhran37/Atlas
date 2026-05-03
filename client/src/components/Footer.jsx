import React from 'react';

const Footer = () => {
    return (
        <footer style={{ background: 'var(--deep)', padding: '3rem', borderTop: '1px solid rgba(139,190,178,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div className="logo" style={{ fontSize: '1.3rem' }}>Atlas<span style={{ fontSize: '0.9rem', color: 'rgba(139,190,178,0.5)', fontStyle: 'normal', fontWeight: '400', fontFamily: "'DM Sans', sans-serif" }}> — Dwarkadas J. Sanghvi College Of Engineering</span></div>
            <div className="footer-links" style={{ display: 'flex', gap: '2rem' }}>
                <a href="#" style={{ color: 'rgba(139,190,178,0.6)', textDecoration: 'none', fontSize: '0.85rem' }}>Privacy</a>
                <a href="#" style={{ color: 'rgba(139,190,178,0.6)', textDecoration: 'none', fontSize: '0.85rem' }}>FAQ</a>
                <a href="#" style={{ color: 'rgba(139,190,178,0.6)', textDecoration: 'none', fontSize: '0.85rem' }}>Contact</a>
                <a href="#" style={{ color: 'rgba(139,190,178,0.6)', textDecoration: 'none', fontSize: '0.85rem' }}>Staff Login</a>
            </div>
            <div className="f-copy" style={{ fontSize: '0.8rem', color: 'rgba(139,190,178,0.4)' }}>© 2026 Dwarkadas J. Sanghvi College Of Engineering. All rights reserved.</div>
        </footer>
    );
};

export default Footer;
