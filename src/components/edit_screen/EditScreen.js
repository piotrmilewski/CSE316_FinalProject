import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import WireframeOptions from './WireframeOptions';
import AddControl from './AddControl';
import ControlChange from './ControlChange';
import Controls from './Controls';

class EditScreen extends Component {

    render() {
        const auth = this.props.auth;
        const wireframe = this.props.wireframe;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        if (!wireframe)
            return <React.Fragment />;

        return (
            <div className="white">
                <div className="row" style={{border: '1px solid black'}}>
                    <div className="col s2">
                        <WireframeOptions />
                        <AddControl />
                    </div>
                    <div className="col s8">
                        <Controls id={wireframe.id}/>
                    </div>
                    <div className="col s2">
                        <ControlChange id={wireframe.id}/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
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
)(EditScreen);