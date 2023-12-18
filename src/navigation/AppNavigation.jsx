import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import { drawerStyles, headerStyles } from './style'
import MyExercisesScreen from '../screens/MyExercisesScreen';
import MyTrainingScreen from '../screens/MyTrainingScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ExerciseScreen from '../screens/ExerciseScreen';

const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()

function Root() {
    return (
        <Drawer.Navigator screenOptions={drawerStyles}>
            <Drawer.Screen
                name='MyExercisesScreen'
                component={MyExercisesScreen}
            />
            <Drawer.Screen
                name='MyTrainingScreen'
                component={MyTrainingScreen}
            />
            <Drawer.Screen
                name='SettingsScreen'
                component={SettingsScreen}
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