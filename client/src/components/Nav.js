import { LogoName, Body } from "./System";
import { Link } from "react-router-dom";

const Me = () => <Body>testuser@example.com</Body>;
const Nav = () =>
  <div className='w-full mx-auto bg-white shadow-sm h-10 flex justify-between items-center px-4 py-8 md:space-x-10'>
    <Link to='/'>
      <LogoName />
    </Link>
    <Me />
  </div>;

export default Nav;