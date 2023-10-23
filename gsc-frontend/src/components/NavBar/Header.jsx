import logo from "../../assets/images/golf-buddy-logo.png";

const NavBar = () => {
  return (
    <>
      <header className="h-16 w-screen flex justify-center bg-teal-950 slate-950 border border-b-teal-600 px-2">
        <img className="p-2" src={logo}></img>
      </header>
    </>
  );
};

export default NavBar;
