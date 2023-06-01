import React, {useState} from "react";
import { Button, Card, CardBody, Form, Label, Input, FormGroup, FormFeedback } from "reactstrap";
import { useHistory } from "react-router-dom";
import "../styles/Form.css"

//Form for the user to log in to the App
const LoginForm = ({login}) => {
    const INITIAL_STATE = {
        username: "",
        password: "",
    }
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [invalid, setInvalid] = useState(false);
    const history = useHistory();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await login(formData.username, formData.password);
        setFormData(INITIAL_STATE);
        if (res) {
            setInvalid(false);
            history.push("/");
        }
        setInvalid(true);
    }

    return (
        <section className="Form col-md-4">
            <Card >
                <CardBody className="text-center">
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="username">
                                Username
                            </Label>
                            {invalid ? (
                                <>
                                    <Input
                                        id="username"
                                        name="username" 
                                        type="text" 
                                        value={formData.username}
                                        onChange={handleChange}
                                        invalid 
                                    />
                                    <FormFeedback tooltip>
                                        Oh no! Invalid username/password 
                                    </FormFeedback>
                                </>
                            ) : (
                                <Input
                                id="username"
                                name="username" 
                                type="text" 
                                value={formData.username}
                                onChange={handleChange} 
                            />
                            )}
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">
                                Password
                            </Label>
                            {invalid ? (
                                <Input
                                    id="password"
                                    name="password" 
                                    type="text" 
                                    value={formData.password}
                                    onChange={handleChange}
                                    invalid 
                                />
                            ) : (
                                <Input
                                    id="password"
                                    name="password" 
                                    type="text" 
                                    value={formData.password}
                                    onChange={handleChange} 
                                />
                            )}
                        </FormGroup>
                        <Button color="primary" >Login!</Button>
                    </Form>
                </CardBody>
            </Card>
        </section>
    );
}

export default LoginForm;