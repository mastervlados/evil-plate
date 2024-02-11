import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { styles } from './style'
import { AppTextStyles } from '../../styles'
import { useSelector } from 'react-redux'
import { endingFor } from '../../res/helpers/endings'
import AppLocalizationContext from '../../../AppLocalizationContext'
import { cutFloatPartOfNumber } from '../../res/helpers/converter'

export default function TonnageIndicatorBar({ currentTonnage, previousTonnage, }) {

    const unit = useSelector(state => state.exerciseReducer.performance.measureUnit)
    const locale = useSelector(state => state.appSettingsReducer.language)
    const i18n = useContext(AppLocalizationContext)

    if (!previousTonnage) {
        return (
            <View style={styles.container}>
                <View style={styles.box}>
                    <Text style={AppTextStyles.styles.indicatorTextUnderWater}>
                        { currentTonnage ? cutFloatPartOfNumber(currentTonnage.toFixed(2)) : '--' } 
                        { ' ' + endingFor(currentTonnage, unit, locale) }
                    </Text>
                </View>
                <View style={styles.box}>
                    <Text style={AppTextStyles.styles.indicatorTextUnderWater}>
                        { i18n.t('es0009') }
                    </Text>
                </View> 
            </View> 
        )
    }

    const difference = currentTonnage - previousTonnage
    // tonnage < 100% -> under water
    // 100-109% -> maintain
    // 110% and above -> grow
    const percentageDifference = ~~((currentTonnage / previousTonnage) * 100)

    let textStyles
    let label

    if (percentageDifference < 100) {
        textStyles = AppTextStyles.styles.indicatorTextUnderWater
        label = i18n.t('es0010')
    } else if (percentageDifference >= 110) {
        textStyles = AppTextStyles.styles.indicatorTextGrowUp
        label = i18n.t('es0012')
    } else {
        textStyles = AppTextStyles.styles.indicatorTextMaintain
        label = i18n.t('es0011')
    }

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={textStyles}>
                    { difference > 0 ? '+' : null }
                    { difference ? cutFloatPartOfNumber(difference.toFixed(2)) : '--' } 
                    { ' ' + endingFor(difference, unit, locale) }
                </Text>
            </View>
            <View style={styles.box}>
                <Text style={textStyles}>
                    { label }
                </Text>
            </View>
        </View>
    )
}