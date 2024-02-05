import React from 'react'
import { Path, Svg } from 'react-native-svg'

export default function FilterOffSvg({ size, fill }) {
  return (
    <Svg 
        width={size ? size : 100} 
        height={size ? size : 100}
        viewBox="0 0 36 36"
    >
        <Path 
            d='M23.9 18.6L10.3 5.1h22.2c.8-.1 1.5.5 1.5 1.3v1.2c0 .5-.2 1-.6 1.4z'
            fill={fill}
        />
        <Path 
            d='M33.5 31L4.1 1.6L2.6 3l2.1 2.1H3.5C2.7 5 2 5.6 2 6.4v1.2c0 .5.2 1 .6 1.4L14 20.5v10.1l8 3.4V22.4l10.1 10.1z'
            fill={fill}
        />
        <Path 
            d='M0 0h36v36H0z'
            fill={'transparent'}
        />
    </Svg>
  )
}
