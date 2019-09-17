import React, { Component } from "react";
import { Row, Col, Button, Form, FormGroup, Label, Input } from "reactstrap";

import { connect } from "react-redux";
import axios from "axios";
import { setItem } from "../actions/itemActions";

import PropTypes from "prop-types";

class EditItem extends Component {
    static propTypes = {
        setItem: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            itemName: "",
            itemDescription: ""
        };
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        axios
            .get("/api/items/" + id)
            .then(res => {
                this.props.setItem(res.data);
                this.setState({
                    itemName: res.data.itemName,
                    itemDescription: res.data.itemDescription
                });
            })
            .catch(err => console.log(err.response.data, err.response.status));
    }

    onItemNameChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onItemDescriptionChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const id = this.props.match.params.id;

        const item = {
            itemName: e.target.elements.itemName.value.trim(),
            itemDescription: e.target.elements.itemDescription.value.trim()
        };

        axios
            .patch("/api/items/" + id, item)
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
                    <h4>Edit Item</h4>
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="itemName">Email</Label>
                            <Input
                                type="text"
                                name="itemName"
                                id="itemName"
                                value={this.state.itemName}
                                onChange={this.onItemNameChange}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="itemDescription">Text Area</Label>
                            <Input
                                type="textarea"
                                name="itemDescription"
                                value={this.state.itemDescription}
                                onChange={this.onItemDescriptionChange}
                                id="itemDescription"
                                required
                            />
                        </FormGroup>
                        <Button className="saveBtn" color="primary" size="sm">
                            Save
                        </Button>
                    </Form>
                </Col>
                <Col xs="12" sm="1" md="3" lg="3"></Col>
            </Row>
        );
    }
}

const mapStateToProps = state => ({
    item: state.items.item
});

export default connect(
    mapStateToProps,
    { setItem }
)(EditItem);
