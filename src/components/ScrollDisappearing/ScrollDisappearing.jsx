import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './style'
import { LinearGradient } from 'expo-linear-gradient'


export default function ScrollDisappearing({ 
    children, 
    bgColor = 'red', 
    displayBottom = true
}) {
  return (
    <View style={styles.container}>
        <LinearGradient
            colors={[bgColor, 'transparent']}
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

        { displayBottom ? (
            <LinearGradient
                colors={[bgColor, 'transparent']}
                start={{x: 0, y: 1}}
                end={{x: 0, y: 0}}
                style={{
                    width: '100%',
                    height: 30,
                    position: 'absolute',
                    bottom: 0,
                    zIndex: 101,
            }}/>
        ) : null }
        
      { children }
    </View>
  )
}