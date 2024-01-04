import { View, Text } from 'react-native'
import React, { useContext, useState } from 'react'
import { styles } from './style'
import { AddSvg } from '../../res/svgs'
import { AppContainers, AppTextStyles, Buttons, Theme } from '../../styles'
import RoundedButton from '../../UI/RoundedButton'
import KettlebellSvg from '../../res/svgs/KettlebellSvg'
import PrimaryButton from '../../UI/PrimaryButton'
import InfoSvg from '../../res/svgs/InfoSvg'
import { useSelector } from 'react-redux'
import AppLocalizationContext from '../../../AppLocalizationContext'
import { formatDate } from '../../res/helpers/date'
import DumbbellsSvg from '../../res/svgs/DumbbellsSvg'
import BodySvg from '../../res/svgs/BodySvg'

const InfoMiddleBox = ({ previousExercise, locale, i18n }) => {

    if (!previousExercise.isExist) {
        return (
            <View style={{...styles.infoMiddleBox, ...styles.infoMiddleBoxEmpty}}>
                <Text style={{...AppTextStyles.styles.textCommonAlternate, ...styles.infoMiddleBoxTextPosition}}>{i18n.t('es0005')}</Text>
            </View>   
        )
    }

    return (
        <View style={styles.infoMiddleBox}>
            <Text style={{...AppTextStyles.styles.textCommon, ...styles.infoMiddleBoxTextPosition}}>{i18n.t('es0004')}</Text>
            <Text style={AppTextStyles.styles.textPositiveBold}>{formatDate(previousExercise.date, locale)}</Text>
        </View>
    )
}

const InfoPreviousContainer = ({ exercise, locale, i18n }) => {

    const [infoBlock, setInfoBlock] = useState({})
    let iconSvg

    switch (exercise.type) {
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

    const IconSvg = React.cloneElement(iconSvg, { size: 42, fill: Theme.positive })

    const PreviousDetails = () => {
        return (
            <React.Fragment> 
                
            </React.Fragment>
        )
    }

//     if (!previousExercise.isExist) {
//         Left = (
// <View style={styles.infoPreviousContainer}>
//             <View style={styles.infoPreviousLeft}>
//                 <Text style={{...styles.infoTextHeaderPosition, ...AppTextStyles.styles.textHeaderAlternate}}>{i18n.t('es0000')}</Text>
//                 <Text style={{...styles.infoTextResultsPosition, ...AppTextStyles.styles.textCommonAlternate}}>
//                     <Text style={AppTextStyles.styles.textPositiveBold}>70 </Text>
//                     кг. 
//                     <Text style={AppTextStyles.styles.textAgressive}> / </Text>
//                     <Text style={AppTextStyles.styles.textPositiveBold}>8 </Text>
//                     повторений 
                    
//                     <Text style={AppTextStyles.styles.textAgressive}> +</Text>
//                     💀
//                 </Text>
//                 <Text style={{...styles.infoTextHeaderPosition, ...AppTextStyles.styles.textHeaderAlternate}}>{i18n.t('es0000')}</Text>
//                 <Text style={{...styles.infoTextResultsPosition, ...AppTextStyles.styles.textCommonAlternate}}>
//                     <Text style={AppTextStyles.styles.textPositiveBold}>1440 </Text>
//                     кг. 
//                     <Text style={AppTextStyles.styles.textAgressive}> / </Text> 
//                     <Text style={AppTextStyles.styles.textPositiveBold}>4 </Text> 
//                     подхода</Text>
//             </View>
//             <View style={styles.infoPreviousRight}>
//                 <KettlebellSvg size={42} fill={Theme.positive}/>
//             </View>
//         </View>  
//         )
//     }

    return (
        <View style={styles.infoPreviousContainer}>
            <View style={styles.infoPreviousLeft}>
                { 
                    exercise.records.previous.isExist 
                    ? <PreviousDetails/> 
                    : <Text style={AppTextStyles.styles.textCommonAlternate}>{i18n.t('es0006')}</Text>
                }     
            </View>
            <View style={styles.infoPreviousRight}>
                { IconSvg }
            </View>
        </View>
    )
}

export default function ExerciseCurrentInfo() {

    const exercise = useSelector(state => state.exerciseReducer.exercise)
    const locale = useSelector(state => state.appSettingsReducer.language)
    const i18n = useContext(AppLocalizationContext)

    return (
        <View style={AppContainers.styles.appContainerWithoutVerticalCentred}>
            <View style={styles.infoButtonAddPerformancePosition}>
                <RoundedButton 
                    styles={Buttons.styles.primary} 
                    size={56}
                    onPressFunc={() => console.log('Create performance')}
                    iconSvg={<AddSvg/>}
                    iconSize={16}
                    iconColor={Theme.base}
                />
            </View>
            
            <InfoMiddleBox
                previousExercise={exercise.records.previous}
                locale={locale}
                i18n={i18n}            
            />
            <View style={{...AppContainers.styles.appContainerWithLeftAndRightPaddings, ...styles.infoFooterBox}}>
                <InfoPreviousContainer
                    exercise={exercise}
                    locale={locale}
                    i18n={i18n}   
                />
                <View style={styles.infoInfoButtonPosition}>
                    <PrimaryButton
                        styles={Buttons.styles.infoOutline} 
                        vheight={42}
                        vwidth={42}
                        brRadiusSize={3}
                        onPressFunc={() => console.log('Link to previous performance')}
                        iconSvg={<InfoSvg/>}
                        iconSize={19}
                        iconColor={Theme.relaxing}
                        isDisable={true}
                        disableStyles={Buttons.styles.infoOutlineDisable}
                    />
                </View>
            </View>
        </View>
    )
}