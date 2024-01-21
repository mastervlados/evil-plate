import React from 'react'
import { Path, Svg } from 'react-native-svg'

export default function TimerSandSvg({ size, fill }) {
  return (
    <Svg 
        width={size ? size : 100} 
        height={size ? size : 100}
        viewBox="0 0 24 24"
    >
        <Path 
            d='M6 2H18V8L14 12L18 16V22H6V16L10 12L6 8V2ZM16 16.5L12 12.5L8 16.5V20H16V16.5ZM12 11.5L16 7.5V4H8V7.5L12 11.5ZM10 6H14V6.75L12 8.75L10 6.75V6Z'
            fill={fill}
        />
    </Svg>
  )
}
