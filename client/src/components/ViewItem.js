import React, { Component } from "react";
import { Row, Col } from "reactstrap";

import { connect } from "react-redux";
import axios from "axios";
import moment from "moment";
import { setItem } from "../actions/itemActions";

import PropTypes from "prop-types";

class ViewItem extends Component {
    static propTypes = {
        setItem: PropTypes.func.isRequired
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        axios
            .get("/api/items/" + id)
            .then(res => {
                this.props.setItem(res.data);
            })
            .catch(err => console.log(err.response.data, err.response.status));
    }

    render() {
        const { itemName, itemDescription, date } = this.props.item;
        return (
            <Row id="main-container">
                <Col xs="12" sm="1" md="3" lg="3"></Col>
                <Col xs="12" sm="10" md="6" lg="6">
                    <h4>{itemName}</h4>
                    <div className="date">
                        {moment(date).format("YYYY-MM-DD")}
                    </div>
                    <div className="itemDescription">{itemDescription}</div>
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
)(ViewItem);
