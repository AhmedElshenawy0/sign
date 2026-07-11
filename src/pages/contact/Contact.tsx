import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, FormEvent } from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaSpinner,
} from "react-icons/fa";

const ContactPage = () => {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/shenawy100@gmail.com",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        },
      );

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen relative overflow-hidden selection:bg-main-green/30">
      {/* Pinned Cinematic Background Blur Window Frame */}
      <div className="absolute inset-0 w-full h-[60vh] z-0 pointer-events-none">
        <motion.img
          src="/images/sign5.jpg"
          alt="Contact Background Backdrop"
          className="w-full h-full object-cover opacity-20"
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-slate-950/80 to-slate-950" />
      </div>

      {/* Hero Header Space Content Deck Area */}
      <section className="relative z-10 pt-40 pb-20 text-center px-4 max-w-4xl mx-auto space-y-4">
        <motion.h1
          className="text-5xl md:text-7xl font-black uppercase tracking-tight text-main-green"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Get In Touch
        </motion.h1>
        <motion.p
          className="text-base md:text-xl text-slate-400 max-w-xl mx-auto font-medium leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
        >
          We'd love to hear from you. Let’s build something unforgettable
          together.
        </motion.p>
      </section>

      {/* Primary Interaction Interface Column Block Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-32">
        <div className="bg-white text-slate-900 rounded-[2rem] p-8 md:p-16 shadow-2xl border border-neutral-200/50 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Dynamic Interactive Processing Card Form Column Container */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-900">
              Send Us a Message
            </h2>

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-4 my-6"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <div className="flex justify-center text-emerald-500 text-5xl">
                    <FaCheckCircle />
                  </div>
                  <h3 className="text-xl font-bold text-emerald-900">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-emerald-700 text-sm font-medium">
                    Thank you for reaching out. Our development specialists will
                    review your criteria and respond shortly.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-2 text-xs font-black uppercase tracking-widest text-emerald-600 hover:text-emerald-700 underline transition-all"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Anti-spam Honey Pots System Configurations */}
                  <input type="text" name="_honey" className="hidden" />
                  <input type="hidden" name="_captcha" value="false" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase tracking-wider text-slate-500">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        disabled={status === "submitting"}
                        placeholder="Ahmed Elshnawy"
                        className="w-full p-4 rounded-xl bg-neutral-50 text-slate-900 border border-neutral-200 focus:outline-none focus:border-main-dark-green font-medium transition-all text-sm disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase tracking-wider text-slate-500">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        disabled={status === "submitting"}
                        placeholder="name@company.com"
                        className="w-full p-4 rounded-xl bg-neutral-50 text-slate-900 border border-neutral-200 focus:outline-none focus:border-main-dark-green font-medium transition-all text-sm disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-500">
                      Project Strategy Parameters
                    </label>
                    <textarea
                      name="message"
                      required
                      disabled={status === "submitting"}
                      rows={5}
                      placeholder="Tell us about your brand goals, interface scope requirements, or pipeline timelines..."
                      className="w-full p-4 rounded-xl bg-neutral-50 text-slate-900 border border-neutral-200 focus:outline-none focus:border-main-dark-green font-medium transition-all text-sm resize-none disabled:opacity-50"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="bg-main-dark-green text-white text-xs font-black uppercase tracking-widest py-4 px-8 rounded-full shadow-md shadow-main-dark-green/10 hover:bg-slate-950 transition-all inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === "submitting" ? (
                        <>
                          <FaSpinner className="animate-spin" /> Processing...
                        </>
                      ) : (
                        "Submit Request"
                      )}
                    </button>

                    {status === "error" && (
                      <p className="text-red-600 text-xs font-bold tracking-wide animate-pulse">
                        ❌ Network pipeline error. Please re-verify metrics and
                        try again.
                      </p>
                    )}
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Context Dynamic Metadata Branding Presentation Column */}
          <div className="lg:col-span-5 lg:border-l lg:border-neutral-200/80 lg:pl-12 space-y-8 self-center lg:py-4">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-900">
                Contact Details
              </h2>
              <p className="text-slate-500 text-sm font-medium">
                Prefer direct communication pipelines? Drop an asset payload
                directly on our addresses.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-neutral-100 rounded-xl text-main-dark-green group-hover:bg-main-dark-green group-hover:text-white transition-colors duration-300">
                  <FaEnvelope size={18} />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                    Direct Email
                  </p>
                  <a
                    href="mailto:hello@signup.com"
                    className="font-bold text-slate-800 hover:text-main-dark-green transition-colors text-base break-all"
                  >
                    hello@signup.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-neutral-100 rounded-xl text-main-dark-green group-hover:bg-main-dark-green group-hover:text-white transition-colors duration-300">
                  <FaPhoneAlt size={18} />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                    Phone Hotline
                  </p>
                  <a
                    href="tel:+201002364021"
                    className="font-bold text-slate-800 hover:text-main-dark-green transition-colors text-base"
                  >
                    +20 100 236 4021
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-neutral-100 rounded-xl text-main-dark-green group-hover:bg-main-dark-green group-hover:text-white transition-colors duration-300">
                  <FaMapMarkerAlt size={18} />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                    HQ Studio Location
                  </p>
                  <p className="font-bold text-slate-800 text-base leading-tight">
                    123 Creative Avenue, NY 10001
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
