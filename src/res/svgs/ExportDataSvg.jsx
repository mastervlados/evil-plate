import React from 'react'
import { G, Path, Svg } from 'react-native-svg'

export default function ExportDataSvg({ size, fill }) {
  return (
    <Svg 
        width={size ? size : 170} 
        height={size ? size : 170}
        viewBox="0 0 24 24"
    >
      <G
        fill={'none'}
        stroke={fill}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
        strokeWidth={2}
      >
        <Path 
            d='M4 6c0 1.657 3.582 3 8 3s8-1.343 8-3s-3.582-3-8-3s-8 1.343-8 3'
        />
        <Path 
            d='M4 6v6c0 1.657 3.582 3 8 3c1.118 0 2.183-.086 3.15-.241M20 12V6'
        />
        <Path 
            d='M4 12v6c0 1.657 3.582 3 8 3q.235 0 .466-.005M16 19h6m-3-3l3 3l-3 3'
        />
      </G>
    </Svg>
  )
}