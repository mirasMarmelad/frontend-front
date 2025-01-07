import React from 'react';
import AppBar from '../Helpers/Appbar';
import Footer from '../Helpers/Footer';
import Hero from './Hero';

const HomePage = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppBar/>
        <Hero/>
           
        <Footer/>
        </div>
    );
};

export default HomePage;