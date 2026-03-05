"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MaintenanceLogo } from "./MaintenanceLogo";
import { SocialLinks } from "./SocialLinks";
import { socialLinks } from "./socialLinkData";
import { TextureLayer } from "./TextureLayer";

gsap.registerPlugin(useGSAP);

export function MaintenanceScreen() {
  const containerRef = useRef<HTMLElement>(null);
  const maintenanceText = "メンテナンス中・・・";
  const maintenanceCharacters = Array.from(maintenanceText);

  useGSAP(
    () => {
      gsap.from(".js-enter", {
        y: 20,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power2.out",
      });

      gsap.to(".js-wave-char", {
        y: -12,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2,
      });

      gsap.to(".js-social-bubble", {
        y: -6,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        stagger: 0.12,
        ease: "sine.inOut",
      });
    },
    { scope: containerRef },
  );

  return (
    <main ref={containerRef} className="maintenance-screen">
      <TextureLayer />
      <div className="maintenance-inner">
        <MaintenanceLogo />

        <h1 className="maintenance-text js-enter" aria-label={maintenanceText}>
          {maintenanceCharacters.map((character, index) => (
            <span key={`${character}-${index}`} className="maintenance-char js-wave-char" aria-hidden>
              {character}
            </span>
          ))}
        </h1>

        <SocialLinks links={socialLinks} />
      </div>
    </main>
  );
}
