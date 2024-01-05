import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { styles } from './style'
import { AppTextStyles } from '../../styles'
import AppLocalizationContext from '../../../AppLocalizationContext'
import { useSelector } from 'react-redux'
import { formatDate } from '../../res/helpers/date'

export default function InfoMiddleBox({ previousExercise }) {
    
    const locale = useSelector(state => state.appSettingsReducer.language)
    const i18n = useContext(AppLocalizationContext)

    if (!previousExercise.isExist) {
        return (
            <View style={{...styles.container, ...styles.emptyBox}}>
                <Text style={{...AppTextStyles.styles.textCommonAlternate, ...styles.textPosition}}>{i18n.t('es0005')}</Text>
            </View>   
        )
    }

    return (
        <View style={styles.container}>
            <Text style={{...AppTextStyles.styles.textCommon, ...styles.textPosition}}>{i18n.t('es0004')}</Text>
            <Text style={AppTextStyles.styles.textPositiveBold}>{formatDate(previousExercise.date, locale)}</Text>
        </View>
    )
}