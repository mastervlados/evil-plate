import React from 'react'
import { G, Mask, Path, Svg } from 'react-native-svg'

export default function TimerSvg({ size, fill }) {
  return (
    <Svg 
        width={size ? size : 100} 
        height={size ? size : 100}
        viewBox="0 0 35 35"
    >
      <Mask 
        id='undefeated'
        maskUnits='userSpaceOnUse'
        x={3}
        y={0}
        width={29}
        height={35}
      >
        <Path 
            d='M17.5 32.0833C23.9433 32.0833 29.1666 26.86 29.1666 20.4167C29.1666 13.9733 23.9433 8.75 17.5 8.75C11.0567 8.75 5.83331 13.9733 5.83331 20.4167C5.83331 26.86 11.0567 32.0833 17.5 32.0833Z'
            fill='#555555'
            stroke='#FFFFFF'
            strokeWidth={4}
        />
        <Path 
            d='M20.4167 2.91669H14.5833M17.5 2.91669V8.75002M25.5208 11.6667L27.7083 9.47919M17.5 16.0417V20.4167H13.125'
            stroke='#FFFFFF'
            strokeWidth={4}
            strokeLinecap='round'
            strokeLinejoin='round'
        />
      </Mask>
      <G mask={'url(#undefeated)'}>
        <Path 
            d='M0 0H35V35H0V0Z'
            fill={fill}
        />
      </G>
    </Svg>
  )
}
