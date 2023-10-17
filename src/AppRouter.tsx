import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import RouteComponent from "./Routes";
import { Spin } from "antd";

function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spin />}>
        <RouteComponent />
      </Suspense>
    </BrowserRouter>
  );
}
export default AppRouter;
