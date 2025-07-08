import { useRef, useState, useEffect } from "react";
import Header from "../components/Header";
import ServiceCard from "../components/ServiceCard";
import Socials from "../components/Socials";
import WorkCard from "../components/WorkCard";
import Footer from "../components/Footer";
import Head from "next/head";
import Button from "../components/Button";
import Link from "next/link";
import Cursor from "../components/Cursor";
import { Listbox } from '@headlessui/react';
import ChatbotWidget from "../components/ChatbotWidget";

// Local Data
import data from "../data/portfolio.json";

export default function Home() {
  // Ref
  const workRef = useRef();
  const aboutRef = useRef();
  const textOne = useRef();
  const textTwo = useRef();
  const textThree = useRef();
  const textFour = useRef();
  const [inputValue, setInputValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const aboutSectionRef = useRef();
  const contactSectionRef = useRef();
  const [aboutVisible, setAboutVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const moreInfoSectionRef = useRef();
  const [moreInfoVisible, setMoreInfoVisible] = useState(false);
  const infoBoxesRef = useRef();
  const [infoBoxesVisible, setInfoBoxesVisible] = useState(false);
  // Add demo section ref and visible state
  const demoSectionRef = useRef();
  const [demoSectionVisible, setDemoSectionVisible] = useState(false);
  const inputRef = useRef();
  const [success, setSuccess] = useState("");
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [demoEmail, setDemoEmail] = useState("");
  const [demoCompany, setDemoCompany] = useState("");
  const [demoBusinessType, setDemoBusinessType] = useState("");
  const [demoError, setDemoError] = useState("");
  const [demoSuccess, setDemoSuccess] = useState("");

  useEffect(() => {
    const handleObserver = (ref, setVisible) => {
      if (!ref.current) return;
      const observer = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.05, rootMargin: '0px 0px 100px 0px' }
      );
      observer.observe(ref.current);
    };
    handleObserver(aboutSectionRef, setAboutVisible);
    handleObserver(contactSectionRef, setContactVisible);
    handleObserver(moreInfoSectionRef, setMoreInfoVisible);
    handleObserver(infoBoxesRef, setInfoBoxesVisible);
    // Add observer for demo section
    handleObserver(demoSectionRef, setDemoSectionVisible);
  }, []);

  // Handling Scroll
  const handleWorkScroll = () => {
    window.scrollTo({
      top: workRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleAboutScroll = () => {
    if (!aboutSectionRef.current) return;
    window.scrollTo({
      top: aboutSectionRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleContactScroll = () => {
    if (!contactSectionRef.current) return;
    window.scrollTo({
      top: contactSectionRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  // Handler for Enter key in the input
  const openModal = () => {
    setShowModal(true);
    setError("");
    setEmail("");
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      openModal();
    }
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email.");
      setTimeout(() => setError(""), 2000);
      return;
    }
    // Custom email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email.");
      setTimeout(() => setError(""), 2000);
      return;
    }
    // Send email via API
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setSuccess(`Thank you! We'll contact you at: ${email}`);
        setEmail("");
        setTimeout(() => {
          setShowModal(false);
          setSuccess("");
        }, 2500);
      } else {
        setError("Failed to send email. Please try again later.");
        setTimeout(() => setError(""), 2000);
      }
    } catch (err) {
      setError("Failed to send email. Please try again later.");
      setTimeout(() => setError(""), 2000);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEmail("");
    setError("");
  };

  // Handler to open demo modal
  const openDemoModal = () => {
    setShowDemoModal(true);
    setDemoError("");
    setDemoSuccess("");
    setDemoEmail("");
    setDemoCompany("");
    setDemoBusinessType("");
  };

  // Handler to close demo modal
  const handleDemoModalClose = () => {
    setShowDemoModal(false);
    setDemoError("");
    setDemoSuccess("");
  };

  // Handler for demo modal submit
  const handleDemoModalSubmit = async (e) => {
    e.preventDefault();
    if (!demoEmail || !demoCompany || !demoBusinessType) {
      setDemoError("Please fill in all fields.");
      setTimeout(() => setDemoError("") , 2000);
      return;
    }
    // Custom email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(demoEmail)) {
      setDemoError("Please enter a valid email.");
      setTimeout(() => setDemoError("") , 2000);
      return;
    }
    try {
      const response = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: demoEmail, company: demoCompany, businessType: demoBusinessType }),
      });
      if (response.ok) {
        setDemoSuccess("Thank you! We'll contact you at: " + demoEmail);
        setTimeout(() => {
          setShowDemoModal(false);
          setDemoSuccess("");
        }, 2500);
      } else {
        const data = await response.json();
        setDemoError(data.message || "Failed to send demo request.");
        setTimeout(() => setDemoError("") , 2000);
      }
    } catch (error) {
      setDemoError("Failed to send demo request.");
      setTimeout(() => setDemoError("") , 2000);
    }
  };

  return (
    <div className="relative">
      <Head>
        <title>{data.name}</title>
      </Head>

      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <div className="container mx-auto mb-10">
        <Header
          handleWorkScroll={handleWorkScroll}
          handleAboutScroll={handleAboutScroll}
          handleContactScroll={handleContactScroll}
        />
        {/* New Hero Section Start */}
        <div className="flex flex-col laptop:flex-row bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-lg mt-10 p-8 gap-8">
          {/* Left Column */}
          <div className="flex-1 flex flex-col justify-center pl-12">
            <h2 className="text-5xl font-extrabold mb-4">
              <span className="text-white">AI</span><span className="text-purple-400">Expand</span>
            </h2>
            <h1 className="text-4xl font-bold text-white mb-4">
              Build an <span className="text-white">AI Agent</span> in <br /> seconds
            </h1>
            <p className="text-gray-300 mb-8">
              Build agents to bolster your workflow and remove the clutter
            </p>
            <div className="flex gap-4">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition" onClick={openModal}>Contact Us</button>
              <button className="bg-white text-gray-900 px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition" onClick={openDemoModal}>Request Demo</button>
            </div>
          </div>
          {/* Right Column */}
          <div className="flex-1 bg-white/5 p-10 relative flex flex-col justify-center rounded-xl">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              <span className="text-white">How can we help you </span><span className="text-purple-400">Expand</span><span className="text-white">?</span>
            </h2>
            <div className="bg-white/80 rounded-xl p-6 mb-6 shadow-inner relative">
              {/* Modal Start */}
              {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-400 rounded-3xl shadow-2xl p-8 w-80 flex flex-col items-center relative animate-fade-in-down">
                    <button onClick={handleModalClose} className="absolute top-3 right-3 text-white text-2xl font-bold hover:text-gray-200">&times;</button>
                    <h2 className="text-3xl font-extrabold text-white mb-2 text-center">Contact</h2>
                    <p className="text-white text-center mb-6">Enter your email and we'll respond <span className="font-bold">ASAP</span></p>
                    <form onSubmit={handleModalSubmit} className="w-full flex flex-col items-center">
                      <input
                        type="text"
                        className="w-full mb-4 px-4 py-3 rounded-full border-none focus:outline-none text-center text-lg placeholder-gray-300"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        autoFocus
                        onFocus={() => setError("")}
                      />
                      {error && (
                        <div className="w-full flex justify-center mb-4 animate-fade-in-out">
                          <div className="flex items-center gap-2 bg-white/90 text-red-600 px-4 py-2 rounded-full shadow text-sm font-medium">
                            <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z' /></svg>
                            {error}
                          </div>
                        </div>
                      )}
                      {success && (
                        <div className="w-full flex justify-center mb-4 animate-fade-in-out">
                          <div className="flex items-center gap-2 bg-white/90 text-green-600 px-4 py-2 rounded-full shadow text-sm font-medium">
                            {success}
                          </div>
                        </div>
                      )}
                      <button type="submit" className="w-full bg-white text-purple-600 font-semibold py-3 rounded-full shadow hover:bg-purple-100 transition">Contact Me</button>
                    </form>
                  </div>
                </div>
              )}
              {/* Demo Modal Start */}
              {showDemoModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-400 rounded-3xl shadow-2xl p-8 w-96 flex flex-col items-center relative animate-fade-in-down">
                    <button onClick={handleDemoModalClose} className="absolute top-3 right-3 text-white text-2xl font-bold hover:text-gray-200">&times;</button>
                    <h2 className="text-3xl font-extrabold text-white mb-2 text-center">Request a Demo</h2>
                    <p className="text-white text-center mb-6">Enter your details and we'll reach out <span className="font-bold">ASAP</span></p>
                    <form onSubmit={handleDemoModalSubmit} className="w-full flex flex-col items-center">
                      <input
                        type="text"
                        className="w-full mb-4 px-4 py-3 rounded-full border-none focus:outline-none text-center text-lg placeholder-gray-300"
                        placeholder="Email"
                        value={demoEmail}
                        onChange={e => setDemoEmail(e.target.value)}
                        autoFocus
                      />
                      <input
                        type="text"
                        className="w-full mb-4 px-4 py-3 rounded-full border-none focus:outline-none text-center text-lg placeholder-gray-300"
                        placeholder="Company Name"
                        value={demoCompany}
                        onChange={e => setDemoCompany(e.target.value)}
                      />
                      <div className="relative w-full mb-4">
                        {/* Headless UI Listbox for Business Type */}
                        <Listbox value={demoBusinessType} onChange={setDemoBusinessType}>
                          <div className="relative">
                            <Listbox.Button className="w-full px-4 py-3 rounded-full border-none focus:outline-none text-lg text-white bg-black/60 appearance-none flex justify-between items-center shadow">
                              <span className={demoBusinessType ? 'text-white' : 'text-gray-300'}>
                                {demoBusinessType || 'Select Business Type'}
                              </span>
                              <span className="ml-2 text-white">▼</span>
                            </Listbox.Button>
                            <Listbox.Options className="absolute mt-2 w-full bg-black/90 rounded-2xl shadow-lg z-10 py-2">
                              <Listbox.Option value="SaaS" className={({ active }) => `cursor-pointer select-none px-4 py-2 rounded-xl ${active ? 'bg-purple-500 text-white' : 'text-white'}`}>SaaS</Listbox.Option>
                              <Listbox.Option value="E-commerce" className={({ active }) => `cursor-pointer select-none px-4 py-2 rounded-xl ${active ? 'bg-purple-500 text-white' : 'text-white'}`}>E-commerce</Listbox.Option>
                              <Listbox.Option value="Consulting" className={({ active }) => `cursor-pointer select-none px-4 py-2 rounded-xl ${active ? 'bg-purple-500 text-white' : 'text-white'}`}>Consulting</Listbox.Option>
                              <Listbox.Option value="Clothing Brand" className={({ active }) => `cursor-pointer select-none px-4 py-2 rounded-xl ${active ? 'bg-purple-500 text-white' : 'text-white'}`}>Clothing Brand</Listbox.Option>
                              <Listbox.Option value="Cannabis Dispensary" className={({ active }) => `cursor-pointer select-none px-4 py-2 rounded-xl ${active ? 'bg-purple-500 text-white' : 'text-white'}`}>Cannabis Dispensary</Listbox.Option>
                              <Listbox.Option value="Car Detailing" className={({ active }) => `cursor-pointer select-none px-4 py-2 rounded-xl ${active ? 'bg-purple-500 text-white' : 'text-white'}`}>Car Detailing</Listbox.Option>
                              <Listbox.Option value="Restaurant" className={({ active }) => `cursor-pointer select-none px-4 py-2 rounded-xl ${active ? 'bg-purple-500 text-white' : 'text-white'}`}>Restaurant</Listbox.Option>
                              <Listbox.Option value="Healthcare" className={({ active }) => `cursor-pointer select-none px-4 py-2 rounded-xl ${active ? 'bg-purple-500 text-white' : 'text-white'}`}>Healthcare</Listbox.Option>
                              <Listbox.Option value="Other" className={({ active }) => `cursor-pointer select-none px-4 py-2 rounded-xl ${active ? 'bg-purple-500 text-white' : 'text-white'}`}>Other</Listbox.Option>
                            </Listbox.Options>
                          </div>
                        </Listbox>
                      </div>
                      {demoError && (
                        <div className="w-full flex justify-center mb-4 animate-fade-in-out">
                          <div className="flex items-center gap-2 bg-white/90 text-red-600 px-4 py-2 rounded-full shadow text-sm font-medium">
                            {demoError}
                          </div>
                        </div>
                      )}
                      {demoSuccess && (
                        <div className="w-full flex justify-center mb-4 animate-fade-in-out">
                          <div className="flex items-center gap-2 bg-white/90 text-green-600 px-4 py-2 rounded-full shadow text-sm font-medium">
                            {demoSuccess}
                          </div>
                        </div>
                      )}
                      <button type="submit" className="w-full bg-white text-purple-600 font-semibold py-3 rounded-full shadow hover:bg-purple-100 transition">Request Demo</button>
                    </form>
                  </div>
                </div>
              )}
              {/* Terminal-style input start */}
              <div
                className="w-full p-4 rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-purple-400 bg-black text-white font-mono text-lg flex items-center cursor-text"
                onClick={() => inputRef.current && inputRef.current.focus()}
              >
                <span className="text-green-400 mr-2">$</span>
                <span className="flex items-center flex-1 min-w-0">
                  <span className={`whitespace-pre font-mono text-lg min-w-0 overflow-x-auto ${inputValue ? 'text-green-400' : ''}`} style={{color: inputValue ? undefined : '#aaa'}}>
                    {inputValue || 'Describe what you want your agent to do...'}
                  </span>
                  <span className="blinking-cursor text-purple-400 text-2xl select-none">_</span>
                  <input
                    ref={inputRef}
                    className="absolute opacity-0 pointer-events-none"
                    tabIndex={0}
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                    autoComplete="off"
                  />
                </span>
              </div>
              {/* Terminal-style input end */}
              <button 
                className="absolute bottom-4 right-4 bg-gradient-to-r from-purple-500 to-pink-400 text-white px-6 py-2 rounded-lg shadow-lg flex items-center gap-2"
                onClick={openModal}
              >
                <span>Start</span>
              </button>
            </div>
            {/* Examples Section */}
            <div className="mt-8">
              <h3 className="text-lg font-bold text-white mb-4">What can <span className="text-purple-400">our agents</span> do?</h3>
              <ul className="grid grid-cols-2 gap-3">
                <li className="bg-white/90 text-gray-900 rounded-xl px-6 py-4 shadow flex items-center font-medium text-base">
                  <span className="mr-3 text-purple-400">•</span> Answer FAQs
                </li>
                <li className="bg-white/90 text-gray-900 rounded-xl px-6 py-4 shadow flex items-center font-medium text-base">
                  <span className="mr-3 text-purple-400">•</span> Get new leads
                </li>
                <li className="bg-white/90 text-gray-900 rounded-xl px-6 py-4 shadow flex items-center font-medium text-base">
                  <span className="mr-3 text-purple-400">•</span> Respond to DMs
                </li>
                <li className="bg-white/90 text-gray-900 rounded-xl px-6 py-4 shadow flex items-center font-medium text-base">
                  <span className="mr-3 text-purple-400">•</span> Drive more profit
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* New Hero Section End */}
        <Socials className="mt-2 laptop:mt-5" />
        
        {/* More Information Section */}
        <div ref={moreInfoSectionRef} className={`mt-60 mb-2 text-center${moreInfoVisible ? ' animate-fade-in-down' : ''}` }>
          {moreInfoVisible && (
            <h2 className="font-bold text-4xl laptop:text-6xl">
              More <span className="text-purple-400">Information</span>
            </h2>
          )}
        </div>
        {/* Info Boxes Side by Side */}
        <div ref={infoBoxesRef} className={`w-full max-w-6xl mx-auto flex flex-row justify-center items-stretch gap-8 mt-16 mb-8${infoBoxesVisible ? ' animate-fade-in-down' : ''}` }>
          {infoBoxesVisible && (
            <>
              <div className="flex-1 min-w-[260px] max-w-[340px] bg-white/90 rounded-2xl shadow-lg overflow-hidden flex flex-col min-h-[280px]">
                <div className="w-full h-48 overflow-hidden flex items-center justify-center bg-white">
                  <img src="/images/AIFlow.png" alt="AI Flow" className="w-full h-full object-contain" />
                </div>
                <div className="p-4 bg-black flex-1 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold mb-2 text-white">How it works</h3>
                  <p className="text-base text-white">We connect our AI agent to your social media. It prompts our backend, generates a response, and all you have to do is watch.</p>
                </div>
              </div>
              <div className="flex-1 min-w-[300px] max-w-[400px] bg-white/90 rounded-2xl shadow-lg overflow-hidden flex flex-col min-h-[280px]">
                <div className="w-full h-48 overflow-hidden flex items-center justify-center bg-black">
                  <img src="/images/NoCode.jpg" alt="No Coding Needed" className="w-full h-full object-cover" />
                </div>
                <div className="p-4 bg-black flex-1 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold mb-2 text-white">No Coding Needed</h3>
                  <p className="text-base text-white">All code will be written for you, any specific optimizations will be tailored to your needs!</p>
                </div>
              </div>
              <div className="flex-1 min-w-[260px] max-w-[340px] bg-white/90 rounded-2xl shadow-lg overflow-hidden flex flex-col min-h-[280px]">
                <div className="w-full h-48 overflow-hidden flex items-center justify-center bg-black">
                  <img src="/images/profits2.png" alt="Boost Profits" className="w-full h-full object-cover" />
                </div>
                <div className="p-4 bg-black flex-1 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold mb-2 text-white">Boost Profits</h3>
                  <p className="text-base text-white">Our AI agents are designed to maximize your business profits by optimizing your workflow and customer engagement.</p>
                </div>
              </div>
              <div className="flex-1 min-w-[260px] max-w-[340px] bg-white/90 rounded-2xl shadow-lg overflow-hidden flex flex-col min-h-[280px]">
                <div className="w-full h-48 overflow-hidden flex items-center justify-center bg-white">
                  <img src="/images/chatbot.png" alt="24/7 Chatbot" className="w-full h-full object-contain" />
                </div>
                <div className="p-4 bg-black flex-1 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold mb-2 text-white">24/7 Chatbot</h3>
                  <p className="text-base text-white">Never miss a customer! Our AI chatbot is always available to answer questions and generate leads.</p>
                </div>
              </div>
            </>
          )}
        </div>
        <div ref={aboutSectionRef} className={`flex flex-col items-center justify-center min-h-[60vh] mt-6 laptop:mt-16 p-2 laptop:p-0${aboutVisible ? ' animate-fade-in-down' : ''}` }>
          {aboutVisible && (
            <>
              <h1 className="tablet:m-10 text-5xl laptop:text-7xl text-bold text-purple-200 text-center">About</h1>
              <p className="tablet:m-10 mt-2 text-lg laptop:text-2xl max-w-3xl text-center">
                At AIExpand we focus on meeting customer needs by tailoring our AI Agents to the specifications given to us by clients. Our goal is to make your business and life more optimized and bring you more profit with less stress.
              </p>
            </>
          )}
        </div>
        {/* Demo Section Start */}
        <div
          ref={demoSectionRef}
          className={`flex flex-col items-center justify-center my-12${demoSectionVisible ? ' animate-fade-in-down' : ''}`}
        >
          {demoSectionVisible && (
            <>
              <h2 className="text-4xl font-extrabold mb-6 text-white">Watch one of our <span className='text-purple-400'>demos</span></h2>
              <div className="flex flex-row gap-8">
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg text-xl transition">Demo 1</button>
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg text-xl transition">Demo 2</button>
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg text-xl transition">Demo 3</button>
              </div>
            </>
          )}
        </div>
        {/* Demo Section End */}
        <div
          ref={contactSectionRef}
          className={`mt-5 laptop:mt-40 p-2 laptop:p-0 min-h-[200px] transition-opacity duration-700 ${contactVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <div className="text-center">
            <Footer onContactClick={() => setShowModal(true)} />
          </div>
        </div>
        <ChatbotWidget />
      </div>
    </div>
  );
}