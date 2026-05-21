import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100 px-4">
      <div className="text-center max-w-md w-full">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold bg-primary bg-clip-text text-transparent">
            404
          </h1>
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-lg mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="w-full sm:w-auto">
            <Button className="w-full gap-2 bg-primary hover:from-gray-800 hover:to-gray-700 text-white">
              <Home size={18} />
              Go Home
            </Button>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto"
          >
            <Button
              variant="outline"
              className="w-full gap-2 border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              <ArrowLeft size={18} />
              Go Back
            </Button>
          </button>
        </div>

        {/* Decorative element */}
        <div className="mt-12 pt-12 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Lost? <Link to="/" className="text-gray-900 font-semibold hover:underline">
              Visit our home page
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
