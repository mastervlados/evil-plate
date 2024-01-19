import { View, Text, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { cloneElement, useContext, useEffect, useRef, useState } from 'react'
import { styles } from './style'
import { useNavigation } from '@react-navigation/native'
import { AddSvg, CancelSvg } from '../../res/svgs'
import { AppContainers, AppTextStyles, Buttons, Theme } from '../../styles'
import { useDispatch, useSelector } from 'react-redux'
import { onExerciseMetaChanged, onPerformanceChanged, onPerformanceFieldInFlowChanged, onPerformanceFlowsSetAdded, onPerformanceRowCheckboxChanged, onPerformanceRowRepsChanged, onPerformanceRowWeightChanged, onPerformanceSetAdded, onPerformanceSetDeleted, onPreviousPerformanceChanged } from '../../redux/actions/exerciseActions'
import { createStoredSetWithinExercise, deleteStoredPerformance, deleteStoredPerformanceByExerciseID, deleteStoredSetWithinExercise, updateStoredSetFieldWithinExercise } from '../../res/helpers/secureStore'
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
import AppContext from '../../../AppContext'
import { onExercisesListItemUpdated } from '../../redux/actions/myExercisesListActions'


export default function ExerciseCurrentInteraction({ addNewSetFunc }) {

    const exercise = useSelector(state => state.exerciseReducer.exercise)
    const performance = useSelector(state => state.exerciseReducer.performance)
    const previousPerformance = useSelector(state => state.exerciseReducer.previousPerformance)
    useSelector(state => state.appSettingsReducer.language)
    const appUnits = useSelector(state => state.appSettingsReducer.unitsFromSettings)
    const service = useContext(AppContext)
    const navigation = useNavigation()
    const dispatch = useDispatch()
    if (!('workload' in performance)) { return }
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
                await deleteStoredPerformance(performance.exerciseID)
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
    
    // 1. how many rows or flows are exist
    // 2. start iteration from 0 to length
    // update value
    const Indicators = () => {
        if ('workload' in performance) {
            if ('flows' in performance.workload) {
                const indicators = performance.workload.flows.map((flow, i) => {
                    const currentTonnage = flow.tonnage.reduce((partialSum, x) => partialSum + x, 0)
                    return (
                        <TonnageIndicatorBar 
                            key={`indicator-${i}`} 
                            currentTonnage={currentTonnage} 
                            previousTonnage={
                                'workload' in previousPerformance ?
                                translateValue(
                                    previousPerformance.workload.flows[i].tonnage, 
                                    previousPerformance.measureUnit, 
                                    performance.measureUnit
                                ) : null
                            }
                        />
                    )
                });
                return indicators
            }
        }
    }
    
    async function createNewPerformanceHandler() {
        // validate each set with visible field === true
        // each row has weigth and reps both fields
        // that have a value, or not null!
        // if it's empty -> return false
        try {
            for (let i = 0; i < performance.workload.sets.length; i++) {
                if (performance.workload.sets[i].visible) {
                    for (let j = 0; j < performance.workload.sets[i].rows.length; j++) {
                        if (performance.workload.sets[i].rows[j].weight === '' ||performance.workload.sets[i].rows[j].reps === '') {
                            // validation failing..
                            return false
                        }
                    }
                }
            }
            // 1. prepare new object
            const cleanedSets = performance.workload.sets.filter(set => set.visible)
            const translatedFlows = performance.workload.flows.map(flow => {
                const up = flow.tonnage.reduce((partialSum, x) => partialSum + x, 0)
                return {
                    ...flow,
                    tonnage: up
                }
            })
            const newPerformance = {
                ...performance,
                workload: {
                    ...performance.workload,
                    flows: translatedFlows,
                    sets: cleanedSets,
                }
            }
            // 2. create DB record
            const insertedID = await service.createPerformance(newPerformance)
            // 3. update exercise parameters
            const previousHeaders = [
                {
                    header: newPerformance.type === 'self' ? 'es1009' : 'es0007',
                    data: []
                },
                {
                    header: 'es0008',
                    data: []
                },
            ]

            for (let f = 0; f < newPerformance.workload.flows.length; f++) {
                // define
                const field = newPerformance.type === 'self' ? 'reps' : 'weight'
                const setsCount = newPerformance.workload.sets.length
                let target = -1
                let maxValue = -1
                for (let i = 0; i < setsCount; i++) {
                    if (Number(newPerformance.workload.sets[i].rows[f][field]) > maxValue) {
                        maxValue = Number(newPerformance.workload.sets[i].rows[f][field])
                        target = i
                    }
                }
                // push
                previousHeaders[0].data.push({
                    content: 'weight',
                    prefix: newPerformance.type === 'stereo' ? (
                        f === 0 ? 'es1010' : 'es1011'
                    ) : null,
                    weight: newPerformance.workload.sets[target].rows[f].weight,
                    reps: newPerformance.workload.sets[target].rows[f].reps,
                    lethal: newPerformance.workload.sets[target].rows[f].isLethal,
                })
                previousHeaders[1].data.push({
                    content: 'tonnage',
                    prefix: newPerformance.type === 'stereo' ? (
                        f === 0 ? 'es1010' : 'es1011'
                    ) : null,
                    tonnage: newPerformance.workload.flows[f].tonnage,
                    sets: setsCount,
                })
            }
            
            const previous = {
                isExist: true,
                id: insertedID, // new performance ID
                measureUnit: newPerformance.measureUnit,
                date: new Date(),
                headers: previousHeaders,
            }

            const leaderboard = {
                isExist: true,
                headers: []
            }

            const previousLeaderboard = exercise.records.leaderboard

            if (!previousLeaderboard.isExist) {
                // Previous leaderboard never exests!
                // means that all our results for now
                // should be in the leaderboard..
                leaderboard.headers = previous.headers.map((header) => {
                    const records = header.data.map((record) => {
                        return {
                            ...record,
                            performanceID: insertedID,
                            measureUnit: newPerformance.measureUnit,
                            date: new Date(),
                        }
                    })
                    return {
                        ...header,
                        data: records,
                    }
                })
            } else {
                // we'll update previos leaderbord data
                // check for new records and replace
                leaderboard.headers = exercise.records.leaderboard.headers.map((header, headerIndex) => {
                    const records = header.data.map((record, recordIndex) => {
                        let field
                        if (record.content === 'weight') {
                            field = newPerformance.type === 'self' ? 'reps' : 'weight'
                        } else if (record.content === 'tonnage') {
                            field = 'tonnage'
                        }
                        if (record[field] < previous.headers[headerIndex].data[recordIndex][field]) {
                            return {
                                ...previous.headers[headerIndex].data[recordIndex],
                                performanceID: insertedID,
                                measureUnit: newPerformance.measureUnit,
                                date: new Date(),
                            }
                        } 
                        return record
                    })
                    return {
                        ...header,
                        data: records,
                    }
                }) 
            }

            const newRecords = { leaderboard, previous }

            // 9¾ Update exercise in Redux and DB!
            await service.updateJSONinTable('exercise', exercise.id, newRecords)
            // -- Update current exercise meta
            dispatch(onExerciseMetaChanged(newRecords))
            // -- Update the main list of exercises
            dispatch(onExercisesListItemUpdated(exercise.id, exercise))
            // 4. delete stored data
            // use exerciseID value
            await deleteStoredPerformance(performance.exerciseID)
            // 5. set new object as the previous
            dispatch(onPreviousPerformanceChanged(newPerformance))
            // 6. set the current performance as an empty object
            dispatch(onPerformanceChanged({}))
            // 7. return true as the result
            return true
        } catch (e) {
            console.error(e)
        }
        
    }
    
    return (
        <View style={AppContainers.styles.appContainerWithoutVerticalCentred}>
            <TimerPanel 
                buttonHandlerFunc={createNewPerformanceHandler}
                durationSetup={performance.breakDuration}
            />
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
                    onPressFunc={() => {
                        const args = [
                            performance.exerciseID, 
                            performance.workload.rowsCount
                        ]
                        if (performance.type === 'self') {
                            args.push(performance.type)
                            args.push(performance.workload.selfWeight)
                            args.push(performance.workload.weightedUnit)
                            args.push(performance.measureUnit)
                        }
                        addNewSetFunc(...args)
                    }}
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