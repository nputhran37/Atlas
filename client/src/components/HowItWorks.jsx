import React, { useEffect } from 'react';

const HowItWorks = () => {
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) { 
                    e.target.classList.add('visible'); 
                    observer.unobserve(e.target);
                }
            });
        }, { threshold: 0.12 });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <section className="how-section" id="how">
            <div className="sec-title reveal">HOW IT<br/><span>WORKS</span></div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(139, 190, 178, 0.4)', marginTop: '0.5rem' }} className="reveal">
                Hover each card to reveal
            </p>
            
            <div className="how-grid reveal">
                <div className="flip-card">
                    <div className="flip-inner">
                        <div className="flip-front">
                            <div className="flip-num">01</div>
                            <span className="flip-icon">📋</span>
                            <div className="flip-title">Submit or Search</div>
                            <div className="flip-hint">Step one</div>
                        </div>
                        <div className="flip-back">
                            <div className="flip-back-title">Submit or Search</div>
                            <p className="flip-back-body">Report a missing item or browse the live database. Updated the moment anything is handed in across campus.</p>
                        </div>
                    </div>
                </div>
                <div className="flip-card">
                    <div className="flip-inner">
                        <div className="flip-front">
                            <div className="flip-num">02</div>
                            <span className="flip-icon">🔔</span>
                            <div className="flip-title">Get Matched</div>
                            <div className="flip-hint">Step two</div>
                        </div>
                        <div className="flip-back">
                            <div className="flip-back-title">Automated Match</div>
                            <p className="flip-back-body">The system alerts you by email the instant a description matches something on the board. No manual checking.</p>
                        </div>
                    </div>
                </div>
                <div className="flip-card">
                    <div className="flip-inner">
                        <div className="flip-front">
                            <div className="flip-num">03</div>
                            <span className="flip-icon">🔐</span>
                            <div className="flip-title">Verify</div>
                            <div className="flip-hint">Step three</div>
                        </div>
                        <div className="flip-back">
                            <div className="flip-back-title">Verify Ownership</div>
                            <p className="flip-back-body">Tell us one detail only you'd know. No forms, no queues — a quick chat with the desk is all it takes.</p>
                        </div>
                    </div>
                </div>
                <div className="flip-card">
                    <div className="flip-inner">
                        <div className="flip-front">
                            <div className="flip-num">04</div>
                            <span className="flip-icon">🎒</span>
                            <div className="flip-title">Collect</div>
                            <div className="flip-hint">Step four</div>
                        </div>
                        <div className="flip-back">
                            <div className="flip-back-title">Collect Your Item</div>
                            <p className="flip-back-body">Pick up from the Security Desk in the Student Union. Open Monday – Saturday, 9 AM to 6 PM.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
