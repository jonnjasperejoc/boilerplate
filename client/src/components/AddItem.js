import React, { Component } from "react";
import { Row, Col, Button, Form, FormGroup, Label, Input } from "reactstrap";

import axios from "axios";

class AddItem extends Component {
    onSubmit = e => {
        e.preventDefault();

        const item = {
            itemName: e.target.elements.itemName.value.trim(),
            itemDescription: e.target.elements.itemDescription.value.trim()
        };

        axios
            .post("/api/items", item)
            .then(res => {
                this.props.history.push({
                    pathname: "/"
                });
            })
            .catch(err => console.log(err.response.data, err.response.status));
    };

    render() {
        return (
            <Row id="main-container">
                <Col xs="12" sm="1" md="3" lg="3"></Col>
                <Col xs="12" sm="10" md="6" lg="6">
                    <h4>+ Create post</h4>
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="itemName">Title</Label>
                            <Input
                                type="text"
                                name="itemName"
                                id="itemName"
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="itemDescription">Content</Label>
                            <Input
                                type="textarea"
                                name="itemDescription"
                                id="itemDescription"
                                required
                            />
                        </FormGroup>
                        <Button className="saveBtn" color="primary" size="sm">
                            Post
                        </Button>
                    </Form>
                </Col>
                <Col xs="12" sm="1" md="3" lg="3"></Col>
            </Row>
        );
    }
}

export default AddItem;
