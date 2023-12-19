import { Modal, View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { styles } from './style'
import RoundedButton from '../../UI/RoundedButton'
import { CancelSvg } from '../../res/svgs'
import { Buttons, Theme } from '../../styles'
import TabsPannel from '../../components/TabsPannel'
import { AppTextStyles } from '../../styles'
import LazyButton from '../../UI/LazyButton'

export default function MyExercisesForm() {
    
  const [modalOpen, setModalOpen] = useState(true)

  return (
    <Modal visible={modalOpen} animationType='slide'>
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <RoundedButton 
                        styles={{...Buttons.styles.formOutline, ...styles.buttonPosition}} 
                        size={56}
                        onPressFunc={() => console.log('pressed from the modal')}
                    >
                        <CancelSvg size={20} fill={Theme.itemSelf}/>
                    </RoundedButton>
                    <View style={styles.headerTextContainer}>
                        <Text style={{...AppTextStyles.styles.textHeader, ...styles.textHeaderPosition}}>1. Выберите подходящий режим:</Text>
                        <Text style={{...AppTextStyles.styles.textDescription}}>Режим.Описание режима в зависимости от нажатой кнопки. Всего 4 строки пояснительного текста</Text>
                    </View>
                </View>
                <View style={styles.headerRight}>
                    <TabsPannel isVertical={true}>
                        <View>Tab 1</View>
                        <View>Tab 2</View>
                        <View>Tab 3</View>
                    </TabsPannel>
                </View>
            </View>
            <ScrollView style={styles.body}>
                <Text style={{...AppTextStyles.styles.textHeader, ...styles.textHeaderPosition, ...styles.textHeaderInScrollPosition}}>2. Напишите название упражнения:</Text>
                <Text style={{...AppTextStyles.styles.textHeader, ...styles.textHeaderPosition, ...styles.textHeaderInScrollPosition}}>3. Сколько времени будет длиться отдых между подходами?</Text>
                <Text style={{...AppTextStyles.styles.textInfo, ...styles.textInfoPosition}}>(можно поменять значение в настройках)</Text>
            </ScrollView>
            <View style={styles.footer}>
                <LazyButton
                    buttonStyles={Buttons.styles.success}
                    textStyles={styles.buttonTextStyles}
                    text={'Create'}
                    onPressFunc={() => console.log('Lazy button pressed')}
                />
            </View>
        </View>
    </Modal>
  )
}