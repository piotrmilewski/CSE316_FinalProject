import React from 'react';
import { getFirestore } from 'redux-firestore';

class ControlChange extends React.Component {

    state = {
        width: 0,
        height: 0,
        updateButtonDisabled: true,
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

    submit = () => {
        if (this.state.height > 0 && this.state.height <= 5000 && this.state.width > 0 && this.state.width <= 5000){
            getFirestore().collection('wireframes').doc(this.props.id).update({"height": this.state.height});
            getFirestore().collection('wireframes').doc(this.props.id).update({"width": this.state.width});
        }
    }

    render() {
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
export default ControlChange;