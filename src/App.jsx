import { Canvas, useFrame } from "@react-three/fiber"
import './App.css'
import { MeshStandardMaterial } from "three"
import { useRef } from "react"
import { color, sin } from "three/examples/jsm/nodes/Nodes.js"

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
    return (
        <mesh position={position}>
            <sphereGeometry args={size}/>
            <meshStandardMaterial color={color}/>
        </mesh>
    );
}

const App = () => {
  return (
    <Canvas>
        <directionalLight position={[0 , 0, 2]} intensity={0.7}/>
        <ambientLight intensity={0.1}/>
        <Cube position={[2,1,0]} size={[1,1,1]} color={"blue"} />
        <Sphere position={[0,0,0]} args={[1,30,30]} color={"pink"}/>
    </Canvas>
  );
}

export default App
