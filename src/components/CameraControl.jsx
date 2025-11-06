import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React from 'react'

export default function CameraControl() {
    const scroll = useScroll()

    useFrame((state, delta) => {
        const currentPage = Math.floor(scroll.offset * 10)

        

    })
    
  return null
}
