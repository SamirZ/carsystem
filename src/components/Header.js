import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import { postCar } from '../actions/cars';
import { findDOMNode } from 'react-dom';
import { Modal, FormControl, FormGroup, ControlLabel, Col, Row, Button, Label } from 'react-bootstrap';

class Header extends React.Component{

  constructor(){
    super();
    this.state = {
        showModal: false
    } 
  } 

  handleAdd =() =>{
    const car = {
      position: findDOMNode(this.refs.position).value,
      registration: findDOMNode(this.refs.registration).value,
      model: findDOMNode(this.refs.model).value,
      category: findDOMNode(this.refs.category).value,
      fuel: findDOMNode(this.refs.fuel).value,
      kilometers: findDOMNode(this.refs.kilometers).value,
      location: findDOMNode(this.refs.location).value,
      free: true
    };
    console.log("Car to add: ",car);
    this.props.postCar(this.props.token, car);
  }

  handleHide = () =>{
    this.setState({
        showModal: false
    });
  }

  handleShow = () =>{
      this.setState({
          showModal: true
      });
  }

  onClick = () =>{
    localStorage.clear();
    this.props.startLogout(this.props.token);
  }

  render(){
    return (
      <header className="header">
        <div className="content-container">
          <div className="header__content">
            <Link className="header__title" to="/dashboard">
              <h1>Dashboard</h1>
            </Link>
            <div className="header__content__group">
              <button className="button button--link" onClick={this.handleShow}>Car Form</button>
              <button className="button button--link" onClick={this.onClick}>Logout</button>
            </div>
          </div>
        </div>
        <Modal show={this.state.showModal} onHide={this.handleHide}>
					<Modal.Header closeButton>
						<Modal.Title>Add Car</Modal.Title>
					</Modal.Header>
          <Modal.Body>
          
          <FormGroup controlId="position">
            <ControlLabel>Position</ControlLabel>
            <FormControl type="number" min="1" placeholder="Enter Position" ref="position" />
          </FormGroup>
          <FormGroup controlId="registration">
            <ControlLabel>Registration</ControlLabel>
            <FormControl type="text" placeholder="Enter Registration" ref="registration" />
          </FormGroup>
          <FormGroup controlId="model">
            <ControlLabel>Model</ControlLabel>
            <FormControl type="text" placeholder="Enter Model" ref="model" />
          </FormGroup>
          <FormGroup controlId="category">
            <ControlLabel>Category</ControlLabel>
            <FormControl type="text" placeholder="Enter Category" ref="category" />
          </FormGroup>
          <FormGroup controlId="fuel">
            <ControlLabel>Fuel Amount</ControlLabel>
            <FormControl type="number" min="0" placeholder="Enter Fuel Amount" ref="fuel" />
          </FormGroup>
          <FormGroup controlId="kilometers">
            <ControlLabel>Kilometers</ControlLabel>
            <FormControl type="number" min="0" placeholder="Enter Kilometers" ref="kilometers" />
          </FormGroup>
          <FormGroup controlId="location">
            <ControlLabel>Location</ControlLabel>
            <FormControl type="text" placeholder="Enter Location" ref="location" />
          </FormGroup>

					</Modal.Body>
          <Modal.Footer>
            <Button className="button" onClick={this.handleAdd}>Add</Button>
						<Button className="button" onClick={this.handleHide}>Close</Button>
					</Modal.Footer>
				</Modal>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    cars: state.data.cars
  }
};

const mapDispatchToProps = (dispatch) => ({
  startLogout: (token) => dispatch(startLogout(token)),
  postCar: (token, car) => dispatch(postCar(token, car))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
