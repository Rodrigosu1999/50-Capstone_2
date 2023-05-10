import React, {useContext, useState} from "react";
import logo from "../static/globe_logo.png"
import "../styles/NavBar.css";
import { NavLink, useHistory } from "react-router-dom";
import { Navbar, Nav, NavItem, NavbarBrand, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import ItemsContext from "./ItemsContext";
import SearchCountryForm from "./SearchCountryForm";

//A different Nav Bar will display to the user if he/she is logged in or not.
//Logged in: All app features will be in the user's reach
// Logged out: The user will only be able to log in or register
function NavBar() {
  const { token, currUser, getCountriesByContinent, getCountries, getCountriesBySubregion } = useContext(ItemsContext);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const [dropdownOpen3, setDropdownOpen3] = useState(false);
  const history = useHistory();

  const toggle1 = () => setDropdownOpen1(!dropdownOpen1);
  const toggle2 = () => setDropdownOpen2(!dropdownOpen2);
  const toggle3 = () => setDropdownOpen3(!dropdownOpen3);

  async function handleClickLogo() {
    if (token) {
      const res = await getCountries();
    }
    history.push("/");
  }
  
  async function handleClickContinent(continent) {
    const res = await getCountriesByContinent(continent);
    history.push("/");
  }
  
  async function handleClickSubregion(region) {
    const res = await getCountriesBySubregion(region);
    history.push("/");
  }

  return (
    <div>
      <Navbar expand="md">
          <NavbarBrand onClick={handleClickLogo}>
            <img
              alt="logo"
              src={logo}
            />
          </NavbarBrand >
          {token ? (
            <Nav className="ms-auto">
              <SearchCountryForm />
            <Dropdown  nav inNavbar isOpen={dropdownOpen1} toggle={toggle1}>
              <DropdownToggle nav caret>
                Continents
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem className="Europe" onClick={()=> handleClickContinent("europe")}>Europe</DropdownItem>
                <DropdownItem className="America" onClick={()=> handleClickContinent("america")}>America</DropdownItem>
                <DropdownItem className="Africa" onClick={()=> handleClickContinent("africa")}>Africa</DropdownItem>
                <DropdownItem className="Asia" onClick={()=> handleClickContinent("asia")}>Asia</DropdownItem>
                <DropdownItem className="Oceania" onClick={()=> handleClickContinent("oceania")}>Oceania</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Dropdown  nav inNavbar isOpen={dropdownOpen2} toggle={toggle2}>
              <DropdownToggle nav caret>
                Subregions
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem className="Europe" onClick={()=> handleClickSubregion("central europe")}>Central Europe</DropdownItem>
                <DropdownItem className="Europe" onClick={()=> handleClickSubregion("eastern europe")}>Eastern Europe</DropdownItem>
                <DropdownItem className="Europe" onClick={()=> handleClickSubregion("northern europe")}>Northern Europe</DropdownItem>
                <DropdownItem className="Europe" onClick={()=> handleClickSubregion("western europe")}>Western Europe</DropdownItem>
                <DropdownItem className="Europe" onClick={()=> handleClickSubregion("southern europe")}>Southern Europe</DropdownItem>
                <DropdownItem className="Europe" onClick={()=> handleClickSubregion("southeast europe")}>Southeast Europe</DropdownItem>
                <DropdownItem className="America" onClick={()=> handleClickSubregion("caribbean")}>Caribbean</DropdownItem>
                <DropdownItem className="America" onClick={()=> handleClickSubregion("central america")}>Central America</DropdownItem>
                <DropdownItem className="America" onClick={()=> handleClickSubregion("north america")}>North America</DropdownItem>
                <DropdownItem className="America" onClick={()=> handleClickSubregion("south america")}>South America</DropdownItem>
                <DropdownItem className="Africa" onClick={()=> handleClickSubregion("eastern africa")}>Eastern Africa</DropdownItem>
                <DropdownItem className="Africa" onClick={()=> handleClickSubregion("middle africa")}>Middle Africa</DropdownItem>
                <DropdownItem className="Africa" onClick={()=> handleClickSubregion("northern africa")}>Northern Africa</DropdownItem>
                <DropdownItem className="Africa" onClick={()=> handleClickSubregion("southern africa")}>Southern Africa</DropdownItem>
                <DropdownItem className="Africa" onClick={()=> handleClickSubregion("western africa")}>Western Africa</DropdownItem>
                <DropdownItem className="Asia" onClick={()=> handleClickSubregion("central asia")}>Central Asia</DropdownItem>
                <DropdownItem className="Asia" onClick={()=> handleClickSubregion("eastern asia")}>Eastern Asia</DropdownItem>
                <DropdownItem className="Asia" onClick={()=> handleClickSubregion("southern asia")}>Southern Asia</DropdownItem>
                <DropdownItem className="Asia" onClick={()=> handleClickSubregion("south-eastern asia")}>South-Eastern Asia</DropdownItem>
                <DropdownItem className="Asia" onClick={()=> handleClickSubregion("western asia")}>Western Asia</DropdownItem>
                <DropdownItem className="Oceania" onClick={()=> handleClickSubregion("australia and new zealand")}>Australia and New Zealand</DropdownItem>
                <DropdownItem className="Oceania" onClick={()=> handleClickSubregion("melanesia")}>Melanesia</DropdownItem>
                <DropdownItem className="Oceania" onClick={()=> handleClickSubregion("micronesia")}>Micronesia</DropdownItem>
                <DropdownItem className="Oceania" onClick={()=> handleClickSubregion("polynesia")}>Polynesia</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Dropdown  nav inNavbar isOpen={dropdownOpen3} toggle={toggle3}>
              <DropdownToggle nav caret>
                {currUser.username}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                <NavItem>
                  <NavLink to="/profile">Profile</NavLink>
                </NavItem>
                </DropdownItem>
                <DropdownItem>
                <NavItem>
                  <NavLink to="/profile/update">Update</NavLink>
                </NavItem>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <NavItem>
              <NavLink to="/logout">Logout</NavLink>
            </NavItem>
          </Nav>
          ) : (
            <Nav className="ms-auto">
            <NavItem>
              <NavLink to="/login">Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/register">Register</NavLink>
            </NavItem>
          </Nav>
          )}
      </Navbar>
    </div>
  );
}

export default NavBar;
