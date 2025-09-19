import ClipLoader from "react-spinners/ClipLoader";

export default function Loading({ fadeOut }) {
  return (
    <div
      className={`flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950 transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <ClipLoader color="#4f46e5" size={80} speedMultiplier={1.2} />
    </div>
  );
}
