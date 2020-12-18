import React from 'react'
import { Link } from 'react-router-dom'
import './style.scss'
function ErrorPage() {
    return (
        <div className="errorPage">
            <div id="notfound">
                <div className="notfound">
                    <div className="notfound-404">
                        <h1>4<span>0</span>4</h1>
                    </div>
                    <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
                    <Link to="/">Home Page</Link>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage
