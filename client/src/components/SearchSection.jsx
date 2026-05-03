import React, { useState } from 'react';

const SearchSection = () => {
    const tags = ['All', 'Electronics', 'Bags', 'Keys & Cards', 'Clothing', 'Books & Notes', 'Accessories', 'Other'];
    const [activeTag, setActiveTag] = useState('All');

    return (
        <section className="search-section">
            <div className="section-center">
                <p className="section-label">Search Database</p>
                <h2>What are you looking for?</h2>
                <p style={{ color: 'rgba(139,190,178,0.65)', fontSize: '0.95rem', fontWeight: 300, marginTop: '0.5rem' }}>
                    Over 400 items currently in our system across all campus locations.
                </p>

                <div className="search-box">
                    <input type="text" placeholder="Describe the item — color, brand, name..." />
                    <select>
                        <option>All Locations</option>
                        <option>Library</option>
                        <option>Cafeteria</option>
                        <option>Gym</option>
                        <option>A Block</option>
                        <option>B Block</option>
                        <option>Auditorium</option>
                        <option>Hostel</option>
                    </select>
                    <button>Search →</button>
                </div>

                <div className="filter-tags">
                    {tags.map(tag => (
                        <span 
                            key={tag} 
                            className={`tag ${activeTag === tag ? 'active' : ''}`}
                            onClick={() => setActiveTag(tag)}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SearchSection;
