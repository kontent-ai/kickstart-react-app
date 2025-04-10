import { FC } from "react";
import { Link } from "react-router-dom";
import Container from "./Container";

const NotFound: FC = () => {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="text-heading-1 text-heading-1-color mb-4">404</h1>
        <h2 className="text-heading-3 text-heading-3-color mb-6">Page Not Found</h2>
        <p className="text-body text-body-color mb-8 text-center max-w-xl">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 border border-button-border-color bg-button-background-color text-button-text-color hover:bg-button-background-hover-color hover:border-button-border-hover-color hover:text-button-text-hover-color transition-colors duration-200 rounded-md"
        >
          Return to Home
        </Link>
      </div>
    </Container>
  );
};

export default NotFound;
