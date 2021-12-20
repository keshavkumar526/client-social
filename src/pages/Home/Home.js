import Topbar from "../../components/top-bar/topbar";
import Feed from "../../components/feed/feed";
import RightBar from "../../components/right-bar/rightbar";
import Sidebar from "../../components/side-bar/sidebar";
import "./Home.css";

function Home() {
  // const [notifications, setNotifications] = useState([]);

  // const socket = useRef();

  // useEffect(() => {
  //   socket.current = io("http://localhost:5000");
  //   socket.current.on("getNotification", (data) => {
  //     setNotifications(data);
  //   });
  // }, []);
  // console.log(notifications);

  // useEffect(() => {
  //   socket.current.emit("newUser", user);
  // }, [socket, user]);

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
