import React, {useContext} from "react";
import { Button, Spinner } from "reactstrap";
import ItemsContext from "./ItemsContext";
import CountryCarousel from "./CountryCarousel";
import CountryInfo from "./CountryInfo";
import "../styles/Country.css";

//Company details, displaying the Company and all their available jobs
function Country() {
  const { currUser, country, addCountry, removeCountry, isLoading } = useContext(ItemsContext);

  async function handleClickAdd () {
    await addCountry(currUser.username, country.name)
  }
  async function handleClickRemove (){
    await removeCountry(currUser.username, country.name)
  }

  return (
    <>{isLoading
        ?
        <Spinner 
          className="Spinner" 
          color="primary" 
          style={{
            height: '8rem',
            width: '8rem',
          }}
        >
          Loading...
        </Spinner>
        :
        <div className="Country">
        <h1 className="Country-name">{country.name}</h1>
        <img className="Country-flag" src={country.flag} />
        <div className="Country-container">
          <CountryInfo country={country}/>
          {country.image1 !== "false"
            ?
            <CountryCarousel className="Country-carousel"/>
            :
            <></>
          }
        </div>
        {currUser.countries.includes(country.name) 
          ?
          <Button className="Country-button" size="lg" color="danger" onClick={() => handleClickRemove()}>
            Remove from list
          </Button> 
          :
          <Button className="Country-button" size="lg" color="info" onClick={() => handleClickAdd()}>
            Add to list!
          </Button>
        }
      </div>
        }
      
    </>
  );
}

export default Country;
