import { WireframeShell } from "@/components/wireframe/WireframeShell";

const departments = ["企画責任", "宣伝部", "演出", "役者", "舞台", "音響", "照明", "小道具", "制作", "宣伝美術"];

export default function DepartmentsWireframePage() {
  return (
    <WireframeShell>
      <section className="wf-card wf-departments-card">
        <h1 className="wf-card-title">部署紹介</h1>
        <div className="wf-department-tree">
          <div className="wf-vine-line" />
          <ul className="wf-department-list">
            {departments.map((department, index) => (
              <li key={department} className={`wf-department-item ${index % 2 === 0 ? "left" : "right"}`}>
                <span className="wf-leaf-chip">{department}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </WireframeShell>
  );
}
