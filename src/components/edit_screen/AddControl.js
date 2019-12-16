import React from 'react';
import { Link } from 'react-router-dom';
import { getFirestore } from 'redux-firestore';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class AddControl extends React.Component {

    addContainer = () => {
        var newContainer = {
            "key": new Date().getTime(),
            "controlName": "Container",
            "xCoordinate": 0,
            "yCoordinate": 0,
            "width": 100,
            "height": 100,
            "backgroundColor": 16777215,
            "borderColor": 0,
            "borderThickness": 2,
            "borderRadius": 0,
            "fontSize": 0,
            "textColor": 0,
            "edit": false
        }
        var controls = this.props.wireframe.controls;
        controls.push(newContainer);
        getFirestore().collection('wireframes').doc(this.props.id).update({"controls": controls});
    }

    addLabel = () => {
        var newLabel = {
            "key": new Date().getTime(),
            "controlName": "Label",
            "name": "Login",
            "xCoordinate": 0,
            "yCoordinate": 0,
            "width": 100,
            "height": 30,
            "backgroundColor": 16777215,
            "borderColor": 0,
            "borderThickness": 2,
            "borderRadius": 0,
            "fontSize": 12,
            "textColor": 0,
            "edit": false
        }
        var controls = this.props.wireframe.controls;
        controls.push(newLabel);
        getFirestore().collection('wireframes').doc(this.props.id).update({"controls": controls});
    }

    addButton = () => {
        var newButton = {
            "key": new Date().getTime(),
            "controlName": "Button",
            "name": "Submit",
            "xCoordinate": 0,
            "yCoordinate": 0,
            "width": 80,
            "height": 30,
            "backgroundColor": 14079702,
            "borderColor": 0,
            "borderThickness": 2,
            "borderRadius": 2,
            "fontSize": 14,
            "textColor": 0,
            "edit": false
        }
        var controls = this.props.wireframe.controls;
        controls.push(newButton);
        getFirestore().collection('wireframes').doc(this.props.id).update({"controls": controls});
    }

    addTF = () => {
        var newTF = {
            "key": new Date().getTime(),
            "controlName": "TextField",
            "name": "Input",
            "xCoordinate": 0,
            "yCoordinate": 0,
            "width": 100,
            "height": 30,
            "backgroundColor": 16777215,
            "borderColor": 0,
            "borderThickness": 2,
            "borderRadius": 0,
            "fontSize": 12,
            "textColor": 0,
            "edit": false
        }
        var controls = this.props.wireframe.controls;
        controls.push(newTF);
        getFirestore().collection('wireframes').doc(this.props.id).update({"controls": controls});
    }

    render() {
        return (
            <div className="row" style={{border: '1px solid black', height: '650px', backgroundColor: '#F6F6F6', paddingTop: '20px', paddingLeft: '20px', paddingRight: '20px'}}>
                <Link onClick={this.addContainer}  style={{color: 'black'}}>
                    <div className="col s12" style={{height: '150px', marginBottom: '5px'}}>
                        <div style={{paddingTop: '10px'}}>
                            <div style={{border: '2px solid black', height: '100px', backgroundColor: 'white'}}></div>
                            <div style={{textAlign: 'center', fontSize: '20px', fontWeight: 'bold'}}>Container</div>
                        </div>
                    </div>
                </Link>
                <Link onClick={this.addLabel}  style={{color: 'black'}}>
                    <div className="col s12" style={{height: '150px', marginBottom: '5px'}}>
                        <div style={{paddingTop: '45px'}}>
                            <div style={{textAlign: 'center', fontSize: '18px'}}>Prompt for Input:</div>
                            <div style={{textAlign: 'center', fontSize: '20px', fontWeight: 'bold'}}>Label</div>
                        </div>
                    </div>
                </Link>
                <Link onClick={this.addButton}  style={{color: 'black'}}>
                    <div className="col s12" style={{height: '150px', marginBottom: '5px'}}>
                        <div style={{paddingTop: '45px'}}>
                            <div style={{textAlign: 'center'}}><button style={{width: '150px', height: '30px', pointerEvents: 'none'}}>Submit</button></div>
                            <div style={{textAlign: 'center', fontSize: '20px', fontWeight: 'bold'}}>Button</div>
                        </div>
                    </div>
                </Link>
                <Link onClick={this.addTF}  style={{color: 'black'}}>
                    <div className="col s12" style={{height: '150px', marginBottom: '5px'}}>
                        <div style={{paddingTop: '45px'}}>
                            <div style={{textAlign: 'center'}}>
                                <input style={{all: 'revert', pointerEvents: 'none', color: 'gray', width: '150px', height: '20px'}} value='input'></input>
                            </div>
                            <div style={{textAlign: 'center', fontSize: '20px', fontWeight: 'bold'}}>Textfield</div>
                        </div>
                    </div>
                </Link>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    const { id } = props;
    const { wireframes } = state.firestore.data;
    const wireframe = wireframes ? wireframes[id] : null;
    if (wireframe)
      wireframe.id = id;
  
    return {
      wireframe,
      auth: state.firebase.auth,
    };
};
  
export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'wireframes' },
  ]),
)(AddControl);