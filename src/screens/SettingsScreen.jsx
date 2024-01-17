import { View, Text, Button } from 'react-native'
import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onSettingsLanguageChanged, onSettingsUnitsChanged } from '../redux/actions/appSettingsActions'
import { saveValueAs } from '../res/helpers/secureStore'
import AppLocalizationContext from '../../AppLocalizationContext'
import TabsPannel from '../components/TabsPannel'
import SmartBlock from '../UI/SmartBlock'
import { AppContainers, AppTextStyles, Buttons } from '../styles'

export default function SettingsScreen() {

  const dispatch = useDispatch()
  const target = useSelector(state => state.appSettingsReducer.language)
  const appUnitSystem = useSelector(state => state.appSettingsReducer.unitsFromSettings)
  const i18n = useContext(AppLocalizationContext)

  const languageSwitcher = [
    { id: 0, name: 'en', },
    { id: 1, name: 'ru', },
  ]

  const unitsSwitcher = [
    { id: 0, name: 'kg', },
    { id: 1, name: 'lb', },
  ]

  return (
    <View style={AppContainers.styles.appContainer}>
      <View style={AppContainers.styles.appContainerWithLeftAndRightPaddings}>
        <View style={{ marginTop: 30, marginBottom: 15, }}>
          <Text style={{...AppTextStyles.styles.textHeader}}>{i18n.t('ass0001')}</Text>
        </View>
        
        <TabsPannel 
          listOfTabs={languageSwitcher}
          activeTab={target}
          setActiveTabFunc={async (active) => {
            if (target !== active) {
              dispatch(onSettingsLanguageChanged(active))
              i18n.locale = active
              saveValueAs('storedLanguage', active)
            }}}
          defaultTabStyles={{...Buttons.styles.switcherBox, ...Buttons.styles.switcherDefaultBox}}
          activeTabStyles={{...Buttons.styles.switcherBox, ...Buttons.styles.switcherActiveBox}}
          defaultTextStyles={AppTextStyles.styles.switcherTextDefault}
          activeTextStyles={AppTextStyles.styles.switcherTextActive}
        >
          <SmartBlock 
              blockText={'English'}
              ownBoxStyles={Buttons.styles.switcherLeft}
          />
          <SmartBlock
              blockText={'Русский'}
              ownBoxStyles={Buttons.styles.switcherRight}
          />
        </TabsPannel>

        <View style={{ marginTop: 30, marginBottom: 15, }}>
          <Text style={{...AppTextStyles.styles.textHeader}}>{i18n.t('ass0002')}</Text>
          <Text style={{...AppTextStyles.styles.textInfo}}>{i18n.t('ass0003')}</Text>
        </View>
        <TabsPannel 
          listOfTabs={unitsSwitcher}
          activeTab={appUnitSystem}
          setActiveTabFunc={async (active) => {
            if (appUnitSystem !== active) {
              dispatch(onSettingsUnitsChanged(active))
              saveValueAs('storedUnitSystem', active)
            }}}
          defaultTabStyles={{...Buttons.styles.switcherBox, ...Buttons.styles.switcherDefaultBox}}
          activeTabStyles={{...Buttons.styles.switcherBox, ...Buttons.styles.switcherActiveBox}}
          defaultTextStyles={AppTextStyles.styles.switcherTextDefault}
          activeTextStyles={AppTextStyles.styles.switcherTextActive}
        >
          <SmartBlock 
              blockText={i18n.t('ass0004')}
              ownBoxStyles={Buttons.styles.switcherLeft}
          />
          <SmartBlock
              blockText={i18n.t('ass0005')}
              ownBoxStyles={Buttons.styles.switcherRight}
          />
        </TabsPannel>
      </View>
    </View>
  )
}