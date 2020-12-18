import React from 'react'
import './style.scss'
function Loadding(props) {
    const {fonsize} = props
    return (
        <div  className="loadding">
            <i style={{
            fontSize: fonsize&&fonsize
        }} className="fas fa-spinner"></i>
        </div>
    )
}

export default Loadding
