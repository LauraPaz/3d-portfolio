import { useGLTF, useAnimations } from '@react-three/drei'
import React, { useRef, useEffect } from 'react'

import birdScene from '../assets/3d/bird.glb'
import { useFrame } from '@react-three/fiber'

const Bird = () => {
    const birdRef = useRef()
    const { scene, animations } = useGLTF(birdScene)
    const { actions } = useAnimations(animations, birdRef)

    useEffect(() => {
        actions['Take 001'].play()
    }, [])

    useFrame(({ clock, camera }) => {
        // Update the bird's y position to simulate flying in a wave pattern
        birdRef.current.position.y = Math.sin(clock.elapsedTime) * 0.2 + 2

        // Check if bird reached a certain point relative to the camera
        if(birdRef.current.position.x > camera.position.x + 10) {
            // Rotate the bird to face the opposite direction
            birdRef.current.rotation.y = Math.PI
        } else if(birdRef.current.position.x < camera.position.x - 10) {
            // reset the rotation to face the original direction
            birdRef.current.rotation.y = 0
        }

        // Move the bird in the direction it is facing
        if (birdRef.current.rotation.y === 0) {
            birdRef.current.position.x += 0.01
            birdRef.current.position.z -= 0.01
        } else {
            birdRef.current.position.x -= 0.01
            birdRef.current.position.z += 0.01
        }
    }, [])

    return (
        <mesh 
            position={[-5, 2, 1]}
            scale={[0.003, 0.003, 0.003]}
            ref={birdRef}
        >
            <primitive object={scene} />
        </mesh>
    )
}

export default Bird