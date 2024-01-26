import { View, Text, Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { styles } from './style'
import { AppContainers, AppFormStyles, AppTextStyles, Buttons, Theme } from '../../styles'
import { CancelSvg, WeightScaleSvg } from '../../res/svgs'
import RoundedButton from '../../UI/RoundedButton'
import LazyButton from '../../UI/LazyButton'
import AppLocalizationContext from '../../../AppLocalizationContext'
import InputBox from '../../UI/InputBox'
import { endingFor } from '../../res/helpers/endings'
import { useDispatch, useSelector } from 'react-redux'
import { checkForReal, completeRealNumber } from '../../res/helpers/validation'
import { onWeightedFieldChanged } from '../../redux/actions/selfWeightActions'
import exerciseReducer from '../../redux/reducers/exerciseReducer'
import { updateFieldInStoredOpenPerformance } from '../../res/helpers/secureStore'
import { onPerformanceChanged } from '../../redux/actions/exerciseActions'


export default function InputSelfWeightModal() {
    
    const appUnits = useSelector(state => state.appSettingsReducer.unitsFromSettings)
    const locale = useSelector(state => state.appSettingsReducer.language)
    const i18n = useContext(AppLocalizationContext)
    const selfWeight = useSelector(state => state.selfWeightReducer)
    const performance = useSelector(state => state.exerciseReducer.performance)
    const dispatch = useDispatch()
    const [weight, setWeight] = useState('')
    const [isFooterVisible, setFooterVisible] = useState(true)

    useEffect(() => {
        if (selfWeight.showModal
            && 'workload' in performance) {
            setWeight(performance.workload.selfWeight)
        }
    }, [selfWeight.showModal])

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

    const closeThisModal = () => {

        dispatch(onWeightedFieldChanged('showModal', false))
    }

    const setItOffHandler = async () => {
        const setItOff = async () => {
            dispatch(onWeightedFieldChanged('isWeighted', true))
            dispatch(onWeightedFieldChanged('weightedUnit', appUnits))
            dispatch(onWeightedFieldChanged('selfWeight', weight))
            dispatch(onWeightedFieldChanged('showModal', false))
            if (performance != {} 
                && weight != selfWeight.selfWeight
                && performance.type === 'self') {
                // 1. update Redux: workload. selfWeight and weightedUnit
                const updatedPerformance = {
                    ...performance,
                    workload: {
                        ...performance.workload,
                        selfWeight: weight,
                        weightedUnit: appUnits,
                        sets: performance.workload.sets.map((set) => {
                            const changed = set.rows.map((row) => {
                                return {
                                    ...row,
                                    weight: weight,
                                }
                            })
                            return {
                                ...set,
                                rows: changed,
                            }
                        })
                    }
                }
                dispatch(onPerformanceChanged(updatedPerformance))
                // 2. update Stored: workload. selfWeight and weightedUnit
                await updateFieldInStoredOpenPerformance(performance.exerciseID, 'selfWeight', weight)
                await updateFieldInStoredOpenPerformance(performance.exerciseID, 'weightedUnit', appUnits)
            }
        }
        if (weight === '') {
            Alert.alert(
                null,
                i18n.t('alert6001'),
                [
                    {
                        text: i18n.t('alert6002'),
                    }
                ]
            )
        } else {
            await setItOff()
        }
        
    }

    return (
        <Modal visible={selfWeight.showModal} animationType='slide'>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.buttonPosition}>
                    <RoundedButton 
                        styles={Buttons.styles.formOutline} 
                        size={56}
                        onPressFunc={() => closeThisModal()}
                        iconSvg={<CancelSvg/>}
                        iconSize={20}
                        iconColor={Theme.itemSelf}
                    />
                </View>
                
                <View style={styles.body}>
                    <View style={AppContainers.styles.appContainerWithLeftAndRightPaddings}>
                        <Text style={AppTextStyles.styles.textHeader}>
                            { i18n.t('es0018') }
                        </Text>
                        <InputBox
                            setInputMode={'numeric'}
                            defaultStyles={AppFormStyles.styles.formDefaultTextInput}
                            activeStyles={AppFormStyles.styles.formActiveTextInput}
                            ownStyles={styles.textInput}
                            currentValue={weight}
                            updateValueFunc={(text) => checkForReal(text, setWeight)}
                            onBlurFunc={() => {
                                completeRealNumber(weight, setWeight)
                            }}
                            placeholder={endingFor(10, appUnits, locale)}
                            placeholderColor={Theme.relaxing}
                        />
                        <Text style={AppTextStyles.styles.textCommonAlternate}>
                            { i18n.t('es0019') }
                        </Text>
                        { isFooterVisible ? (
                            <View style={styles.iconContainer}>
                                <WeightScaleSvg fill={Theme.base} size={200}/>
                            </View>
                        ) : null }
                    </View>
                </View>
                { isFooterVisible ? (
                    <LazyButton
                        buttonStyles={Buttons.styles.info}
                        textStyles={styles.buttonTextStyles}
                        text={i18n.t('es0017')}
                        onPressFunc={setItOffHandler}
                    />
                ) : null }
            </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}