import Topbar from "../../components/top-bar/topbar";
import Feed from "../../components/feed/feed";
import RightBar from "../../components/right-bar/rightbar";
import Sidebar from "../../components/side-bar/sidebar";
import "./Home.css";

function Home() {


  return (
    <>
      <div className="full" >
        <Topbar/>
        <div className="homeContainer">
          <Sidebar />
          <Feed />
          <RightBar />
        </div>
      </div>
    </>
  );
}

export default Home;
