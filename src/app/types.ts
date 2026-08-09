export type Screen = "landing" | "dashboard" | "builder" | "payments" | "profile";

export type Navigate = (screen: Screen) => void;
