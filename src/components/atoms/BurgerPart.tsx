import React, { useMemo, useEffect } from 'react';
import { useGLTF } from '@react-three/drei/native';
import { useSpring, animated } from '@react-spring/three';
import burgerModelPath from '../../assets/models/burger.glb';

const AnimatedPrimitive = animated('primitive') as any;

interface BurgerPartProps {
  visible: boolean;
  positionY: number;    // Altura de "caída"
  closedHeight: number; // Altura de "compactación"
  partName: string;
  isFinished: boolean;  // Trigger para compactar (Paso 5)
  isEaten: boolean;     // Trigger para escala 0
}

export default function BurgerPart({ visible, positionY, closedHeight, partName, isFinished, isEaten }: BurgerPartProps) {
  const { scene } = useGLTF(burgerModelPath) as any;
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  
  useEffect(() => {
    if (clonedScene) {
      clonedScene.traverse((child: any) => {
        if (child.isMesh) {
          child.visible = child.name.includes(partName);
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [clonedScene, partName]);

  // --- FASE 5: LAS ANIMACIONES ---
  const { pos, scale } = useSpring({
    // 1. Efecto Caída + 2. Compactación Final
    // Si isFinished es true, usamos closedHeight (apretada)
    // Si no, si es visible, usamos positionY (su posición normal)
    // Si no es visible, la mandamos 5 unidades arriba (para que caiga)
    pos: isFinished 
      ? [0, closedHeight, 0] 
      : visible ? [0, positionY, 0] : [0, positionY + 5, 0],

    // 3. El "Efecto Comida"
    // Si isEaten es true, escala a 0. Si no, escala normal a 1.5
    scale: isEaten ? 0 : 1.5,

    // Configuración de rebote elástico (Tension y Friction)
    config: { 
      mass: 1, 
      tension: 170, // Un poco de rebote
      friction: 26 
    },
  });

  if (!visible && !isEaten) return null;

  return (
    <AnimatedPrimitive 
      object={clonedScene} 
      position={pos} 
      scale={scale} 
    />
  );
}