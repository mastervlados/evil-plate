import { View, Text, TouchableOpacity, Alert, ScrollView, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect } from 'react'
import { styles } from './style'
import { useNavigation } from '@react-navigation/native'
import { AddSvg, CancelSvg } from '../../res/svgs'
import { AppContainers, AppTextStyles, Buttons, Theme } from '../../styles'
import { useDispatch, useSelector } from 'react-redux'
import { onPerformanceChanged } from '../../redux/actions/exerciseActions'
import { deleteStoredPerformanceByExerciseID } from '../../res/helpers/secureStore'
import RoundedButton from '../../UI/RoundedButton'
import DoneSvg from '../../res/svgs/DoneSvg'
import TimerSvg from '../../res/svgs/TimerSvg'
import ScrollDisappearing from '../../components/ScrollDisappearing/ScrollDisappearing'
import PrimaryButton from '../../UI/PrimaryButton'
import InputBox from '../../UI/InputBox'
import CheckBox from '../../UI/CheckBox'
import SkullSvg from '../../res/svgs/SkullSvg'


export default function ExerciseCurrentInteraction() {

    const performance = useSelector(state => state.exerciseReducer.performance)
    useSelector(state => state.appSettingsReducer.language)
    const appUnits = useSelector(state => state.appSettingsReducer.unitsFromSettings)
    const navigation = useNavigation()
    const dispatch = useDispatch()

    useEffect(() => {

        const closeCurrentPerformance = () => {

            const closeCurrentPerformance = async () => {
                // means:
                // 1. update stored opened performances
                await deleteStoredPerformanceByExerciseID(performance.exerciseID)
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
                <TouchableOpacity onPress={closeCurrentPerformance}>
                    <CancelSvg size={42} fill={Theme.textCommon}/>
                </TouchableOpacity>
            </View>
        )})
    }, [])

    return (
        <View style={AppContainers.styles.appContainerWithoutVerticalCentred}>
            <View style={{...AppContainers.styles.appContainerWithLeftAndRightPaddings, ...styles.interactionHeaderContainer}}>
                <View>
                    <RoundedButton 
                        styles={Buttons.styles.successOutline} 
                        size={56}
                        onPressFunc={() => console.log('Done!')}
                        iconSvg={<DoneSvg/>}
                        iconSize={24}
                        iconColor={Theme.positive}
                    />
                </View>
                <Text style={AppTextStyles.styles.timerDigitsDefault}>03:00</Text>
                <View>
                    <RoundedButton 
                        styles={Buttons.styles.warning} 
                        size={56}
                        onPressFunc={() => console.log('Start timer!')}
                        iconSvg={<TimerSvg/>}
                        iconSize={35}
                        iconColor={Theme.base}
                    />
                </View>
            </View>
            <View style={styles.interactionTableHeadersContainer}>
                <View style={styles.interactionTableLeftBox}>
                    <Text style={AppTextStyles.styles.littleTextCommon}>Подходы</Text>
                </View>
                <View style={styles.interactionTableBox}>
                    <Text style={{...AppTextStyles.styles.littleTextCommon, textAlign: 'center'}}>
                        Весsdf
                        {'\n'}
                        (кг)
                    </Text>
                </View>
                <View style={styles.interactionTableBox}>
                    <Text style={AppTextStyles.styles.littleTextCommon}>Повторения</Text>
                </View>
                <View style={styles.interactionTableRightBox}>
                    <Text style={AppTextStyles.styles.littleTextCommon}>Отказ</Text>
                </View>
            </View>
            <ScrollDisappearing>
                <ScrollView style={{...AppContainers.styles.appContainerWithLeftAndRightPaddings, marginTop: 30,}}>

                   <View style={styles.rowBox}>
                    <View style={styles.rowControl}>
                        <TouchableWithoutFeedback onPress={() => console.log('delete row')}>
                            <View style={styles.setBox}>
                                <View style={styles.setFuncArea}>
                                    <CancelSvg size={10} fill={Theme.textCommon}/>
                                </View>
                                <Text style={AppTextStyles.styles.extraTextCommon}>1</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.rowContent}>
                        <InputBox
                            setInputMode={'numeric'}
                            activeStyles={styles.inputActiveStyles}
                            defaultStyles={styles.inputDefaultStyles}
                            placeholder={'weight'}
                            placeholderColor={Theme.relaxing}
                        />
                        <InputBox
                            setInputMode={'numeric'}
                            activeStyles={styles.inputActiveStyles}
                            defaultStyles={styles.inputDefaultStyles}
                            placeholder={'reps'}
                            placeholderColor={Theme.relaxing}
                        />
                        <CheckBox 
                            checkedStyles={styles.checkboxActiveStyles}
                            defaultStyles={styles.checkboxDefaultStyles}
                            iconSvg={<SkullSvg/>}
                            iconSize={38}
                            iconDefaultColor={Theme.levelOne}
                            iconCheckedColor={Theme.textCommon}
                            previousCheckedColor={Theme.relaxing}
                        />
                    </View>
                   </View>

                    <PrimaryButton
                        styles={Buttons.styles.primaryOutline} 
                        vheight={40}
                        vwidth={56}
                        brRadiusSize={3}
                        onPressFunc={() => console.log('Add set.')}
                        iconSvg={<AddSvg/>}
                        iconSize={20}
                        iconColor={Theme.agressive}
                    />
                </ScrollView>
            </ScrollDisappearing>
        </View>
    )
}