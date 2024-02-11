import { View, Text, useWindowDimensions, Image } from 'react-native'
import React, { useContext } from 'react'
import { styles } from './style'
import AppLocalizationContext from '../../../AppLocalizationContext';
import images from './images';
import { useSelector } from 'react-redux';


export default function OnboardingItem({ slide, currentIndex }) {

    const { title, text } = slide

    const { width } = useWindowDimensions();

    const i18n = useContext(AppLocalizationContext)
    
    const language = useSelector(state => state.appSettingsReducer.language)

    return (
        <View style={[styles.slideContainer, { width }]}>
            <View style={styles.imageContainer}>
                <Image style={[styles.image, currentIndex === 1 ? { bottom: 40 } : { top: -30 } ]} source={images[language][currentIndex]}/>
            </View>
            <View style={styles.slideDescription}>
                <Text style={styles.textTitle}>{i18n.t(title)}</Text>
                <Text style={styles.textDescription}>{i18n.t(text)}</Text>
            </View>
        </View>
    )
}