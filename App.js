import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'

import { StatusBar } from 'expo-status-bar'

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          'roboto-light': require('./src/res/fonts/roboto/Roboto-Light.ttf'),
          'roboto-regular': require('./src/res/fonts/roboto/Roboto-Regular.ttf'),
          'roboto-medium': require('./src/res/fonts/roboto/Roboto-Medium.ttf'),
          'roboto-bold': require('./src/res/fonts/roboto/Roboto-Bold.ttf'),
          'roboto-black': require('./src/res/fonts/roboto/Roboto-Black.ttf')
        });
      } catch (e) {
        console.warn(e) // ! important
      } finally {
        setAppIsReady(true)
      }
    }

    prepare();
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        {/* <AppNavigation/> */}
      </View>
    </TouchableWithoutFeedback>
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="light" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
