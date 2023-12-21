import { Modal, View, Text, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import TimerPicker from '../../components/TimerPicker'
import ColorPicker from '../../components/ColorPicker'

export default function MyExercisesForm() {
    
  const [modalOpen, setModalOpen] = useState(true)
  const [exerceseName, setExerciseName] = useState('')
  const [pickedTimer, setPickedTimer] = useState(180)
  const [pickedColor, setPickedColor] = useState('color-five')
//   const [isKeyboardVisible, setKeyboardVisible] = useState(false)
  const [isFooterShowStyles, setFooterShowStyles] = useState(true)
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

  return (
    <Modal visible={modalOpen} animationType='slide'>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>

        <View style={styles.buttonPosition}>
            <RoundedButton 
                styles={Buttons.styles.formOutline} 
                size={56}
                onPressFunc={() => console.log('pressed from the modal')}
                iconSvg={<CancelSvg/>}
                iconSize={20}
                iconColor={Theme.itemSelf}
            />
        </View>

        
        
        
        <KeyboardAwareScrollView
            style={styles.body}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                        {/* choose mode and descripton */}
                        <Text style={{...AppTextStyles.styles.textHeader, ...styles.textHeaderPosition}}>1. Выберите подходящий режим:</Text>
                        <Text style={{...AppTextStyles.styles.textHint, ...styles.textDescriptionPosition}}>Режим.Описание режима в зависимости от нажатой кнопки. Всего 4 строки пояснительного текста</Text>
                </View>
                <View style={styles.headerRight}>
                    <TabsPannel 
                            isVertical={true}
                            activeTabIndex={2}
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
                <Text style={{...AppTextStyles.styles.textHeader, ...styles.textHeaderPosition, ...styles.textHeaderInScrollPosition}}>2. Напишите название упражнения:</Text>
                <Text style={{...AppTextStyles.styles.textInfo, ...styles.textInfoPosition}}>(можно будет поменять значение в настройках)</Text>
                <ExerciseNameInput exerceseName={exerceseName} setExerciseName={setExerciseName}/>

                <Text style={{...AppTextStyles.styles.textHeader, ...styles.textHeaderPosition, ...styles.textHeaderInScrollPosition}}>3. Сколько времени будет длиться отдых между подходами?</Text>

                <Text style={{...AppTextStyles.styles.textInfo, ...styles.textInfoPosition}}>(можно будет поменять значение в настройках)</Text>
                <TimerPicker setValueFunc={setPickedTimer}/>

                <Text style={{...AppTextStyles.styles.textHeader, ...styles.textHeaderPosition, ...styles.textHeaderInScrollPosition}}>4. Осталось выбрать цвет рамки:</Text>
                <Text style={{...AppTextStyles.styles.textInfo, ...styles.textInfoPosition}}>(можно будет поменять значение в настройках)</Text>
                <ColorPicker setValueFunc={setPickedColor}/>
                <View style={{height: Dimensions.get('window').height / 3}} />
            </View>
        </KeyboardAwareScrollView>

        <View style={isFooterShowStyles ? {...styles.footer, display: 'block'} : {...styles.footer, display: 'none'} }>
            <LazyButton
                buttonStyles={Buttons.styles.success}
                textStyles={styles.buttonTextStyles}
                text={'Create'}
                onPressFunc={() => console.log('Lazy button pressed')}
            />
        </View>
 
    </View>
    </TouchableWithoutFeedback>
    </Modal>
  )
}

{/* <KeyboardAvoidingView enabled behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
</KeyboardAvoidingView> */}