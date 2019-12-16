import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import Control from './Control'
import { getFirestore } from 'redux-firestore';

class Controls extends React.Component {

    state = {
        wireframe: null,
        controls: null,
        changed: 0,
    };

    componentDidMount() {
        document.addEventListener("keydown", this.onKeyPressed.bind(this));
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.onKeyPressed.bind(this));
    }

    onKeyPressed = (e) => {
      if (e.key === 'd' && e.ctrlKey){
        e.preventDefault();
        this.setState({controls: this.props.wireframe.controls});
      }
    }

    handleClick = () => {
        var controls = this.props.wireframe.controls;
        var newControls = controls.map(control => {
            if (control.edit === true){
                control.edit = false;
            }
            return control;
        });
        getFirestore().collection('wireframes').doc(this.props.id).update({"controls": newControls});
    }

    render() {
        if (this.state.wireframe == null || this.state.controls == null){
            this.setState({wireframe: this.props.wireframe});
            this.setState({controls: this.props.wireframe.controls});
        }
        var height = this.props.wireframe.height + 'px';
        var width = this.props.wireframe.width + 'px';
        var controls = this.state.controls;
        return (
            <div onClick={this.handleClick} style={{border: '1px solid black', height: height, width: width, backgroundColor: '#F6F6F6', marginTop: '5px', marginLeft: '5px', marginRight: '5px'}}>
                {controls && controls.map(control => (
                    <Control control={control} id={this.props.id}/>
                ))}
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
)(Controls);