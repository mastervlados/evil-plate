import { View, Animated, useWindowDimensions } from 'react-native'
import React from 'react'
import { styles } from './style'
import slides from './slides'


export default function Paginator({ scrollX }) {

    const { width } = useWindowDimensions()

    return (
        <View style={styles.paginatorContainer}>
            {
                slides.map((_, index) => {

                    const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

                    const dotSize = scrollX.interpolate({
                        inputRange,
                        outputRange: [8, 14, 8],
                        extrapolate: 'clamp',
                    })

                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: 'clamp',
                    })

                    return <Animated.View 
                                key={`dot-for-${index}`} 
                                style={[
                                        styles.paginatorDot, 
                                        { 
                                            width: dotSize, 
                                            height: dotSize, 
                                            opacity 
                                        }]}
                            />
                })
            }
        </View>
    )
}