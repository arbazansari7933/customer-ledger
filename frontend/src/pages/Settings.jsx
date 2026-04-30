import { useNavigate, Link } from "react-router-dom";
import DevNotice from "../components/DevNotice";
import api from "../utils/api";
import Navbar from "../components/Navbar";
import BottomNavbar from "../components/BottomNavbar";

export default function Settings() {

  const navigate = useNavigate();

  // 🔽 DOWNLOAD BACKUP
  const handleDownload = async () => {
    try {
      const res = await api.get("/backup", {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", `backup-${Date.now()}.json`);
      document.body.appendChild(link);
      link.click();

    } catch (error) {
      console.error("Download failed", error);
      alert("Download failed ❌");
    }
  };

  // 🔼 RESTORE BACKUP
  const handleRestore = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // ⚠️ confirm before restore
    const confirmRestore = window.confirm(
      "⚠️ This will DELETE all current data and replace it. Continue?"
    );

    if (!confirmRestore) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await api.post("/restore", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Restore successful ✅");

    } catch (error) {
      console.error("Restore failed", error);
      alert("Restore failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
  {/* <Navbar /> */}
  <div className="p-4">

      {/* Header */}
      <div className="bg-white rounded-xl shadow p-4 mb-4">
        <h1 className="text-xl font-semibold text-gray-800">
          Settings
        </h1>
        <p className="text-gray-500 text-sm">
          Manage your app preferences
        </p>
      </div>

      <DevNotice />

      {/* SETTINGS LIST */}
      <div className="bg-white rounded-xl shadow divide-y">

        {/* Shop Info */}
        <div className="p-4 flex justify-between items-center">
          <div>
            <p className="font-medium text-gray-800">
              🏪 Shop Information
            </p>
            <p className="text-sm text-gray-500">
              KGN Collection <br />
              Main Road Maskedih
            </p>
          </div>

          <button className="text-green-600 text-sm hover:underline">
            Edit
          </button>
        </div>

        {/* Bill Settings */}
        <div className="p-4 flex justify-between items-center">
          <div>
            <p className="font-medium text-gray-800">
              🧾 Bill Preferences
            </p>
            <p className="text-sm text-gray-500">
              GST, discount settings
            </p>
          </div>

          <button className="text-green-600 text-sm hover:underline">
            Configure
          </button>
        </div>

        {/* 🔥 BACKUP */}
        <div className="p-4 flex justify-between items-center">
          <div>
            <p className="font-medium text-gray-800">
              💾 Data Backup
            </p>
            <p className="text-sm text-gray-500">
              Download your shop data
            </p>
          </div>

          <button
            onClick={handleDownload}
            className="text-green-600 text-sm hover:underline"
          >
            Download
          </button>
        </div>

        {/* 🔥 RESTORE */}
        <div className="p-4 flex justify-between items-center">
          <div>
            <p className="font-medium text-gray-800">
              🔄 Restore Backup
            </p>
            <p className="text-sm text-red-500">
              ⚠️ This will overwrite all data
            </p>
          </div>

          <label className="text-green-600 text-sm hover:underline cursor-pointer">
            Upload
            <input
              type="file"
              accept=".json"
              onChange={handleRestore}
              className="hidden"
            />
          </label>
        </div>

        {/* Account */}
        <div className="p-4">
          <p className="font-medium text-gray-800 mb-3">
            🔐 Account
          </p>

          <div className="flex gap-2">
            <Link
              to="/login"
              className="flex-1 text-center px-3 py-2 text-sm text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="flex-1 text-center px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>

      </div>
      </div>
  <BottomNavbar />
</div>
  );
}