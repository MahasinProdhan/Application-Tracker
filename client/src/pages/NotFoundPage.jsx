import { Link } from "react-router-dom";
import Button from "../components/common/Button";

const NotFoundPage = () => (
  <div className="flex min-h-screen items-center justify-center px-4">
    <div className="panel max-w-lg p-10 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-brand-500">404</p>
      <h1 className="mt-4 text-3xl font-semibold">Page not found</h1>
      <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
        The page you are looking for does not exist or may have been moved.
      </p>
      <Link to="/dashboard" className="mt-6 inline-block">
        <Button>Go to dashboard</Button>
      </Link>
    </div>
  </div>
);

export default NotFoundPage;
