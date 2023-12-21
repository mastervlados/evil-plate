import { TextInput } from 'react-native'
import React, { useState } from 'react'

export default function InputBox({
    placeholder = 'Placeholder',
    setInputMode = 'text',
    currentValue,
    updateValueFunc,
    activeStyles,
    defaultStyles,
    ownStyles,
}) {

  const [isPressed, setPress] = useState(false)
  
  return (
    

    <TextInput 
        underlineColorAndroid={'transparent'}
        inputMode={setInputMode}
        style={isPressed ? {...activeStyles, ...ownStyles} : { ...defaultStyles, ...ownStyles}}
        placeholder={placeholder}
        onBlur={() => setPress(false)}
        onFocus={() => setPress(true)}
        onChangeText={(text) => updateValueFunc(text)}
        value={currentValue}
    />

  )
}