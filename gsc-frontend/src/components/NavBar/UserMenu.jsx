import pfp from "../../assets/images/some-pfp.jpg";

const UserMenu = () => {
  return (
    <>
      <div className="w-fit container my-auto">
        <img
          alt="myusername"
          src={pfp}
          className="h-16 w-16 rounded-full object-cover"
        />
      </div>
      
    </>
  );
};

export default UserMenu;
