import { View, Text, Alert, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { styles } from './style'
import slides from './slides'
import RoundedButton from '../../UI/RoundedButton'
import LeftArrowSvg from '../../res/svgs/LeftArrowSvg'
import RightArrowSvg from '../../res/svgs/RightArrowSvg'
import { AppTextStyles, Buttons, Theme } from '../../styles'
import * as Animatable from 'react-native-animatable'
import SmartBlock from '../../UI/SmartBlock'
import AppLocalizationContext from '../../../AppLocalizationContext'
import { useDispatch } from 'react-redux'
import { onSettingsOnboardingVisibleChanged } from '../../redux/actions/appSettingsActions'
import { saveValueAs } from '../../res/helpers/secureStore'


export default function Pagination({ currentIndex, prevHandler, nextHandler }) {
    // skip next ->
    // <- prev next ->
    // <- prev start
    const i18n = useContext(AppLocalizationContext)
    const dispatch = useDispatch()

    const onboardingFinishTutorial = async () => {
        dispatch(onSettingsOnboardingVisibleChanged(false))
        await saveValueAs('storedOnboardingScreenInfo', `${new Date()}`)
    }

    const onboardingSkipHandler = () => {
        Alert.alert(
            i18n.t('alert7000'),
            i18n.t('alert7001'),
            [
                {
                    text: i18n.t('alert7002'),
                    onPress: () => {
                        // Go back later
                        // only state changed
                        dispatch(onSettingsOnboardingVisibleChanged(false))
                    },
                },
                {
                    text: i18n.t('alert7003'),
                    onPress: async () => {
                        // Finish
                        // update secure srore
                        await onboardingFinishTutorial();
                    },
                }
            ]
        )
    }

    return (
        <View style={styles.paginationContainer}>
            { currentIndex === 0 ? (
                <Animatable.View 
                    animation={'bounceIn'}
                    duration={1000}
                >
                    <TouchableOpacity onPress={onboardingSkipHandler}>
                    <SmartBlock
                        blockText={i18n.t('onbo1002')}
                        blockTextStyles={AppTextStyles.styles.onboardingTextWithinButtonAlternate}
                        boxStyles={Buttons.styles.crimsonOutline}
                        ownBoxStyles={{ height: 48, paddingHorizontal: 28, borderRadius: 24, }}
                    />
                    </TouchableOpacity>
                </Animatable.View>
            ) : null }

            { currentIndex !== 0 ? (
                <Animatable.View 
                    animation={'bounceIn'}
                    duration={1000}
                >
                    <RoundedButton
                        styles={Buttons.styles.crimsonOutline}
                        size={48}
                        iconSize={24}
                        iconColor={Theme.crimson}
                        iconSvg={<LeftArrowSvg/>}
                        onPressFunc={prevHandler}
                    />
                </Animatable.View>
            ) : null }
            
            { currentIndex + 1 !== slides.length ? (
                <Animatable.View 
                    animation={'bounceIn'}
                    duration={1000}
                >
                    <RoundedButton
                        styles={Buttons.styles.success}
                        size={48}
                        iconSize={24}
                        iconColor={Theme.base}
                        iconSvg={<RightArrowSvg/>}
                        onPressFunc={nextHandler}
                    />
                </Animatable.View>
            ) : null }

            { currentIndex + 1 === slides.length ? (
                <Animatable.View 
                    animation={'bounceIn'}
                    duration={1000}
                >
                    <TouchableOpacity onPress={async () => await onboardingFinishTutorial()}>
                        <SmartBlock
                            blockText={i18n.t('onbo1001')}
                            blockTextStyles={AppTextStyles.styles.onboardingTextWithinButton}
                            boxStyles={Buttons.styles.success}
                            ownBoxStyles={{ height: 48, paddingHorizontal: 28, borderRadius: 24, }}
                        />
                    </TouchableOpacity>
                </Animatable.View>
            ) : null }
           
        </View>
    )
}