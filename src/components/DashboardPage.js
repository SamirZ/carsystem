import React from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import { Modal, FormControl, FormGroup, Checkbox, ControlLabel, Col, Row, Button, Label, Grid } from 'react-bootstrap';
import 'react-table/react-table.css';

import { getCars, patchCar, deleteCar } from '../actions/cars';

class DashboardPage extends React.Component{

  constructor(){
    super();
    this.state = {
        showModal: false,
        showPosition: false,
        showDelete: false,
        selected: -1,
        car: {},
        carsList: []
    }
  } 

  handleHide = () =>{
    this.setState({
        showModal: false
    });
  }

  handleHideView = () =>{
    this.setState({
      showPosition: false
    });
  }

  handleHideDelete = () =>{
    this.setState({
      showDelete: false
    });
  }

  handleEdit = () =>{
    this.props.patchCar(this.props.token,this.state.car._id,this.state.car);
    this.handleHide();
  }

  handleDelete = () =>{
    this.props.deleteCar(this.props.token,this.state.car._id);
    this.handleHideDelete();
  }

  handleView = (index) =>{
    const currentCar = this.props.cars[index];
    this.setState({
        showPosition: true,
        car: currentCar,
        selected: currentCar.position
    });
  }

  handleShow = (index) =>{
      const currentCar = this.props.cars[index];
      this.setState({
          showModal: true,
          car: currentCar
      });
  }

  handleShowDelete = (index) =>{
    const currentCar = this.props.cars[index];
    console.log(currentCar);
    this.setState({
        showDelete: true,
        car: currentCar
    });
}

  componentWillMount(){
    this.props.getCars(this.props.token);
  }

  fuelChange = (e) => {
    const newCar = this.state.car;
    newCar.fuel = e.target.value;
    this.setState({newCar})
  }

  kilometersChange = (e) => {
    const newCar = this.state.car;
    newCar.kilometers = e.target.value;
    this.setState({newCar})
  }

  locationChange = (e) => {
    const newCar = this.state.car;
    newCar.location = e.target.value;
    this.setState({newCar})
  }

  freeChange = (e) => {
    const newCar = this.state.car;
    newCar.free = e.target.value;
    this.setState({newCar})
  }


  columns = [{
    Header: 'Position',
    accessor: 'position',
    Cell: props => <span className='cell-container'>{props.value}</span> 
  }, {
    Header: 'Registration',
    accessor: 'registration',
    Cell: props => <span className='cell-container'>{props.value}</span> 
  }, {
    Header: 'Model',
    accessor: 'model',
    Cell: props => <span className='cell-container'>{props.value}</span> 
  }, {
    Header: 'Category',
    accessor: 'category',
    Cell: props => <span className='cell-container'>{props.value}</span> 
  }, {
    Header: 'Fuel Amount',
    accessor: 'fuel',
    Cell: props => <span className='number cell-container'>{props.value}</span> 
  }, {
    Header: 'Kilometers',
    accessor: 'kilometers',
    Cell: props => <span className='number cell-container'>{props.value}</span> 
  }, {
    Header: 'Location',
    accessor: 'location',
    Cell: props => <span className='cell-container'>{props.value}</span> 
  }]

  

  render() { 
    let carsList = false;
    const greaterThis = this;
    if(!!this.props.cars){
      carsList = this.props.cars.map(function(car){
        if(car){
        if(greaterThis.state.car._id == car._id){
          return (<Col className="block selected-block" xs={1} sm={1} md={1} lg={1} key={car._id}>
                    <p>{car.position}</p><p>{car.model}</p>
                  </Col>);
        }
        for (let index = greaterThis.state.car.position; index < greaterThis.props.cars.length; index+=12) {
          if(Number(index)+12 == car.position){
            return (<Col className="block blocking-block" xs={1} sm={1} md={1} lg={1} key={car._id}>
                      <p>{car.position}</p><p>{car.model}</p>
                    </Col>);
          }
        }
        return (<Col className="block" xs={1} sm={1} md={1} lg={1} key={car._id}>
                  <p>{car.position}</p><p>{car.model}</p>
                </Col>);
      }});
    }
    return (
      <div>
      <ReactTable
        className="content-container-table"
        data={this.props.cars}
        columns={this.columns}
        SubComponent={(row) => {
          return (
            <div>
              <Button style={{marginRight: '5px', marginBottom: '5px', marginLeft: '5px'}} className="button" onClick={()=>this.handleView(row.index)}>View</Button>
              <Button style={{marginRight: '5px', marginBottom: '5px'}} className="button" onClick={()=>this.handleShow(row.index)}>Edit</Button>
              <Button style={{marginRight: '5px', marginBottom: '5px'}} className="button" onClick={()=>this.handleShowDelete(row.index)}>Delete</Button>
            </div>
          );
        }}
      />
      <Modal show={this.state.showModal} onHide={this.handleHide}>
					<Modal.Header closeButton>
						<Modal.Title>Add Car</Modal.Title>
					</Modal.Header>
          <Modal.Body>
          
            <FormGroup controlId="fuel">
              <ControlLabel>Fuel Amount</ControlLabel>
              <FormControl type="text" placeholder="Enter Fuel Amount" value={this.state.car.fuel} onChange={this.fuelChange} ref="fuel" />
            </FormGroup>
            <FormGroup controlId="kilometers">
              <ControlLabel>Kilometers</ControlLabel>
              <FormControl type="text" placeholder="Enter Kilometers" value={this.state.car.kilometers} onChange={this.kilometersChange} ref="kilometers" />
            </FormGroup>
            <FormGroup controlId="location">
              <ControlLabel>Location</ControlLabel>
              <FormControl type="text" placeholder="Enter Location" value={this.state.car.location} onChange={this.locationChange} ref="location" />
            </FormGroup>
            <Checkbox value={this.state.car.free} onChange={this.freeChange} >
              Occupied
            </Checkbox>
					</Modal.Body>
          <Modal.Footer>
            <Button className="button" onClick={this.handleEdit}>Save</Button>
						<Button className="button" onClick={this.handleHide}>Close</Button>
					</Modal.Footer>
        </Modal>

        <Modal dialogClassName="custom-modal" show={this.state.showPosition} onHide={this.handleHideView}>
					<Modal.Header closeButton>
						<Modal.Title>View Car</Modal.Title>
					</Modal.Header>
          <Modal.Body>
            <Grid>
              {carsList}
            </Grid>
					</Modal.Body>
          <Modal.Footer>
						<Button className="button" onClick={this.handleHideView}>Close</Button>
					</Modal.Footer>
        </Modal>
        
        <Modal show={this.state.showDelete} onHide={this.handleHideDelete}>
					<Modal.Header closeButton>
						<Modal.Title>Delete Car</Modal.Title>
					</Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete this item?</p>
					</Modal.Body>
          <Modal.Footer>
            <Button className="button" onClick={this.handleDelete}>Yes</Button>
						<Button className="button" onClick={this.handleHideDelete}>No</Button>
					</Modal.Footer>
				</Modal>
    
      </div>
    );
  }

};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    cars: state.data.cars
  }
};

const mapDispatchToProps = (dispatch) => ({
  getCars: (token) => dispatch(getCars(token)),
  patchCar: (token, _id, car) => dispatch(patchCar(token, _id, car)),
  deleteCar: (token, _id) => dispatch(deleteCar(token, _id))
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
