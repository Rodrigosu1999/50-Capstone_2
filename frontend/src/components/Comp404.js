import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";

//404 Component for when the route is not found
function Comp404() {
    return (
      <section className="col-md-8">
        <Card>
          <CardBody className="text-center">
            <CardTitle>
              <h3 className="font-weight-bold">
              Hmmm. I can't seem to find what you want.
              </h3>
            </CardTitle>
          </CardBody>
        </Card>        
      </section>
    );
  }

export default Comp404;
