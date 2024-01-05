import { View } from 'react-native'
import React from 'react'
import KettlebellSvg from '../../res/svgs/KettlebellSvg'
import BodySvg from '../../res/svgs/BodySvg'
import DumbbellsSvg from '../../res/svgs/DumbbellsSvg'


export default function ExerciseSvg({ exerciseType, size, color }) {
    
    let iconSvg

    switch (exerciseType) {
        case 'mono':
            iconSvg = <KettlebellSvg/>
            break
        case 'stereo':
            iconSvg = <DumbbellsSvg/>
            break
        case 'self':
            iconSvg = <BodySvg/>
            break
    }

    const IconSvg = React.cloneElement(iconSvg, { size: size, fill: color })

    return (
        <View>
            { IconSvg }
        </View>
    )
}