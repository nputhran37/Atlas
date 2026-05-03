import React, { useEffect } from 'react';

const Stats = () => {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.style.animation = 'fadeUp 0.6s ease both';
                    observer.unobserve(e.target);
                }
            });
        }, { threshold: 0.15 });

        const stats = document.querySelectorAll('.stat-num');
        stats.forEach(stat => observer.observe(stat));

        return () => observer.disconnect();
    }, []);

    return (
        <section className="stats-section">
            <div className="stats-grid">
                <div>
                    <div className="stat-num" style={{ opacity: 0 }}>1,240+</div>
                    <div className="stat-label">Items Returned</div>
                </div>
                <div>
                    <div className="stat-num" style={{ opacity: 0 }}>89%</div>
                    <div className="stat-label">Recovery Rate</div>
                </div>
                <div>
                    <div className="stat-num" style={{ opacity: 0 }}>4 hrs</div>
                    <div className="stat-label">Avg. Match Time</div>
                </div>
                <div>
                    <div className="stat-num" style={{ opacity: 0 }}>12k+</div>
                    <div className="stat-label">Students Registered</div>
                </div>
            </div>
        </section>
    );
};

export default Stats;
