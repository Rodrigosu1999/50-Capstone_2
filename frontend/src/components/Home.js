import React, {useContext} from "react";
import { Redirect } from "react-router-dom";
import { Spinner } from "reactstrap";
import "../styles/Welcome.css"
import CountryCard from "./CountryCard";
import ItemsContext from "./ItemsContext";

//Welcome page for the user when logged in
function Home() {
  const { isLoading, continent, countries, token, currUser } = useContext(ItemsContext);
  
  if (!token) return <Redirect to="/homeanon" />;

  return (
      <>
        {isLoading
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
        <>
          <h1 className="font-weight-bold">
             Welcome to Culture Quests {`${currUser.firstName} ${currUser.lastName}`}!
          </h1>
          <h2>{continent}</h2>
          <div className="card-container">
            {countries.map(country => (
                <CountryCard country={country} key={country.name.common} />
            ))}
          </div>
          </>
        }
          
      </>
  );
}

export default Home;
