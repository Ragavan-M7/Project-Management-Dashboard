import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "../../css/Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="d-flex">

      <Sidebar />

      <div className="flex-grow-1 main-content" style={{ background: "#f8f9fa", minHeight: "100vh" }}>
        <Navbar />

        <div className="container-fluid p-3">
          {children}
        </div>
      </div>

    </div>
  );
};

export default Layout;