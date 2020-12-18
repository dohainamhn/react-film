import React, { useEffect, useRef, useState } from 'react'
import './style.scss'

function Advertisement() {
    let [countDown, setCountDown] = useState(6)
    let countRef = useRef()
    useEffect(() => {
        let count = setInterval(() => {
            setCountDown(countRef.current)
        }, 1000);
        return () => {
            clearInterval(count)
        }
    }, [])
    useEffect(() => {
        countRef.current = countDown - 1
    }, [countDown])
    return (
        <div className="advertisement">
            <div className="advertisement__number">
                <div>
                    {
                        countDown
                    }
                </div>
            </div>
        </div>
    )
}

export default Advertisement
