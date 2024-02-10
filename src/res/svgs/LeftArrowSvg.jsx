import React from 'react'
import { Path, Svg } from 'react-native-svg'

export default function LeftArrowSvg({ size, fill }) {
  return (
    <Svg 
        width={size ? size : 100} 
        height={size ? size : 100}
        viewBox="0 0 24 24"
    >
        <Path 
            d='m14 7l-5 5l5 5'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            stroke={fill}
            fill={'none'}
        />
    </Svg>
  )
}
