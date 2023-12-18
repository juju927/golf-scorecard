import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";


const TopHeader = ({ header }) => {
  const location = useLocation();

  return (
    <header className="h-16 border-b border-teal-600 border-solid text-white bg-black">
      <div className="px-3 w-full h-full flex items-center gap-4">
        { !(location.pathname == "/home") && (
          <Link to="/home" className="h-12 w-12 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                fillRule="evenodd"
                d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z"
                clipRule="evenodd"
              />
            </svg>
          </Link>) 
        }
        <h1 className="text-lg font-semibold">{header}</h1>
        
      </div>
    </header>
  );
};

export default TopHeader;
