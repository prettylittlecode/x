import Feed from "../../components/Home/Feed/Feed";
import Sidebar from "../../components/Home/Sidebar/Sidebar";
import Widgets from "../../components/Home/Widgets/Widgets";
import { useNavigate } from "react-router-dom";
import "../home/Home.css";
import { Profile } from "../../components/Home/Profile/Profile";
import { modelState, ProfileState,TweetPageState } from "../../recoil/modelAtom";
import { useRecoilState } from "recoil";
import { CommentModel } from "../../components/Home/Feed/CommentModel";
import { PostPage } from "../../components/Home/PostPage/PostPage";
export const ProfilePage = ()=>{
    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem('AuthToken'));
    if (!user){
        navigate('/')
    }
    const [navProf,setNavProf] = useRecoilState(ProfileState);
    const [IsOpen,setIsOpen] = useRecoilState(modelState);
    const [postpage,setPostpage] = useRecoilState(TweetPageState);
    return (
        <div className="home">

          <Sidebar/>
          <Profile/>

      {IsOpen && <CommentModel/>}
      <Widgets />
    </div>
  );
};
