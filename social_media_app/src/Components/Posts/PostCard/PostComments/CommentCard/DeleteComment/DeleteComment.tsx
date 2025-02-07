import { PostComment } from "../../../../../../models/PostComment";
import userService from "../../../../../../services/UserService";
import { getToeknState } from "../../../../../../Utils";
import { showErrorToast, showSuccessToast } from "../../../../../ToastNotifications";
import "./DeleteComment.css";

interface DataProps {
    postComment:  PostComment;
    handleBack(): void;
    pullData(): void;
  }

export function DeleteComment(props:DataProps): JSX.Element {

    function handleDelete(){
        if(getToeknState()){
            userService.deletePostComment(props.postComment.id)
            .then(res=>{
                props.pullData();
                props.handleBack();
                showSuccessToast("Comment deleted");
            })
            .catch(err=>showErrorToast(err.response.data));
        }
    }

    return (
        <div className="DeleteComment">
			 <div className="backEditBox">
        <span className="xBack" onClick={() => props.handleBack()}>
          X
        </span>
        <span className="editHaeder">Delete comment</span>
      </div>
      <div style={{width:'100%', display:'flex', textAlign:'center', justifyContent:'center', marginTop:"1rem"}}>
        Are you you want to delete this comment?</div>
      <div className="yesOrNo">
        <button className="submitEditsButton" onClick={()=>props.handleBack()}>No</button>
        <button onClick={handleDelete} className="submitEditsButton">Yes</button>
      </div>
        </div>
    );
}
