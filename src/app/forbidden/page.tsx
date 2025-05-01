import Image from "next/image";

function ForbiddenScreen() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 text-center">
      <Image
        src="/404.png"
        alt="Access Denied"
        width={300}
        height={300}
        className="mb-6"
      />
      <h1 className="mb-2 text-4xl font-bold text-red-600">403 - Forbidden</h1>
      <p className="mb-4 text-lg text-gray-700">
        Oops! You don't have permission to access this page.
      </p>
      <a
        href="/"
        className="inline-block rounded-lg bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
      >
        Go Back Home
      </a>
    </div>
  );
}

export default ForbiddenScreen;
