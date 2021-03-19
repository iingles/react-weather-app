import React, { useState } from 'react'
import './App.scss'
import Header from './components/Header/Header'
import data from './assets/data/slcWeather.json'
import Day from './components/Day/Day'


function App() {

  const [tempScaleFarenheit, setTempScale] = useState(true)
  const [dayDetailShowing, setDetailShow] = useState(false)
  const [selectedDayData, setSelectedDay] = useState({
    number: 0,
    name: "",
    startTime: "",
    endTime: "",
    isDaytime: true,
    temperature: 0,
    temperatureUnit: "F",
    temperatureTrend: null,
    windSpeed: "",
    windDirection: "",
    icon: "",
    shortForecast: "",
    detailedForecast: ""
  })

  const toggleTempScale = () => {
    setTempScale(!tempScaleFarenheit)
  }

  const dayData = data.properties.periods
  let display = null

  const toggleDayDetail = (dayDetail: any) => {
    setSelectedDay(dayDetail)
    setDetailShow(!dayDetailShowing)
  }

  const getDayTimeData = (dayData:Array<any>) => {
    let dayTimes:Array<any> = []

    dayTimes = dayData.filter( el => el.isDaytime )

    return dayTimes
  }

  const getNightTimeData = (dayData:Array<any>) => {
    let nightTimes:Array<any> = []

    nightTimes = dayData.filter( el => !el.isDaytime ) 

    return nightTimes
  }

  const convertFtoC = (temp:number):number => {
    return Math.round((temp - 32) * (5/9))
  }

  if ( !dayDetailShowing ) {
    const dayTimes = getDayTimeData(dayData)
    const nightTimes = getNightTimeData(dayData)

    
    display =( <div  className="days-wrapper">
      {
        dayTimes.map( (day, index) => {
           const hiC:number = convertFtoC(day.temperature)
           const lowC:number = convertFtoC(nightTimes[index].temperature)

           return <Day
              getDayDetail={ () => toggleDayDetail(day) }
              key={index}
              dayName={ day.name }
              hiTempF={ day.temperature }
              hiTempC={ hiC }
              lowTempF={ nightTimes[index].temperature }
              lowTempC={ lowC }
              typePrecip={ day.shortForecast}
              date={ day.startTime }
              celsius={ !tempScaleFarenheit }
              dayDetail={ dayDetailShowing }
           />
 
        })
      }
    </div> )
  }

  if ( dayDetailShowing ) {
    const dayInfo = selectedDayData

    const NightInfo = dayData[dayInfo.number]

    const hiC:number = convertFtoC(dayInfo.temperature)
    const lowC:number = convertFtoC(NightInfo.temperature)

    const theDate = new Date(dayInfo.startTime)

    display = (
      <div className="days-wrapper detail">
        {
        <Day 
          getDayDetail={ () => toggleDayDetail(dayInfo) }
          dayName={ dayInfo.name }
          hiTempF={ dayInfo.temperature }
          hiTempC={ hiC }
          lowTempF={ NightInfo.temperature }
          lowTempC={ lowC }
          typePrecip={ dayInfo.detailedForecast}
          date={ `${theDate.getMonth() + 1}/${theDate.getDate()}/${theDate.getFullYear()}` }
          dayDetail={ dayDetailShowing }
          celsius={ !tempScaleFarenheit }
        />
        }
      </div>
    )

  }
  
  return (
    <div className="App">
      <Header />
      <button
        onClick={ ()=> toggleTempScale() }
        className="scale-button"
      >
        Switch Temperature Scale to { !tempScaleFarenheit ? 'Farenheit': 'Celsius' }
      </button>
     { display }
    </div>
  );
}

export default App
