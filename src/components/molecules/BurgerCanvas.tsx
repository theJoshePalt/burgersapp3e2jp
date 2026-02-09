import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber/native';
import { OrbitControls, ContactShadows } from '@react-three/drei/native';
import BurgerModel from '../atoms/BurgerModel';

interface BurgerCanvasProps {
  step: number;
  isEaten: boolean;
}

export default function BurgerCanvas({ step, isEaten }: BurgerCanvasProps) {
  return (
    <Canvas 
      // fov: 40 hace que el lente no deforme tanto los bordes
      // position: [0, 4, 12] la aleja lo suficiente para que respire en la pantalla
      camera={{ position: [0, 4, 12], fov: 40 }}
      shadows
    >
      {/* 1. ILUMINACIÓN AMBIENTAL: Luz base para que no haya sombras negras puras */}
      <ambientLight intensity={0.8} /> 

      {/* 2. LUZ DE ESTUDIO (Spotlight): Crea el brillo principal y proyecta sombras */}
      <spotLight 
        position={[5, 10, 5]} 
        intensity={2.5} 
        angle={0.3} 
        penumbra={1} 
        castShadow 
      />

      {/* 3. LUZ DE CONTRASTE: Un toque cálido para que la comida se vea real */}
      <directionalLight position={[-5, 5, -5]} intensity={1.5} color="#FFE4B5" />

      {/* 4. CONTROLES DE ÓRBITA: Restringimos el zoom para que no se "rompa" la vista */}
      <OrbitControls 
        enablePan={false} // Evita que el usuario mueva la cámara hacia los lados
        minDistance={8}   // Zoom máximo permitido (cerca)
        maxDistance={18}  // Zoom máximo permitido (lejos)
        makeDefault
      />

      {/* 5. EL MODELO Y CARGA: Suspense evita que la app truene mientras carga el .glb */}
      <Suspense fallback={null}>
        <group position={[0, -1.5, 0]}> 
          <BurgerModel step={step} isEaten={isEaten} />
        </group>
        
        {/* Sombra de contacto en el piso para realismo */}
        <ContactShadows 
          position={[0, -1.5, 0]} 
          opacity={0.5} 
          scale={10} 
          blur={2} 
          far={4} 
        />
      </Suspense>
    </Canvas>
  );
}