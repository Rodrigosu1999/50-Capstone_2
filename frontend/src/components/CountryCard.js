import React, {useContext} from "react";
import { useHistory } from "react-router-dom";
import "../styles/Card.css"
import {
  Card,
  CardBody,
  CardTitle,
  CardLink
} from "reactstrap";
import ItemsContext from "./ItemsContext";

//Individual country card when displaying the country list
function CountryCard({ country }) {
  const history = useHistory();
  const { getCountry } = useContext(ItemsContext);

  async function handleClick(name){
    const res = await getCountry(name);
    history.push(`/country/${name}`)
  }

  return (
    <>
              <Card className="Country-Card">
                <img
                  alt="Country flag"
                  src={country.flags.png}
                />
                <CardBody>
                  <CardTitle className="font-weight-bold text-center">
                    <CardLink onClick={() =>handleClick(country.name.common)}>
                    {country.name.common}
                    </CardLink>
                  </CardTitle>
                </CardBody>
              </Card>
    </>
  );
}

export default CountryCard;
