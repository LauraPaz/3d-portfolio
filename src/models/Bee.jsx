import { useAnimations, useGLTF } from '@react-three/drei'
import React, { useEffect, useRef } from 'react'

import BeeScene from '../assets/3d/bee.glb'
import { a } from '@react-spring/three'

const Bee = ({ isRotating, ...props }) => {
    const ref = useRef()
    const { scene, animations } = useGLTF(BeeScene)
    const { actions } = useAnimations(animations, ref)

    useEffect(() => {
        actions['Idle'].play()
    }, [actions, isRotating])

    return (
        <mesh {...props} ref={ref}>
            <primitive object={scene} />
        </mesh>
    )
}

export default Bee