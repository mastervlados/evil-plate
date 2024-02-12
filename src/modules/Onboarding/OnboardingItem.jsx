import { View, Text, useWindowDimensions, Image, Dimensions } from 'react-native'
import React, { useContext } from 'react'
import { styles } from './style'
import AppLocalizationContext from '../../../AppLocalizationContext';
import { useSelector } from 'react-redux';


export default function OnboardingItem({ slide }) {

    const { title, text, ownStyles, imagePath } = slide

    const { width } = useWindowDimensions();

    const i18n = useContext(AppLocalizationContext)
    
    const language = useSelector(state => state.appSettingsReducer.language)

    return (
        <View style={[styles.slideContainer, { width }]}>
            <View style={styles.imageContainer}>
                <Image style={[styles.image, ownStyles, { height: imagePath[language].height * (Dimensions.get('window').width / imagePath[language].width) }]} source={imagePath[language].src}/>
            </View>
            <View style={styles.slideDescription}>
                <Text style={styles.textTitle}>{i18n.t(title)}</Text>
                <Text style={styles.textDescription}>{i18n.t(text)}</Text>
            </View>
        </View>
    )
}