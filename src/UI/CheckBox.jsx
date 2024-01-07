import { View, Text, TouchableWithoutFeedback } from 'react-native'
import React, { cloneElement, useState } from 'react'

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

    const [isPressed, setPress] = useState(currentValue)

    const IconSvg = iconSvg ? cloneElement(iconSvg, { size: iconSize, fill: iconDefaultColor }) : null

    return (
        <TouchableWithoutFeedback>
            { IconSvg }
        </TouchableWithoutFeedback>
    )
}