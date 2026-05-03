import React, { useEffect } from 'react';

const RecentItems = () => {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.style.animation = 'fadeUp 0.6s ease both';
                    observer.unobserve(e.target);
                }
            });
        }, { threshold: 0.15 });

        const cards = document.querySelectorAll('.item-card');
        cards.forEach(card => observer.observe(card));

        return () => observer.disconnect();
    }, []);

    return (
        <div style={{ background: 'var(--deep)', padding: '6rem 3rem' }}>
            <div className="items-section" style={{ padding: 0, maxWidth: '1100px', margin: '0 auto' }}>
                <div className="items-header">
                    <div>
                        <p className="section-label">Latest Updates</p>
                        <h2 style={{ fontSize: '2rem' }}>Recently Added Items</h2>
                    </div>
                    <a href="#">View all items →</a>
                </div>

                <div className="items-grid">
                    <div className="item-card" style={{ opacity: 0 }}>
                        <div className="item-img">🎧</div>
                        <div className="item-body">
                            <span className="item-status status-found">Found</span>
                            <div className="item-name">Wireless Headphones</div>
                            <div className="item-meta">
                                <span>📍 Library, Floor 2</span>
                                <span>🕐 2 hours ago</span>
                            </div>
                        </div>
                    </div>
                    <div className="item-card" style={{ opacity: 0 }}>
                        <div className="item-img">💼</div>
                        <div className="item-body">
                            <span className="item-status status-lost">Lost</span>
                            <div className="item-name">Blue Canvas Tote Bag</div>
                            <div className="item-meta">
                                <span>📍 Cafeteria</span>
                                <span>🕐 5 hours ago</span>
                            </div>
                        </div>
                    </div>
                    <div className="item-card" style={{ opacity: 0 }}>
                        <div className="item-img">📒</div>
                        <div className="item-body">
                            <span className="item-status status-found">Found</span>
                            <div className="item-name">Chemistry Notes Binder</div>
                            <div className="item-meta">
                                <span>📍 A Block Hallway</span>
                                <span>🕐 Yesterday</span>
                            </div>
                        </div>
                    </div>
                    <div className="item-card" style={{ opacity: 0 }}>
                        <div className="item-img">🔑</div>
                        <div className="item-body">
                            <span className="item-status status-found">Found</span>
                            <div className="item-name">Keychain with 3 Keys</div>
                            <div className="item-meta">
                                <span>📍 Gym Entrance</span>
                                <span>🕐 Yesterday</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecentItems;
