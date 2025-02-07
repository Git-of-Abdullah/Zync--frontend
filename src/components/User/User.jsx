import "./User.css"


export const User = ({name,pfp}) => {
    return (
        <div className="user">
         <img src={pfp} alt="" />
         <p>{name}</p>
        </div>
      )
}
