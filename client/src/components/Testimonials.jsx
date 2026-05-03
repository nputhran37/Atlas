import React, { useEffect } from 'react';

const Testimonials = () => {
    useEffect(() => {
        // Scroll reveal
        const observer = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) { 
                    e.target.classList.add('visible'); 
                    observer.unobserve(e.target);
                }
            });
        }, { threshold: 0.12 });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        // Tilt effect
        const cards = document.querySelectorAll('.testi-3d');
        const handleMouseMove = (e) => {
            const card = e.currentTarget;
            const rect = card.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = (e.clientX - cx) / (rect.width / 2);
            const dy = (e.clientY - cy) / (rect.height / 2);
            card.style.transform = `perspective(600px) rotateY(${dx * 8}deg) rotateX(${-dy * 8}deg) translateZ(8px)`;
        };
        const handleMouseLeave = (e) => {
            e.currentTarget.style.transform = e.currentTarget.classList.contains('tall') ? 'translateY(-20px)' : '';
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
        <section className="testi-section">
            <div className="sec-title reveal">THEY GOT<br/><span>IT BACK</span></div>
            <div className="testi-grid reveal">
                <div className="testi-3d tall">
                    <span className="big-q">"</span>
                    <p className="t-body">My laptop had my entire thesis on it. DJSCE Security had it logged within hours. I got it back the very next morning — I was in tears.</p>
                    <div className="t-sig">
                        <div className="t-line"></div><span className="t-name">Priya R. — MSc Computer Science</span>
                    </div>
                </div>
                <div className="testi-3d">
                    <span className="big-q">"</span>
                    <p className="t-body">Lost my grandfather's watch in the Science Block. The matching system found it within the hour.</p>
                    <div className="t-sig">
                        <div className="t-line"></div><span className="t-name">Arjun K. — BSc Physics, Year 3</span>
                    </div>
                </div>
                <div className="testi-3d">
                    <span className="big-q">"</span>
                    <p className="t-body">I submitted a found wallet at 9am. By noon, the owner had it back. This service makes campus feel more human.</p>
                    <div className="t-sig">
                        <div className="t-line"></div><span className="t-name">Sara M. — BA English Literature</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
