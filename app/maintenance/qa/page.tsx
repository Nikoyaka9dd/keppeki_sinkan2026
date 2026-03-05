import { WireframeShell } from "@/components/wireframe/WireframeShell";

export default function QaWireframePage() {
  return (
    <WireframeShell>
      <section className="wf-card wf-qa-card">
        <h1 className="wf-card-title">Q&amp;A</h1>
        <div className="wf-qa-leaves" aria-hidden>
          <span />
          <span />
        </div>
        <div className="wf-qa-divider" />
        <div className="wf-qa-placeholder">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </section>

      <section className="wf-card wf-join-flow-card">
        <h2 className="wf-card-title">入団の流れ</h2>
        <div className="wf-join-lines">
          <span />
          <span />
          <span />
          <span />
        </div>
      </section>
    </WireframeShell>
  );
}
