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
        car: {},
        highestPosition: 0,
        boxesList: []
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
    this.createBoxesList();
  }

  handleDelete = () =>{
    this.props.deleteCar(this.props.token,this.state.car._id);
    this.handleHideDelete();
  }

  handleView = (index) =>{
    const currentCar = this.props.cars[index];
    const highestPosition = Math.max.apply(Math,this.props.cars.map(function(o){return o.position;}));
    this.setState({
        showPosition: true,
        car: currentCar,
        highestPosition
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
    this.createBoxesList();
  }

  positionChange = (e) => {
    const newCar = this.state.car;
    newCar.position = e.target.value;
    this.setState({newCar})
  }

  registrationChange = (e) => {
    const newCar = this.state.car;
    newCar.registration = e.target.value;
    this.setState({newCar})
  }

  modelChange = (e) => {
    const newCar = this.state.car;
    newCar.model = e.target.value;
    this.setState({newCar})
  }

  categoryChange = (e) => {
    const newCar = this.state.car;
    newCar.category = e.target.value;
    this.setState({newCar})
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

  createBoxesList = () =>{
    let boxesList = [];
    const greaterThis = this;
    if(!!this.props.cars){
      for (let index = 0; index < this.state.highestPosition; index++) {
        boxesList.push(
          <Col style={{minHeight: '150px',maxHeight: '150px', minWidth: '50px', maxWidth:'100px'}} className="block block-empty" xs={1} sm={1} md={1} lg={1} key={index}>
            <p> - </p>
            <p>Empty Slot</p>
          </Col>);
      }
      this.props.cars.map(function(car){
        if(car){
        
          if(greaterThis.state.car._id == car._id){
            boxesList[car.position-1] = (<Col style={{minHeight: '150px',maxHeight: '150px', minWidth: '50px', maxWidth:'100px'}} className="block selected-block" xs={1} sm={1} md={1} lg={1} key={car._id}>
                      <p>{car.position}</p><p>{car.registration}</p>
                    </Col>);
          } else {
            boxesList[car.position-1] =  (<Col style={{minHeight: '150px',maxHeight: '150px', minWidth: '50px', maxWidth:'100px'}} className="block" xs={1} sm={1} md={1} lg={1} key={car._id}>
                    <p>{car.position}</p><p>{car.registration}</p>
                  </Col>);
          }
          for (let index = greaterThis.state.car.position; index < greaterThis.state.highestPosition; index+=12) {
            if(Number(index)+12 == car.position){
              boxesList[car.position-1] =  (<Col style={{minHeight: '150px',maxHeight: '150px', minWidth: '50px', maxWidth:'100px'}} className="block blocking-block" xs={1} sm={1} md={1} lg={1} key={car._id}>
                        <p>{car.position}</p><p>{car.registration}</p>
                      </Col>);
            }
          }
        }
      });
    }
    return boxesList;
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
          
          <FormGroup controlId="position">
            <ControlLabel>Position</ControlLabel>
            <FormControl type="number" min="1" placeholder="Enter Position" value={this.state.car.position} onChange={this.positionChange} ref="position" />
          </FormGroup>
          <FormGroup controlId="registration">
            <ControlLabel>Registration</ControlLabel>
            <FormControl type="text" placeholder="Enter Registration" value={this.state.car.registration} onChange={this.registrationChange} ref="registration" />
          </FormGroup>
          <FormGroup controlId="model">
            <ControlLabel>Model</ControlLabel>
            <FormControl type="text" placeholder="Enter Model" value={this.state.car.model} onChange={this.modelChange} ref="model" />
          </FormGroup>
          <FormGroup controlId="category">
            <ControlLabel>Category</ControlLabel>
            <FormControl type="text" placeholder="Enter Category" value={this.state.car.category} onChange={this.categoryChange} ref="category" />
          </FormGroup>
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
              {this.createBoxesList()}
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
