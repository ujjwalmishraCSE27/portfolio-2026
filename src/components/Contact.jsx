import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [submitState, setSubmitState] = useState('idle'); // 'idle', 'sliding', 'sealing', 'flying', 'success'
  
  const formRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (submitError) {
      setSubmitError('');
    }
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (formData.phone.trim() && !/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number format';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSending(true);
    setSubmitError('');

    try {
      const response = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.ok) {
        if (result.errors) {
          setErrors(result.errors);
        }
        setSubmitError(result.message || 'Could not send your message. Please try again.');
        setIsSending(false);
        return;
      }
    } catch {
      setSubmitError('Could not reach the mail server. Please try again.');
      setIsSending(false);
      return;
    }

    setIsSending(false);

    // Start 3D envelope sequence
    setSubmitState('sliding');
    
    setTimeout(() => {
      setSubmitState('sealing');
    }, 600);

    setTimeout(() => {
      setSubmitState('flying');
    }, 1200);

    setTimeout(() => {
      setSubmitState('success');
    }, 2000);
  };

  const handleReset = () => {
    setFormData({ name: '', phone: '', email: '', message: '' });
    setErrors({});
    setSubmitError('');
    setIsSending(false);
    setSubmitState('idle');
  };

  // 3D Envelope Animation States
  const paperAnimate = {
    idle: { y: -80, opacity: 1, scale: 1 },
    sliding: { y: 65, opacity: 1, scale: 0.95, transition: { duration: 0.6, ease: "easeInOut" } },
    sealing: { y: 65, scale: 0.95 },
    flying: { y: 65, scale: 0.95 },
    success: { y: 65, scale: 0.95 }
  };

  const flapAnimate = {
    idle: { rotateX: -140, zIndex: 0 },
    sliding: { rotateX: -140, zIndex: 0 },
    sealing: { rotateX: 0, zIndex: 30, transition: { duration: 0.4, ease: "easeOut" } },
    flying: { rotateX: 0, zIndex: 30 },
    success: { rotateX: 0, zIndex: 30 }
  };

  const envelopeAnimate = {
    idle: { y: 80, x: 0, rotate: 0, scale: 1, opacity: 1 },
    sliding: { y: 80, x: 0, rotate: 0, scale: 1, opacity: 1 },
    sealing: { y: 80, x: 0, rotate: 0, scale: 1, opacity: 1 },
    flying: { 
      y: -600, 
      x: 350, 
      rotate: 18, 
      scale: 0.35, 
      opacity: 0, 
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } 
    },
    success: { y: -600, x: 350, rotate: 18, scale: 0.35, opacity: 0 }
  };

  return (
    <section id="contact" className="relative w-full py-24 px-6 md:px-12 bg-white text-neutral-900 z-10 border-t border-neutral-100 overflow-hidden">
      <div className="relative w-full max-w-4xl mx-auto flex flex-col">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3 select-none">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-[#ff007f] font-spacemono">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-outfit uppercase tracking-wider text-neutral-900">
            Contact
          </h2>
          <p className="text-neutral-500 font-semibold text-xs sm:text-sm leading-relaxed font-space">
            Get in touch with me. I will get back to you as soon as possible.
          </p>
          <a
            href="mailto:ujjwalmishracse27@gmail.com"
            className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold font-spacemono text-neutral-900 hover:text-[#ff007f] transition-colors break-all"
          >
            <svg className="w-4 h-4 flex-shrink-0 fill-current" viewBox="0 0 24 24">
              <path d="M24 5.457v13.918c0 .904-.732 1.637-1.636 1.637h-3.818V11.5L12 16.64 5.454 11.5v9.512H1.636A1.636 1.636 0 010 19.375V5.457c0-.904.732-1.636 1.636-1.636h3.818L12 9.073l6.545-5.251h3.818c.904 0 1.637.732 1.637 1.636z" />
            </svg>
            <span>ujjwalmishracse27@gmail.com</span>
          </a>
        </div>

        {/* Dynamic Split Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start w-full min-h-[500px]">
          
          {/* LEFT COLUMN: Input Form */}
          <div className="w-full flex flex-col justify-between min-h-[460px]">
            <AnimatePresence mode="wait">
              {submitState !== 'success' ? (
                <motion.div
                  key="contact-form-key"
                  initial={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30, transition: { duration: 0.4 } }}
                  className="flex flex-col gap-6"
                >
                  <div>
                    <h3 className="text-lg font-bold font-outfit text-neutral-900 mb-1">
                      Send me a message
                    </h3>
                    <p className="text-xs font-space font-medium text-neutral-500">
                      Fill out the form below and I will get back to you as soon as possible.
                    </p>
                  </div>

                  <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
                    
                    {/* Name & Phone Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold font-space uppercase tracking-wider text-neutral-700">
                          Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          disabled={submitState !== 'idle'}
                          placeholder="Your full name"
                          className={`w-full px-4 py-2.5 border text-xs font-semibold rounded-lg bg-neutral-50/50 outline-none transition-all focus:border-neutral-900 focus:bg-white ${errors.name ? 'border-red-500' : 'border-neutral-200'}`}
                        />
                        {errors.name && <span className="text-[10px] font-bold text-red-500 font-spacemono">{errors.name}</span>}
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold font-space uppercase tracking-wider text-neutral-700">
                          Phone
                        </label>
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          disabled={submitState !== 'idle'}
                          placeholder="+1 (123) xxx-xxxx"
                          className={`w-full px-4 py-2.5 border text-xs font-semibold rounded-lg bg-neutral-50/50 outline-none transition-all focus:border-neutral-900 focus:bg-white ${errors.phone ? 'border-red-500' : 'border-neutral-200'}`}
                        />
                        {errors.phone && <span className="text-[10px] font-bold text-red-500 font-spacemono">{errors.phone}</span>}
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold font-space uppercase tracking-wider text-neutral-700">
                        Email *
                      </label>
                      <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={submitState !== 'idle'}
                        placeholder="your.email@example.com"
                        className={`w-full px-4 py-2.5 border text-xs font-semibold rounded-lg bg-neutral-50/50 outline-none transition-all focus:border-neutral-900 focus:bg-white ${errors.email ? 'border-red-500' : 'border-neutral-200'}`}
                      />
                      {errors.email && <span className="text-[10px] font-bold text-red-500 font-spacemono">{errors.email}</span>}
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold font-space uppercase tracking-wider text-neutral-700">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        disabled={submitState !== 'idle'}
                        placeholder="Tell me about your project or just say hello..."
                        rows={5}
                        className={`w-full px-4 py-2.5 border text-xs font-semibold rounded-lg bg-neutral-50/50 outline-none transition-all resize-none focus:border-neutral-900 focus:bg-white ${errors.message ? 'border-red-500' : 'border-neutral-200'}`}
                      />
                      {errors.message && <span className="text-[10px] font-bold text-red-500 font-spacemono">{errors.message}</span>}
                    </div>

                    {/* CTA Button */}
                    {submitError && (
                      <div className="px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-[11px] font-bold font-space rounded-lg">
                        {submitError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={submitState !== 'idle' || isSending}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-neutral-950 hover:bg-neutral-900 text-white text-xs font-bold font-spacemono uppercase tracking-wider rounded-lg transition-colors cursor-pointer w-max shadow-sm active:scale-95 disabled:bg-neutral-400"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                      </svg>
                      <span>{submitState === 'idle' && !isSending ? 'Send Message' : 'Sending...'}</span>
                    </button>

                  </form>
                </motion.div>
              ) : (
                /* SUCCESS SCREEN */
                <motion.div
                  key="success-screen-key"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex flex-col gap-6 items-start self-center py-10"
                >
                  <div className="flex flex-col items-center justify-center w-12 h-12 rounded-full bg-green-50 border border-green-200 shadow-sm text-green-600 mb-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black font-outfit uppercase tracking-wider text-neutral-900 mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-neutral-500 font-semibold text-xs sm:text-sm leading-relaxed font-space max-w-sm">
                      Thank you for reaching out! Your message has folded itself into a neat paper letter and flown straight to my inbox. I will review it and reply as soon as possible.
                    </p>
                  </div>
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-[10px] font-bold text-white uppercase tracking-wider font-spacemono rounded-lg transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT COLUMN: 3D Live Stationery Preview */}
          <div className="w-full flex items-center justify-center min-h-[460px] relative hidden md:flex">
            
            {/* 3D Envelope Assembly Layer */}
            <div className="relative w-[340px] h-[340px] perspective-1000 select-none">
              
              <motion.div
                animate={submitState}
                variants={envelopeAnimate}
                initial="idle"
                className="relative w-full h-[180px] transform-style-3d origin-center"
              >
                {/* Back Plate Face */}
                <div className="absolute inset-0 bg-[#e5e5e5] border border-neutral-300 rounded-b-xl z-0 shadow-sm" />

                {/* Live Stationery Paper sheet */}
                <motion.div
                  animate={submitState}
                  variants={paperAnimate}
                  initial="idle"
                  className="absolute left-3 right-3 bottom-3 h-[250px] bg-white border border-neutral-200/80 shadow-md p-5 z-10 origin-bottom select-none flex flex-col justify-between"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px)',
                    backgroundSize: '100% 20px',
                    lineHeight: '20px'
                  }}
                >
                  {/* Stamp detail */}
                  <div className="absolute top-4 right-4 w-9 h-11 border-[1.5px] border-dashed border-neutral-400 p-0.5 rounded-sm flex items-center justify-center text-xs opacity-60">
                    ✉️
                  </div>

                  {/* Letter content dynamically populated */}
                  <div className="font-cabin text-xs text-neutral-800 font-bold space-y-1 mt-4">
                    <div>Dear Ujjwal,</div>
                    <div className="break-words max-h-[120px] overflow-hidden leading-relaxed italic text-[11px] text-neutral-600 font-semibold pt-1">
                      {formData.message ? `"${formData.message}"` : 'Your message will appear here as you type...'}
                    </div>
                  </div>

                  <div className="font-cabin text-[10px] text-neutral-700 font-bold flex flex-col border-t border-dashed border-neutral-200 pt-1.5 mt-auto">
                    <div>From: {formData.name || 'Anonymous'}</div>
                    <div className="text-[9px] text-neutral-400 font-semibold tracking-wide uppercase font-spacemono mt-0.5">
                      {formData.email || 'no.email@example.com'} {formData.phone ? `| ${formData.phone}` : ''}
                    </div>
                  </div>
                </motion.div>

                {/* Front Pocket Face */}
                <div 
                  className="absolute left-0 right-0 bottom-0 h-[100px] bg-[#f8f8f8] border-t border-neutral-200 rounded-b-xl shadow-md z-20"
                  style={{ clipPath: 'polygon(0 100%, 0 0, 50% 50px, 100% 0, 100% 100%)' }}
                />

                {/* Top Flap Sealing Cover */}
                <motion.div
                  animate={submitState}
                  variants={flapAnimate}
                  initial="idle"
                  className="absolute left-0 right-0 top-0 h-[90px] bg-[#dfdfdf] rounded-t-xl border-x border-t border-neutral-300 origin-top"
                  style={{ 
                    clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'visible'
                  }}
                />

              </motion.div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
