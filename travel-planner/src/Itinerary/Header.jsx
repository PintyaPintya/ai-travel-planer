function Header(){
    const iconSize = "w-6 h-6";

  return (
    <div className="w-full mx-auto relative">
      <img src="/assets/main-img.png" alt="Main View" className="w-full h-auto" />
      <div className="absolute top-0 left-0 right-0 flex justify-between p-4">
        <div className="p-2 rounded-full bg-custom-opacity">
          <img src="/assets/left-arrow.png" alt="Left Arrow" className={`${iconSize} text-white`} />
        </div>
        <span className="text-white font-bold text-2xl">Holo Trip</span>
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
        <span className="text-white text-9xl">Goa</span>
      </div>
      <div className="absolute bottom-10 w-1/4 flex justify-between px-10">
        <span className="text-sm text-white font-medium p-2 rounded-full bg-custom-opacity">16 Aug 2024 → 19 Aug 2024</span>
        <span className="text-sm text-white font-medium p-2 rounded-full bg-custom-opacity">1 Person 🖊</span>
      </div>
    </div>
  );
}

export default Header