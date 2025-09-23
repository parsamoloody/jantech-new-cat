import React, { memo } from "react";
import ModelViewer from "@/components/ThreeDModelViewer";
import ModelViewerProps from "@/types/three";

interface HomeEdModelProps {
  tD: ModelViewerProps;
}

const HomeEdModel: React.FC<HomeEdModelProps> = memo(({ tD }) => {
  return (
    <div className="w-full h-full pt-14 pb-32 bg-black">
      <ModelViewer prop={tD} />
    </div>
  );
});

HomeEdModel.displayName = "HomeEdModel";

export default HomeEdModel;
 