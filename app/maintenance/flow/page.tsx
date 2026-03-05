import { WireframeShell } from "@/components/wireframe/WireframeShell";

const steps = ["説明会に参加", "体験稽古", "見学・相談", "入団手続き"];

export default function FlowWireframePage() {
  return (
    <WireframeShell>
      <section className="wf-card wf-flow-card">
        <h1 className="wf-card-title">企画の流れ</h1>
        <ol className="wf-flow-list">
          {steps.map((step, index) => (
            <li key={step} className="wf-flow-item">
              <span className="wf-flow-step-number">{index + 1}</span>
              <div className="wf-flow-step-block">{step}</div>
              {index < steps.length - 1 && <span className="wf-flow-arrow" aria-hidden />}
            </li>
          ))}
        </ol>
        <button type="button" className="wf-flow-detail-button">
          詳細へ
        </button>
      </section>
    </WireframeShell>
  );
}
