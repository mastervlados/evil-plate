import { View, FlatList, ScrollView, Dimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import RoundedButton from '../../UI/RoundedButton'
import { AppContainers, Buttons, Theme } from '../../styles'
import { AddSvg } from '../../res/svgs'
import { styles } from './style'
import MyExercisesListItem from '../../components/MyExercisesListItem'
import { LinearGradient } from 'expo-linear-gradient'
import { useDispatch, useSelector } from 'react-redux'
import AppContext from '../../../AppContext'
import { onExercisesListColorFilterLoaded, onExercisesListLoaded } from '../../redux/actions/myExercisesListActions'
import { onExercisesFormOwnModeChanged, onExercisesFormVisibleChanged } from '../../redux/actions/myExercisesFormActions'
import Spinner from '../../components/Spinner/Spinner'
import * as Animatable from 'react-native-animatable'
import ScrollDisappearing from '../../components/ScrollDisappearing/ScrollDisappearing'
import ColorFilter from '../../components/ColorFilter'
import { getValueFor } from '../../res/helpers/secureStore'


export default function MyExercisesList() {
  
  const dispatch = useDispatch()
  const showColors = useSelector(state => state.myExercisesListReducer.colorFilter)
  const exercises = useSelector(state => state.myExercisesListReducer.exercises)
  const areExercisesLoaded = useSelector(state => state.myExercisesListReducer.areExercisesLoaded)
  const service = useContext(AppContext)
  const [isColorFilterVisible, setColorFilterVisible] = useState(false)
  // https://www.youtube.com/watch?v=Z1r8SzXtX8U&list=PL8p2I9GklV44NMx-i9-A0EN3X-s7cDdty&index=8

  useEffect(() => {
    const loadExercisesList = async () => {
      // Color filter:
      // --> set visible
      const isFilterVisible = await getValueFor('storedColorFilter')
      if (isFilterVisible !== -1) { 
        setColorFilterVisible(isFilterVisible) 
      }
      // --> update filters
      const applyFilters = await getValueFor('storedColorFilterData')
      // console.log('Apply Filters: ', applyFilters)
      if (applyFilters !== -1) {
        dispatch(onExercisesListColorFilterLoaded(applyFilters.split(' ')))
      }
      // Exercises
      await service.getExercises().then((result) => {
        dispatch(onExercisesListLoaded(result))
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

  if (!areExercisesLoaded) {
    return <Spinner/>
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <Animatable.View 
          style={styles.buttonPosition}
          animation={'bounceIn'}
          duration={1000}
        >
          <RoundedButton 
            styles={Buttons.styles.success} 
            size={56}
            onPressFunc={() => {
              dispatch(onExercisesFormOwnModeChanged('create'))
              dispatch(onExercisesFormVisibleChanged(true))
            }}
            iconSvg={<AddSvg/>}
            iconSize={16}
            iconColor={Theme.base}
          />
        </Animatable.View>
        
        <ColorFilter 
          exercises={exercises} 
          isBoxVisible={isColorFilterVisible} 
          boxVisibleFunc={setColorFilterVisible}
        />
        
      </View>
      <ScrollDisappearing
        applyStyles={styles.scrollContainer}
        bgColor={Theme.base}
      >
        <Animatable.View
          style={{ flex: 1 }}
          animation={'fadeInLeftBig'}
          duration={1000}
        >
          <FlatList 
            scrollEnabled={false}
            keyExtractor={(item) => item.id}
            data={
              showColors.length === 0 ? 
              formatData(exercises, 2)
              : formatData(exercises.filter(e => showColors.includes(e.colorNumber)), 2)
            }
            style={{flex: 1}}
            numColumns={2}
            renderItem={({ item }) => <MyExercisesListItem {...item}/>}
          />
        </Animatable.View>
      </ScrollDisappearing>
    </View>
  )
}