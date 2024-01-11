import { View, Text } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { styles } from './style'
import RoundedButton from '../../UI/RoundedButton'
import { AppContainers, AppTextStyles, Buttons, Theme } from '../../styles'
import DoneSvg from '../../res/svgs/DoneSvg'
import TimerSvg from '../../res/svgs/TimerSvg'
import * as Animatable from 'react-native-animatable'
import AppContext from '../../../AppContext'
import { CancelSvg } from '../../res/svgs'
import AccurateTimer from './AccurateTimer'


export default function TimerPanel({ buttonHandlerFunc, durationSetup }) {

    const [isActive, setActive] = useState(false)
    const [minutes, setMinutes] = useState('00')
    const [seconds, setSeconds] = useState('00')
    const timerRef = useRef(new AccurateTimer())

    let timerButtonStyles
    let timerTextStyles

    if (isActive) {
        timerButtonStyles = Buttons.styles.danger
        timerTextStyles = AppTextStyles.styles.timerDigitsActive
    } else {
        timerButtonStyles = Buttons.styles.warning
        timerTextStyles = AppTextStyles.styles.timerDigitsDefault
    }

    const updateTimer = (milliseconds) => {
        const minutes = ~~(milliseconds / 60000)
        const seconds = ~~((milliseconds - (minutes * 60000)) / 1000)
        setMinutes(minutes < 10 ? '0'+minutes : minutes+'')
        setSeconds(seconds < 10 ? '0'+seconds : seconds+'')
    }

    useEffect(() => {
        // Init timer digits
        // once when we open
        // this screen
        updateTimer(durationSetup * 1000)
    }, [])

    // Use the handler function below
    // to manage timer status
    const timerButtonHandler = () => {
        if (!isActive) {
            setActive(!isActive)
            timerRef.current.start(
                (ms) => updateTimer(ms), 
                1000, // ~ one second
                durationSetup, // seconds
                setActive // send func
            )
        } else {
            setActive(!isActive)
            timerRef.current.cancel()
        }
    }

    return (
        <View style={{
            ...AppContainers.styles.appContainerWithLeftAndRightPaddings, 
            ...styles.timerPanelContainer
        }}>
                
            <RoundedButton 
                styles={Buttons.styles.successOutline} 
                size={56}
                onPressFunc={buttonHandlerFunc}
                iconSvg={<DoneSvg/>}
                iconSize={24}
                iconColor={Theme.positive}
            />
              
            <Text style={{...timerTextStyles, ...styles.timerDigits}}>{`${minutes}:${seconds}`}</Text>
            <Animatable.View 
                animation={isActive ? 'pulse' : null }
                duration={1000}
                iterationCount={Infinity}
            >
                <RoundedButton 
                    styles={timerButtonStyles} 
                    size={56}
                    onPressFunc={timerButtonHandler}
                    iconSvg={isActive ? <CancelSvg/> : <TimerSvg/>}
                    iconSize={35}
                    iconColor={Theme.base}
                />
            </Animatable.View>
        </View>
    )
}