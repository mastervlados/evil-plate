import { View, Image, Dimensions } from 'react-native'
import React from 'react'
import { AppContainers } from '../../styles'
import * as Animatable from 'react-native-animatable'

export default function Spinner({ animation = 'pulse' }) {

    // Use same spinner size,
    // Different spinner sizes are not good practice
    // looks like a virus program
    const spinnerSize = Dimensions.get('window').width * 0.60

    return (
        <View style={AppContainers.styles.appEmtyCentredContainer}>
            <Animatable.View 
                animation={animation}
                duration={1000}
                iterationCount={Infinity}
            >
                <Image 
                    source={require('../../../assets/adaptive-icon.png')}
                    style={{width: spinnerSize, height: spinnerSize}}
                />
            </Animatable.View>
        </View>
    )
}