import { View, Text, TouchableWithoutFeedback, TouchableHighlight } from 'react-native'
import React, { useRef, useState } from 'react'
import { styles } from './style'
import * as Animatable from 'react-native-animatable'
import { AcceptSvg, CancelSvg, ColorFilterSvg, FilterOffSvg } from '../../res/svgs'
import { AppTextStyles, Theme } from '../../styles'
import SmartBlock from '../../UI/SmartBlock'
import { useDispatch, useSelector } from 'react-redux'
import { onExercisesListColorFilterChanged, onExercisesListColorFilterReset } from '../../redux/actions/myExercisesListActions'
import { colorFilterManager, deleteValueFor, saveValueAs } from '../../res/helpers/secureStore'


export default function ColorFilter({ exercises, isBoxVisible, boxVisibleFunc }) {

    if (exercises.length === 0) { return }

    const filter = useSelector(state => state.myExercisesListReducer.colorFilter)
    const dispatch = useDispatch()
    const colors = {}

    for (let e = 0; e < exercises.length; e++) {
        colors[exercises[e].colorNumber] = (colors[exercises[e].colorNumber] || { count: 0, })
        colors[exercises[e].colorNumber].count = colors[exercises[e].colorNumber].count + 1
    }

    if (Object.keys(colors).length < 2) { 
        // if we have only one color
        // we don't need to sort it
        return 
    }

    async function onFilterPressedHandler() {
        boxVisibleFunc(!isBoxVisible)
        await saveValueAs('storedColorFilter', !isBoxVisible + '')
    }

    async function onFilterOffPressedHandler() {
        dispatch(onExercisesListColorFilterReset())
        await deleteValueFor('storedColorFilterData')
    }

    const FilterGrid = ({ data }) => {
        let topRowSize = 1
        let bottomRowSize = 0
        let topRow = []
        let bottomRow = []

        const fillRow = (row, dimension) => {
            if (row.length === dimension) {
                return row
            } else {
                for (let i = row.length; i < dimension; i++) {
                    row.push((
                        <View style={styles.filterBox} />
                    ))
                }
                return row
            }
        }

        const colorTranspiler = (colorNumber) => {
            switch (colorNumber) {
                case 'color-one':
                    return 'itemFirst'
                case 'color-two':
                    return 'itemSecond'
                case 'color-three':
                    return 'itemThird'
                case 'color-four':
                    return 'itemFourth'
                case 'color-five':
                    return 'itemFifth'
                case 'color-six':
                    return 'itemSixth'
                case 'color-seven':
                    return 'itemSeventh'
                case 'color-eight':
                    return 'itemEight'
                case 'color-nine':
                    return 'itemNinth' 
                // default:
                //     return 'itemFifth'
            }
        }

        const getTile = (colorNumber, { count, active }) => {

            const dispatch = useDispatch()
            const bgColor = Theme[colorTranspiler(colorNumber)]
            return (
                <TouchableHighlight
                    key={`${colorNumber}`}
                    underlayColor={'transperent'}
                    onPress={async () => {
                        dispatch(onExercisesListColorFilterChanged(colorNumber))
                        await colorFilterManager(colorNumber)
                    }}
                >
                    { filter.indexOf(colorNumber) !== -1 ? (
                        <SmartBlock 
                            boxStyles={{...styles.filterBox, ...styles.filterActive, backgroundColor: bgColor}}
                            iconColor={Theme.textCommon}
                            iconSize={24}
                            iconSvg={<AcceptSvg/>}
                        />
                    ) : (
                        <SmartBlock 
                            boxStyles={{...styles.filterBox, ...styles.filterDefault, backgroundColor: bgColor}}
                            blockText={count}
                            blockTextStyles={AppTextStyles.styles.extraTextCommon}
                        />
                    )}
                </TouchableHighlight>
            )
        }

        for (key in data) {
            // which row ?
            if (topRowSize <= bottomRowSize && bottomRowSize >= 2) {
                topRow.push(getTile(key, data[key]))
                topRowSize += 1
            } else {
                bottomRow.push(getTile(key, data[key]))
                bottomRowSize += 1
            }
            
        }

        return (
            <View style={styles.dropBox}>
                <View style={styles.dropBoxRow}>
                    <View style={styles.filterBox}>
                        <TouchableHighlight
                            style={{display: filter.length === 0 ? 'none' : 'block'}}
                            underlayColor={'transperent'}
                            onPress={onFilterOffPressedHandler}
                        >
                            <SmartBlock 
                                iconColor={Theme.textCommon}
                                iconSize={24}
                                iconSvg={<FilterOffSvg/>}
                            />
                        </TouchableHighlight>
                    </View>
                
                    { fillRow(topRow, 4) }
                </View>
                <View style={styles.dropBoxRow}>
                    { fillRow(bottomRow, 5) }
                </View>
            </View>
        )
    }
    
    return (
        <React.Fragment>
            <TouchableHighlight 
                style={styles.buttonPosition}
                onPress={onFilterPressedHandler}
                underlayColor={'transperent'}
            >
                { isBoxVisible ? (
                    <CancelSvg size={28} fill={Theme.textCommon}/>
                ) : (
                    <ColorFilterSvg size={28} fill={filter.length === 0 ? Theme.textCommon : Theme.textValidationFailing}/>
                )
                }
                
            </TouchableHighlight>
            <Animatable.View 
                style={{...styles.container, display: isBoxVisible ? 'block' : 'none'}}
                animation={isBoxVisible ? 'bounceIn' : null}
                duration={1000}
            >
                <FilterGrid data={colors}/>
            </Animatable.View>
        </React.Fragment>
    )
}