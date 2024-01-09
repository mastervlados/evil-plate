import { View, Text, TouchableWithoutFeedback } from 'react-native'
import React, { cloneElement, useContext, useEffect, useState } from 'react'
import * as Animatable from 'react-native-animatable'
import AppContext from '../../AppContext'

export default function CheckBox({
    iconSvg,
    iconSize,
    iconDefaultColor,
    iconCheckedColor,
    defaultStyles,
    checkedStyles,
    previousWasChecked = false,
    previousCheckedColor,
    isChecked = false,
    valueFunc,
}) {

    // const [animation, setAnimation] = useState(null)
    // const service = useContext(AppContext)

    // const animationList = [
    //     'tada',
    //     'rubberBand',
    // ]

    let defineStyles
    let defineIconColor

    if (isChecked) {
        // Current lethal
        defineStyles = checkedStyles    
        defineIconColor = iconCheckedColor
    } else if (!isChecked && previousWasChecked) {
        // Last time was lethal
        defineStyles = defaultStyles   
        defineIconColor = previousCheckedColor
    } else {
        // Default
        defineStyles = defaultStyles   
        defineIconColor = iconDefaultColor
    }

    const IconSvg = iconSvg ? cloneElement(iconSvg, { size: iconSize, fill: defineIconColor }) : null

    return (
        
            <TouchableWithoutFeedback onPress={async () => {
                valueFunc()
                // if (touchable) {
                //     setLocalValue(!localValue)
                //     setTouchable(!touchable)
                //     if (!localValue) {
                //         setAnimation(animationList[Math.floor(Math.random() * animationList.length)])
                //         await service.sleep(1.5);
                //         setAnimation(null)
                //     }
                //     valueFunc()
                // }
            }}>
                <View style={defineStyles}>
                    {/* <Animatable.View 
                        animation={animation}
                        duration={1500}
                    > */}
                        { IconSvg }
                    
                    {/* </Animatable.View> */}
                </View>
            </TouchableWithoutFeedback>
        
    )
}