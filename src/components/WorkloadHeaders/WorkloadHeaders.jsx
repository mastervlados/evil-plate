import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { styles } from './style'
import { AppTextStyles } from '../../styles'
import AppLocalizationContext from '../../../AppLocalizationContext'
import { useSelector } from 'react-redux'
import { endingFor } from '../../res/helpers/endings'

export default function WorkloadHeaders({ isTopPressed = false }) {
    
    const unit = useSelector(state => state.exerciseReducer.performance.measureUnit)
    const locale = useSelector(state => state.appSettingsReducer.language)
    const i18n = useContext(AppLocalizationContext)

    return (
        <View style={styles.workloadHeadersContainer}>
            <View style={
                isTopPressed 
                ? { ...styles.workloadHeadersLeftBox, borderTopRightRadius: 0, } 
                : styles.workloadHeadersLeftBox
            }>
                <Text style={AppTextStyles.styles.littleTextCommon}>
                    { i18n.t('es0013') }
                </Text>
            </View>
            <View style={
                isTopPressed 
                ? { ...styles.workloadHeadersBox, borderTopLeftRadius: 0, borderTopRightRadius: 0, } 
                : styles.workloadHeadersBox
            }>
                <Text style={{
                    ...AppTextStyles.styles.littleTextCommon, 
                    textAlign: 'center',
                }}>
                    { i18n.t('es0014') }
                    { '\n' }
                    { `(${ endingFor(10, unit, locale) })` }
                </Text>
            </View>
            <View style={
                isTopPressed 
                ? { ...styles.workloadHeadersBox, borderTopLeftRadius: 0, borderTopRightRadius: 0, } 
                : styles.workloadHeadersBox
            }>
                <Text style={AppTextStyles.styles.littleTextCommon}>
                    { i18n.t('es0015') }
                </Text>
            </View>
            <View style={
                isTopPressed 
                ? { ...styles.workloadHeadersRightBox, borderTopLeftRadius: 0, } 
                : styles.workloadHeadersRightBox
            }>
                <Text style={AppTextStyles.styles.littleTextCommon}>
                    { i18n.t('es0016') }
                </Text>
            </View>
        </View>
    )
}