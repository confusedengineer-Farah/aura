export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-6">
      <div className="w-full max-w-md bg-slate-900 rounded-2xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-center text-purple-400">
          Welcome Back
        </h1>

        <p className="text-center text-slate-400 mt-2">
          Login to continue your Aura journey.
        </p>

        <form className="mt-8 space-y-4">
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
            Login
          </button>
        </form>

        <button
          className="w-full mt-4 rounded-lg border border-slate-700 py-3 hover:bg-slate-800 transition"
        >
          Continue with Google
        </button>

        <p className="mt-6 text-center text-slate-400">
          Don't have an account?{" "}
          <a href="/signup" className="text-purple-400 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </main>
  );
}