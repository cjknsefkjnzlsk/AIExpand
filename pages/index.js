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
        { threshold: 0.1 }
      );
      observer.observe(ref.current);
    };
    handleObserver(aboutSectionRef, setAboutVisible);
    handleObserver(contactSectionRef, setContactVisible);
    handleObserver(moreInfoSectionRef, setMoreInfoVisible);
    handleObserver(infoBoxesRef, setInfoBoxesVisible);
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
    window.scrollTo({
      top: aboutRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  // Handler for Enter key in the input
  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      setShowModal(true);
    }
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email.");
      setTimeout(() => setError(""), 2000);
      return;
    }
    alert(`Thank you! We'll contact you at: ${email}`);
    setShowModal(false);
    setEmail("");
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEmail("");
    setError("");
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
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition">Contact Us</button>
              <button className="bg-white text-gray-900 px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition">Request Demo</button>
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
                        type="email"
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
                      <button type="submit" className="w-full bg-white text-purple-600 font-semibold py-3 rounded-full shadow hover:bg-purple-100 transition">Contact Me</button>
                    </form>
                  </div>
                </div>
              )}
              {/* Modal End */}
              <input
                className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Describe what you want your agent to do..."
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={handleInputKeyDown}
              />
              <button 
                className="absolute bottom-4 right-4 bg-gradient-to-r from-purple-500 to-pink-400 text-white px-6 py-2 rounded-lg shadow-lg flex items-center gap-2"
                onClick={() => setShowModal(true)}
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
          <h2 className="font-bold text-4xl laptop:text-6xl">
            More <span className="text-purple-400">Information</span>
          </h2>
        </div>
        {/* Info Boxes Side by Side */}
        <div ref={infoBoxesRef} className={`w-full max-w-4xl mx-auto flex flex-row justify-center items-stretch gap-8 mt-8 mb-8${infoBoxesVisible ? ' animate-fade-in-down' : ''}` }>
          <div className="flex-1 bg-white/90 rounded-2xl shadow-lg overflow-hidden flex flex-col min-h-[420px]">
            <img src="/images/AIFlow.png" alt="AI Flow" className="w-full object-cover" />
            <div className="p-4 bg-black flex-1 flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-2 text-purple-400">How it works</h3>
              <p className="text-base text-purple-300">We connect our AI agent to your social media. It prompts our backend, generates a response, and all you have to do is watch.</p>
            </div>
          </div>
          <div className="flex-1 bg-white/90 rounded-2xl shadow-lg overflow-hidden flex flex-col min-h-[420px]">
            <img src="/images/NoCode.png" alt="No Coding Needed" className="w-full object-cover" />
            <div className="p-4 bg-black flex-1 flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-2 text-purple-400">No Coding Needed</h3>
              <p className="text-base text-purple-300">All code will be written for you, any specific optimizations will be tailored to your needs!</p>
            </div>
          </div>
        </div>
        <div ref={aboutSectionRef} className={`flex flex-col items-center justify-center min-h-[60vh] mt-10 laptop:mt-24 p-2 laptop:p-0${aboutVisible ? ' animate-fade-in-down' : ''}` }>
          <h1 className="tablet:m-10 text-5xl laptop:text-7xl text-bold text-purple-200 text-center">About</h1>
          <p className="tablet:m-10 mt-2 text-lg laptop:text-2xl max-w-3xl text-center">
            At AIExpand we focus on meeting customer needs by tailoring our AI Agents to the specifications given to us by clients. Our goal is to make your business and life more optimized and bring you more profit with less stress.
          </p>
        </div>
        <div ref={contactSectionRef} className={`mt-5 laptop:mt-40 p-2 laptop:p-0${contactVisible ? ' animate-fade-in-down' : ''}` }>
          <div className="text-center">
            <Footer onContactClick={() => setShowModal(true)} />
          </div>
        </div>
      </div>
    </div>
  );
}