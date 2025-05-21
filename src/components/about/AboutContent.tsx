import Contact from "../home/Contact";

const AboutContent = () => {
  return (
    <>
      <div className="flex flex-col gap-4 px-6 md:px-[140px] py-10 md:py-24">
        <div className="flex flex-col md:flex-row md:justify-between md:items-stretch gap-8 relative">
          {/* Text Section */}
          <div className="flex flex-col flex-2 gap-6 py-6">
            <h1 className="font-bold text-3xl tracking-widest">
              JONATHAN <br /> PALFREY
            </h1>
            <h3 className="font-semibold text-xl tracking-widest">
              CREATIVE DIRECTOR & <br /> FOUNDER
            </h3>
            <p>
              Jonathan has always had a huge passion for film-making and video
              content creation. Jonathan provides the creative eye into every
              film the company produces often working as the director,
              cinematographer or editor working closely with global brands to
              meet their creative needs. Jonathan is also an experienced drone
              cinematographer capturing aerial footage for luxury resorts in
              dozens of countries around the world. With impressive knowledge,
              he also makes key decisions in how to utilise new technologies,
              ensuring MGV’s clients always receive the highest quality content.
            </p>
          </div>

          {/* Image Section */}
          <div className="flex-1 relative">
            <img
              src="/images/service3.jpg"
              alt="Jonathan Palfrey"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="flex justify-between items-center gap-3">
          <img
            src="/images/service3.jpg"
            alt=""
            className="w-[31%] aspect-[1/1] sm:aspect-[1.4/1] md:aspect-[2.2/1] object-cover"
          />
          <img
            src="/images/service3.jpg"
            alt=""
            className="w-[31%] aspect-[1/1] sm:aspect-[1.4/1] md:aspect-[2.2/1] object-cover"
          />
          <img
            src="/images/service3.jpg"
            alt=""
            className="w-[31%] aspect-[1/1] sm:aspect-[1.4/1] md:aspect-[2.2/1] object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 px-6 md:px-[140px] py-0 md:py-24">
        <div className="flex flex-col md:flex-row-reverse md:justify-between md:items-stretch gap-8 relative">
          {/* Text Section */}
          <div className="flex flex-col flex-2 gap-6 py-6">
            <h1 className="font-bold text-3xl tracking-widest">
              JONATHAN <br /> PALFREY
            </h1>
            <h3 className="font-semibold text-xl tracking-widest">
              CREATIVE DIRECTOR & <br /> FOUNDER
            </h3>
            <p>
              Jonathan has always had a huge passion for film-making and video
              content creation. Jonathan provides the creative eye into every
              film the company produces often working as the director,
              cinematographer or editor working closely with global brands to
              meet their creative needs. Jonathan is also an experienced drone
              cinematographer capturing aerial footage for luxury resorts in
              dozens of countries around the world. With impressive knowledge,
              he also makes key decisions in how to utilise new technologies,
              ensuring MGV’s clients always receive the highest quality content.
            </p>
          </div>

          {/* Image Section */}
          <div className="flex-1 relative">
            <img
              src="/images/service3.jpg"
              alt="Jonathan Palfrey"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="flex justify-between items-center gap-3">
          <img
            src="/images/service3.jpg"
            alt=""
            className="w-[31%] aspect-[1/1] sm:aspect-[1.4/1] md:aspect-[2.2/1] object-cover"
          />
          <img
            src="/images/service3.jpg"
            alt=""
            className="w-[31%] aspect-[1/1] sm:aspect-[1.4/1] md:aspect-[2.2/1] object-cover"
          />
          <img
            src="/images/service3.jpg"
            alt=""
            className="w-[31%] aspect-[1/1] sm:aspect-[1.4/1] md:aspect-[2.2/1] object-cover"
          />
        </div>
      </div>
      <Contact />
    </>
  );
};

export default AboutContent;
