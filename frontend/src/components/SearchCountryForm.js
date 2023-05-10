import React, {useState, useContext} from "react";
import { useHistory } from "react-router-dom";
import { FormFeedback, Form, Label, Input, FormGroup } from "reactstrap";
import ItemsContext from "./ItemsContext";
import "../styles/Form.css"

//Form for the user to filter the companies displayed
const SearchCountryForm = () => {
    const history = useHistory();
    const { getCountriesFiltered, countryFound } = useContext(ItemsContext);
    const [searchInput, setSearchInput] = useState("");

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
      };

    async function handleSubmit (e) {
        e.preventDefault();
        const res = await getCountriesFiltered(searchInput);
        setSearchInput("");
        history.push(`/`)
    }

    return (
            <Form className="Serch-Form" onSubmit={handleSubmit}>
                        <FormGroup   >
                            <Label for="name">
                            Search by name:
                            </Label>
                                {countryFound
                                    ?
                                    <Input
                                    id="name"
                                    name="name" 
                                    type="text" 
                                    value={searchInput}
                                    onChange={handleChange} 
                                    />
                                    :
                                    <>
                                    <Input
                                        invalid
                                        id="name"
                                        name="name" 
                                        type="text" 
                                        value={searchInput}
                                        onChange={handleChange} 
                                    />
                                    <FormFeedback>
                                        No country found
                                    </FormFeedback>
                                    </>
                                }
                        </FormGroup>
                    </Form>
    );
}

export default SearchCountryForm;