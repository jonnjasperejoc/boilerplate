import React, { Component } from "react";
import { Row, Col, Table, Button } from "reactstrap";
import { connect } from "react-redux";
import axios from "axios";
import moment from "moment";
import { getItems, deleteItem } from "../actions/itemActions";

import PropTypes from "prop-types";

class HomePage extends Component {
    static propTypes = {
        getItems: PropTypes.func.isRequired,
        deleteItem: PropTypes.func.isRequired
    };

    componentDidMount() {
        axios
            .get("/api/items")
            .then(res => {
                this.props.getItems(res.data);
            })
            .catch(err => console.log(err.response.data, err.response.status));
    }

    deleteItem = id => {
        axios
            .delete("/api/items/" + id)
            .then(res => {
                this.props.deleteItem(id);
            })
            .catch(err => console.log(err.response.data, err.response.status));
    };

    render() {
        const items = this.props.items;
        return (
            <Row id="main-container">
                <Col xs="12" sm="1" md="2" lg="2"></Col>
                <Col xs="12" sm="10" md="8" lg="8">
                    <h4>Bulletin Board</h4>
                    <a
                        id="add-item"
                        className="btn btn-primary btn-sm"
                        href="/add-item"
                    >
                        + Create post
                    </a>
                    <Table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Content</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(
                                ({ _id, itemName, itemDescription, date }) => (
                                    <tr key={_id}>
                                        <th scope="row">{_id}</th>
                                        <td>
                                            <a href={`/item/` + _id}>
                                                {itemName}
                                            </a>
                                        </td>
                                        <td>{itemDescription}</td>
                                        <td>
                                            {moment(date).format("YYYY-MM-DD")}
                                        </td>
                                        <td>
                                            <a
                                                href={`/edit-item/` + _id}
                                                className="btn btn-info btn-sm btn-edit"
                                            >
                                                Edit
                                            </a>
                                            <Button
                                                color="danger"
                                                size="sm"
                                                onClick={() =>
                                                    this.deleteItem(_id)
                                                }
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </Table>
                </Col>
                <Col xs="12" sm="1" md="2" lg="2"></Col>
            </Row>
        );
    }
}

const mapStateToProps = state => ({
    items: state.items.items
});

export default connect(
    mapStateToProps,
    { getItems, deleteItem }
)(HomePage);
