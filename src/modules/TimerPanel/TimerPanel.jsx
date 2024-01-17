import { View, Text, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { styles } from './style'
import RoundedButton from '../../UI/RoundedButton'
import { AppContainers, AppTextStyles, Buttons, Theme } from '../../styles'
import DoneSvg from '../../res/svgs/DoneSvg'
import TimerSvg from '../../res/svgs/TimerSvg'
import { CancelSvg } from '../../res/svgs'
import AccurateTimer from './AccurateTimer'
import * as Animatable from 'react-native-animatable'
import PrimaryButton from '../../UI/PrimaryButton'
import { useDispatch } from 'react-redux'
import { onActiveTabChanged } from '../../redux/actions/exerciseActions'


export default function TimerPanel({ 
    buttonHandlerFunc, 
    durationSetup,
}) {

    const [isActive, setActive] = useState(false)
    const [minutes, setMinutes] = useState('00')
    const [seconds, setSeconds] = useState('00')
    const acceptRef = useRef(false)
    const timerRef = useRef(new AccurateTimer())
    const dispatch = useDispatch()

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

    async function createPerformanceHandler() {
        const createPerformance = async () => {
            if (await buttonHandlerFunc()) {
                // disable timer
                // we need only
                // clear timeout!
                timerRef.current.cancel()
                // redirect:
                // -> to progress tab
                dispatch(onActiveTabChanged('progress'))
            } else {
                // validation failing
                // or smth. bad happend
                // we can try to push
                // add button again!
                acceptRef.current = false
                // display Alert
                // suggest to check
                // each set and rows
                // weight and reps columns
                // are not empty!
                Alert.alert(
                    'this is top',
                    'this is bottom',
                    [
                        {
                            text: 'I\'ll do my best!',
                        }
                    ]
                )
            }
        }
        if (!acceptRef.current) {
            // turn it into pressed mode
            acceptRef.current = true
            Alert.alert(
                'this is top',
                'this is bottom',
                [
                    {
                        text: 'Yes',
                        onPress: async () => {
                            await createPerformance()
                        },
                    },
                    {
                        text: 'No',
                        onPress: () => {
                            // make button pressabe
                            acceptRef.current = false
                        },
                    }
                ]
            )
        }
    }
    return (
        <View style={{
            ...AppContainers.styles.appContainerWithLeftAndRightPaddings, 
            ...styles.timerPanelContainer
        }}>
                
            <PrimaryButton 
                styles={Buttons.styles.successOutline} 
                vwidth={56}
                vheight={56}
                brRadiusSize={20}
                onPressFunc={createPerformanceHandler}
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