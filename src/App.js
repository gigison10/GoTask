import "./App.scss";
import Header from "./components/header/header";
import SideMenu from "./components/side-menu/side-menu";
import SideMenuContent from "./components/side-menu-content/side-menu-content";
import Footer from "./components/footer/footer";

function App() {
  return (
    <div className="container">
      <Header />
      <main className="hero-section">
        <SideMenu />
        <SideMenuContent />
      </main>
      <Footer />
    </div>
  );
}

export default App;
