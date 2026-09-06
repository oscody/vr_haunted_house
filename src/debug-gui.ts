/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createSystem, VisibilityState } from '@iwsdk/core';
import GUI from 'lil-gui';

export class DebugGuiSystem extends createSystem({}) {
  private gui: GUI | null = null;

  init(): void {
    const gui = new GUI();
    this.gui = gui;

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
