import { motion } from "framer-motion";
import { useEffect } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center text-center relative overflow-hidden pt-20">
        <motion.img
          src="/images/sign5.jpg"
          alt="Contact Hero"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <div className="absolute inset-0 w-full h-full bg-black opacity-80" />
        <div className="z-10 px-4">
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold mb-6 text-green-700"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Get In Touch
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            We'd love to hear from you. Let’s build something unforgettable
            together.
          </motion.p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 px-6 bg-gradient-to-t from-black to-zinc-900">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <motion.form
            className="space-y-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            onSubmit={(e) => e.preventDefault()}
          >
            <h2 className="text-3xl font-semibold text-orange-500 mb-6">
              Send Us a Message
            </h2>
            <input
              type="text"
              placeholder="Name"
              className="w-full p-4 rounded bg-zinc-800 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-700"
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-4 rounded bg-zinc-800 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-700"
              required
            />
            <textarea
              rows={5}
              placeholder="Your message..."
              className="w-full p-4 rounded bg-zinc-800 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-700"
              required
            />
            <button
              type="submit"
              className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-full transition"
            >
              Submit
            </button>
          </motion.form>

          {/* Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-semibold text-orange-500">
              Contact Details
            </h2>

            <div className="flex items-start gap-4">
              <FaEnvelope className="text-green-700 mt-1" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-gray-400">hello@signup.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaPhoneAlt className="text-green-700 mt-1" />
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-gray-400">+20 1002364021</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-green-700 mt-1" />
              <div>
                <p className="font-medium">Address</p>
                <p className="text-gray-400">123 Creative Avenue, NY 10001</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 text-center bg-black border-t border-gray-700">
        <motion.h4
          className="text-3xl font-bold mb-6 text-orange-500"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          We’re Ready When You Are
        </motion.h4>
        <motion.p
          className="text-gray-400 mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          Let’s connect and explore how we can create something bold and
          impactful together.
        </motion.p>
        <motion.a
          href="mailto:hello@yourbrand.com"
          className="inline-block bg-green-700 text-white font-bold py-3 px-8 rounded-full hover:bg-green-800 transition text-lg"
          whileHover={{ scale: 1.05 }}
        >
          Email Us
        </motion.a>
      </section>
    </div>
  );
};

export default ContactPage;
