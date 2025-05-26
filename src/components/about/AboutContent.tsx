import { motion } from "framer-motion";
import Contact from "../home/Contact";

const fadeIn = (direction = "up", delay = 0) => {
  return {
    initial: {
      y: direction === "up" ? 40 : 0,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, delay },
    },
  };
};

const AboutContent = () => {
  return (
    <>
      {/* First Section */}
      <div className="flex flex-col gap-4 px-6 md:px-[160px] py-10 md:pt-8">
        <motion.div
          className="flex flex-col md:flex-row md:justify-between md:items-stretch gap-4 md:gap-12 relative"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {/* Text Section */}
          <motion.div
            className="flex flex-col flex-2 gap-6 py-6 md:py-14"
            variants={fadeIn("up", 0.1)}
          >
            <h1 className="font-bold text-3xl tracking-widest">
              JONATHAN <br /> PALFREY
            </h1>
            <h3 className="font-semibold text-xl tracking-widest">
              CREATIVE DIRECTOR & <br /> FOUNDER
            </h3>
            <p className="leading-8 tracking-wider text-gray-700">
              Jonathan has always had a huge passion for film-making and video
              content creation. Jonathan provides the creative eye into every
              film the company produces, often working as the director,
              cinematographer, or editor, working closely with global brands to
              meet their creative needs. Jonathan is also an experienced drone
              cinematographer capturing aerial footage for luxury resorts in
              dozens of countries around the world. With impressive knowledge,
              he also makes key decisions in how to utilise new technologies,
              ensuring MGV’s clients always receive the highest quality content.
            </p>
          </motion.div>

          {/* Image Section */}
          <motion.div className="flex-1 relative" variants={fadeIn("up", 0.3)}>
            <img
              src="/images/service3.jpg"
              alt="Jonathan Palfrey"
              className="h-full w-full object-cover rounded-lg shadow-lg"
            />
          </motion.div>
        </motion.div>

        {/* Gallery Section */}
        <motion.div
          className="flex justify-between items-center gap-1"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {[0, 1, 2].map((_, index) => (
            <motion.img
              key={index}
              src="/images/service3.jpg"
              alt=""
              className="w-[33%] aspect-[1/1] sm:aspect-[1.4/1] md:aspect-[2.2/1] object-cover rounded-lg"
              variants={fadeIn("up", 0.4 + index * 0.1)}
            />
          ))}
        </motion.div>
      </div>

      {/* Second Section */}
      <div className="flex flex-col gap-4 px-6 md:px-[140px] py-0 md:py-8">
        <motion.div
          className="flex flex-col md:flex-row-reverse md:justify-between md:items-stretch gap-4 md:gap-12 relative"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {/* Text Section */}
          <motion.div
            className="flex flex-col flex-2 gap-6 py-6 md:py-14"
            variants={fadeIn("up", 0.1)}
          >
            <h1 className="font-bold text-3xl tracking-widest">
              JONATHAN <br /> PALFREY
            </h1>
            <h3 className="font-semibold text-xl tracking-widest">
              CREATIVE DIRECTOR & <br /> FOUNDER
            </h3>
            <p className="leading-8 tracking-wider text-gray-700 ">
              Jonathan has always had a huge passion for film-making and video
              content creation. Jonathan provides the creative eye into every
              film the company produces, often working as the director,
              cinematographer, or editor, working closely with global brands to
              meet their creative needs. Jonathan is also an experienced drone
              cinematographer capturing aerial footage for luxury resorts in
              dozens of countries around the world. With impressive knowledge,
              he also makes key decisions in how to utilise new technologies,
              ensuring MGV’s clients always receive the highest quality content.
            </p>
          </motion.div>

          {/* Image Section */}
          <motion.div className="flex-1 relative" variants={fadeIn("up", 0.3)}>
            <img
              src="/images/service3.jpg"
              alt="Jonathan Palfrey"
              className="h-full w-full object-cover rounded-lg shadow-lg"
            />
          </motion.div>
        </motion.div>

        {/* Gallery Section */}
        <motion.div
          className="flex justify-between items-center gap-1"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {[0, 1, 2].map((_, index) => (
            <motion.img
              key={index}
              src="/images/service3.jpg"
              alt=""
              className="w-[33%] aspect-[1/1] sm:aspect-[1.4/1] md:aspect-[2.2/1] object-cover rounded-lg"
              variants={fadeIn("up", 0.4 + index * 0.1)}
            />
          ))}
        </motion.div>
      </div>

      <Contact />
    </>
  );
};

export default AboutContent;
