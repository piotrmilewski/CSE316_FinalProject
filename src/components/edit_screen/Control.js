import React from 'react';
import { Rnd } from "react-rnd";
import { getFirestore } from 'redux-firestore';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class Control extends React.Component {

    state = {
        width: -1,
        height: 0,
        x: 0,
        y: 0,
        name: "",
        editable: false,
        key: -1,
    };

    setEdit = (e) => {
        e.stopPropagation();
        var controls = this.props.wireframe.controls;
        var newControls = controls.map(control => {
            if (control.key === this.state.key){
                control.edit = true;
            }
            else{
                control.edit = false;
            }
            return control;
        });
        getFirestore().collection('wireframes').doc(this.props.id).update({"controls": newControls});
        this.setState({editable: true});
    }

    updateDrag = (x, y) => {
        var controls = this.props.wireframe.controls;
        var newControls = controls.map(control => {
            if (control.key === this.state.key){
                control.xCoordinate = x;
                control.yCoordinate = y;
            }
            return control;
        });
        getFirestore().collection('wireframes').doc(this.props.id).update({"saved": false});
        getFirestore().collection('wireframes').doc(this.props.id).update({"controls": newControls});
    }

    updateResize = (width, height) => {
        var controls = this.props.wireframe.controls;
        var newControls = controls.map(control => {
            if (control.key === this.state.key){
                control.width = width;
                control.height = height;
            }
            return control;
        });
        getFirestore().collection('wireframes').doc(this.props.id).update({"saved": false});
        getFirestore().collection('wireframes').doc(this.props.id).update({"controls": newControls});
    }

    render() {
        var controls = this.props.wireframe.controls;
        var control;
        controls.map(controlM => {
            if (controlM.key === this.props.control.key){
                control = controlM;
                if (controlM.edit === false && this.state.editable === true)
                    this.setState({editable: false});
            }
            return controlM;
        });
        
        if (this.state.width === -1){
            this.setState({width: control.width});
            this.setState({height: control.height});
            this.setState({x: control.xCoordinate});
            this.setState({y: control.yCoordinate});
            this.setState({name: control.name});
            this.setState({key: control.key});
        }

        var fontSize = control.fontSize + 'px';

        if (control.controlName === "Container"){
            return (
                <Rnd
                    style={this.state.editable ? {outline: '1px solid blue'} : {}}
                    size={{width: this.state.width, height: this.state.height}}
                    position={{x: this.state.x, y: this.state.y}}
                    onDragStop={(e, d) => {
                        this.setState({x: d.x, y: d.y});
                        this.updateDrag(d.x, d.y);
                    }}
                    disableDragging={!this.state.editable}
                    enableResizing={this.state.editable ? Enable : Disable}
                    onClick={this.setEdit}
                    onResizeStop={(e, direction, ref, delta, position) => {
                        this.setState({
                            editable: true,
                            width: ref.style.width,
                            height: ref.style.height,
                            ...position
                        });
                        this.updateResize(ref.style.width, ref.style.height);
                    }}>
                    <div style={{border: '1px solid black', height: '100%', width: '100%', backgroundColor: 'white'}}></div>
                </Rnd>
            );
        }
        else if (control.controlName === "Label"){
            return (
                <Rnd
                    style={this.state.editable ? {outline: '1px solid blue'} : {}}
                    size={{width: this.state.width, height: this.state.height}}
                    position={{x: this.state.x, y: this.state.y}}
                    onDragStop={(e, d) => {
                        this.setState({x: d.x, y: d.y});
                        this.updateDrag(d.x, d.y);
                    }}
                    disableDragging={!this.state.editable}
                    enableResizing={this.state.editable ? Enable : Disable}
                    onClick={this.setEdit}
                    onResizeStop={(e, direction, ref, delta, position) => {
                        this.setState({
                            editable: true,
                            width: ref.style.width,
                            height: ref.style.height,
                            ...position
                        });
                        this.updateResize(ref.style.width, ref.style.height);
                    }}>
                <div style={{fontSize: fontSize, height: '100%', width: '100%'}}>{control.name}</div>
                </Rnd>
            );
        }
        else if (control.controlName === "Button"){
            return (
                <Rnd
                    style={this.state.editable ? {outline: '1px solid blue'} : {}}
                    size={{width: this.state.width, height: this.state.height}}
                    position={{x: this.state.x, y: this.state.y}}
                    onDragStop={(e, d) => {
                        this.setState({x: d.x, y: d.y});
                        this.updateDrag(d.x, d.y);
                    }}
                    disableDragging={!this.state.editable}
                    enableResizing={this.state.editable ? Enable : Disable}
                    onClick={this.setEdit}
                    onResizeStop={(e, direction, ref, delta, position) => {
                        this.setState({
                            editable: true,
                            width: ref.style.width,
                            height: ref.style.height,
                            ...position
                        });
                        this.updateResize(ref.style.width, ref.style.height);
                    }}>
                <button style={{fontSize: fontSize, height: '100%', width: '100%', pointerEvents: 'none'}}>{control.name}</button>
                </Rnd>
            );
        }
        else {
            return (
                <Rnd
                    style={this.state.editable ? {outline: '2px solid blue'} : {}}
                    size={{width: this.state.width, height: this.state.height}}
                    position={{x: this.state.x, y: this.state.y}}
                    onDragStop={(e, d) => {
                        this.setState({x: d.x, y: d.y});
                        this.updateDrag(d.x, d.y);
                    }}
                    disableDragging={!this.state.editable}
                    enableResizing={this.state.editable ? Enable : Disable}
                    onClick={this.setEdit}
                    onResizeStop={(e, direction, ref, delta, position) => {
                        this.setState({
                            editable: true,
                            width: ref.style.width,
                            height: ref.style.height,
                            ...position
                        });
                        this.updateResize(ref.style.width, ref.style.height);
                    }}>
                <input style={{all: 'revert', fontSize: fontSize, pointerEvents: 'none', color: 'gray', width: '100%', height: '100%'}} value={control.name}></input>
                </Rnd>
            );
        }
    }
}

var Enable = {
    bottom: true,
    bottomLeft: true,
    bottomRight: true,
    left: true,
    right: true,
    top: true,
    topLeft: true,
    topRight: true,
}

var Disable = {
    bottom: false,
    bottomLeft: false,
    bottomRight: false,
    left: false,
    right: false,
    top: false,
    topLeft: false,
    topRight: false,
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
)(Control);