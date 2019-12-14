import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import Control from './Control'

class Controls extends React.Component {

    state = {
        wireframe: null,
        controls: null,
    };

    render() {
        if (this.state.wireframe == null){
            this.setState({wireframe: this.props.wireframe});
            this.setState({controls: this.props.wireframe.controls});
        }
        console.log(this.state.controls);
        var height = this.props.wireframe.height + 'px';
        var width = this.props.wireframe.width + 'px';
        var controls = this.state.controls;
        return (
            <div style={{border: '1px solid black', height: height, width: width, backgroundColor: '#F6F6F6', marginTop: '5px', marginLeft: '5px', marginRight: '5px'}}>
                {controls && controls.map(control => (
                    <Control control={control} />
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