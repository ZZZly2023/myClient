export default function GroupAvater(props) {
  const { id } = props
  const photo = getPhotoFromId(id)
  return (
    <div className="group-avater">
      <img src={ photo } alt="group" />
    </div>
  );
}

function getPhotoFromId(id) {
  return  "@src/assets/avater/default-group.png"
}