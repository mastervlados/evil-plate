import React from 'react'
import { Path, Svg } from 'react-native-svg'

export default function AcceptSvg({ size, fill }) {
  return (
    <Svg 
        width={size ? size : 100} 
        height={size ? size : 100}
        viewBox="0 0 24 24"
    >
        <Path 
            d='m9 16.2l-3.5-3.5a.984.984 0 0 0-1.4 0a.984.984 0 0 0 0 1.4l4.19 4.19c.39.39 1.02.39 1.41 0L20.3 7.7a.984.984 0 0 0 0-1.4a.984.984 0 0 0-1.4 0z'
            fill={fill}
        />
    </Svg>
  )
}
