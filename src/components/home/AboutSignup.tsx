const AboutSignup = () => {
  return (
    <section className="bg-white text-black px-6 md:px-14 py-20">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header */}
        <header className="text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Who We Are
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            We are a passionate team that creates irresistible brand experiences
            that connect emotionally and drive results.
          </p>
        </header>

        {/* Info Sections */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Vision */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-orange-600">Vision</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              Helping MENA businesses shine through effective identity and
              communication. Our creative direction is built around clarity and
              authenticity.
            </p>
          </div>

          {/* What Makes Us Different */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-orange-600 uppercase">
              What Makes Us Different
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              We embrace an evolving campaign approach—steering clear of tired
              trends and creating tailored strategies that grow with your brand.
            </p>
          </div>

          {/* Mission */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-orange-600 uppercase">
              Mission
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              Creating joyful, data-informed marketing campaigns that meet
              business goals and leave lasting impressions.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center pt-10">
          <button className="inline-block bg-orange-500 text-white font-semibold text-lg py-3 px-8 rounded-full shadow-md hover:bg-black hover:text-white transition-all duration-300 ease-in-out">
            Let's Talk
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutSignup;
