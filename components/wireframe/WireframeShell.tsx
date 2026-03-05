import type { ReactNode } from "react";
import { WireframeTextureLayer } from "./WireframeTextureLayer";

type WireframeShellProps = {
  children: ReactNode;
};

export function WireframeShell({ children }: WireframeShellProps) {
  return (
    <main className="wf-screen">
      <WireframeTextureLayer />
      <div className="wf-frame">
        <div className="wf-frame-inner">{children}</div>
      </div>
    </main>
  );
}
