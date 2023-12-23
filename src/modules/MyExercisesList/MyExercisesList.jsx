import { View, FlatList, Dimensions } from 'react-native'
import React, { useContext, useEffect } from 'react'
import RoundedButton from '../../UI/RoundedButton'
import { Buttons, Theme } from '../../styles'
import { AddSvg } from '../../res/svgs'
import { styles } from './style'
import MyExercisesListItem from '../../components/MyExercisesListItem'
import { LinearGradient } from 'expo-linear-gradient'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useDispatch, useSelector } from 'react-redux'
import AppContext from '../../../AppContext'

export default function MyExercisesList() {
  const dispatch = useDispatch()
  const exercises = useSelector(state => state.myExercisesListReducer.exercises)
  const areExercisesLoaded = useSelector(state => state.myExercisesListReducer.areExercisesLoaded)
  const service = useContext(AppContext)

  // https://www.youtube.com/watch?v=Z1r8SzXtX8U&list=PL8p2I9GklV44NMx-i9-A0EN3X-s7cDdty&index=8

  useEffect(() => {
    const loadExercisesList = async () => {
      await service.getExercisesList().then((result) => {
        console.log(result)
      });
    };
    if (!areExercisesLoaded) {
      loadExercisesList();
    }
  }, []);

  const formatData = (data, numColumns) => {
    const formatedData = data
    let formatedDataLength = data.length
    let isCorrect = false

    while (!isCorrect) {
      if (formatedDataLength % numColumns === 0) {
        isCorrect = true
      } else {
        formatedData.push({ 
          key: `blank-${formatedDataLength}`,
          type: 'empty',
        })
        formatedDataLength += 1
      }
    }
    return formatedData
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{width: 360, alignItems: 'center'}}>
        <View style={styles.buttonPosition}>
          <RoundedButton 
            styles={Buttons.styles.success} 
            size={56}
            onPressFunc={() => console.log('pressed from the screen')}
            iconSvg={<AddSvg/>}
            iconSize={16}
            iconColor={Theme.base}
          />
        </View>
      </View>
      <View style={styles.body}>
          <LinearGradient
                colors={[Theme.base, 'transparent']}
                locations={[0, 1]}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
                style={{
                    width: '100%',
                    height: 30,
                    position: 'absolute',
                    top: 0,
                    zIndex: 100,
                }}/>

          <LinearGradient
              colors={[Theme.base, 'transparent']}
              start={{x: 0, y: 1}}
              end={{x: 0, y: 0}}
              style={{
                  width: '100%',
                  height: 30,
                  position: 'absolute',
                  bottom: 0,
                  zIndex: 101,
              }}/>

          <KeyboardAwareScrollView 
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
           
              <FlatList 
                scrollEnabled={false}
                data={formatData(exercises, 2)}
                style={{flex: 1}}
                numColumns={2}
                renderItem={({ item }) => <MyExercisesListItem {...item}/>}
              />
            
            <View style={{height: Dimensions.get('window').height / 3}} />
          </KeyboardAwareScrollView>
      </View>
    </View>
  )
}