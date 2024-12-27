import './App.css'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import { element } from 'three/tsl'


function Box(props) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (meshRef.current.rotation.x += delta))
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

function App() {
  const ElPositionSet = [[0, 0, 0], [1, 0, 1], [2, 0, 2]]
  const ElSinusoid = [];

  for (let i = 0; i < 100; i++) {
    ElSinusoid.push([Math.sin(i * 0.5), 0, i])
  }

  const OurGroup = ElSinusoid.map((element, i) => (<group position={[0, 0, -50]}>
    <mesh key={i} position={element}  >
      <boxGeometry args={[2, 1, 0.1]} />
      <meshPhongMaterial attach="material" color={'rgba(0,127,100,  0.40534638195481165)'} />
    </mesh>
    {/* <Html key={i} transform occlude scale={0.5} position={element} >
      <div style={{ backgroundColor: 'green', transform: 'scale(2)' }}>Html</div>
    </Html> */}
  </group>))
  return (
    <>
      <Canvas>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />

        {/* <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} /> */}
        {OurGroup}
        {/* <group>
          <mesh >
            <boxGeometry args={[2, 2.6, 0.1]} />
            <meshPhongMaterial attach="material" color={'rgba(0,127,100,  0.40534638195481165)'} />
          </mesh>
          <Html transform occlude scale={0.5} position={[0, 0, .2]} >
            <div style={{ backgroundColor: 'green', transform: 'scale(2)' }}>Html</div>
          </Html>
        </group> */}
        <OrbitControls />
      </Canvas >
    </>
  )
}

export default App
