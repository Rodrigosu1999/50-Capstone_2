import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Table } from "reactstrap";
import "../styles/User.css"
import ItemsContext from "./ItemsContext";

//Page that shows the logged in user's information
function UserInfo() {
  const history = useHistory();
  const { getCountry, currUser, currUserCountries  } = useContext(ItemsContext);

  async function handleClick(name){
    const res = await getCountry(name);
    history.push(`/country/${name}`)
  }

  return (
      <div className="User">
        <h1 className="User-username">Username:  <span className="User-username-data">{currUser.username}</span></h1>
        <h2 className="User-info">First name: <span className="User-info-data">{currUser.firstName}</span></h2>
        <h2 className="User-info">Last name:  <span className="User-info-data">{currUser.lastName}</span></h2>
        <h2 className="User-info">Email:  <span className="User-info-data">{currUser.email}</span></h2>
        <div className="User-countries">
          <Table className="User-countries-table" hover="True">
            <thead>
              <tr>
                <th className="User-countries-th">
                  Flag
                </th>
                <th className="User-countries-th">
                  Name
                </th>
                <th className="User-countries-th">
                  Capital
                </th>
                <th className="User-countries-th">
                  Continent
                </th>
                <th className="User-countries-th">
                  Language
                </th>
              </tr>
            </thead>
            <tbody>
              {currUserCountries.map(country => (
                <tr onClick={() => handleClick(country.name)}>
                  <td>
                    <img className="User-countries-flag" src={country.flag} />
                  </td>
                  <td className="User-countries-td">
                    {country.name}
                  </td>
                  <td className="User-countries-td">
                    {country.capital}
                  </td>
                  <td className="User-countries-td">
                    {country.region}
                  </td>
                  <td className="User-countries-td">
                    {country.language}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
  );
}

export default UserInfo;
