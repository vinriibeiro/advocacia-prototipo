import type { SVGProps } from 'react'

export type IconName =
  | 'dashboard' | 'briefcase' | 'users' | 'calendar' | 'newspaper' | 'kanban' | 'folder' | 'wallet'
  | 'chart' | 'settings' | 'search' | 'bell' | 'logout' | 'plus' | 'filter' | 'chevron-right'
  | 'chevron-down' | 'chevron-left' | 'arrow-right' | 'arrow-left' | 'more' | 'clock' | 'alert' | 'check'
  | 'close' | 'file' | 'file-text' | 'paperclip' | 'external' | 'download' | 'edit' | 'user'
  | 'building' | 'phone' | 'mail' | 'pin' | 'tag' | 'scale' | 'gavel' | 'eye' | 'link' | 'menu'
  | 'shield' | 'zap' | 'trending-up' | 'upload' | 'message' | 'history' | 'sparkle' | 'info'
  | 'check-circle' | 'sheet' | 'image' | 'send' | 'lock' | 'help' | 'layers'

const p: Record<IconName, React.ReactNode> = {
  dashboard: <><rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="3" width="8" height="5" rx="2"/><rect x="13" y="11" width="8" height="10" rx="2"/><rect x="3" y="14" width="8" height="7" rx="2"/></>,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18"/></>,
  users: <><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-4.5-6.2"/></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></>,
  newspaper: <><path d="M4 5h13a2 2 0 0 1 2 2v12H6a2 2 0 0 1-2-2V5Z"/><path d="M19 9h1.5a1.5 1.5 0 0 1 1.5 1.5V17a2 2 0 0 1-2 2M8 9h5M8 13h7M8 17h7"/></>,
  kanban: <><rect x="3" y="4" width="5" height="16" rx="1.5"/><rect x="9.5" y="4" width="5" height="10" rx="1.5"/><rect x="16" y="4" width="5" height="13" rx="1.5"/></>,
  folder: <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"/>,
  wallet: <><path d="M3 7a2 2 0 0 1 2-2h13v4"/><rect x="3" y="7" width="18" height="12" rx="2"/><circle cx="16.5" cy="13" r="1" fill="currentColor"/></>,
  chart: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/></>,
  search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></>,
  bell: <><path d="M6 9a6 6 0 0 1 12 0v4l1.5 2.5H4.5L6 13V9Z"/><path d="M10 19a2 2 0 0 0 4 0"/></>,
  logout: <><path d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4"/><path d="M15 16l4-4-4-4M19 12H9"/></>,
  plus: <path d="M12 5v14M5 12h14"/>,
  filter: <path d="M3 5h18l-7 8v6l-4 2v-8L3 5Z"/>,
  'chevron-right': <path d="m9 6 6 6-6 6"/>,
  'chevron-down': <path d="m6 9 6 6 6-6"/>,
  'chevron-left': <path d="m15 6-6 6 6 6"/>,
  'arrow-right': <path d="M5 12h14m-6-6 6 6-6 6"/>,
  'arrow-left': <path d="M19 12H5m6 6-6-6 6-6"/>,
  more: <><circle cx="5" cy="12" r="1.2" fill="currentColor"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/><circle cx="19" cy="12" r="1.2" fill="currentColor"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  alert: <><path d="M12 9v4M12 17h.01"/><path d="M10.3 4.3 2.5 18a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0Z"/></>,
  check: <path d="m5 12 4.5 4.5L19 7"/>,
  close: <path d="M6 6l12 12M18 6 6 18"/>,
  file: <><path d="M6 3h8l5 5v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M14 3v5h5"/></>,
  'file-text': <><path d="M6 3h8l5 5v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M14 3v5h5M8 13h8M8 17h6"/></>,
  paperclip: <path d="m21 11-8.5 8.5a5 5 0 0 1-7-7l8.5-8.5a3.3 3.3 0 0 1 4.7 4.7L10.2 17.2a1.7 1.7 0 0 1-2.4-2.4L15.5 7"/>,
  external: <><path d="M14 4h6v6M20 4l-9 9"/><path d="M19 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5"/></>,
  download: <path d="M12 4v12m-5-5 5 5 5-5M4 20h16"/>,
  edit: <><path d="M4 20h4l10.5-10.5a2 2 0 0 0 0-2.8l-1.2-1.2a2 2 0 0 0-2.8 0L4 16v4Z"/><path d="m13 7 4 4"/></>,
  user: <><circle cx="12" cy="8" r="4"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/></>,
  building: <><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M10 21v-3h4v3"/></>,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 8 9 6 9-6"/></>,
  pin: <><path d="M12 21s7-6.5 7-11.5a7 7 0 1 0-14 0C5 14.5 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></>,
  tag: <><path d="M3 12V4h8l10 10-8 8L3 12Z"/><circle cx="7.5" cy="8.5" r="1" fill="currentColor"/></>,
  scale: <><path d="M12 3v18M5 21h14M12 6 4 8m8-2 8 2"/><path d="M4 8l-2.5 6a3 3 0 0 0 5 0L4 8Zm16 0-2.5 6a3 3 0 0 0 5 0L20 8Z"/></>,
  gavel: <><path d="m14 5 5 5-7 7-5-5 7-7Z"/><path d="m9 12-6 6 3 3 6-6M16 3l5 5"/></>,
  eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></>,
  link: <><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16"/>,
  shield: <><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z"/><path d="m9 12 2 2 4-4"/></>,
  zap: <path d="M13 3 4 14h6l-1 7 9-11h-6l1-7Z"/>,
  'trending-up': <path d="m3 17 6-6 4 4 8-8M15 7h6v6"/>,
  upload: <path d="M12 16V4m-5 5 5-5 5 5M4 20h16"/>,
  message: <path d="M4 5h16v11H9l-5 4V5Z"/>,
  history: <><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5M12 7v5l3 2"/></>,
  sparkle: <><path d="M12 3v4M12 17v4M3 12h4M17 12h4"/><path d="M12 7a5 5 0 0 0 5 5 5 5 0 0 0-5 5 5 5 0 0 0-5-5 5 5 0 0 0 5-5Z"/></>,
  info: <><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></>,
  'check-circle': <><circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.5 2.5 4.5-5"/></>,
  sheet: <><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M9 10v10M15 10v10"/></>,
  image: <><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.5"/><path d="m21 16-5-5-8 8"/></>,
  send: <path d="M21 3 10 14M21 3l-7 18-4-7-7-4 18-7Z"/>,
  lock: <><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></>,
  help: <><circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .8-1 1.5M12 17h.01"/></>,
  layers: <><path d="m12 3 9 4.5-9 4.5-9-4.5L12 3Z"/><path d="m3 12 9 4.5 9-4.5"/><path d="m3 16.5 9 4.5 9-4.5"/></>,
}

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName
  size?: number
}

export function Icon({ name, size = 18, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {p[name]}
    </svg>
  )
}
