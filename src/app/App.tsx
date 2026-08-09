import { useState } from "react";
import type { Screen } from "@/app/types";
import { Notice } from "@/components/Notice";
import { NavPill } from "@/components/NavPill";
import { useNotice } from "@/lib/notice";
import { Builder } from "@/screens/Builder";
import { Dashboard } from "@/screens/Dashboard";
import { Landing } from "@/screens/Landing";
import { Payments } from "@/screens/Payments";
import { Profile } from "@/screens/Profile";

export function App() {
  const [screen, setScreen] = useState<Screen>("landing");
  const { message, notify } = useNotice();

  function navigate(next: Screen) {
    setScreen(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-lumen-cream font-ui text-vast-ink">
      {screen !== "landing" && <NavPill screen={screen} onNavigate={navigate} />}

      {screen === "landing" && <Landing onNavigate={navigate} />}
      {screen === "dashboard" && <Dashboard onNavigate={navigate} onNotify={notify} />}
      {screen === "builder" && <Builder onNavigate={navigate} onNotify={notify} />}
      {screen === "payments" && <Payments onNotify={notify} />}
      {screen === "profile" && <Profile onNavigate={navigate} onNotify={notify} />}

      {screen !== "landing" && (
        <footer className="mx-auto mt-8 max-w-[1200px] px-4 pb-10 text-sm text-fog md:px-6">
          <div className="flex flex-wrap justify-between gap-3 border-t-2 border-lumen-stone pt-6">
            <span>© 2026 BuildContract / SmartBuild протокол</span>
            <span>Узел · Ташкент-01</span>
          </div>
        </footer>
      )}

      <Notice message={message} />
    </div>
  );
}
