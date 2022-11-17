import { useState, useEffect } from 'react'
import { getRemainingTimeUntilMsTimestamp } from '../utils/CountdownTimerUtils'

const defaultRemainingTime = {
  seconds: '00',
  minutes: '00',
  hours: '00',
  days: '00',
}

const CountdownTimer = ({ countdownTimestampMs,size }) => {
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime)

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateRemainingTime(countdownTimestampMs)
    }, 1000)
    return () => clearInterval(intervalId)
  }, [countdownTimestampMs])

  function updateRemainingTime(countdown) {
    setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown))
  }

  return (
    <div className="text-white text-base ">
      <p>
        {remainingTime.days} d {remainingTime.hours} h {remainingTime.minutes} m {remainingTime.seconds} s
      </p>
    </div>
  )
}

export default CountdownTimer
