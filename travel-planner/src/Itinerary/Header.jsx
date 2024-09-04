import { useNavigate } from "react-router-dom";

function Header({location, date, people}){
    const navigate = useNavigate();
    const iconSize = "w-6 h-6";

    function backHome(){
      navigate("/");
    }

  return (
    <div className="w-full mx-auto relative mb-6 mt-2">
      <img src="/assets/main-img.png" alt="Main View" className="w-full h-auto" />
      <div className="absolute top-0 left-0 right-0 flex justify-between p-4">
        <div onClick={backHome} className="p-2 rounded-full bg-custom-opacity pointer">
          <img src="/assets/left-arrow.png" alt="Left Arrow" className={`${iconSize} text-white`} />
        </div>
        <span onClick={backHome} className="text-white font-bold text-2xl pointer">Holo Trip</span>
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-full bg-custom-opacity">
            <img src="/assets/person_add.png" alt="Add Person" className={`${iconSize}`} />
          </div>
          <div className="p-2 rounded-full bg-custom-opacity">
            <img src="/assets/like.png" alt="Like" className={`${iconSize}`} />
          </div>
          <div className="p-2 rounded-full bg-custom-opacity">
            <img src="/assets/download.png" alt="Download" className={`${iconSize}`} />
          </div>
          <div className="p-2 rounded-full flex items-center bg-custom-opacity">
            <img src="/assets/share.png" alt="Share" className={`${iconSize}`} />
            <span className="text-sm text-white font-medium ml-2">Share</span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-24 left-10">
        <span className="text-white text-9xl">{location}</span>
      </div>
      <div className="absolute bottom-10 w-full flex justify-start px-10">
        <span className="text-sm text-white font-medium p-2 rounded-full bg-custom-opacity">{date}</span>
        <span className="text-sm text-white font-medium p-2 rounded-full bg-custom-opacity ml-2">{people} travellers 🖊</span>
      </div>
    </div>
  );
}

export default Header