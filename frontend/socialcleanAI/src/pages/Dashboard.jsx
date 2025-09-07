export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          Welcome to SocialCleanAI 🎉
        </h1>
        <p className="text-gray-600 mb-6">
          You are logged in successfully. Explore your dashboard and manage your
          content with ease.
        </p>

        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition">
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
