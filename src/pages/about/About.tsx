import AboutContent from "../../components/about/AboutContent";
import AboutText from "../../components/about/AboutText";

const About = () => {
  return (
    <>
      <div className="main-section relative flex justify-center items-center aspect-[1/1.2] md:aspect-[2.5/1]">
        <div className="absolute w-full h-full bg-black/40 top-0 right-0" />
        <h1 className="uppercase absolute top-[50%] right-[50%] translate-x-[50%] font-medium tracking-wider text-[20px] md:text-6xl text-white z-10">
          who are we ?
        </h1>
      </div>
      <AboutText />
      <AboutContent />
    </>
  );
};

export default About;
