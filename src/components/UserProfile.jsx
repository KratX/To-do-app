const UserProfile = () => {
  return (
    <div className="w-1/4">
      <div className="flex items-center mb-4">
        <div className="relative">
          <img
            className="w-10 h-10 transition-all duration-300 ease-in-out rounded-full cursor-pointer hover:bg-gray-100"
            src="https://cdn3.iconfinder.com/data/icons/glyphicon/64/profil-circle-512.png"
            alt="User"
          />
        </div>
        <img
          className="w-20 h-12 transition-all duration-300 ease-in-out cursor-pointer hover:bg-gray-100"
          src="https://static.vecteezy.com/system/resources/previews/019/879/186/original/user-icon-on-transparent-background-free-png.png"
          alt="User"
        />
        <div className="flex flex-col ml-3">
          <h1 className="flex text-xl font-semibold transition-all duration-300 ease-in-out cursor-pointer hover:bg-gray-100 hover:-translate-1 hover:scale-110">
            Your Username
          </h1>
          <h2 className="text-gray-500 transition-all duration-300 ease-in-out cursor-pointer w-44 text-md hover:bg-gray-100 hover:-translate-1 hover:scale-110">
            Account Details
          </h2>
        </div>
      </div>
      <div className="h-1 mx-2 my-12 ml-16 bg-pink-400 rounded-full w-44"></div>
      <div className="relative my-32"></div>
    </div>
  );
};

UserProfile.propTypes = {
  // No props to validate at this level
};

export default UserProfile;
