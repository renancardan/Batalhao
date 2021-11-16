import { render } from '@testing-library/react';
import { useState } from 'react';

function renderLabel(label){
    return label ? (<span>{label}</span>) : null;
}

function Checkbox({label, onChange, res}){
    const [Checked, setChecked] = useState(res); 
    
    function toggle(){
        const newValue = !Checked
        setChecked(newValue);
        onChange && onChange(newValue)
    }

    const checkedClass = Checked ? 'checked' : '';
    const containerClass = `checkbox ${checkedClass}`.trim() 

    return (
        <div  className="checkbox-container" onClick={toggle}>
            <div className={containerClass}>
            {Checked ? 
            "ON"
            :
            "OFF"
            } 
            </div>
            {renderLabel(label)}
        </div>
        
    )
}

Checkbox.defaultProps = {
    label: ''
}

export default Checkbox;