import { useNavigate } from "react-router-dom";
import "./EditOrDeletePost.css";
import { useEffect, useState } from "react";
import { getToeknState } from "../../../../Utils";
import userService from "../../../../services/UserService";
import { showErrorToast } from "../../../ToastNotifications";
import { User } from "../../../../models/User";
import { EditPost } from "./EditPost/EditPost";
import { Post } from "../../../../models/Post";
import { DeletePopUp } from "./DeletePopUp/DeletePopUp";

interface DataProps {
  user: User;
  pullData():void
  post:Post
}

export function EditOrDeletePost(props:DataProps): JSX.Element {

    const navigate = useNavigate();
    const [selectVal, setSelectVal] = useState<string>("dot");
    const [owner,setOwner] = useState<boolean>(false);
    const [edit,setEdit] = useState<boolean>(false);
    const [deleteBox,setDeleteBox] = useState<boolean>(false);

    useEffect(()=>{

    },[selectVal])
  
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      if (event.target.value === "edit") {
        setSelectVal("dot")
        setEdit(true)
      }
      if(event.target.value==="delete"){
        setDeleteBox(true)
      }
    };

    function handleBack(){
        setSelectVal("dot")
        setEdit(false)
        setDeleteBox(false)
    }
  

    return (
        <div className="EditOrDeletePost">
		{!edit&&!deleteBox&&
          <select className="menuSelectLogin" onChange={handleSelectChange}>
          <option value={selectVal} className="dots" >
            • • •
          </option>
          <option value="edit" className="selscted" >
            Edit
          </option>
          <option value="delete">
              Delete
          </option>
        </select>
        }	 
       
       {edit&& <EditPost post={props.post} handleBack={handleBack} user={props.user} pullData={props.pullData}/>}
       {deleteBox&& <DeletePopUp postId={props.post.id} handleBack={handleBack} pullData={props.pullData}/>}
        </div>
    );
}
