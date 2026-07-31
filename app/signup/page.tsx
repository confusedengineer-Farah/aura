export default function SignupPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-6">
      <div className="w-full max-w-md bg-slate-900 rounded-2xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-center text-purple-400">
          Create Account
        </h1>

        <form className="mt-8 space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full rounded-lg bg-slate-800 p-3 outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-lg bg-slate-800 p-3 outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-lg bg-slate-800 p-3 outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-purple-600 py-3 font-semibold hover:bg-purple-700 transition"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-slate-400">
          Already have an account?{" "}
          <a href="/login" className="text-purple-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </main>
  );
}