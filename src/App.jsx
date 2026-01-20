import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProcessFlow from './components/ProcessFlow';
import Packages from './components/Packages';
import WhyChooseUs from './components/WhyChooseUs';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app">
      <Header />
      <Hero />
      <ProcessFlow />
      <WhyChooseUs />
      <Packages />
      <Footer />
    </div>
  );
}

export default App;
