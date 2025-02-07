import { useRef, useState } from "react";
import { User } from "../../../../../models/User";
import { CreatePost } from "../../../../CreatePost/CreatePost";
import "./EditPost.css";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import AddReactionOutlinedIcon from "@mui/icons-material/AddReactionOutlined";
import { Post } from "../../../../../models/Post";
import userService from "../../../../../services/UserService";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../ToastNotifications";
import { getToeknState } from "../../../../../Utils";
import { useNavigate } from "react-router-dom";

interface DataProps {
  pullData(): unknown;
  handleBack(): void;
  user: User;
  post: Post;
}

export function EditPost(props: DataProps): JSX.Element {
  const [content, setContent] = useState<string>(props.post.content);
  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    let post: Post = new Post(
        props.post.id,props.post.datePosted,props.post.author,content,props.post.likeCount);
    if (getToeknState()) {
      userService
        .editPost(post)
        .then((res) => {
          props.pullData();
          showSuccessToast("Post updated");
          props.handleBack();
        })
        .catch((err) => showErrorToast(err.response.data));
    } else {
      navigate("/login");
    }
  }

  return (
    <div className="EditPost">
      <div className="backEditBox">
        <span className="xBack" onClick={() => props.handleBack()}>
          X
        </span>
        <span className="editHaeder">Edit Post</span>
      </div>
      <div className="updatePostContent">
        <form action="" onSubmit={handleSubmit}>
          <textarea
            className="contentareaedit"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button className="submitEditsButton">Update</button>
        </form>
      </div>
    </div>
  );
}
