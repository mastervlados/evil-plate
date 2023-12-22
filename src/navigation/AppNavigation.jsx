import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import { drawerStyles, headerStyles } from './style'
import MyExercisesScreen from '../screens/MyExercisesScreen'
import MyTrainingScreen from '../screens/MyTrainingScreen'
import SettingsScreen from '../screens/SettingsScreen'
import ExerciseScreen from '../screens/ExerciseScreen'
import { BookmarkSvg, CogSvg, HumanBarbellSvg } from '../res/svgs'
import { Theme } from '../styles'

const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()

function Root() {
    return (
        <Drawer.Navigator screenOptions={drawerStyles}>
            <Drawer.Screen
                name='MyExercisesScreen'
                component={MyExercisesScreen}
                options={{
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
            <Drawer.Screen
                name='SettingsScreen'
                component={SettingsScreen}
                options={{
                    drawerIcon: () => <CogSvg 
                                        size={24} 
                                        fill={Theme.textCommon}/>
                }}
            />
        </Drawer.Navigator>
    )
}

export default function AppNavigation() {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={headerStyles}>
            <Stack.Screen
                name='Root'
                component={Root}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='ExerciseScreen'
                component={ExerciseScreen}
                options={{ headerShadowVisible: false }}
            />
        </Stack.Navigator>
    </NavigationContainer>
  )
}