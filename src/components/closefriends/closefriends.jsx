import "./closefriends.css"

export default function CloseFriends({user}) {
    return (
        <div>
            <li className="sideBarFriend">
                <img src={ user.profilePicture} alt="" className="sideBarImage" />
                <span className="sideBarFriend">{user.username}</span>
            </li>
        </div>
    )
}
