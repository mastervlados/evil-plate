import React from 'react'
import { Path, Svg } from 'react-native-svg'

export default function HumanBarbellSvg({ size, fill }) {
  return (
    <Svg 
        width={size ? size : 100} 
        height={size ? size : 100}
        viewBox="0 0 20 20"
    >
        <Path 
            d='M5.63165 14.3692L10.0008 10L14.37 14.3692M14.37 5.63086L9.99999 10L5.63165 5.63086'
            stroke={fill}
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
    </Svg>
  )
}

