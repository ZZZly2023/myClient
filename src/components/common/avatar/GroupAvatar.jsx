export default function GroupAvatar(props) {
  const { id } = props
  const photo = getPhotoFromId(id)
  return (
    <div className="group-avatar">
      <img src={ photo } alt="group" />
    </div>
  );
}

function getPhotoFromId(id) {
  return  "@src/assets/avatar/default-group.png"
}