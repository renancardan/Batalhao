import React from 'react';


export default ({ placeholder, value, onChange, m}) => {

    
        return (
                <div className="input-group mb-3">
                        
                        <textarea className="form-control" rows={3} placeholder={placeholder} value={value} onChange={onChange} />
                </div>

 
        );
    }
