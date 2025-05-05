import { Link } from "react-router-dom"; //Importerer Link fra react-router-dom for Nav.


const Nav = () => {
  return (
    <nav id="categories"> 
      <Link to="/music">Music</Link>
      <Link to="/sport">Sport</Link>
      <Link to="/teatershow">Teater/Show</Link>
      <Link to="/logginn">Logg inn</Link>
    </nav>
  );
};

export default Nav;
