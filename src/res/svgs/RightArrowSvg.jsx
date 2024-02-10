import React from 'react'
import { Path, Svg } from 'react-native-svg'

export default function RightArrowSvg({ size, fill }) {
  return (
    <Svg 
        width={size ? size : 100} 
        height={size ? size : 100}
        viewBox="0 0 24 24"
    >
        <Path 
            d='m10 17l5-5l-5-5'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            stroke={fill}
            fill={'none'}
        />
    </Svg>
  )
}
