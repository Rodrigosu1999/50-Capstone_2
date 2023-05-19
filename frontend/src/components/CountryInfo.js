import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import "../styles/Country.css";

//Section of the country page where the textual information is displayed, as well as the coat of arms
function CountryInfo({country}) {

  return (
    <Card>
      <CardBody className="Country-info-header">
        <CardTitle className="Country-Official-Name">
          {country.official_name}
        </CardTitle>
        <img
            className="Country-coat"
            alt="Coat of arms"
            src={country.coat_of_arms}
          />
        <CardText className="Country-capital">
          {country.capital}
        </CardText>
      </CardBody>
      <ListGroup flush>
        <ListGroupItem>
          {country.region} / {country.subregion}
        </ListGroupItem>
        <ListGroupItem>
          Main Language: {country.language}
        </ListGroupItem>
        <ListGroupItem>
          Population: {country.population}
        </ListGroupItem>
        <ListGroupItem>
          Area: {country.area} km2
        </ListGroupItem>
      </ListGroup>
  </Card>
  )
}

export default CountryInfo;
