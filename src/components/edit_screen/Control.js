import React from 'react';
import { Rnd } from "react-rnd";

class Control extends React.Component {

    state = {
        width: -1,
        height: 0,
        x: 0,
        y: 0,
        name: "",
        editable: false,
    };

    setEdit = (e) => {
        e.stopPropagation();
        this.setState({editable: true});
    }

    componentWillMount() {
        document.addEventListener('mouseup', this.handleClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mouseup', this.handleClick, false);
    }

    handleClick = (e) => {
        this.setState({editable: false});
    }

    render() {
        var control = this.props.control;
        
        if (this.state.width === -1){
            this.setState({width: control.width});
            this.setState({height: control.height});
            this.setState({x: control.xCoordinate});
            this.setState({y: control.yCoordinate});
            this.setState({name: control.name});
        }

        if (control.controlName === "Container"){
            return (
                <Rnd
                    size={{width: this.state.width, height: this.state.height}}
                    position={{x: this.state.x, y: this.state.y}}
                    onDragStop={(e, d) => {
                        this.setState({x: d.x, y: d.y})
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
                    }}>
                    <div style={{border: '2px solid black', height: '100%', width: '100%', backgroundColor: 'white'}}></div>
                </Rnd>
            );
        }
        else if (control.controlName === "Label"){
            return (
                <Rnd
                    style={{border: '1px solid black'}}
                    size={{width: this.state.width, height: this.state.height}}
                    position={{x: this.state.x, y: this.state.y}}
                    onDragStop={(e, d) => {
                        this.setState({x: d.x, y: d.y})
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
                    }}>
                <div style={{fontSize: '18px', height: '100%', width: '100%'}}>{this.state.name}</div>
                </Rnd>
            );
        }
        else if (control.controlName === "Button"){
            return (
                <Rnd
                    style={{border: '1px solid black'}}
                    size={{width: this.state.width, height: this.state.height}}
                    position={{x: this.state.x, y: this.state.y}}
                    onDragStop={(e, d) => {
                        this.setState({x: d.x, y: d.y})
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
                    }}>
                <button style={{fontSize: '18px', height: '100%', width: '100%', pointerEvents: 'none'}}>{this.state.name}</button>
                </Rnd>
            );
        }
        else {
            return (
                <Rnd
                    size={{width: this.state.width, height: this.state.height}}
                    position={{x: this.state.x, y: this.state.y}}
                    onDragStop={(e, d) => {
                        this.setState({x: d.x, y: d.y})
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
                    }}>
                <input style={{all: 'revert', pointerEvents: 'none', color: 'gray', width: '100%', height: '100%'}} defaultValue={this.state.name}></input>
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

export default Control;