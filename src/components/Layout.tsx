import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";

const Layout = () => {
  const location = useLocation();

  const tabs = [
    { name: "Dashboard", path: "/" },
    { name: "Maintenance", path: "/requests" },
    { name: "Maintenance Calendar", path: "/calendar" },
    { name: "Equipment", path: "/equipment" },
    { name: "Reporting", path: "/reporting" },
    { name: "Teams", path: "/teams" },
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <nav style={{ backgroundColor: "white", borderBottom: "1px solid #e5e7eb", padding: "0 24px" }}>
        <div style={{ display: "flex", gap: "32px", height: "60px", alignItems: "center" }}>
          <div style={{ fontWeight: "bold", fontSize: "20px", marginRight: "20px" }}>
            Gear<span style={{ color: "#2563eb" }}>Guard</span>
          </div>

          {tabs.map(tab => {
            const isActive =
              tab.path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(tab.path);

            return (
              <Link
                key={tab.name}
                to={tab.path}
                style={{
                  textDecoration: "none",
                  color: isActive ? "#2563eb" : "#4b5563",
                  fontWeight: isActive ? "600" : "400",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  borderBottom: isActive ? "2px solid #2563eb" : "2px solid transparent",
                }}
              >
                {tab.name}
              </Link>
            );
          })}
        </div>
      </nav>

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
