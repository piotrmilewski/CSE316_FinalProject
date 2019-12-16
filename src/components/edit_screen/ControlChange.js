import React from 'react';
import { getFirestore } from 'redux-firestore';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class ControlChange extends React.Component {

    state = {
        width: 0,
        height: 0,
        updateButtonDisabled: true,
        text: "",
        reload: 0,
        control: null,
    };

    updateWidth = (e) => {
        this.setState({width: e.target.value});
        if (this.state.height !== 0)
            this.setState({updateButtonDisabled: false});
    }

    updateHeight = (e) => {
        this.setState({height: e.target.value});
        if (this.state.width !== 0)
            this.setState({updateButtonDisabled: false});
    }

    updateText = (e) => {
        var controls = this.props.wireframe.controls;
        controls.map(control => {
            if (control.edit){
                control.name = e.target.value;
            }
            return control;
        });
        getFirestore().collection('wireframes').doc(this.props.id).update({"saved": false});
        getFirestore().collection('wireframes').doc(this.props.id).update({"controls": controls});
    }

    updateFontSize = (e) => {
        var controls = this.props.wireframe.controls;
        controls.map(control => {
            if (control.edit){
                control.fontSize = e.target.value;
            }
            return control;
        });
        getFirestore().collection('wireframes').doc(this.props.id).update({"saved": false});
        getFirestore().collection('wireframes').doc(this.props.id).update({"controls": controls});
    }

    updateBackgroundColor = (e) => {
        var controls = this.props.wireframe.controls;
        controls.map(control => {
            if (control.edit){
                control.backgroundColor = e.target.value;
            }
            return control;
        });
        getFirestore().collection('wireframes').doc(this.props.id).update({"saved": false});
        getFirestore().collection('wireframes').doc(this.props.id).update({"controls": controls});
    }

    updateBorderColor = (e) => {
        var controls = this.props.wireframe.controls;
        controls.map(control => {
            if (control.edit){
                control.borderColor = e.target.value;
            }
            return control;
        });
        getFirestore().collection('wireframes').doc(this.props.id).update({"saved": false});
        getFirestore().collection('wireframes').doc(this.props.id).update({"controls": controls});
    }

    updateBorderThickness = (e) => {
        var controls = this.props.wireframe.controls;
        controls.map(control => {
            if (control.edit){
                control.borderThickness = e.target.value;
            }
            return control;
        });
        getFirestore().collection('wireframes').doc(this.props.id).update({"saved": false});
        getFirestore().collection('wireframes').doc(this.props.id).update({"controls": controls});
    }

    updateBorderRadius = (e) => {
        var controls = this.props.wireframe.controls;
        controls.map(control => {
            if (control.edit){
                control.borderRadius = e.target.value;
            }
            return control;
        });
        getFirestore().collection('wireframes').doc(this.props.id).update({"saved": false});
        getFirestore().collection('wireframes').doc(this.props.id).update({"controls": controls});
    }

    update = () => {
        if (this.state.height > 0 && this.state.height <= 5000 && this.state.width > 0 && this.state.width <= 5000){
            getFirestore().collection('wireframes').doc(this.props.id).update({"height": this.state.height});
            getFirestore().collection('wireframes').doc(this.props.id).update({"width": this.state.width});
        }
    }

    render() {
        var controls = this.props.wireframe.controls;
        var changedControl = null;
        controls.map(control => {
            if (control.edit){
                changedControl = control;
            }
            return control;
        });

        if (changedControl !== null){
            return (
                <div className="row" style={{border: '1px solid black', height: '720px', backgroundColor: '#F6F6F6', marginTop: '5px'}}>
                    <div className="col s12" style={{height: '40px', border: '1px solid black', marginBottom: '5px'}}>
                        <div style={{paddingTop: '5px'}}>
                            <div style={{textAlign: 'center', fontSize: '20px', fontWeight: 'bold'}}>Properties</div>
                        </div>
                    </div>
                    <div className="col s12" style={{height: '150px', border: '1px solid black', marginBottom: '5px'}}>
                        <div style={{paddingTop: '5px'}}>
                            <div style={{fontSize: '18px', fontWeight: 'bold'}}><span>Wireframe width: </span><input style={{all: 'revert', width: '50px'}}
                                                                                                                     onChange={this.updateWidth.bind(this)}></input></div>
                            <div style={{paddingTop: '25px', fontSize: '18px', fontWeight: 'bold'}}><span>Wireframe height: </span><input style={{all: 'revert', width: '50px'}}
                                                                                                                     onChange={this.updateHeight.bind(this)}></input></div>
                            <div style={{paddingTop: '25px', textAlign: 'center'}}><button style={{width: '150px', height: '30px'}} 
                                                                       disabled={this.state.updateButtonDisabled} 
                                                                       onClick={this.update}>Update</button></div>
                        </div>
                    </div>
                    <div className="col s12" style={{height: '520px', border: '1px solid black'}}>
                        <div style={{paddingTop: '5px'}}>
                            <div style={{paddingTop: '15px', fontSize: '18px', fontWeight: 'bold'}}><span>Text: </span><input style={{all: 'revert', width: '175px'}}
                                                                                                                     value={changedControl.name}
                                                                                                                     onChange={this.updateText.bind(this)}></input></div>
                            <div style={{paddingTop: '25px', fontSize: '18px', fontWeight: 'bold'}}><span>Font Size: </span><input type="number" style={{all: 'revert', width: '100px'}}
                                                                                                                     value={changedControl.fontSize}
                                                                                                                     onChange={this.updateFontSize.bind(this)}></input></div>
                            <div style={{paddingTop: '25px', fontSize: '18px', fontWeight: 'bold'}}><span>Background: </span><input type="color" style={{all: 'revert'}}
                                                                                                                     value={changedControl.backgroundColor}
                                                                                                                     onChange={this.updateBackgroundColor.bind(this)}></input></div>
                            <div style={{paddingTop: '25px', fontSize: '18px', fontWeight: 'bold'}}><span>Border: </span><input type="color" style={{all: 'revert'}}
                                                                                                                     value={changedControl.borderColor}
                                                                                                                     onChange={this.updateBorderColor.bind(this)}></input></div>
                            <div style={{paddingTop: '25px', fontSize: '18px', fontWeight: 'bold'}}><span>Border Thickness: </span><input type="number" style={{all: 'revert', width: '70px'}}
                                                                                                                     value={changedControl.borderThickness}
                                                                                                                     onChange={this.updateBorderThickness.bind(this)}></input></div>
                            <div style={{paddingTop: '25px', fontSize: '18px', fontWeight: 'bold'}}><span>Border Radius: </span><input type="number" style={{all: 'revert', width: '90px'}}
                                                                                                                     value={changedControl.borderRadius}
                                                                                                                     onChange={this.updateBorderRadius.bind(this)}></input></div>
                        </div>
                    </div>
                </div>
            );
        }
        else{
            return (
                <div className="row" style={{border: '1px solid black', height: '720px', backgroundColor: '#F6F6F6', marginTop: '5px'}}>
                    <div className="col s12" style={{height: '40px', border: '1px solid black', marginBottom: '5px'}}>
                        <div style={{paddingTop: '5px'}}>
                            <div style={{textAlign: 'center', fontSize: '20px', fontWeight: 'bold'}}>Properties</div>
                        </div>
                    </div>
                    <div className="col s12" style={{height: '100px', border: '1px solid black', marginBottom: '5px'}}>
                        <div style={{paddingTop: '5px'}}>
                            <div style={{fontSize: '18px', fontWeight: 'bold'}}><span>Wireframe width: </span><input style={{all: 'revert', width: '50px'}}
                                                                                                                     onChange={this.updateWidth.bind(this)}></input></div>
                            <div style={{fontSize: '18px', fontWeight: 'bold'}}><span>Wireframe height: </span><input style={{all: 'revert', width: '50px'}}
                                                                                                                     onChange={this.updateHeight.bind(this)}></input></div>
                            <div style={{textAlign: 'center'}}><button style={{width: '150px', height: '30px'}} 
                                                                       disabled={this.state.updateButtonDisabled} 
                                                                       onClick={this.submit}>Update</button></div>
                        </div>
                    </div>
                </div>
            );
        }
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
)(ControlChange);