import { Canvas, useFrame } from "@react-three/fiber"
import './App.css'
import { DirectionalLightHelper, MeshStandardMaterial } from "three"
import { useRef, useState } from "react"
import { color, sin } from "three/examples/jsm/nodes/Nodes.js"
import { MeshWobbleMaterial, OrbitControls, useHelper } from "@react-three/drei"
import { useControls } from "leva"


const Cube = ({position, size, color}) => {
    const ref = useRef();
    useFrame((state,delta) =>{
        ref.current.rotation.x += delta;
        ref.current.rotation.y += delta*2;
        ref.current.position.z = Math.sin(state.clock.elapsedTime) * 2;
    });
    return (
        <mesh position={position} ref={ref}>
            <boxGeometry args={size} />
            <meshStandardMaterial color={color}/>
        </mesh>
    );
}

const Sphere = ({position, size, color}) => {
    const ref = useRef();
    const [isHovered, setIsHovered] = useState(false)
    const [isClicked, setIsClicked] = useState(false)

    
    useFrame((state,delta) =>{
        const speed = isHovered ? 1 : 0.2
        //ref.current.rotation.x += delta;
        ref.current.rotation.y += delta * speed;
        //ref.current.position.z = Math.sin(state.clock.elapsedTime) * 2;
    });
    return (
        <mesh 
            position={position} 
            ref={ref}
            onPointerEnter={(event) => (event.stopPropagation(), setIsHovered(true))}
            onPointerLeave={() => setIsHovered(false)}
            onClick={() => setIsClicked(!isClicked)}
            scale={isClicked ? 1.5 : 1}
        >
            <sphereGeometry args={size}/>
            <meshStandardMaterial color={isHovered ? color : "lightblue"} wireframe/>
        </mesh>
    );
}

const Torus = ({position, size, color}) => {
    return (
        <mesh position={position}>
            <torusGeometry args={size}/>
            <meshStandardMaterial color={color}/>
        </mesh>
    );
}

const TorusKnot = ({position, size}) => {
    const {color, radius} = useControls({
        color: "lightblue",
        radius: {
            value: 5,
            min: 1,
            max: 10,
            step: 0.5
        }
    })
    
    const ref = useRef();
    // useFrame((state,delta) =>{
    //     ref.current.rotation.x += delta;
    //     ref.current.rotation.y += delta*2;
    //     ref.current.position.z = Math.sin(state.clock.elapsedTime) * 2;
    // });
    return (
        <mesh position={position} ref={ref}>
            <torusKnotGeometry args={[radius, ...size]}/>
            {/* <meshStandardMaterial color={color}/> */}
            <MeshWobbleMaterial factor={5} speed={.5} color={color}/>
        </mesh>
    );
}

const Scene = () => {
    const directionalLightRef = useRef()

    const {lightColor, lightIntensity} = useControls({
        lightColor: "white",
        lightIntensity: {
            value: 0.5,
            min: 0,
            max: 5,
            step: 0.1
        },
    })

    useHelper(directionalLightRef, DirectionalLightHelper, 0.5, "white")

    return (
    <>
        <directionalLight 
            position={[0 , 1, 2]} 
            intensity={lightIntensity} 
            ref={directionalLightRef}
            color={lightColor}
        />
        <ambientLight intensity={0.1}/>
        {/* <Cube position={[2,1,0]} size={[1,1,1]} color={"blue"} /> */}
        {/* <Sphere position={[0,0,0]} size={[1,30,30]} color={"red"}/> */}
        {/* <Torus position={[2,0,0]} size={[0.5,0.1,30,30]} color={"yellow"}/> */}
        <TorusKnot position={[0,0,0]} size={[0.1,1000,50]}/>
        <OrbitControls enableZoom={false}/>
    </>
    )
}

const App = () => {
  return (
    <Canvas>
       <Scene />
    </Canvas>
  );
}

export default App
