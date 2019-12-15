import React from 'react';
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import WireframeCard from './WireframeCard';
import { getFirestore } from 'redux-firestore';
import { Modal, Button, Icon } from 'react-materialize'

class WireframeLinks extends React.Component {

    state = {
        goHome: false,
    };

    updateAccessTime = (tid) => {
        getFirestore().collection('wireframes').doc(tid).update({"lastUpdated": getFirestore().FieldValue.serverTimestamp()});
    }

    deleteList = (tid) => {
        getFirestore().collection('wireframes').doc(tid).delete();
        this.setState({goHome: true});
    }

    render() {
        if (this.state.goHome){
            this.setState({goHome: false});
            return <Redirect to="/" />;
        }

        const wireframes = this.props.wireframes;
        return (
            <div className="todo-lists section">
                {wireframes && wireframes.map(wireframe => (
                    <div className="row">
                         <div className="card-title col s10">
                            <Link to={'/wireframe/' + wireframe.id} key={wireframe.id} onClick={this.updateAccessTime.bind(this, wireframe.id)}>
                                <WireframeCard wireframe={wireframe} />
                            </Link>
                        </div>
                        <div className="card-title col s1">
                            <Modal header="Delete list?" trigger={<Button style={{position: 'relative', top: 30}}><Icon className="material-icons">delete</Icon></Button>}>
                                <p><b>Are your sure you want to delete this wireframe?</b></p>
                                <Button onClick={this.deleteList.bind(this, wireframe.id)}>Yes</Button>
                                <p>The wireframe will not be retreivable.</p>
                            </Modal>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        wireframes: state.firestore.ordered.wireframes,
        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps))(WireframeLinks);