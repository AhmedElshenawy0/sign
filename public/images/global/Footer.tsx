import { FaInstagram } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="px-4 py-6 md:py-10 text-gray-300 bg-gradient-to-r from-green-900 to-green-950 flex flex-col justify-center text-center gap-4">
      <button className="flex justify-center border border-white rounded-full w-fit p-1 mx-auto">
        <FaInstagram color="white" />
      </button>
      <p>contactus@mgvp.co.uk</p>
      <p>
        We work all around the world but we also work all over the UK: Aberdeen,
        Alfreton, Belfast, Birmingham, Blackpool, Bradford, Brighton, Bristol,
        Canary Wharf, Cardiff, Chesterfield, Cornwall, Coventry, Croydon, Derby,
        Devon, Docklands, Doncaster, Dudley, Exeter, East Anglia, East Midlands,
        Edinburgh, Four Counties, Glasgow, Greenwich, Hammersmith, Hull,
        Kensington, Leeds, Leicester, Liverpool, London, Luton, Manchester,
        Mansfield, Milton Keynes, Newcastle, North East, North Wales, North
        West, Northampton, Northern Ireland, Nottingham, Plymouth, Portsmouth,
        Reading, Rotherham, Sale, Salford, Scotland, Sheffield, Shepherds Bush,
        Solihull, South East, South Wales, South West, Southampton,
        Stoke-on-Trent, Sunderland, Sussex, Swansea, Swindon, Thames Valley,
        Torquay, Warrington, West Bromwich, West Country, West Midlands,
        Westminster, Wolverhampton, York, Yorkshire.
      </p>
      <p className="mt-8 text-gray-300">
        MGV Productions Ltd. Registered in England & Wales. Company Number.
        07370664 | <span className="underline ">Privacy Policy</span>
      </p>
      <p className="text-gray-400 text-sm text-center">
        Website & Content ©{" "}
        <span className="text-white font-medium">Signup</span> 2025 — Powered by{" "}
        <span className="text-emerald-400 hover:text-emerald-300 transition font-bold">
          Rikaz
        </span>
      </p>
    </div>
  );
};

export default Footer;
