import React from "react";
import { Grid } from "ldrs/react";
import "ldrs/react/Grid.css";

// Default values shown

type LoadingOverlayProps = {
  isLoading: boolean;
  text?: string;
};

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
}) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blurred Background */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-md"></div>

      {/* Loader */}
      <div className="relative flex flex-col items-center gap-3">
        {/* ActivityIndicator-like Spinner */}
        <Grid size="60" speed="1.5" color="white" />
      </div>
    </div>
  );
};

export default LoadingOverlay;
