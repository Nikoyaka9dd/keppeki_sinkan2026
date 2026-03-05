import { WireframeShell } from "@/components/wireframe/WireframeShell";

export default function EventsWireframePage() {
  return (
    <WireframeShell>
      <section className="wf-card wf-event-card">
        <h1 className="wf-card-title">新歓イベント紹介</h1>
        <div className="wf-event-lines">
          <span />
          <span />
          <span />
        </div>
      </section>

      <section className="wf-card wf-schedule-card">
        <h2 className="wf-card-title">スケジュール</h2>
        <div className="wf-schedule-box" />
        <div className="wf-schedule-box" />
        <span className="wf-arrow-tag wf-arrow-left" aria-hidden />
        <span className="wf-arrow-tag wf-arrow-right" aria-hidden />
      </section>
    </WireframeShell>
  );
}
