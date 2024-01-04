import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './style'
import { AddSvg } from '../../res/svgs'
import { AppContainers, AppTextStyles, Buttons, Theme } from '../../styles'
import RoundedButton from '../../UI/RoundedButton'
import KettlebellSvg from '../../res/svgs/KettlebellSvg'
import PrimaryButton from '../../UI/PrimaryButton'
import InfoSvg from '../../res/svgs/InfoSvg'

export default function ExerciseCurrentInfo() {
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
            
            <View style={styles.infoMiddleBox}>
                <Text style={{...AppTextStyles.styles.textCommon, ...styles.infoMiddleBoxTextPosition}}>Вы выполняли это упражнение последний раз:</Text>
                <Text style={AppTextStyles.styles.textPositiveBold}>16 декабря 2023</Text>
            </View>
            <View style={{...AppContainers.styles.appContainerWithLeftAndRightPaddings, ...styles.infoFooterBox}}>
                <View style={styles.infoPreviousContainer}>
                    <View style={styles.infoPreviousLeft}>
                        <Text style={{...styles.infoTextHeaderPosition, ...AppTextStyles.styles.textHeaderAlternate}}>Максимальный вес:</Text>
                        <Text style={{...styles.infoTextResultsPosition, ...AppTextStyles.styles.textCommonAlternate}}>
                            <Text style={AppTextStyles.styles.textPositiveBold}>70 </Text>
                            кг. 
                            <Text style={AppTextStyles.styles.textAgressive}> / </Text>
                            <Text style={AppTextStyles.styles.textPositiveBold}>8 </Text>
                            повторений 
                            <Text style={AppTextStyles.styles.textAgressive}> +</Text>
                            💀
                        </Text>
                        <Text style={{...styles.infoTextHeaderPosition, ...AppTextStyles.styles.textHeaderAlternate}}>Объем работы:</Text>
                        <Text style={{...styles.infoTextResultsPosition, ...AppTextStyles.styles.textCommonAlternate}}>
                            <Text style={AppTextStyles.styles.textPositiveBold}>1440 </Text>
                            кг. 
                            <Text style={AppTextStyles.styles.textAgressive}> / </Text> 
                            <Text style={AppTextStyles.styles.textPositiveBold}>4 </Text> 
                            подхода</Text>
                    </View>
                    <View style={styles.infoPreviousRight}>
                        <KettlebellSvg size={42} fill={Theme.positive}/>
                    </View>
                </View>
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
                    />
                </View>
            </View>
        </View>
    )
}