import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import ProcessFlow from './components/ProcessFlow';
import ServicePackageDetail from './components/ServicePackageDetail';
import WhyChooseUs from './components/WhyChooseUs';
import Footer from './components/Footer';
import PujaModal from "./components/PujaModal";
import SpecialPujaTemples from "./components/SpecialPujaTemples";
// import PanditAtService from "./components/PanditAtService";


function App() {
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [activeView, setActiveView] = useState("HOME");
  const [openPujaModal, setOpenPujaModal] = useState(false);


  const handleServiceClick = (serviceKey) => {
    if (serviceKey === "SPECIAL_PUJA") {
      setActiveView("SPECIAL_PUJA");
      setSelectedServiceId(null);
    } else if (serviceKey === "PANDIT_SERVICE") {
      setActiveView("PANDIT_SERVICE");
      setSelectedServiceId(null);
    } else {
      // Pind Daan / Ashti Visarjan
      setSelectedServiceId(serviceKey);
      setActiveView("PACKAGE");
    }

    window.scrollTo(0, 0);
  };


  const handleBackToServices = () => {
    setSelectedServiceId(null);
    setActiveView("HOME");
    window.scrollTo(0, 0);
  };


  return (
    <>
      <div className="app">

        <Header onOpenPuja={() => setOpenPujaModal(true)} />

        {activeView === "PACKAGE" && selectedServiceId && (
          <ServicePackageDetail
            serviceId={selectedServiceId}
            onBack={handleBackToServices}
          />
        )}

        {activeView === "SPECIAL_PUJA" && (
          <SpecialPujaTemples onBack={handleBackToServices} />
        )}

        {activeView === "PANDIT_SERVICE" && (
          <PanditAtService onBack={handleBackToServices} />
        )}

        {activeView === "HOME" && (
          <>
            <Hero />
            <Services onServiceClick={handleServiceClick} />
            <ProcessFlow />
            <WhyChooseUs />
          </>
        )}


        <Footer onOpenPuja={() => setOpenPujaModal(true)} />

        {/* GLOBAL MODAL */}
        <PujaModal
          isOpen={openPujaModal}
          onClose={() => setOpenPujaModal(false)}
        />

      </div>
    </>
  );
}

export default App;
