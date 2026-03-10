import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  NavArrowRight,
  Home,
  Lock,
  Pause,
  Play,
  NavArrowLeft,
  ProfileCircle,
  Refresh,
  Running,
  StatsReport,
  Timer,
  Trophy,
  Walking,
  WarningCircle,
  Xmark,
  SkipNext,
  Medal,
  Golf,
} from "iconoir-react-native";

// ─── Name union ───────────────────────────────────────────────────────────────

export type AppIconName =
  | "home"
  | "calendar"
  | "stats"
  | "profile"
  | "arrow-left"
  | "nav-arrow-left"
  | "chevron-right"
  | "check-circle"
  | "lock"
  | "play"
  | "pause"
  | "skip-forward"
  | "refresh"
  | "trophy"
  | "timer"
  | "running"
  | "walking"
  | "warning"
  | "x"
  | "medal"
  | "goal";

// ─── Props ────────────────────────────────────────────────────────────────────

interface AppIconProps {
  name: AppIconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const AppIcon = ({
  name,
  size = 24,
  color = "currentColor",
  strokeWidth = 1.5,
}: AppIconProps) => {
  const props = { color, width: size, height: size, strokeWidth };

  switch (name) {
    case "home":
      return <Home {...props} />;
    case "calendar":
      return <Calendar {...props} />;
    case "stats":
      return <StatsReport {...props} />;
    case "profile":
      return <ProfileCircle {...props} />;
    case "arrow-left":
      return <ArrowLeft {...props} />;
    case "nav-arrow-left":
      return <NavArrowLeft {...props} />;
    case "chevron-right":
      return <NavArrowRight {...props} />;
    case "check-circle":
      return <CheckCircle {...props} />;
    case "lock":
      return <Lock {...props} />;
    case "play":
      return <Play {...props} />;
    case "pause":
      return <Pause {...props} />;
    case "skip-forward":
      return <SkipNext {...props} />;
    case "refresh":
      return <Refresh {...props} />;
    case "trophy":
      return <Trophy {...props} />;
    case "timer":
      return <Timer {...props} />;
    case "running":
      return <Running {...props} />;
    case "walking":
      return <Walking {...props} />;
    case "warning":
      return <WarningCircle {...props} />;
    case "x":
      return <Xmark {...props} />;
    case "medal":
      return <Medal {...props} />;
    case "goal":
      return <Golf {...props} />;
    default:
      return null;
  }
};
