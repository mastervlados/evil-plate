import { View, Text, TouchableOpacity, Alert, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { styles } from './style'
import { useNavigation } from '@react-navigation/native'
import { AddSvg, CancelSvg } from '../../res/svgs'
import { AppContainers, AppTextStyles, Buttons, Theme } from '../../styles'
import { useDispatch, useSelector } from 'react-redux'
import { onPerformanceChanged, onPerformanceDataChanged, onPerformanceRowCheckboxChanged, onPerformanceRowRepsChanged, onPerformanceRowWeightChanged, onPerformanceSetAdded, onPerformanceSetDeleted } from '../../redux/actions/exerciseActions'
import { createStoredSetWithinExercise, deleteStoredPerformanceByExerciseID, deleteStoredSetWithinExercise, updateStoredSetFieldWithinExercise } from '../../res/helpers/secureStore'
import RoundedButton from '../../UI/RoundedButton'
import DoneSvg from '../../res/svgs/DoneSvg'
import TimerSvg from '../../res/svgs/TimerSvg'
import ScrollDisappearing from '../../components/ScrollDisappearing/ScrollDisappearing'
import PrimaryButton from '../../UI/PrimaryButton'
import InputBox from '../../UI/InputBox'
import CheckBox from '../../UI/CheckBox'
import SkullSvg from '../../res/svgs/SkullSvg'
import { formatString } from '../../res/helpers/endings'
import TonnageIndicatorBar from '../../components/TonnageIndicatorBar'
import WorkloadHeaders from '../../components/WorkloadHeaders'
import TimerPanel from '../TimerPanel'


export default function ExerciseCurrentInteraction() {

    const performance = useSelector(state => state.exerciseReducer.performance)
    useSelector(state => state.appSettingsReducer.language)
    const appUnits = useSelector(state => state.appSettingsReducer.unitsFromSettings)
    const navigation = useNavigation()
    const dispatch = useDispatch()
    // console.log(performance.workload.sets.length)

    useEffect(() => {

        const closeCurrentPerformanceHandler = () => {

            const closeCurrentPerformance = async () => {
                // means:
                // 1. update stored opened performances
                deleteStoredPerformanceByExerciseID(performance.exerciseID)
                // 2. set emty object as the default
                // for 'performance'
                dispatch(onPerformanceChanged({}))
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

    const RenderRowItem = ({setIndex, rowIndex, row}) => {
            const [weight, setWeight] = useState(row.weight)
            const [reps, setReps] = useState(row.reps)
            return (
            <View key={`${setIndex}-${rowIndex}`} style={styles.rowContentItem}>
                <InputBox
                    setInputMode={'numeric'}
                    activeStyles={styles.inputActiveStyles}
                    defaultStyles={styles.inputDefaultStyles}
                    updateValueFunc={setWeight}
                    onBlurFunc={async () => {
                        dispatch(onPerformanceRowWeightChanged(setIndex, rowIndex, weight))
                        updateStoredSetFieldWithinExercise(performance.exerciseID, setIndex, rowIndex, 'weight', weight)
                    }}
                    currentValue={weight}
                    placeholder={'weight'}
                    placeholderColor={Theme.levelOne}
                />
                <InputBox
                    setInputMode={'numeric'}
                    activeStyles={styles.inputActiveStyles}
                    defaultStyles={styles.inputDefaultStyles}
                    updateValueFunc={setReps}
                    onBlurFunc={async () => {
                        dispatch(onPerformanceRowRepsChanged(setIndex, rowIndex, reps))
                        updateStoredSetFieldWithinExercise(performance.exerciseID, setIndex, rowIndex, 'reps', reps)
                    }}
                    currentValue={reps}
                    placeholder={'reps'}
                    placeholderColor={Theme.levelOne}
                />
                <CheckBox
                    valueFunc={async () => {
                        dispatch(onPerformanceRowCheckboxChanged(setIndex, rowIndex))
                        updateStoredSetFieldWithinExercise(performance.exerciseID, setIndex, rowIndex, 'isLethal', !row.isLethal)
                    }}
                    isChecked={row.isLethal}
                    checkedStyles={styles.checkboxActiveStyles}
                    defaultStyles={styles.checkboxDefaultStyles}
                    iconSvg={<SkullSvg/>}
                    iconSize={38}
                    iconDefaultColor={Theme.levelOne}
                    iconCheckedColor={Theme.textCommon}
                    previousCheckedColor={Theme.relaxing}
                />
            </View>
            )
    }

    const RenderRows = ({sets}) => {
        const rows = sets.map((set, index) => {
            // console.log(set, index)

            const items = set.rows.map((row, rowIndex) => {
                return <RenderRowItem key={`item-${index}-${rowIndex}`} setIndex={index} rowIndex={rowIndex} row={row}/>
            })

            const setHandler = () => {

                const deleteSet = async () => {
                    // means:
                    // 1. store data
                    await deleteStoredSetWithinExercise(performance.exerciseID, index)
                    // 2. update state without deleted item
                    dispatch(onPerformanceSetDeleted(index))
                }
    
                Alert.alert(
                    formatString('this is the %s set', index + 1),
                    'this is bottom',
                    [
                        {
                            text: 'Delete',
                            onPress: () => {
                                deleteSet()
                            },
                        },
                        {
                            text: 'Cancel',
                        }
                    ]
                )
            }

            return (
                <View key={`main-${index}`} style={styles.rowBox}>
                    <View style={styles.rowControl}>
                        <TouchableWithoutFeedback onPress={setHandler}>
                            <View style={styles.setBox}>
                                <View style={styles.setFuncArea}>
                                    <CancelSvg size={10} fill={Theme.textCommon}/>
                                </View>
                                <Text style={AppTextStyles.styles.extraTextCommon}>{ index + 1 }</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.rowContent}>
                       { items }
                    </View>
                </View>
            )
        }) 

        return rows 
    }
    return (
        <View style={AppContainers.styles.appContainerWithoutVerticalCentred}>
            
            {/* <TimerPanel durationSetup={performance.breakDuration}/> */}
            <TimerPanel durationSetup={70}/>
            <WorkloadHeaders/>

            <ScrollDisappearing
                applyStyles={AppContainers.styles.appContainerWithLeftAndRightPaddings}
                bgColor={Theme.base}
            >

                    <RenderRows sets={performance.workload.sets}/>
        
                    <PrimaryButton
                        styles={Buttons.styles.primaryOutline} 
                        vheight={40}
                        vwidth={56}
                        brRadiusSize={3}
                        onPressFunc={async () => {

                            const initialRow = {
                                rows: [{ weight: '', reps: '', isLethal: false }]
                            }
                            // update Redux
                            dispatch(onPerformanceSetAdded(initialRow))
                            // put it into store
                            createStoredSetWithinExercise(performance.exerciseID, initialRow) 
                        }}
                        iconSvg={<AddSvg/>}
                        iconSize={20}
                        iconColor={Theme.agressive}
                    />
            </ScrollDisappearing>
            <View style={{...styles.interactionFooter, display: 'block'}}>
                    <TonnageIndicatorBar/>    
            </View>
        </View>
    )
}

// {
//     sets: [
//         {key, number ( index + 1 ), rows: [{weight, reps, isLethal}]},
//     ]
// }