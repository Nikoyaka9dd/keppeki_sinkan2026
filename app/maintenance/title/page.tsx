import Image from "next/image";
import { WireframeShell } from "@/components/wireframe/WireframeShell";

const socialItems = [
  { label: "HP", iconPath: "/images/HP_logo.png", href: "https://keppeki.github.io/" },
  { label: "X", iconPath: "/images/x.svg", href: "https://x.com/g_keppeki" },
  { label: "Instagram", iconPath: "/images/instagram.svg", href: "https://www.instagram.com/g_keppeki/?hl=ja" },
  {
    label: "YouTube",
    iconPath: "/images/youtube.svg",
    href: "https://youtube.com/channel/UCZ0WfTqsl7QF8pSRjz-1xOg?si=G7dY5bllxywdG-YT",
  },
];

export default function TitleWireframePage() {
  return (
    <WireframeShell>
      <header className="wf-home-header">
        <p className="wf-home-small">劇団ケッペキ</p>
        <h1 className="wf-home-title">2026年新歓特設サイト</h1>
        <p className="wf-home-menu">劇団紹介　部署紹介　新歓イベント　企画の流れ　Q&amp;A　リンク</p>
      </header>

      <section className="wf-card wf-sns-card">
        <h2 className="wf-card-title wf-sns-title">SNS</h2>
        <ul className="wf-sns-list">
          {socialItems.map((item) => (
            <li key={item.label}>
              <a href={item.href} className="wf-sns-link" aria-label={item.label} target="_blank" rel="noreferrer noopener">
                <span className="wf-sns-circle">
                  <Image src={item.iconPath} alt="" width={34} height={34} />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <a href="https://keppeki.github.io/" className="wf-callout-button" target="_blank" rel="noreferrer noopener">
        新歓公演のHPはこちら
      </a>

      <section className="wf-card wf-about-card">
        <h2 className="wf-card-title">劇団ケッペキとは</h2>
        <div className="wf-about-grid">
          <div className="wf-about-image" />
          <div className="wf-about-lines">
            <span />
            <span />
            <span />
          </div>
          <div className="wf-about-image" />
          <div className="wf-about-lines">
            <span />
            <span />
            <span />
          </div>
          <div className="wf-about-image" />
          <div className="wf-about-lines">
            <span />
            <span />
            <span />
          </div>
        </div>
      </section>

      <section className="wf-card wf-join-card">
        <h2 className="wf-card-title">入団希望の方へ</h2>
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
