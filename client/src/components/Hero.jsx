import React, { useEffect, useRef } from 'react';

const Hero = () => {
    const heroRef = useRef(null);

    useEffect(() => {
        // Animation observer for hero elements
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.style.animation = 'fadeUp 0.6s ease both';
                    observer.unobserve(e.target);
                }
            });
        }, { threshold: 0.15 });

        const elements = document.querySelectorAll('.hero-badge, h1, .hero-sub, .hero-actions, .hero-float');
        elements.forEach(el => {
            el.style.opacity = '0';
            observer.observe(el);
        });

        // Tilt effect
        const cards = document.querySelectorAll('.float-card');
        const handleMouseMove = (e) => {
            const card = e.currentTarget;
            const rect = card.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = (e.clientX - cx) / (rect.width / 2);
            const dy = (e.clientY - cy) / (rect.height / 2);
            card.style.transform = `perspective(600px) rotateY(${dx * 8}deg) rotateX(${-dy * 8}deg) translateZ(8px) scale(1.05)`;
        };
        const handleMouseLeave = (e) => {
            e.currentTarget.style.transform = '';
        };

        cards.forEach(card => {
            card.addEventListener('mousemove', handleMouseMove);
            card.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            observer.disconnect();
            cards.forEach(card => {
                card.removeEventListener('mousemove', handleMouseMove);
                card.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    return (
        <section className="hero" ref={heroRef} id="hero-section">
            <div className="hero-bg-grid"></div>
            <div className="hero-glow"></div>
            <div className="hero-glow2"></div>

            <div className="hero-inner">
                <div className="hero-badge">
                    <span className="badge-dot"></span>
                    Dwarkadas J. Sanghvi College Of Engineering · Official Platform
                </div>
                <h1>Lost something?<br/>We'll help you<br/><em>find it.</em></h1>
                <p className="hero-sub">The official lost & found portal for Dwarkadas J. Sanghvi College Of Engineering. Report, search, and reclaim your belongings — fast and hassle-free.</p>
                <div className="hero-actions">
                    <a href="#" className="btn-primary">🔍 Search Items</a>
                    <a href="#" className="btn-secondary">+ Report an Item</a>
                </div>
            </div>

            <div className="hero-float">
                <div className="float-card">
                    <div className="float-icon">🎒</div>
                    <div className="float-label">Backpack</div>
                    <div className="float-tag">Found · A Block</div>
                </div>
                <div className="float-card">
                    <div className="float-icon">📱</div>
                    <div className="float-label">Phone</div>
                    <div className="float-tag">Lost · Library</div>
                </div>
                <div className="float-card">
                    <div className="float-icon">🔑</div>
                    <div className="float-label">Keys</div>
                    <div className="float-tag">Found · Canteen</div>
                </div>
                <div className="float-card">
                    <div className="float-icon">🕶️</div>
                    <div className="float-label">Sunglasses</div>
                    <div className="float-tag">Found · Gym</div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
