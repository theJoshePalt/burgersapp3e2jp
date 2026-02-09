// src/lib/core/logic/burgerLogic.ts

export interface BurgerLayer {
    name: string;        // El nombre exacto que viene de Blender (Caza de piezas)
    height: number;      // Altura cuando está "flotando" (en construcción)
    closedHeight: number; // Altura cuando la hamburguesa ya está terminada (compactada)
  }
  
  export const BURGER_LAYERS: BurgerLayer[] = [
    { 
      name: 'panAbajo',    // Pan de abajo
      height: 0, 
      closedHeight: 0 
    },
    { 
      name: 'carne',         // La carne
      height: 1.5, 
      closedHeight: 0.3 
    },
    { 
      name: 'queso',       // El queso
      height: 3, 
      closedHeight: 0.6 
    },
    { 
      name: 'nuggets',        // La lechuga/ensalada
      height: 4.5, 
      closedHeight: 0.8 
    },
    { 
      name: 'Cube001',      // ¡El famoso Pan de Arriba! (Top Bun)
      height: 6, 
      closedHeight: 1.1 
    },
  ];