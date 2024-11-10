import Link from 'next/link';

export default function Home() {
  return (
    <div className="home-page m-6 p-6">
      <h1>Welcome to the Homepage</h1>
      <p>This is the main page of my website.</p>
      
      <Link href="/contactUs">
        <a>
          <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Go to Contact Us Page
          </button>
        </a>
      </Link>
    </div>
  );
}
