function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="bg-white shadow-md rounded-lg p-15 text-center">
      <div className="mb-4">
        <img
          src="/logo.png"
          alt="Logo"
          className="w-20 h-20 mx-auto"
        />
      </div>

      <h2 className="text-xl font-bold mb-2 text-gray-800">
        Password successfully reset!
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        You can now return to the mobile app and log in with your new password. 🙌
      </p>

      <a
        href="myapp://login"
        className="inline-block mt-4 text-blue-600 font-medium hover:underline"
      >
        Open in App
      </a>

      <p className="text-sm text-gray-500 mt-6">You may now close this window.</p>
    </div>
    </div>
  )
}

export default Home
