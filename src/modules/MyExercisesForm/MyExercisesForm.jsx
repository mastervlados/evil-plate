import { Modal, View, Text, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Dimensions, ImageBackground, Alert } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { styles } from './style'
import RoundedButton from '../../UI/RoundedButton'
import { CancelSvg } from '../../res/svgs'
import { AppFormStyles, Buttons, Theme } from '../../styles'
import TabsPannel from '../../components/TabsPannel'
import { AppTextStyles } from '../../styles'
import LazyButton from '../../UI/LazyButton'
import SmartBlock from '../../UI/SmartBlock'
import BodySvg from '../../res/svgs/BodySvg'
import DumbbellsSvg from '../../res/svgs/DumbbellsSvg'
import KettlebellSvg from '../../res/svgs/KettlebellSvg'
import ExerciseNameInput from '../../components/ExerciseNameInput/ExerciseNameInput'
import TimerPicker from '../../components/TimerPicker'
import ColorPicker from '../../components/ColorPicker'
import { LinearGradient } from 'expo-linear-gradient'
import { useDispatch, useSelector } from 'react-redux'
import { onExercisesFormColorChanged, onExercisesFormMessageVisibleChanged, onExercisesFormModeChanged, onExercisesFormNameChanged, onExercisesFormTimerChanged, onExercisesFormVisibleChanged } from '../../redux/actions/myExercisesFormActions'
import { checkExerciseName } from '../../res/helpers/validation'
import AppContext from '../../../AppContext'
import AppLocalizationContext from '../../../AppLocalizationContext'
import { onAddExercise, onExercisesListItemUpdated } from '../../redux/actions/myExercisesListActions'
import { saveValueAs } from '../../res/helpers/secureStore'
import { onSettingsHintExercisesFormChanged } from '../../redux/actions/appSettingsActions'
import * as Animatable from 'react-native-animatable'
import ScrollDisappearing from '../../components/ScrollDisappearing/ScrollDisappearing'
import { onExerciseChanged } from '../../redux/actions/exerciseActions'


export default function MyExercisesForm() {
  const dispatch = useDispatch()
  const ownMode = useSelector(state => state.myExercisesFormReducer.currentMode)
  const modalOpen = useSelector(state => state.myExercisesFormReducer.isExercisesFormOpened)
  const service = useContext(AppContext)
  
  const initialInteractions = {
    exerciseName: '',
    pickedMode: 'mono',
    pickedTimer: 180,
    pickedColor: 'color-five',
    isMessageVisible: false,
  }

  const exerciseName = useSelector(state => state.myExercisesFormReducer.interactions.exerciseName)
  const isMessageVisible = useSelector(state => state.myExercisesFormReducer.isMessageVisible)
  const pickedMode = useSelector(state => state.myExercisesFormReducer.interactions.pickedMode)
  const pickedTimer = useSelector(state => state.myExercisesFormReducer.interactions.pickedTimer)
  const pickedColor = useSelector(state => state.myExercisesFormReducer.interactions.pickedColor)
  const showHint = useSelector(state => state.appSettingsReducer.showHintInMyExercisesForm)
  const currentExercise = useSelector(state => state.exerciseReducer.exercise)
  const [wasSubmitButtonPressed, setSubmitButtonPressed] = useState(false)
  const [isFooterShowStyles, setFooterShowStyles] = useState(true)
  const [scrollRef, setScrollRef] = useState(null)
  const [inputPosY, setInputPosY] = useState(0)
  const i18n = useContext(AppLocalizationContext)
  
  const modeTabs = [
    { id: 0, name: 'self', hint: i18n.t('mefs0001') },
    { id: 1, name: 'stereo', hint: i18n.t('mefs0002') },
    { id: 2, name: 'mono', hint: i18n.t('mefs0003') },
  ]

  let headerPosition = 0

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
            setFooterShowStyles(false);
        }
    );
    const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
            setFooterShowStyles(true);
        }
    );
        
    return () => {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    switch (ownMode) {
        case 'create':
            dispatch(onExercisesFormNameChanged(initialInteractions.exerciseName))
            dispatch(onExercisesFormModeChanged(initialInteractions.pickedMode))
            dispatch(onExercisesFormTimerChanged(initialInteractions.pickedTimer))
            dispatch(onExercisesFormColorChanged(initialInteractions.pickedColor))
            dispatch(onExercisesFormMessageVisibleChanged(initialInteractions.isMessageVisible))
            break
        case 'edit':
            dispatch(onExercisesFormNameChanged(currentExercise.title))
            // dispatch(onExercisesFormModeChanged(currentExercise.type))
            dispatch(onExercisesFormTimerChanged(currentExercise.breakDuration))
            dispatch(onExercisesFormColorChanged(currentExercise.colorNumber))
            dispatch(onExercisesFormMessageVisibleChanged(initialInteractions.isMessageVisible))
            break
        default:
            break
    }
  }, [ownMode])

  const closeFunc = () => {
    dispatch(onExercisesFormNameChanged(initialInteractions.exerciseName))
    dispatch(onExercisesFormModeChanged(initialInteractions.pickedMode))
    dispatch(onExercisesFormTimerChanged(initialInteractions.pickedTimer))
    dispatch(onExercisesFormColorChanged(initialInteractions.pickedColor))
    dispatch(onExercisesFormMessageVisibleChanged(initialInteractions.isMessageVisible))
    dispatch(onExercisesFormVisibleChanged(false))
  }

  const closeThisForm = () => {
    if (ownMode === 'create') {
        if (exerciseName !== initialInteractions.exerciseName || 
            pickedMode !== initialInteractions.pickedMode ||
            pickedTimer !== initialInteractions.pickedTimer ||
            pickedColor !== initialInteractions.pickedColor) {
            // State was changed and 
            // we should ask user about clousing this form 
            // without saving data..
            Alert.alert(
                null,
                i18n.t('alert1001'),
                [
                    {
                        text: i18n.t('alert1002'),
                        onPress: () => {
                            closeFunc()
                        },
                    },
                    {
                        text: i18n.t('alert1003'),
                    }
                ]
            )
        } else {
            closeFunc()
        }
    } else if (ownMode === 'edit') {
        dispatch(onExercisesFormMessageVisibleChanged(initialInteractions.isMessageVisible))
        dispatch(onExercisesFormVisibleChanged(false))
    }
  }

  const onSubmit = async () => {
    if (!wasSubmitButtonPressed) {
        setSubmitButtonPressed(true)
        const details = checkExerciseName(exerciseName)
        if (details.status) {
            const newExercise = {
                title: exerciseName, 
                type: pickedMode, 
                breakDuration: pickedTimer,
                colorNumber: pickedColor,
                rowsCount: pickedMode === 'stereo' ? 2 : 1,
            }
            const getNewExercise = await service.createExercise(newExercise);
            dispatch(onAddExercise(getNewExercise));
            // When champion add 
            // his or her first exercise
            // disable hints above 
            // each editable field
            if (showHint === true) {
                await saveValueAs('storedShowHintInMyExercisesForm', 'hide');
                dispatch(onSettingsHintExercisesFormChanged(false));
            }
            closeFunc();
        } else {
            dispatch(onExercisesFormMessageVisibleChanged(true))
            scrollRef.scrollTo({ x: 0, y: inputPosY, animated: true })
        }
        // This means that we finish here
        // and user can press this button again
        setSubmitButtonPressed(false)
    }
    // ... Do nothing!
  }

  const onSaveChanges = async () => {
    if (!wasSubmitButtonPressed) {
        setSubmitButtonPressed(true)
        const details = checkExerciseName(exerciseName)
        if (details.status) {
            const updatedExercise = {
                ...currentExercise,
                title: exerciseName, 
                breakDuration: pickedTimer,
                colorNumber: pickedColor,
            }
            // update exercise in DB
            await service.updateExercise(currentExercise.id, updatedExercise)
            // update list of exercises!
            dispatch(onExercisesListItemUpdated(currentExercise.id, updatedExercise))
            // update exercise in exerciseReducer
            dispatch(onExerciseChanged(updatedExercise))
            closeFunc();
        } else {
            dispatch(onExercisesFormMessageVisibleChanged(true))
            scrollRef.scrollTo({ x: 0, y: 0, animated: true })
        }
        // make this button
        // pressable again
        setSubmitButtonPressed(false)
    }
    // ... Do nothing!
  }

  const LazyButtonInEditMode = () => {
    if (exerciseName === currentExercise.title && 
        pickedTimer === currentExercise.breakDuration &&
        pickedColor === currentExercise.colorNumber) {
        // console.log(exerciseName, currentExercise.title)
        // console.log(pickedTimer, currentExercise.breakDuration)
        // console.log(pickedColor, currentExercise.colorNumber)
        return
    }
    return (
        <Animatable.View animation='fadeInUp' duration={800}>
            <LazyButton
                buttonStyles={Buttons.styles.warning}
                textStyles={styles.buttonTextStyles}
                text={i18n.t('mefs0011')}
                onPressFunc={async () => await onSaveChanges()}
            />
        </Animatable.View>
    )
  }
  const hint = showHint ? (
    <Animatable.View animation='fadeInLeft' duration={500}>
        <Text style={{...AppTextStyles.styles.textInfo, ...styles.textInfoPosition}}>{i18n.t('mefs0006')}</Text>
    </Animatable.View>
  ) : null

  return (
    <Modal visible={modalOpen} animationType='slide'>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
        <View style={styles.buttonPosition}>
            <RoundedButton 
                styles={Buttons.styles.formOutline} 
                size={56}
                onPressFunc={() => closeThisForm()}
                iconSvg={<CancelSvg/>}
                iconSize={20}
                iconColor={Theme.itemSelf}
            />
        </View>

        

        <ScrollDisappearing
            setRefFunc={setScrollRef}
            applyStyles={styles.body}
            bgColor={Theme.levelOne}
            displayBottom={isFooterShowStyles}
        >
            { ownMode === 'create' ? (
                <View style={styles.header}>
                <View style={styles.headerLeft}>
                        {/* choose mode and descripton */}
                        <Text style={{...AppTextStyles.styles.textHeader, ...styles.textHeaderPosition}}>
                            {`${++headerPosition}. ${i18n.t('mefs0004')}`}
                        </Text>
                        
                        <Text style={{...AppTextStyles.styles.textHint, ...styles.textDescriptionPosition}}>
                            {modeTabs.find((tab) => tab.name === pickedMode).hint}
                        </Text>
                </View>
                <View style={styles.headerRight}>
                    <TabsPannel 
                        isVertical={true}
                        listOfTabs={modeTabs}
                        activeTab={pickedMode}
                        setActiveTabFunc={(active) => dispatch(onExercisesFormModeChanged(active))}
                        defaultTabStyles={AppFormStyles.styles.formDefaultViewBox}
                        activeTabStyles={AppFormStyles.styles.formActiveViewBox}
                        defaultIconSize={38}
                        defaultIconColor={Theme.relaxing}
                        activeIconColor={Theme.agressive}
                    >
                        <SmartBlock 
                            iconSvg={<BodySvg/>} 
                            ownBoxStyles={{...styles.headerTab, ...styles.headerTopTab}}
                        />
                        <SmartBlock 
                            iconSvg={<DumbbellsSvg/>} 
                            ownBoxStyles={styles.headerTab}
                        />
                        <SmartBlock 
                            iconSvg={<KettlebellSvg/>} 
                            ownBoxStyles={{...styles.headerTab, ...styles.headerBottomTab}}
                        />
                    </TabsPannel>
                </View>
                </View>
            ) : null }
            <View style={styles.insideBodyContainer}>
                <Text style={{...AppTextStyles.styles.textHeader, ...styles.textHeaderPosition, ...styles.textHeaderInScrollPosition}}>
                    {`${++headerPosition}. ${i18n.t('mefs0005')}`}
                </Text>

                { hint }

                <View onLayout={(event) => {
                    const layout = event.nativeEvent.layout;
                    setInputPosY(layout.y + 54)
                }}>            
                    <ExerciseNameInput 
                        currentValue={exerciseName} 
                        setValueFunc={(title) => dispatch(onExercisesFormNameChanged(title))} 
                        showMessage={isMessageVisible} 
                        messageLocale={i18n._locale}
                        placeholderText={i18n.t('mefs0010')}
                    />
                </View>    
                <Text style={{...AppTextStyles.styles.textHeader, ...styles.textHeaderPosition, ...styles.textHeaderInScrollPosition}}>
                    {`${++headerPosition}. ${i18n.t('mefs0007')}`}
                </Text>

                { hint }

                <TimerPicker 
                    currentValue={pickedTimer} 
                    setValueFunc={(timer) => dispatch(onExercisesFormTimerChanged(timer))}
                />

                <Text style={{...AppTextStyles.styles.textHeader, ...styles.textHeaderPosition, ...styles.textHeaderInScrollPosition}}>
                    {`${++headerPosition}. ${i18n.t('mefs0008')}`}
                </Text>

                { hint }

                <ColorPicker 
                    currentValue={pickedColor} 
                    setValueFunc={(color) => dispatch(onExercisesFormColorChanged(color))}
                />
            </View>
        </ScrollDisappearing>

        <View style={isFooterShowStyles ? {...styles.footer, display: 'block'} : {...styles.footer, display: 'none'} }>
            { ownMode === 'create' ? (
                <LazyButton
                    buttonStyles={Buttons.styles.success}
                    textStyles={styles.buttonTextStyles}
                    text={i18n.t('mefs0009')}
                    onPressFunc={async () => await onSubmit()}
                />
            ) : null }
            { ownMode === 'edit' ? (
                <LazyButtonInEditMode/>
            ) : null }
        </View>
    </View>
    
    </TouchableWithoutFeedback>
    </Modal>
  )
}

{/* <KeyboardAvoidingView enabled behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
</KeyboardAvoidingView> */}