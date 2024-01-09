import { TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { styles } from './style'
import { AddSvg, CogSvg } from '../../res/svgs'
import { AppContainers, AppTextStyles, Buttons, Theme } from '../../styles'
import RoundedButton from '../../UI/RoundedButton'
import PrimaryButton from '../../UI/PrimaryButton'
import InfoSvg from '../../res/svgs/InfoSvg'
import { useDispatch, useSelector } from 'react-redux'
import InfoMiddleBox from '../../components/InfoMiddleBox'
import ExerciseSvg from '../../components/ExerciseSvg'
import PreviousExerciseDetails from '../../components/PreviousExerciseDetails'
import { useNavigation } from '@react-navigation/native'
import { createStoredPerformance, getOpenPefrormances, getValueFor, saveValueAs } from '../../res/helpers/secureStore'
import { onPerformanceChanged } from '../../redux/actions/exerciseActions'


export default function ExerciseCurrentInfo() {

    const exercise = useSelector(state => state.exerciseReducer.exercise)
    useSelector(state => state.appSettingsReducer.language)
    const appUnits = useSelector(state => state.appSettingsReducer.unitsFromSettings)
    const navigation = useNavigation()
    const dispatch = useDispatch()

    useEffect(() => {
        navigation.setOptions({headerRight: () => (
            <View style={styles.headerButtonPosition}>
                <TouchableOpacity onPress={() => console.log('Settings pressed!')}>
                    <CogSvg size={36} fill={Theme.textCommon}/>
                </TouchableOpacity>
            </View>
        )})
    }, [])

    const createPerformance = async () => {
        // First of all we create stored object,
        // [key, value] -> storedOpenPerformances
        // Champion types values and update it
        // when 'done' button pressed,
        // it'll create the new line into DB
        const performance = {
            // id INTEGER PRIMARY KEY AUTOINCREMENT,
            // exr_id INTEGER,
            // per_type VARCHAR(20) NULL DEFAULT NULL,
            // per_break_duration INT NULL DEFAULT NULL,
            // per_measure_unit VARCHAR(10) NULL DEFAULT NULL,
            // per_work_load JSON NULL DEFAULT NULL,
            // per_created DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
            // ? --- is_finished TINYINT NULL DEFAULT NULL,
            // FOREIGN KEY (exr_id) REFERENCES exercise (id)
            exerciseID: exercise.id,
            type: exercise.type,
            breakDuration: exercise.breakDuration,
            measureUnit: appUnits,
            workload: { sets: [] },
        }

        if (await createStoredPerformance(performance)) {
            // put initial performance to Redux
            dispatch(onPerformanceChanged(performance))
        }
    }

    return (
        <View style={AppContainers.styles.appContainerWithoutVerticalCentred}>
            <View style={styles.infoButtonAddPerformancePosition}>
                <RoundedButton 
                    styles={Buttons.styles.primary} 
                    size={56}
                    onPressFunc={createPerformance}
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