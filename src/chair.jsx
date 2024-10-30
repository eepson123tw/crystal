import { Perf } from "r3f-perf";
import React from "react";
import {
  useGLTF,
  OrbitControls,
  Float,
  Text,
  Environment,
  Stage,
  PresentationControls,
  Sparkles,
  Stars,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
  DepthOfField,
  Glitch,
} from "@react-three/postprocessing";
import { BlendFunction, GlitchMode } from "postprocessing";

export default function Chair() {
  const { nodes, materials } = useGLTF("/base_basic_pbr.glb");

  return (
    <>
      {/* Set a gradient background */}
      <color attach="background" args={["#000"]} />
      <Perf position="top-left" />

      {/* Camera controls */}
      <OrbitControls makeDefault enablePan={false} />

      {/* Post-processing effects */}
      <EffectComposer multisampling={4}>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
        <Noise opacity={0.02} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>

      {/* Soft lighting environment */}
      <Environment preset="city" />

      <Environment preset="night" />

      <Sparkles
        count={100}
        scale={[10, 10, 10]}
        size={2}
        speed={1}
        noise={1}
        color={"#ffffff"}
      />
      <Stars
        radius={100}
        depth={50}
        count={500}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      <PresentationControls
        global
        config={{ mass: 2, tension: 500 }}
        snap={{ mass: 4, tension: 1500 }}
        rotation={[0, 0.3, 0]}
        polar={[-Math.PI / 6, Math.PI / 6]}
        azimuth={[-Math.PI / 4, Math.PI / 4]}
      >
        <Stage
          intensity={0.15}
          environment="studio"
          preset="portrait"
          shadows={{
            type: "accumulative",
            color: "#ffffff",
            colorBlend: 2,
            opacity: 2,
          }}
        >
          <group dispose={null} scale={2}>
            <mesh
              position={[0, 3, 0]}
              castShadow
              receiveShadow
              geometry={nodes.world.geometry}
              material={materials.place_holder}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.model.geometry}
              material={materials.place_holder}
            ></mesh>
          </group>
        </Stage>
      </PresentationControls>

      <Float floatIntensity={5} rotationIntensity={2} position={[0, 2, 0]}>
        <Text
          font="./SoukouMincho-Font/FOT-MatissePro-EB.otf"
          scale={1}
          color="#fff"
          position={[0, 3, 0]}
          anchorX="center"
          anchorY="middle"
        >
          AI 產的
        </Text>
        <Text
          font="./SoukouMincho-Font/FOT-MatissePro-EB.otf"
          scale={1}
          color="#00ffff"
          position={[0.2, 1.5, 0]}
          anchorX="center"
          anchorY="middle"
        >
          藍水晶
        </Text>
      </Float>
    </>
  );
}
