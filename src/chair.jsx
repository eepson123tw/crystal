import { Perf } from "r3f-perf";
import React, { useRef, useMemo } from "react";
import { useGLTF, Clone, OrbitControls, Float, Text } from "@react-three/drei";
import { EffectComposer, Glitch, Noise } from "@react-three/postprocessing";
import { BlendFunction, GlitchMode } from "postprocessing";
export default function chair() {
  const chair = useGLTF("/chair.gltf");
  return (
    <>
      <color attach="background" args={["#030202"]} />
      <Perf position="top-left" />
      <OrbitControls makeDefault />
      <EffectComposer multisampling={4}>
        <Noise blendFunction={BlendFunction.AVERAGE} premultiply />
        <Glitch //毛刺
          delay={[1.5, 3.5]} // min and max glitch delay
          duration={[0.6, 1.0]} // min and max glitch duration
          strength={[0.3, 1.0]} // min and max glitch strength
          mode={GlitchMode.SPORADIC} // glitch mode
          active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
          ratio={0.85} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
        />
      </EffectComposer>
      <Float position={[0.5, 0, 0]}>
        <Text
          font="./SoukouMincho-Font/FOT-MatissePro-EB.otf"
          scale={0.5}
          color={"#fff"}
          direction="auto"
          position={[2, 2, 0]}
        >
          萊納
        </Text>
        <Text
          font="./SoukouMincho-Font/FOT-MatissePro-EB.otf"
          scale={0.5}
          color={"#777"}
          direction="auto"
          position={[2, 1.75, 0]}
        >
          ,
        </Text>
        <Text
          font="./SoukouMincho-Font/FOT-MatissePro-EB.otf"
          scale={0.5}
          color={"#AF111C"}
          position={[2.2, 1.15, 0]}
        >
          你坐啊！
        </Text>
      </Float>
      <Float position={[-0.5, 0, 0]}>
        <Text
          font="./SoukouMincho-Font/FOT-MatissePro-EB.otf"
          scale={0.5}
          color={"#fff"}
          direction="auto"
          position={[-2.5, 2, 0]}
        >
          ライナー、
        </Text>
        <Text
          font="./SoukouMincho-Font/FOT-MatissePro-EB.otf"
          scale={0.5}
          color={"#AF111C"}
          position={[-2.4, 1.15, 0]}
        >
          座れよ。
        </Text>
      </Float>

      <mesh
        receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial color="red" />
      </mesh>
      <Clone object={chair.scene} scale={1} position-y={-1}></Clone>
    </>
  );
}
