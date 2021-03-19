import React from "react"
import './Day.scss'

type dayProps = {
    hiTempF: number,
    hiTempC: number,
    lowTempF: number,
    lowTempC: number,
    typePrecip: string,
    dayName: string,
    date?: string,
    celsius: boolean,
    dayDetail: boolean,
    getDayDetail?: (day:object)=>void
}


const Day = (props: dayProps) => {   
    
    
    return (
        <div className="day" onClick={ props.getDayDetail }>
            <p className="day-name">
                { props.dayName }
            </p>
            <p className="day-date">
                { props.dayDetail ? props.date : '' }
            </p>
            <h1 className="high-temperature">
                { props.celsius ? `${props.hiTempC}° C` : `${props.hiTempF}° F` }
            </h1>

            <h2 className="low-temperature"> { props.celsius ? `${props.lowTempC}° C` : `${props.lowTempF}° F` }</h2>

            <p className="chancePrecip">
                { props.typePrecip }
            </p>
        </div>
    )
}

export default Day