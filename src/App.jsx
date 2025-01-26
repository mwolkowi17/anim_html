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
    meshRef.current.position.x = MathUtils.lerp(meshRef.current.position.x, Math.PI * a, 0.025)
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

function SinusBoxes(props) {
  const meshRef1 = useRef()
  const data1 = useScroll()
  const refcolection = []

  useFrame(() => {
    // meshRef.current.rotation.x = active
    //   ? MathUtils.lerp(meshRef.current.rotation.x, -Math.PI * 2, 0.025)
    //   : MathUtils.lerp(meshRef.current.rotation.x, 0, 0.025)
    const a = data1.range(0, 1 / 3)
    console.log(a);
    //meshRef1.current.rotation.x = MathUtils.lerp(meshRef1.current.rotation.x, -Math.PI * a, 0.025)

    //meshRef1.current.position.z = MathUtils.lerp(meshRef1.current.position.z, a, 0.05)
    for (let i = 0; i < 19; i++) {
      refcolection[i].current.position.z = MathUtils.lerp(refcolection[i].current.position.z, a + i, 0.05)
      refcolection[i].current.position.x = MathUtils.lerp(refcolection[i].current.position.x, refcolection[i + 1].current.position.x + a, 0.05)
      //refcolection[i].current.position.z = MathUtils.lerp(refcolection[i].current.position.z, a + refcolection[i].current.position.z, 0.05)
    }

    //(state, delta) => (meshRef1.current.rotation.x += delta)

  })

  const ElPositionSet2 = [[0, 0, 0], [1, 0, 1], [2, 0, 2]]
  const ElSinusoid2 = [];

  for (let i = 0; i < 20; i++) {
    ElSinusoid2.push([Math.sin(i * 0.7), 0, i])
    refcolection.push(useRef())
  }

  const OurGroup2 = ElSinusoid2.map((element, i) => (<group position={[0, 0, -5]}>
    <animated.mesh >
      <mesh key={"a" + i} position={element} ref={refcolection[i]}  >
        <boxGeometry args={[2, 1, 0.1]} />
        <meshPhongMaterial attach="material" color={'rgba(0,127,100,  0.40534638195481165)'} />
      </mesh>
    </animated.mesh>
  </group>))
  return (
    <>
      {OurGroup2}
    </>
  )
}

function App() {
  const data = useScroll()
  const meshRef = useRef()
  // useFrame(() => {
  //   const a = data.range(0, 1 / 3)
  //   console.log(a);
  //   meshRef.current.rotation.x = MathUtils.lerp(meshRef.current.rotation.x, -Math.PI * a, 0.025)
  //   meshRef.current.position.x = MathUtils.lerp(meshRef.current.position.x, Math.PI * a, 0.025)
  // })

  const ElPositionSet = [[0, 0, 0], [1, 0, 1], [2, 0, 2]]
  const ElSinusoid = [];

  for (let i = 0; i < 100; i++) {
    ElSinusoid.push([Math.sin(i * 0.7), 0, i])
  }

  const OurGroup = ElSinusoid.map((element, i) => (<group position={[0, 0, -50]}>

    <mesh key={i} position={element}  >
      <boxGeometry args={[2, 1, 0.1]} />
      <meshPhongMaterial attach="material" color={'rgba(0,127,100,  0.40534638195481165)'} />
    </mesh>

  </group>))
  return (
    <>
      <Canvas camera={{ fov: 75, near: 0.1, far: 1000, position: [2, 1, 5] }} >
        <ambientLight intensity={Math.PI / 2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        {/* <animated.mesh ref={meshRef}> */}
        {/* {OurGroup} */}
        {/* </animated.mesh> */}


        <ScrollControls pages={1} damping={0.1} style={{}}>
          <Scroll>
            {/* <Box position={[-1.2, 0, 0]} /> */}
            <SinusBoxes />
          </Scroll>

        </ScrollControls>
        {/* <OrbitControls /> */}
      </Canvas >
    </>
  )
}

export default App
