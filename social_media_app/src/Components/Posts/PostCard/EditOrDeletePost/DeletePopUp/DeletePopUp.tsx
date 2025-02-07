import userService from "../../../../../services/UserService";
import { getToeknState } from "../../../../../Utils";
import { showErrorToast, showSuccessToast } from "../../../../ToastNotifications";
import "./DeletePopUp.css";

interface DataProps {
  postId: number;
  handleBack(): void;
  pullData(): void;
}

export function DeletePopUp(props: DataProps): JSX.Element {

    function handleDelete(){
        if(getToeknState()){
            userService.deletePost(props.postId)
            .then(res=>{
                props.pullData();
                props.handleBack();
                showSuccessToast("Post deleted");
            })
            .catch(err=>showErrorToast(err.response.data));
        }
    }
  return (
    <div className="DeletePopUp">
      <div className="backEditBox">
        <span className="xBack" onClick={() => props.handleBack()}>
          X
        </span>
        <span className="editHaeder">Delete Post</span>
      </div>
      <div style={{width:'100%', display:'flex', textAlign:'center', justifyContent:'center', marginTop:"1rem"}}>
        Are you you want to delete this post?</div>
      <div className="yesOrNo">
        <button className="submitEditsButton" onClick={()=>props.handleBack()}>No</button>
        <button onClick={handleDelete} className="submitEditsButton">Yes</button>
      </div>
    </div>
  );
}
