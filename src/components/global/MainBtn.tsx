
const MainBtn = ({ text }: { text: string }) => {
    return (
        <button className=" bg-main-green text-white font-semibold text-lg py-3 px-8 rounded-full shadow-md hover:bg-main-dark-green hover:text-white transition-all duration-300 ease-in-out">
            {text}
        </button>
    )
}

export default MainBtn
