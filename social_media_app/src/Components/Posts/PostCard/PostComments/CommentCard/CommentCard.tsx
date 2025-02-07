import { useEffect, useState } from "react";
import { PostComment } from "../../../../../models/PostComment";
import { PostProfile } from "../../PostProfile/PostProfile";
import "./CommentCard.css";
import { getToeknState } from "../../../../../Utils";
import userService from "../../../../../services/UserService";
import { showErrorToast } from "../../../../ToastNotifications";
import { DeleteComment } from "./DeleteComment/DeleteComment";
interface DataProps {
  postComment: PostComment;
  pullData():void
}
export function CommentCard(props: DataProps): JSX.Element {
  const [deleteBox, setDeleteBox] = useState<boolean>(false);
  const [selectVal, setSelectVal] = useState<string>("dot");
  const [owner, setOwner] = useState<boolean>(false);

  useEffect(() => {
    if(getToeknState()){
        userService.getUserDetails()
        .then(res=>{
            if(res.id==props.postComment.commentAuthor.id){
                setOwner(true)
            }
        })
        .catch(err=>showErrorToast(err.response.data));
    }
  }, [selectVal]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === "delete") {
      setDeleteBox(true);
    }
  };

  function handleBack() {
    setSelectVal("dot");
    setDeleteBox(false);
  }

  return (
    <div className="CommentCard">
        {owner&& !deleteBox &&
        <div className="deleteCommentSelect">
           <select className="menuSelectLogin" onChange={handleSelectChange}>
           <option value={selectVal} className="dots">
             • • •
           </option>
           <option value="delete">Delete</option>
         </select>
         </div >
        }
        {deleteBox &&
        <DeleteComment pullData={props.pullData} postComment={props.postComment} handleBack={handleBack}/>
        }
      <PostProfile
        user={props.postComment.commentAuthor}
        datePosted={props.postComment.dateCommented}
      />
      <div className="commentContent">{props.postComment.message}</div>
    </div>
  );
}
