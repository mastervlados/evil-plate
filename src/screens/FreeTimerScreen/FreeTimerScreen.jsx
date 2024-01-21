import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { styles } from './style'
import CircularProgress from 'react-native-circular-progress-indicator'
import { AppContainers, Theme } from '../../styles'


export default function FreeTimerScreen() {
    return (
        <View style={AppContainers.styles.appContainerWithoutVerticalCentred}>
            <CircularProgress
                value={0}
                radius={140}
                showProgressValue={false}
                title={'10:00'}
                titleFontSize={64}
                titleStyle={{ fontWeight: '100', fontFamily: 'roboto-thin' }}
                inActiveStrokeOpacity={0.5}
                activeStrokeWidth={15}
                activeStrokeColor={Theme.positive}
                inActiveStrokeWidth={20}
                progressValueStyle={{ fontWeight: '100', color: 'white' }}
                // activeStrokeSecondaryColor={Theme.crimson}
                inActiveStrokeColor={Theme.itemMono}
                duration={1000}
                dashedStrokeConfig={{
                    count: 50,
                    width: 4,
                }}
            />
        </View>
    )
}