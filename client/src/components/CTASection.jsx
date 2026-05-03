import React, { useEffect } from 'react';

const CTASection = () => {
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
        <section className="cta-section" id="cta">
            <div className="cta-orb"></div>
            <div className="cta-inner">
                <h2 className="cta-h reveal">
                    <span className="sub-word">don't give up —</span>
                    LET'S FIND IT.
                </h2>
                <p className="cta-p reveal">Two minutes is all it takes. Report what you've lost, or submit what you've found. Every reunion starts right here.</p>
                <div className="cta-btns reveal">
                    <a href="#" className="hbtn-fire">Report a lost item →</a>
                    <a href="#" className="hbtn-ghost">Submit found item</a>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
