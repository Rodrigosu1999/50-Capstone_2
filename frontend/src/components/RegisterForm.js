import React, {useState} from "react";
import { Button, Card, CardBody, Form, Label, Input, FormGroup, FormFeedback } from "reactstrap";
import { Redirect, useHistory } from "react-router-dom";

const RegisterForm = ({register}) => {
    const INITIAL_STATE = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
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
        const res = await register(formData.username, formData.password, formData.firstName, formData.lastName, formData.email);
        console.log(res);
        setFormData(INITIAL_STATE);
        if (res) {
            setInvalid(false);
            history.push("/");
        }
        setInvalid(true);
    }

    return (
        <section className="Form col-md-4">
            <Card>
                <CardBody className="text-center">
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="username">
                                Username
                            </Label>
                            <Input
                                id="username"
                                name="username" 
                                type="text" 
                                value={formData.username}
                                onChange={handleChange} 
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">
                                Password
                            </Label>
                                <Input
                                    id="password"
                                    name="password" 
                                    type="text" 
                                    value={formData.password}
                                    onChange={handleChange} 
                                />
                        </FormGroup>
                        <FormGroup>
                            <Label for="firstName">
                                First Name
                            </Label>
                                <Input
                                    id="firstName"
                                    name="firstName" 
                                    type="text" 
                                    value={formData.firstName}
                                    onChange={handleChange} 
                                />
                        </FormGroup>
                        <FormGroup>
                            <Label for="lastName">
                                Last Name
                            </Label>
                                <Input
                                    id="lastName"
                                    name="lastName" 
                                    type="text" 
                                    value={formData.lastName}
                                    onChange={handleChange} 
                                />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">
                                Email
                            </Label>
                                <Input
                                    id="email"
                                    name="email" 
                                    type="text" 
                                    value={formData.email}
                                    onChange={handleChange} 
                                />
                        </FormGroup>
                        <Button color="primary" >Register</Button>
                    </Form>
                </CardBody>
            </Card>
        </section>
    );
}

export default RegisterForm;