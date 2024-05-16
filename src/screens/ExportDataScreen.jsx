import { View, Text } from "react-native";
import React, { useContext, useState } from "react";
import AppLocalizationContext from "../../AppLocalizationContext";
import { AppContainers, AppTextStyles, Buttons, Theme } from "../styles";
import RoundedButton from "../UI/RoundedButton";
import { ExportDataSvg, AcceptSvg, CancelSvg } from "../res/svgs";
import AppContext from "../../AppContext";
import { jsonToCSV } from "react-native-csv";
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';


export default function ExportDataScreen() {
  const i18n = useContext(AppLocalizationContext);
  const service = useContext(AppContext);
  const [buttonStyles, setButtonStyles] = useState(Buttons.styles.warning)
  const [icon, setIcon] = useState(<ExportDataSvg/>)

  const exportDataHandlePress = async () => {
    const data = await service.getAllDataFromDB();
    const csv = jsonToCSV(data)

    const directoryUri = FileSystem.documentDirectory
    const fileUri = directoryUri + `evilplate_${Date.now()}.csv`

    // Ask permission (if not granted)
    const perm = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    if (perm.status != 'granted') {
      console.log("Permission not Granted!")
      return;
    }

    try {
      await FileSystem.writeAsStringAsync(fileUri, csv)
      .then(async () => {
        setButtonStyles(Buttons.styles.success)
        setIcon(<AcceptSvg/>)
        await setTimeout(() => {
          setButtonStyles(Buttons.styles.warning)
          setIcon(<ExportDataSvg/>)
        }, 3000)
      })
      .catch(async () => {
        setButtonStyles(Buttons.styles.danger)
        setIcon(<CancelSvg/>)
        await setTimeout(() => {
          setButtonStyles(Buttons.styles.warning)
          setIcon(<ExportDataSvg/>)
        }, 3000)
      })
    } catch (error) {
      console.log('One: ' + error)
    }

    try {
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      const album = await MediaLibrary.getAlbumAsync('Evil Plate');
      console.log(album)
      if (album == null) {
        await MediaLibrary.createAlbumAsync('Evil Plate', asset, true);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, true);
      }
    } catch (error) {
      console.log('Two: ' + error);
    }
  };

  return (
    <View style={AppContainers.styles.appContainer}>
      <View style={AppContainers.styles.appContainerWithLeftAndRightPaddings}>
        <View style={{ marginTop: 30, marginBottom: 15 }}>
          <Text style={{ ...AppTextStyles.styles.textHeader }}>
            {i18n.t("eds0001")}
          </Text>
          <Text style={{ ...AppTextStyles.styles.textInfo }}>
            {i18n.t("eds0002")}
          </Text>
        </View>
        <View style={{ marginTop: 30, display: "flex", alignItems: "center" }}>
          <RoundedButton
            styles={buttonStyles}
            size={56}
            onPressFunc={exportDataHandlePress}
            iconSvg={icon}
            iconSize={32}
            iconColor={Theme.base}
          />
        </View>
      </View>
    </View>
  );
}
