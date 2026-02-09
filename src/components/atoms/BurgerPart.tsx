import React, { useMemo, useEffect } from 'react';
import { useGLTF } from '@react-three/drei/native';
import { useSpring, animated } from '@react-spring/three';
import burgerModelPath from '../../assets/models/burger.glb'; // Asegúrate que la ruta sea correcta

// Truco para evitar el error de TypeScript que mencionaste antes
const AnimatedPrimitive = animated('primitive') as any;

interface BurgerPartProps {
  visible: boolean;
  positionY: number;
  closedHeight: number;
  partName: string;
  isFinished: boolean;
  isEaten: boolean;
}

export default function BurgerPart({ visible, positionY, closedHeight, partName, isFinished, isEaten }: BurgerPartProps) {
  // 1. CARGA: Traemos el modelo .glb
  const { scene } = useGLTF(burgerModelPath) as any;

  // 2. CLONACIÓN: Usamos useMemo para que cada ingrediente sea una copia única
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  
  // 3. FILTRADO: Solo hacemos visible la pieza que coincide con el nombre
  useEffect(() => {
    if (clonedScene) {
      clonedScene.traverse((child: any) => {
        if (child.isMesh) {
          // Si el nombre del mesh en Blender incluye el partName (ej: 'Cube001')
          child.visible = child.name.includes(partName);
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [clonedScene, partName]);

  // 4. ANIMACIÓN (Fase 5 preliminar):
  const { pos, scale } = useSpring({
    pos: isFinished ? [0, closedHeight, 0] : (visible ? [0, positionY, 0] : [0, positionY + 5, 0]),
    scale: isEaten ? 0 : 1.5,
    config: { mass: 1, tension: 180, friction: 22 },
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