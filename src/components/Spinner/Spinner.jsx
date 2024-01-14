import { View, Image, Dimensions } from 'react-native'
import React from 'react'
import { AppContainers } from '../../styles'
import * as Animatable from 'react-native-animatable'

export default function Spinner({ size, animation = 'pulse' }) {

    const spinnerSize = size ? size : Dimensions.get('window').width * 0.60

    return (
        <View style={AppContainers.styles.appEmtyCentredContainer}>
            <Animatable.View 
                animation={animation}
                duration={800}
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