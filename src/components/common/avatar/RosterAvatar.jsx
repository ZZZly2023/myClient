import icon from '@src/assets/frame/avatar/icon.png'
export default function RosterAvatar(props) {
  const { id, style } = props
  const photo = getPhotoFromId(id) || icon
  return (
    <div className="roster-avatar">
      <img src={ photo } style={ style ? style : {} } />
    </div>
  );
}
function getPhotoFromId(id) {
  return  ''
}