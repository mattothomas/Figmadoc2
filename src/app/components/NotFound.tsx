import { Link } from "react-router";
import { Button } from "./ui/button";
import { AlertCircle } from "lucide-react";

export function NotFound() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center space-y-4">
        <AlertCircle className="h-16 w-16 text-gray-400 mx-auto" />
        <h1 className="text-4xl font-semibold">404</h1>
        <p className="text-gray-600">Page not found</p>
        <Link to="/">
          <Button>Return to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
