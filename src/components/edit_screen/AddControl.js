import React from 'react';
import { Link } from 'react-router-dom';

class AddControl extends React.Component {

    close = () => {
        
    }

    render() {
        return (
            <div className="row" style={{border: '1px solid black', height: '650px', backgroundColor: '#F6F6F6', paddingTop: '20px', paddingLeft: '20px', paddingRight: '20px'}}>
                <Link onClick={this.close}  style={{color: 'black'}}>
                    <div className="col s12" style={{height: '150px', marginBottom: '5px'}}>
                        <div style={{paddingTop: '10px'}}>
                            <div style={{border: '2px solid black', height: '100px', backgroundColor: 'white'}}></div>
                            <div style={{textAlign: 'center', fontSize: '20px', fontWeight: 'bold'}}>Container</div>
                        </div>
                    </div>
                </Link>
                <Link onClick={this.close}  style={{color: 'black'}}>
                    <div className="col s12" style={{height: '150px', marginBottom: '5px'}}>
                        <div style={{paddingTop: '45px'}}>
                            <div style={{textAlign: 'center', fontSize: '18px'}}>Prompt for Input:</div>
                            <div style={{textAlign: 'center', fontSize: '20px', fontWeight: 'bold'}}>Label</div>
                        </div>
                    </div>
                </Link>
                <Link onClick={this.close}  style={{color: 'black'}}>
                    <div className="col s12" style={{height: '150px', marginBottom: '5px'}}>
                        <div style={{paddingTop: '45px'}}>
                            <div style={{textAlign: 'center'}}><button style={{width: '150px', height: '30px', pointerEvents: 'none'}}>Submit</button></div>
                            <div style={{textAlign: 'center', fontSize: '20px', fontWeight: 'bold'}}>Button</div>
                        </div>
                    </div>
                </Link>
                <Link onClick={this.close}  style={{color: 'black'}}>
                    <div className="col s12" style={{height: '150px', marginBottom: '5px'}}>
                        <div style={{paddingTop: '45px'}}>
                            <div style={{textAlign: 'center'}}>
                                <input style={{all: 'revert', pointerEvents: 'none', color: 'gray', width: '150px', height: '20px'}} value='input'></input>
                            </div>
                            <div style={{textAlign: 'center', fontSize: '20px', fontWeight: 'bold'}}>Textfield</div>
                        </div>
                    </div>
                </Link>
            </div>
        );
    }
}
export default AddControl;