import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { styles } from './style'
import { AppTextStyles } from '../../styles'
import AppLocalizationContext from '../../../AppLocalizationContext'
import { useSelector } from 'react-redux'
import { translateValue } from '../../res/helpers/converter'
import { endingFor } from '../../res/helpers/endings'


const Line = ({ line, units, styles }) => {

    const appUnits = useSelector(state => state.appSettingsReducer.unitsFromSettings)
    const locale = useSelector(state => state.appSettingsReducer.language)

    if (line.content === 'weight') {
        const formatWeight = translateValue(line.weight, units, appUnits)
        return (
            <Text style={{
                ...styles, 
                ...AppTextStyles.styles.textCommonAlternate
            }}>
                { line.prefix }
                <Text style={AppTextStyles.styles.textPositiveBold}>
                    { formatWeight } </Text>
                { endingFor(formatWeight, appUnits, locale) }
                <Text style={AppTextStyles.styles.textAgressive}> / </Text>
                <Text style={AppTextStyles.styles.textPositiveBold}>
                    { line.reps } </Text>
                { endingFor(line.reps, 'reps', locale) }
                { line.lethal ? ' 💀' : null}
            </Text>  
        )
    }

    if (line.content === 'tonnage') {
        const formatTonnage = translateValue(line.tonnage, units, appUnits)
        return (
            <Text style={{
                ...styles, 
                ...AppTextStyles.styles.textCommonAlternate
            }}>
                <Text style={AppTextStyles.styles.textPositiveBold}>
                    { formatTonnage } </Text>
                { endingFor(formatTonnage, appUnits, locale) }
                <Text style={AppTextStyles.styles.textAgressive}> / </Text>
                <Text style={AppTextStyles.styles.textPositiveBold}>{ line.sets } </Text>
                { endingFor(line.sets, 'sets', locale) }
            </Text>  
        )
    }
    
    return null
}

export default function PreviousExerciseDetails({ data, headerStyles, lineStyles }) {

    useSelector(state => state.appSettingsReducer.language)
    const i18n = useContext(AppLocalizationContext)
    
    if (!data.records.previous.isExist) {
        return (
            <Text style={AppTextStyles.styles.textCommonAlternate}>
                { i18n.t('es0006') }
            </Text>
        )
    }

    const previousResultsUnits = data.records.previous.measureUnit
    const Details = data.records.previous.headers.map(({ header, data }) => {

        const Lines = data.map((line) => {
            return <Line line={line} units={previousResultsUnits} styles={lineStyles}/>
        })

        return (
            <React.Fragment>
                <Text style={{
                    ...headerStyles, 
                    ...AppTextStyles.styles.textHeaderAlternate
                }}>
                    { i18n.t(header) }
                </Text>
                { Lines }
            </React.Fragment>
        )
    })

    return (
        <View>
            { Details }
        </View>
    )
}