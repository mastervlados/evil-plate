import { View, Text, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { cloneElement, useEffect, useRef, useState } from 'react'
import { styles } from './style'
import { useNavigation } from '@react-navigation/native'
import { AddSvg, CancelSvg } from '../../res/svgs'
import { AppContainers, AppTextStyles, Buttons, Theme } from '../../styles'
import { useDispatch, useSelector } from 'react-redux'
import { onPerformanceChanged, onPerformanceFieldInFlowChanged, onPerformanceFlowsSetAdded, onPerformanceRowCheckboxChanged, onPerformanceRowRepsChanged, onPerformanceRowWeightChanged, onPerformanceSetAdded, onPerformanceSetDeleted } from '../../redux/actions/exerciseActions'
import { createStoredSetWithinExercise, deleteStoredPerformanceByExerciseID, deleteStoredSetWithinExercise, updateStoredSetFieldWithinExercise } from '../../res/helpers/secureStore'
import ScrollDisappearing from '../../components/ScrollDisappearing/ScrollDisappearing'
import PrimaryButton from '../../UI/PrimaryButton'
import InputBox from '../../UI/InputBox'
import CheckBox from '../../UI/CheckBox'
import SkullSvg from '../../res/svgs/SkullSvg'
import { formatString } from '../../res/helpers/endings'
import TonnageIndicatorBar from '../../components/TonnageIndicatorBar'
import WorkloadHeaders from '../../components/WorkloadHeaders'
import TimerPanel from '../TimerPanel'
import PerformanceGrid from '../PerformanceGrid/PerformanceGrid'
import { translateValue } from '../../res/helpers/converter'


export default function ExerciseCurrentInteraction() {

    const performance = useSelector(state => state.exerciseReducer.performance)
    const previousPerformance = useSelector(state => state.exerciseReducer.previousPerformance)
    useSelector(state => state.appSettingsReducer.language)
    const appUnits = useSelector(state => state.appSettingsReducer.unitsFromSettings)
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [isFooterVisible, setFooterVisible] = useState(true)
console.log(performance.workload.flows)
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setFooterVisible(false);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setFooterVisible(true);
            }
        );
            
        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
      }, []);

    useEffect(() => {

        const closeCurrentPerformanceHandler = () => {

            const closeCurrentPerformance = async () => {
                // means:
                // 1. set emty object as the default
                // for 'performance'
                dispatch(onPerformanceChanged({}))
                // 2. update stored opened performances
                deleteStoredPerformanceByExerciseID(performance.exerciseID)
            }

            Alert.alert(
                'this is top',
                'this is bottom',
                [
                    {
                        text: 'Yes',
                        onPress: () => {
                            closeCurrentPerformance()
                        },
                    },
                    {
                        text: 'No',
                    }
                ]
            )
        }

        navigation.setOptions({headerRight: () => (
            <View style={styles.headerButtonPosition}>
                <TouchableOpacity onPress={closeCurrentPerformanceHandler}>
                    <CancelSvg size={42} fill={Theme.textCommon}/>
                </TouchableOpacity>
            </View>
        )})
        
    }, [])

    const addNewSetHandler = async () => {
        const initialSet = {
            visible: true,
            rows: []
        }
        for (let i = 0; i < performance.workload.rowsCount; i++) {
            initialSet.rows.push({ 
                weight: '', 
                reps: '', 
                isLethal: false, 
                tonnage: 0 
            })
        }
        // update Redux
        dispatch(onPerformanceSetAdded(initialSet))
        // init default tonnage values
        dispatch(onPerformanceFlowsSetAdded())
        // put it into store
        createStoredSetWithinExercise(performance.exerciseID, initialSet)   
    }

    // 1. how many rows or flows are exist
    // 2. start iteration from 0 to length
    // update value
    const Indicators = () => {
        try {
            const indicators = performance.workload.flows.map((flow, i) => {
                const currentTonnage = flow.tonnage.reduce((partialSum, x) => partialSum + x, 0)
                return (
                    <TonnageIndicatorBar 
                        key={`indicator-${i}`} 
                        currentTonnage={currentTonnage} 
                        previousTonnage={
                            translateValue(
                                previousPerformance.workload.flows[i].tonnage, 
                                previousPerformance.measureUnit, 
                                performance.measureUnit
                            )
                        }
                    />
                )
            })
            return indicators
        } catch (e) {

        }
        return null
    }
    
    return (
        <View style={AppContainers.styles.appContainerWithoutVerticalCentred}>
            <TimerPanel durationSetup={performance.breakDuration}/>
            <WorkloadHeaders/>
            <ScrollDisappearing
                applyStyles={AppContainers.styles.appContainerWithLeftAndRightPaddings}
                bgColor={Theme.base}
                displayBottom={isFooterVisible}
            >
                <PerformanceGrid exerciseID={performance.exerciseID}/>
    
                <PrimaryButton
                    styles={Buttons.styles.primaryOutline} 
                    vheight={40}
                    vwidth={56}
                    brRadiusSize={3}
                    onPressFunc={addNewSetHandler}
                    iconSvg={<AddSvg/>}
                    iconSize={20}
                    iconColor={Theme.agressive}
                />
            </ScrollDisappearing>
            { isFooterVisible ? (
                <View style={styles.interactionFooter}>
                    <Indicators/>    
                </View>
            ) : null }
        </View>
    )
}

// {
//     sets: [
//         {key, number ( index + 1 ), rows: [{weight, reps, isLethal}]},
//     ]
// }