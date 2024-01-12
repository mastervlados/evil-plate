import { View, Text, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './style'
import { useNavigation } from '@react-navigation/native'
import { AddSvg, CancelSvg } from '../../res/svgs'
import { AppContainers, AppTextStyles, Buttons, Theme } from '../../styles'
import { useDispatch, useSelector } from 'react-redux'
import { onPerformanceChanged, onPerformanceRowCheckboxChanged, onPerformanceRowRepsChanged, onPerformanceRowWeightChanged, onPerformanceSetAdded, onPerformanceSetDeleted } from '../../redux/actions/exerciseActions'
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


export default function ExerciseCurrentInteraction() {

    const performance = useSelector(state => state.exerciseReducer.performance)
    useSelector(state => state.appSettingsReducer.language)
    const appUnits = useSelector(state => state.appSettingsReducer.unitsFromSettings)
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [isFooterVisible, setFooterVisible] = useState(true)

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
        const initialRow = {
            visible: true,
            rows: [{ weight: '', reps: '', isLethal: false }]
        }
        // update Redux
        dispatch(onPerformanceSetAdded(initialRow))
        // put it into store
        createStoredSetWithinExercise(performance.exerciseID, initialRow) 
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
                    <TonnageIndicatorBar/>    
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