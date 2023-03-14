import React from 'react'

function Alert(props) {
    const capitalize = (word)=>{
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        <div style={{height: '50px',width:"200px",borderRadius:"8px",position:"absolute",zIndex:"9999999",top:"50%",left:"30%"}}>
        {props.alert && <div>
           <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg} 
        </div>}
        </div>
    )
}

export default Alert