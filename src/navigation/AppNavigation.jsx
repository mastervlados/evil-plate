import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import { drawerStyles, headerStyles } from './style'
import MyExercisesScreen from '../screens/MyExercisesScreen'
import MyTrainingScreen from '../screens/MyTrainingScreen'
import SettingsScreen from '../screens/SettingsScreen'
import ExerciseScreen from '../screens/ExerciseScreen/ExerciseScreen'
import FreeTimerScreen from '../screens/FreeTimerScreen'
import { BookmarkSvg, CogSvg, HumanBarbellSvg, TimerSandSvg, ExportDataSvg } from '../res/svgs'
import { Theme } from '../styles'
import AppLocalizationContext from '../../AppLocalizationContext'
import { useSelector } from 'react-redux'
import InputSelfWeightModal from '../components/InputSelfWeightModal'
import MyExercisesForm from '../modules/MyExercisesForm'
import ExportDataScreen from '../screens/ExportDataScreen'


const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()

function Root() {
    useSelector(state => state.appSettingsReducer.language)
    const i18n = useContext(AppLocalizationContext)
    // color: papayawhip
    return (
        <Drawer.Navigator screenOptions={drawerStyles}>
            <Drawer.Screen
                name='MyExercisesScreen'
                component={MyExercisesScreen}
                options={{
                    title: i18n.t('str0001'),
                    drawerIcon: () => <HumanBarbellSvg 
                                        size={24} 
                                        fill={Theme.textCommon}/>
                }}
            />
            {/* <Drawer.Screen
                name='MyTrainingScreen'
                component={MyTrainingScreen}
                options={{
                    drawerIcon: () => <BookmarkSvg 
                                        size={24} 
                                        fill={Theme.textCommon}/>
                }}
            /> */}
            {/* <Drawer.Screen
                name='FreeTimerScreen'
                component={FreeTimerScreen}
                options={{
                    title: i18n.t('str0003'),
                    drawerIcon: () => <TimerSandSvg 
                                        size={24} 
                                        fill={Theme.textCommon}/>
                }}
            /> */}
            <Drawer.Screen
                name='SettingsScreen'
                component={SettingsScreen}
                options={{
                    title: i18n.t('str0002'),
                    drawerIcon: () => <CogSvg 
                                        size={24} 
                                        fill={Theme.textCommon}/>
                }}
            />
            <Drawer.Screen
                name='ExportDataScreen'
                component={ExportDataScreen}
                options={{
                    title: i18n.t('str0004'),
                    drawerIcon: () => <ExportDataSvg
                                        size={24}
                                        fill={Theme.textCommon}/>
                }}
            />
        </Drawer.Navigator>
    )
}

export default function AppNavigation() {
  useSelector(state => state.appSettingsReducer.language)
  return (
    <NavigationContainer>
        <InputSelfWeightModal/>
        <MyExercisesForm/>
        <Stack.Navigator screenOptions={headerStyles}>
            <Stack.Screen
                name='Root'
                component={Root}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='ExerciseScreen'
                component={ExerciseScreen}
                options={{ headerShadowVisible: true, title: '?' }}
            />
        </Stack.Navigator>
    </NavigationContainer>
  )
}