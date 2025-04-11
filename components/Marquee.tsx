import ReactFastMarquee from "react-fast-marquee";
const Marquee = () => {
  return (
    <div className="w-full bg-gray-100 py-3 cursor-pointer">

    <ReactFastMarquee pauseOnHover speed={130} direction="right">
        <div className=" text-center text-black">
            <p className="font-medium text-md">
            🚨 This website is for educational purposes only.🚨 
            <br />
             All products and company names are demonstrations only, not real commercial offerings. 
            </p>
        </div>
    </ReactFastMarquee>
    </div>
  )
}
export default Marquee