export type SocialLink = {
  id: "hp" | "x" | "instagram" | "youtube" | "note";
  label: string;
  href: string;
  iconPath: string;
  external?: boolean;
};

export const socialLinks: SocialLink[] = [
  {
    id: "hp",
    label: "HP",
    href: "https://keppeki.github.io/",
    iconPath: "/images/HP_logo.png",
  },
  {
    id: "x",
    label: "X",
    href: "https://x.com/g_keppeki",
    iconPath: "/image/x.svg",
    external: true,
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/g_keppeki/?hl=ja",
    iconPath: "/image/instagram.svg",
    external: true,
  },
  {
    id: "youtube",
    label: "YouTube",
    href: "https://youtube.com/channel/UCZ0WfTqsl7QF8pSRjz-1xOg?si=G7dY5bllxywdG-YT",
    iconPath: "/image/youtube.svg",
    external: true,
  },
  {
    id: "note",
    label: "note",
    href: "https://note.com/keppeki_shinkan",
    iconPath: "/images/note-icon.svg",
    external: true,
  },
];
