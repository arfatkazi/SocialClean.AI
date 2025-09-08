export default function GoogleButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-xl py-2 hover:bg-gray-50 transition-shadow shadow-sm hover:shadow-md font-medium"
    >
      <img
        src="https://www.svgrepo.com/show/355037/google.svg"
        alt="Google"
        className="w-6 h-6 rounded-full"
      />
      Continue with Google
    </button>
  );
}
