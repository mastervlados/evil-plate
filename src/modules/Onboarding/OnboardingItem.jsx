import { View, Text, useWindowDimensions } from 'react-native'
import React, { useContext } from 'react'
import { styles } from './style'
import AppLocalizationContext from '../../../AppLocalizationContext';


export default function OnboardingItem({ slide }) {

    const { title, text, imagePath } = slide

    const { width } = useWindowDimensions();

    const i18n = useContext(AppLocalizationContext)

    return (
        <View style={[styles.slideContainer, { width: width - 40 }]}>
            <Text>{i18n.t(title)}</Text>
            <Text>{i18n.t(text)}</Text>
        </View>
    )
}