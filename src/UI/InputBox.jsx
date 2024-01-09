import { TextInput } from 'react-native'
import React, { useState } from 'react'

export default function InputBox({
    placeholder = 'Placeholder',
    setInputMode = 'text',
    currentValue,
    updateValueFunc,
    activeStyles,
    defaultStyles,
    placeholderColor,
    ownStyles,
    onBlurFunc,
}) {

  const [isPressed, setPress] = useState(false)
  
  const onBlurHandler = () => {
    if (onBlurFunc) {
      setPress(false)
      onBlurFunc()
    } else {
      setPress(false)
    }
  }

  return (
    
    <TextInput 
        underlineColorAndroid={'transparent'}
        inputMode={setInputMode}
        style={isPressed ? {...activeStyles, ...ownStyles} : { ...defaultStyles, ...ownStyles}}
        placeholder={placeholder}
        onBlur={onBlurHandler}
        onFocus={() => setPress(true)}
        onChangeText={(text) => updateValueFunc(text)}
        value={currentValue}
        placeholderTextColor={placeholderColor}
    />

  )
}