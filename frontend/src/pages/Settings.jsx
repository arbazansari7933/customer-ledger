import { useNavigate, Link } from "react-router-dom";

export default function Settings() {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-4">

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="text-green-600 text-sm hover:underline mb-4"
      >
        ← Back
      </button>

      {/* Header */}
      <div className="bg-white rounded-xl shadow p-4 mb-4">
        <h1 className="text-xl font-semibold text-gray-800">
          Settings
        </h1>
        <p className="text-gray-500 text-sm">
          Manage your app preferences
        </p>
      </div>

      {/* Notice */}
      <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 rounded-lg p-3 text-sm mb-4">
        🚧 This section is under development. More features will be added soon.
      </div>

      {/* SETTINGS LIST */}
      <div className="bg-white rounded-xl shadow divide-y">

        {/* Shop Info */}
        <div className="p-4 flex justify-between items-center">
          <div>
            <p className="font-medium text-gray-800">
              🏪 Shop Information
            </p>
            <p className="text-sm text-gray-500">
              Shop name, address and phone
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

        {/* Backup */}
        <div className="p-4 flex justify-between items-center">
          <div>
            <p className="font-medium text-gray-800">
              💾 Data Backup
            </p>
            <p className="text-sm text-gray-500">
              Download your shop data
            </p>
          </div>

          <button className="text-green-600 text-sm hover:underline">
            Download
          </button>
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
  );
}