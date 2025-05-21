const Contact = () => {
  return (
    <div className="contact-sec relative aspect-[1/1.5] sm:aspect-[2.1/1] mt-24 px-3 flex justify-center items-center flex-col text-white gap-6 z-10">
      <div className="bg-black/50 absolute top-0 right-0 w-full h-full" />

      <h1 className="z-10 text-3xl font-semibold tracking-wider">
        THE SEARCH IS OVER
      </h1>
      <p className="z-10">
        Get in touch and lets discover what we can do for your brand.
      </p>
      <button className="p-3 z-10 rounded-3xl border border-white hover:bg-white hover:text-black text-white cursor-pointer transition">
        Contact
      </button>
    </div>
  );
};

export default Contact;
