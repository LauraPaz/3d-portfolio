import React, { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Loader from '../components/Loader'
import Island from '../models/Island'
import Sky from '../models/Sky'
import Bird from '../models/Bird'
import Bee from '../models/Bee'
import HomeInfo from '../components/HomeInfo'

const Home = () => {
    const [ isRotating, setIsRotating ] = useState(false);
    const [ currentStage, setCurrentStage ] = useState(0);

    const adjustIslandForScreenSize = () => {
        let screenScale = null;
        let screenPosition = [0, -6.5, -43]
        let rotation = [0.1, 4.7, 0]

        if (window.innerWidth < 768) {
            screenScale = [0.9, 0.9, 0.9];
        } else {
            screenScale = [1, 1, 1];
        }

        return [screenScale, screenPosition, rotation]
    }

    const adjustBeeForScreenSize = () => {
        let screenScale, screenPosition;

        if (window.innerWidth < 768) {
            screenScale = [0.1, 0.1, 0.1];
            screenPosition = [0, -1.5, 0];
        } else {
            screenScale = [0.2, 0.2, 0.2];
            screenPosition = [0, -2, -4];
        }

        return [screenScale, screenPosition];
    }

    const [ islandScale, islandPosition, islandRotation ] = adjustIslandForScreenSize()

    const [ beeScale, beePosition ] = adjustBeeForScreenSize()

    return (
        <section className='w-full h-screen relative'>

            <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
                {currentStage && <HomeInfo currentStage={currentStage}/>}
            </div>

            <Canvas 
                className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}	
                camera={{near: 0.1, far: 1000}}>
                
                <Suspense fallback={<Loader />}>
                    <directionalLight position={[1, 1, 1]} intensity={1}/>
                    <ambientLight intensity={0.2}/>
                    {/* <pointLight /> */}
                    {/* <spotLight /> */}
                    <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1}/>
                    <Bird />
                    <Bee 
                        scale={beeScale}
                        position={beePosition}
                        rotation={[0, 19.5, 0]}
                        isRotating={isRotating}
                    />
                    <Sky
                        isRotating={isRotating} 
                    />
                    <Island 
                        scale={islandScale}
                        position={islandPosition}   
                        rotation={islandRotation} 
                        isRotating={isRotating}
                        setIsRotating={setIsRotating}
                        setCurrentStage={setCurrentStage}
                    />
                </Suspense>
            </Canvas>

        </section>
    )
}

export default Home