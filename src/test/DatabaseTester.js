import React from 'react'
import { connect } from 'react-redux';
import todoJson from './TestWireframeData.json'
import { getFirestore } from 'redux-firestore';

class DatabaseTester extends React.Component {

    // NOTE, BY KEEPING THE DATABASE PUBLIC YOU CAN
    // DO THIS ANY TIME YOU LIKE WITHOUT HAVING
    // TO LOG IN
    handleClear = () => {
        const fireStore = getFirestore();
        fireStore.collection('wireframes').get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc) {
                console.log("deleting " + doc.id);
                fireStore.collection('wireframes').doc(doc.id).delete();
            })
        });
    }

    handleReset = () => {
        const fireStore = getFirestore();
        todoJson.wireframes.forEach(wireframeJson => {
            fireStore.collection('wireframes').add({
                    name: wireframeJson.name,
                    owner: wireframeJson.owner,
                    width: wireframeJson.width,
                    saved: wireframeJson.saved,
                    height: wireframeJson.height,
                    controls: wireframeJson.controls,
                    lastUpdated: fireStore.FieldValue.serverTimestamp(),
                }).then(() => {
                    console.log("DATABASE RESET");
                }).catch((err) => {
                    console.log(err);
                });
        });
    }

    render() {

        //admin password = administrator
        if (this.props.auth.email === "admin@gmail.com"){
            return (
                <div>
                    <button onClick={this.handleClear}>Clear Database</button>
                    <button onClick={this.handleReset}>Reset Database</button>
                </div>);
        }
        else{
            return (
                <div>
                    You don't have admin access
                </div>
            );
        }
    }
}

const mapStateToProps = function (state) {
    return {
        auth: state.firebase.auth,
        firebase: state.firebase
    };
}

export default connect(mapStateToProps)(DatabaseTester);