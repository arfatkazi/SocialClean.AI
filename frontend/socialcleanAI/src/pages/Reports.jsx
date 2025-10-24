export default function Reports() {
  return (
    <section className="py-16 px-6 text-center   transition-colors duration-500 mt-50">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 mt-20">
        📊 Reports & Analytics
      </h1>
      <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
        View your scan results, AI analytics, and summaries. (Coming soon)
      </p>
      <div className="mt-8">
        <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-2">Example Report</h2>
          <ul className="text-left text-gray-700 dark:text-gray-300">
            <li>✅ Safe Posts: 120</li>
            <li>⚠️ Flagged Posts: 15</li>
            <li>❌ Deleted Posts: 8</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
