import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-8rem)]">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
    </div>
  );
};

export default Loading;
