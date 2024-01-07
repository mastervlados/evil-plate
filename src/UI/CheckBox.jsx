import { View, Text, TouchableWithoutFeedback } from 'react-native'
import React, { cloneElement, useContext, useState } from 'react'
import * as Animatable from 'react-native-animatable'
import AppContext from '../../AppContext'

export default function CheckBox({
    iconSvg,
    iconSize,
    iconDefaultColor,
    iconCheckedColor,
    defaultStyles,
    checkedStyles,
    previousWasChecked = true,
    previousCheckedColor,
    currentValue = false,
    valueFunc,
}) {

    const [isChecked, setValue] = useState(currentValue)
    const [animation, setAnimation] = useState(null)
    const service = useContext(AppContext)

    const animationList = [
        'tada',
        'rubberBand',
        'shake',
        'wobble',
    ]

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
                setAnimation(animationList[Math.floor(Math.random() * animationList.length)])
                await service.sleep(1.5)
                setAnimation(null)
            }}>
                <View style={defineStyles}>
                    <Animatable.View 
                        animation={animation}
                        duration={1500}
                    >
                        { IconSvg }
                    
                    </Animatable.View>
                </View>
            </TouchableWithoutFeedback>
        
    )
}