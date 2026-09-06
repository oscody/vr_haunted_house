/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createSystem, VisibilityState } from '@iwsdk/core';

export class DebugGuiSystem extends createSystem({}) {
  private panel: HTMLDivElement | null = null;

  init(): void {
    const panel = document.createElement('div');
    panel.style.cssText = [
      'position:fixed',
      'top:0',
      'right:0',
      'z-index:1000',
      'width:245px',
      'font:11px Menlo, Consolas, monospace',
      'color:#ebebeb',
      'background:#1f1f1f',
      'box-shadow:0 8px 24px rgba(0,0,0,0.35)',
      'user-select:none',
      'pointer-events:none',
    ].join(';');
    panel.innerHTML = `
      <div style="padding:8px 10px;font-weight:700;background:#111">Debug</div>
      <div style="padding:8px 10px;border-top:1px solid #343434">Camera: 4, 2, 5</div>
      <div style="padding:8px 10px;border-top:1px solid #343434">Ambient: #ffffff / 0.5</div>
      <div style="padding:8px 10px;border-top:1px solid #343434">Directional: #ffffff / 1.5</div>
    `;
    document.body.appendChild(panel);
    this.panel = panel;

    this.cleanupFuncs.push(
      this.world.visibilityState.subscribe((visibilityState) => {
        panel.style.display =
          visibilityState === VisibilityState.NonImmersive ? 'block' : 'none';
      }),
      () => {
        panel.remove();
        this.panel = null;
      },
    );
  }
}
