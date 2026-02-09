import { Gltf } from '@react-three/drei/native';
import React from 'react';
import burgerModelPath from '../../../assets/models/burger.glb';

export default function BurgerModel() {
  return (
    <Gltf src = {burgerModelPath}/>
  );
}