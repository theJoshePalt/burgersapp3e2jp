import React from 'react';
import BurgerPart from './BurgerPart';
import { BURGER_LAYERS } from '../../lib/core/logic/burgerLogic'; 

interface BurgerModelProps {
  step: number;
  isEaten: boolean;
}

export default function BurgerModel({ step, isEaten }: BurgerModelProps) {
  return (
    <group>
      {BURGER_LAYERS.map((layer, index) => (
        <BurgerPart 
          key={layer.name}
          // Solo se muestra si el paso actual es mayor o igual a su posición en el array
          visible={step >= index + 1} 
          positionY={layer.height} 
          closedHeight={layer.closedHeight}
          partName={layer.name} 
          // Si estamos en el último paso (5), activamos la compactación
          isFinished={step === 5}
          isEaten={isEaten}
        />
      ))}
    </group>
  );
}