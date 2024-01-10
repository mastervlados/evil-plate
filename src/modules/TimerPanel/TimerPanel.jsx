import { View, Text } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { styles } from './style'
import RoundedButton from '../../UI/RoundedButton'
import { AppContainers, AppTextStyles, Buttons, Theme } from '../../styles'
import DoneSvg from '../../res/svgs/DoneSvg'
import TimerSvg from '../../res/svgs/TimerSvg'
import * as Animatable from 'react-native-animatable'
import AppContext from '../../../AppContext'
import * as Haptics from 'expo-haptics'
import { CancelSvg } from '../../res/svgs'


export default function TimerPanel({ buttonHandlerFunc, durationSetup }) {

    const [isActive, setActive] = useState(false)
    const [minutes, setMinutes] = useState('00')
    const [seconds, setSeconds] = useState('00')
    const service = useContext(AppContext)

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

    const timerButtonHandler = async () => {

        const startTimer = async (duration) => {
            duration *= 1000
            const interval = 1000; // ms
            let expected = Date.now() + interval;
            const startTimer = setTimeout(step, interval);
            async function step() {
                const dt = Date.now() - expected; // the drift (positive for overshooting)
                if (dt > interval) {
                    // something really bad happened. Maybe the browser (tab) was inactive?
                    // possibly special handling to avoid futile "catch up" run
                }
                // do what is to be done
                duration -= interval
                updateTimer(duration)
                if (duration === 0) {
                    // means that we finish here!
                    clearTimeout(startTimer)
                    Haptics.notificationAsync(
                        Haptics.NotificationFeedbackType.Success
                    )
                    await service.sleep(1)
                    // sleep one second!
                    setActive(false)
                    // show default timer duration
                    updateTimer(durationSetup * 1000)
                } else {
                    // continue
                    expected += interval;
                    setTimeout(step, Math.max(0, interval - dt)); // take into account drift
                }
            }
        }

        if (!isActive) {
            // Button was pressed!
            // should start timer
            setActive(true)
            startTimer(durationSetup)
        } else {
            // Button was pressed again
            // should stop timer
            console.log('stop timer')
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