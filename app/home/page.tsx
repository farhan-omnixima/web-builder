import { InlineSnippet } from "@/components/form/domain-configuration";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-10 bg-black">
      <Image
        width={512}
        height={512}
        src="/logo.png"
        alt="Platforms on Vercel"
        className="w-48"
      />
      <h1 className="text-3xl font-bold text-white">Welcome to Platforms</h1>
      <p className="text-white">
        A platform to help you build and deploy your projects.
      </p>
      
      <Link
        href="/login"
        className="bg-white text-black px-4 py-2 rounded-lg"
      >
        Get Started
      </Link>
    </div>
  );
}
