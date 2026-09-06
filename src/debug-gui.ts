/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createSystem, Object3D, VisibilityState } from '@iwsdk/core';
import GUI from 'lil-gui';
import { orbitControlsDebugState } from './orbit-controls-system.js';

type RuntimeLight = Object3D & {
  color: {
    getHexString(): string;
    set(value: string): void;
  };
  intensity: number;
};

function findRuntimeLight(root: Object3D | undefined): RuntimeLight | undefined {
  if (root == null) {
    return undefined;
  }

  let found: RuntimeLight | undefined;
  root.traverse((object) => {
    if (found != null) {
      return;
    }
    const candidate = object as Partial<RuntimeLight>;
    if (candidate.color != null && typeof candidate.intensity === 'number') {
      found = object as RuntimeLight;
    }
  });
  return found;
}

export class DebugGuiSystem extends createSystem({}) {
  private gui: GUI | null = null;

  init(): void {
    const gui = new GUI({ title: 'Debug' });
    this.gui = gui;

    const cameraFolder = gui.addFolder('Camera');
    cameraFolder.add(this.camera.position, 'x', -10, 10, 0.01).name('x');
    cameraFolder.add(this.camera.position, 'y', 0.1, 10, 0.01).name('y');
    cameraFolder.add(this.camera.position, 'z', -12, 12, 0.01).name('z');

    const targetFolder = gui.addFolder('Orbit target');
    targetFolder.add(orbitControlsDebugState.target, 'x', -10, 10, 0.01).name('x');
    targetFolder.add(orbitControlsDebugState.target, 'y', -2, 8, 0.01).name('y');
    targetFolder.add(orbitControlsDebugState.target, 'z', -12, 8, 0.01).name('z');

    const ambientLight = findRuntimeLight(
      this.world.getSceneObject('ambient-light'),
    );
    if (ambientLight != null) {
      const ambientState = {
        color: `#${ambientLight.color.getHexString()}`,
      };
      const ambientFolder = gui.addFolder('Ambient light');
      ambientFolder
        .add(ambientLight, 'intensity', 0, 3, 0.001)
        .name('intensity');
      ambientFolder
        .addColor(ambientState, 'color')
        .name('color')
        .onChange((value: string) => ambientLight.color.set(value));
    }

    const directionalLight = findRuntimeLight(
      this.world.getSceneObject('directional-light'),
    );
    if (directionalLight != null) {
      const directionalState = {
        color: `#${directionalLight.color.getHexString()}`,
      };
      const directionalFolder = gui.addFolder('Directional light');
      directionalFolder
        .add(directionalLight, 'intensity', 0, 5, 0.001)
        .name('intensity');
      directionalFolder
        .addColor(directionalState, 'color')
        .name('color')
        .onChange((value: string) => directionalLight.color.set(value));
      directionalFolder
        .add(directionalLight.position, 'x', -10, 10, 0.01)
        .name('x');
      directionalFolder
        .add(directionalLight.position, 'y', 0, 10, 0.01)
        .name('y');
      directionalFolder
        .add(directionalLight.position, 'z', -12, 8, 0.01)
        .name('z');
    }

    this.cleanupFuncs.push(
      this.world.visibilityState.subscribe((visibilityState) => {
        gui.domElement.style.display =
          visibilityState === VisibilityState.NonImmersive ? '' : 'none';
      }),
      () => {
        gui.destroy();
        this.gui = null;
      },
    );
  }
}
