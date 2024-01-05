import { View } from 'react-native'
import React, { useContext, useState } from 'react'
import { styles } from './style'
import { AddSvg } from '../../res/svgs'
import { AppContainers, AppTextStyles, Buttons, Theme } from '../../styles'
import RoundedButton from '../../UI/RoundedButton'
import PrimaryButton from '../../UI/PrimaryButton'
import InfoSvg from '../../res/svgs/InfoSvg'
import { useSelector } from 'react-redux'
import InfoMiddleBox from '../../components/InfoMiddleBox'
import ExerciseSvg from '../../components/ExerciseSvg'
import PreviousExerciseDetails from '../../components/PreviousExerciseDetails'


export default function ExerciseCurrentInfo() {

    const exercise = useSelector(state => state.exerciseReducer.exercise)
    useSelector(state => state.appSettingsReducer.language)

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
            
            <InfoMiddleBox previousExercise={exercise.records.previous}/>

            <View style={{
                ...AppContainers.styles.appContainerWithLeftAndRightPaddings, 
                ...styles.infoFooterBox
            }}>
                <View style={styles.infoPreviousContainer}>
                    <View style={styles.infoPreviousLeft}>
                        <PreviousExerciseDetails 
                            data={exercise}
                            headerStyles={styles.infoTextHeaderPosition}
                            lineStyles={styles.infoTextResultsPosition}
                        />
                    </View>
                    <View style={styles.infoPreviousRight}>
                        <ExerciseSvg 
                            exerciseType={exercise.type} 
                            size={42} 
                            color={Theme.positive}
                        />
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
                        isDisable={!exercise.records.previous.isExist}
                        disableStyles={Buttons.styles.infoOutlineDisable}
                    />
                </View>
            </View>
        </View>
    )
}