import { Clock3 } from "lucide-react";

export default function DevNotice() {
  return (
    <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 rounded-lg p-3 text-sm mb-4 flex items-center gap-2">

      <Clock3 size={18} />

      <p>
        Some features are still under development and will be added soon.
      </p>

    </div>
  );
}