import React from 'react';
import { Link } from 'react-router-dom';

class WireframeOptions extends React.Component {

    close = () => {
        
    }

    render() {
        return (
            <div className="row" style={{border: '1px solid black', height: '50px'}}>
                <Link onClick={this.close} style={{color: 'black'}}>
                    <div className='col s2'>
                        <i class="material-icons" style={{fontSize: '40px', position: 'relative', top: '3px'}}>zoom_in</i>
                    </div>
                </Link>
                <Link onClick={this.close} style={{color: 'black'}}>
                    <div className='col s3'>
                        <i class="material-icons" style={{fontSize: '40px', position: 'relative', top: '3px'}}>zoom_out</i>
                    </div>
                </Link>
                <Link onClick={this.close} style={{color: 'black'}}>
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
export default WireframeOptions;