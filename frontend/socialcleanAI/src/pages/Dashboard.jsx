export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 ">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          Welcome to SocialCleanAI 🎉
        </h1>
        <p className="text-gray-600 mb-6">
          You are logged in successfully. Explore your dashboard and manage your
          content with ease.
        </p>

        <button className="relative w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold shadow-lg overflow-hidden group">
          <span className="relative z-10">Go to Dashboard</span>
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out"></span>
        </button>
      </div>
    </div>
  );
}
