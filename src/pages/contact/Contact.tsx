import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const form = e.target;
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
        }
      );

      if (response.ok) {
        setSent(true);
        form.reset();
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    }
  };

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
        <div className="absolute inset-0 bg-black/80 z-0" />
        <div className="z-10 px-4">
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold mb-6 text-main-green"
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

      {/* Contact Form & Info Section */}
      <section className="py-24 px-6 bg-white text-black">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-3xl font-semibold text-main-red mb-6">
              Send Us a Message
            </h2>

            <input type="text" name="_honey" style={{ display: "none" }} />
            <input type="hidden" name="_captcha" value="false" />

            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              className="w-full p-4 rounded bg-gray-100 text-black border border-gray-300"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="w-full p-4 rounded bg-gray-100 text-black border border-gray-300"
            />
            <textarea
              name="message"
              placeholder="Your message..."
              required
              rows={5}
              className="w-full p-4 rounded bg-gray-100 text-black border border-gray-300"
            />
            <button
              type="submit"
              className="bg-main-green hover:bg-main-dark-green text-white font-bold py-3 px-6 rounded-full"
            >
              Submit
            </button>

            {sent && (
              <p className="text-main-green">✅ Message sent successfully!</p>
            )}
            {error && (
              <p className="text-red-600">
                ❌ Something went wrong. Try again later.
              </p>
            )}
          </form>

          {/* Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-semibold text-main-red">
              Contact Details
            </h2>

            <div className="flex items-start gap-4">
              <FaEnvelope className="text-main-green mt-1" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-gray-700">hello@signup.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaPhoneAlt className="text-main-green mt-1" />
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-gray-700">+20 1002364021</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-main-green mt-1" />
              <div>
                <p className="font-medium">Address</p>
                <p className="text-gray-700">123 Creative Avenue, NY 10001</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 text-center bg-black border-t border-gray-700 get-in-touch h-screen flex justify-center items-center">
        <div className="relative z-10">
          <motion.h4
            className="text-3xl md:text-4xl font-bold mb-6 text-white"
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
            className="inline-block bg-main-move text-white font-bold py-3 px-8 rounded-full hover:bg-main-medium-move transition text-lg"
            whileHover={{ scale: 1.05 }}
          >
            Email Us
          </motion.a>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
