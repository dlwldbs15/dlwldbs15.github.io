import { lazy, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

// 레이아웃
const Home = lazy(() => import("@/pages/home"));

const RouteComponent = () => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const pages = [{ path: "/", component: Home }];

  // 페이지 이동 시 기존 쿼리들을 무효화하여 새로 데이터를 Fetch 하도록 한다.
  useEffect(() => {
    queryClient.invalidateQueries();
  }, [location.pathname, queryClient]);

  return (
    <Routes>
      {pages.map((page, index) => (
        <Route key={index} path={page.path} element={<page.component />} />
      ))}
    </Routes>
  );
};

export default RouteComponent;
