import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/services';
import ProcessFlow from './components/ProcessFlow';
import ServicePackageDetail from './components/ServicePackageDetail';
import WhyChooseUs from './components/WhyChooseUs';
import Footer from './components/Footer';

function App() {
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  const handleServiceClick = (serviceId) => {
    setSelectedServiceId(serviceId);
    // Scroll to top
    window.scrollTo(0, 0);
  };

  const handleBackToServices = () => {
    setSelectedServiceId(null);
    window.scrollTo(0, 0);
  };

  return (
    <div className="app">
      <Header />
      {selectedServiceId ? (
        <ServicePackageDetail 
          serviceId={selectedServiceId} 
          onBack={handleBackToServices}
        />
      ) : (
        <>
          <Hero />
          <Services onServiceClick={handleServiceClick} />
          <ProcessFlow />
          <WhyChooseUs />
        </>
      )}
      <Footer />
    </div>
  );
}

export default App;
