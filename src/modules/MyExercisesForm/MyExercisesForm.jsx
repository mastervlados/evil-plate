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
import { onAddExercise } from '../../redux/actions/myExercisesListActions'
import { saveValueAs } from '../../res/helpers/secureStore'
import { onSettingsHintExercisesFormChanged } from '../../redux/actions/appSettingsActions'
import * as Animatable from 'react-native-animatable'


export default function MyExercisesForm() {
  const dispatch = useDispatch()
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

  const closeFunc = () => {
    dispatch(onExercisesFormNameChanged(initialInteractions.exerciseName))
    dispatch(onExercisesFormModeChanged(initialInteractions.pickedMode))
    dispatch(onExercisesFormTimerChanged(initialInteractions.pickedTimer))
    dispatch(onExercisesFormColorChanged(initialInteractions.pickedColor))
    dispatch(onExercisesFormMessageVisibleChanged(initialInteractions.isMessageVisible))
    dispatch(onExercisesFormVisibleChanged(false))
  }

  const closeThisForm = () => {

    if (exerciseName !== initialInteractions.exerciseName || 
        pickedMode !== initialInteractions.pickedMode ||
        pickedTimer !== initialInteractions.pickedTimer ||
        pickedColor !== initialInteractions.pickedColor) {
        // State was changed and 
        // we should ask user about clousing this form 
        // without saving data..
        Alert.alert(
            'this is top',
            'this is bottom',
            [
                {
                    text: 'Yes',
                    onPress: () => {
                        closeFunc()
                    },
                },
                {
                    text: 'No',
                }
            ]
        )
    } else {
        closeFunc()
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

        

  
        <LinearGradient
            colors={[Theme.levelOne, 'transparent']}
            locations={[0, 1]}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            style={{
                width: '100%',
                height: 30,
                position: 'absolute',
                top: 75,
                zIndex: 100,
            }}/>

        {isFooterShowStyles ? <LinearGradient
                                colors={[Theme.levelOne, 'transparent']}
                                start={{x: 0, y: 1}}
                                end={{x: 0, y: 0}}
                                style={{
                                    width: '100%',
                                    height: 30,
                                    position: 'absolute',
                                    bottom: 55,
                                    zIndex: 101,
                                }}/> : null}
        
        <ScrollView
            ref={ref => setScrollRef(ref)}
            style={styles.body}
            showsVerticalScrollIndicator={false}
        >

            <View style={styles.header}>
                <View style={styles.headerLeft}>
                        {/* choose mode and descripton */}
                        <Text style={{...AppTextStyles.styles.textHeader, ...styles.textHeaderPosition}}>{i18n.t('mefs0004')}</Text>
                        
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
            <View style={styles.insideBodyContainer}>
                <Text style={{...AppTextStyles.styles.textHeader, ...styles.textHeaderPosition, ...styles.textHeaderInScrollPosition}}>{i18n.t('mefs0005')}</Text>

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
                <Text style={{...AppTextStyles.styles.textHeader, ...styles.textHeaderPosition, ...styles.textHeaderInScrollPosition}}>{i18n.t('mefs0007')}</Text>

                { hint }

                <TimerPicker 
                    currentValue={pickedTimer} 
                    setValueFunc={(timer) => dispatch(onExercisesFormTimerChanged(timer))}
                />

                <Text style={{...AppTextStyles.styles.textHeader, ...styles.textHeaderPosition, ...styles.textHeaderInScrollPosition}}>{i18n.t('mefs0008')}</Text>

                { hint }

                <ColorPicker 
                    currentValue={pickedColor} 
                    setValueFunc={(color) => dispatch(onExercisesFormColorChanged(color))}
                />
                <View style={{height: Dimensions.get('window').height / 3}} />
            </View>
        </ScrollView>

        <View style={isFooterShowStyles ? {...styles.footer, display: 'block'} : {...styles.footer, display: 'none'} }>
            <LazyButton
                buttonStyles={Buttons.styles.success}
                textStyles={styles.buttonTextStyles}
                text={i18n.t('mefs0009')}
                onPressFunc={async () => await onSubmit()}
            />
        </View>
    </View>
    
    </TouchableWithoutFeedback>
    </Modal>
  )
}

{/* <KeyboardAvoidingView enabled behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
</KeyboardAvoidingView> */}