import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Redirect } from 'react-router-dom'
import { Modal, Button } from 'react-materialize'

class WireframeOptions extends React.Component {

    state = {
        oldControls: null,
        goHome: false,
        open: false,
    };


    save = () => {
        var currControls = this.props.wireframe.controls;
        getFirestore().collection('wireframes').doc(this.props.id).update({"saved": true});
        this.setState({oldControls: currControls});
    }

    close = () => {
        if (this.props.wireframe.saved === true){
            getFirestore().collection('wireframes').doc(this.props.id).update({"controls": this.state.oldControls});
            this.setState({open: false});
            this.setState({goHome: true});
        }
        else{
            this.setState({open: true});
        }
    }

    saveAndClose = () => {
        //save
        var currControls = this.props.wireframe.controls;
        getFirestore().collection('wireframes').doc(this.props.id).update({"saved": true});
        this.setState({oldControls: currControls});
        //close
        getFirestore().collection('wireframes').doc(this.props.id).update({"controls": currControls});
        this.setState({open: false});
        this.setState({goHome: true});
    }

    closeAnyway = () => {
        getFirestore().collection('wireframes').doc(this.props.id).update({"controls": this.state.oldControls});
        getFirestore().collection('wireframes').doc(this.props.id).update({"saved": true});
        this.setState({open: false});
        this.setState({goHome: true});
    }

    zoomIn = () => {

    }

    zoomOut = () => {

    }

    render() {

        if (this.state.goHome){
            this.setState({goHome: false});
            return <Redirect to="/" />;
        }

        if (this.state.oldControls == null && this.props.wireframe.controls != null)
            this.setState({oldControls: this.props.wireframe.controls});

        return (
            <div className="row" style={{border: '1px solid black', height: '50px', backgroundColor: '#F6F6F6', marginTop: '5px'}}>
                <Modal header="Delete list?" actions={''} open={this.state.open}>
                    <p><b>You are about to close without saving.</b></p>
                    <p><b>Would you like to save before closing?</b></p>
                    <Button onClick={this.saveAndClose}>Yes</Button>
                    <div style={{display: 'inline-block', width: '10px'}}></div>
                    <Button onClick={this.closeAnyway}>No</Button>
                </Modal>
                <Link onClick={this.zoomIn} style={{color: 'black'}}>
                    <div className='col s2'>
                        <i class="material-icons" style={{fontSize: '40px', position: 'relative', top: '3px'}}>zoom_in</i>
                    </div>
                </Link>
                <Link onClick={this.zoomOut} style={{color: 'black'}}>
                    <div className='col s3'>
                        <i class="material-icons" style={{fontSize: '40px', position: 'relative', top: '3px'}}>zoom_out</i>
                    </div>
                </Link>
                <Link onClick={this.save} style={{color: 'black'}}>
                    <div className='col s3' 
                        style={{fontSize: '20px', position: 'relative', top: '7px'}}>
                        Save
                    </div>
                </Link>
                <Link onClick={this.close} style={{color: 'black'}}>
                    <div className='col s3' 
                        style={{fontSize: '20px', position: 'relative', top: '7px'}}>
                        Close
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
)(WireframeOptions);