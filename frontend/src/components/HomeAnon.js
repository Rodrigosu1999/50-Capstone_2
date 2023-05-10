import React from "react";
import { useHistory } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, Button } from "reactstrap";
import "../styles/Welcome.css"

//Welcome page for when the user is not logged in
function HomeAnon() {
  const history = useHistory();
  const handleClick = (link) => {
    history.push(link)
  };
  return (
    <div className="Welcome Welcome-Anon">
      <Card className="Welcome-Anon-card">
        <CardBody className="text-center">
          <CardTitle>
            <h3 className="font-weight-bold">
              Culture Quests
            </h3>
          </CardTitle>
          <CardSubtitle>
            <h4>The place to find your next destination</h4>
            <h4>And learn about countries</h4>
          </CardSubtitle>
          <Button color="primary" onClick={() => handleClick("/login")}>Login</Button>
          <Button color="primary" onClick={() => handleClick("/register")}>Register</Button>
        </CardBody>
      </Card>
    </div>
  );
}

export default HomeAnon;
