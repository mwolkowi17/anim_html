import './App.css'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html, Scroll, ScrollControls, useScroll } from '@react-three/drei'
import { element } from 'three/tsl'
import { MathUtils } from 'three'
import { useSpring, animated } from '@react-spring/three'


function Box(props) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const data = useScroll()
  // Subscribe this component to the render-loop, rotate the mesh every frame
  //useFrame((state, delta) => (meshRef.current.rotation.x += delta))
  // Return view, these are regular three.js elements expressed in JSX
  // useFrame(() => {
  //   (state, delta) => (meshRef.current.rotation.x += delta)
  // })

  useFrame(() => {
    // meshRef.current.rotation.x = active
    //   ? MathUtils.lerp(meshRef.current.rotation.x, -Math.PI * 2, 0.025)
    //   : MathUtils.lerp(meshRef.current.rotation.x, 0, 0.025)
    const a = data.range(0, 1 / 3)
    console.log(a);
    meshRef.current.rotation.x = MathUtils.lerp(meshRef.current.rotation.x, -Math.PI * a, 0.025)
  })
  const { scale, position } = useSpring({ scale: active ? 1.5 : 1, position: active ? 1.5 : 0 })
  return (

    <animated.mesh
      {...props}
      ref={meshRef}
      scale={scale}
      position={position}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </animated.mesh>

  )
}

function App() {
  const ElPositionSet = [[0, 0, 0], [1, 0, 1], [2, 0, 2]]
  const ElSinusoid = [];

  for (let i = 0; i < 100; i++) {
    ElSinusoid.push([Math.sin(i * 0.8), 0, i])
  }

  const OurGroup = ElSinusoid.map((element, i) => (<group position={[0, 0, -50]}>
    <mesh key={i} position={element}  >
      <boxGeometry args={[2, 1, 0.1]} />
      <meshPhongMaterial attach="material" color={'rgba(0,127,100,  0.40534638195481165)'} />
    </mesh>

  </group>))
  return (
    <>
      <Canvas>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <ScrollControls pages={1} damping={0.1} style={{}}>
          <Scroll>i
            <Box position={[-1.2, 0, 0]} />

          </Scroll>

        </ScrollControls>

      </Canvas >
    </>
  )
}

export default App
