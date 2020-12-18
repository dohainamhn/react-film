import React from 'react'
import Film from './Film'
import './style.scss'

function ListFilm(props) {
    const {films} = props
    return (
        <div className="listFilm">
            {
               films&&films.map((item)=><Film 
                 film={item} key={item._id}
                />)
            }
        </div>
    )
}

export default ListFilm
