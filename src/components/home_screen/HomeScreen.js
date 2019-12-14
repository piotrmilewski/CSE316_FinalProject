import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { /*NavLink,*/ Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import WireframeLinks from './WireframeLinks'
import { getFirestore } from 'redux-firestore'

class HomeScreen extends Component {

    handleNewWireframe = (e) => {
        const fireStore = getFirestore();
        fireStore.collection('wireframes').add({
            name: "Undefined",
            owner: "Undefined",
            width: 500,
            height: 600,
            controls: null,
            lastUpdated: fireStore.FieldValue.serverTimestamp(),
        })
    }

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/splash" />;
        }

        return (
            <div className="dashboard">
                <div className="row">
                    <div className="col s5">
                        <WireframeLinks />
                    </div>

                    <div className="col s7">
                        <div className="banner">
                        Wireframer™<br />
                        Wireframe Maker
                        </div>
                        
                        <div className="home_new_list_container">
                                <button className="home_new_list_button" onClick={this.handleNewWireframe}>
                                    Create a New Wireframe
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'wireframes', orderBy: ['lastUpdated', 'desc'] },
    ]),
)(HomeScreen);