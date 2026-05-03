import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import SearchSection from '../components/SearchSection';
import HowItWorks from '../components/HowItWorks';
import Stats from '../components/Stats';
import Testimonials from '../components/Testimonials';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

const LandingPage = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <SearchSection />
            <HowItWorks />
            <Stats />
            <Testimonials />
            <CTASection />
            <Footer />
        </>
    );
};

export default LandingPage;
