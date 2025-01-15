import icon from '@src/assets/frame/avater/icon.png'
export default function RosterAvater(props) {
  const { id, style } = props
  const photo = getPhotoFromId(id) || icon
  return (
    <div className="roster-avater">
      <img src={ photo } style={ style ? style : {} } />
    </div>
  );
}
function getPhotoFromId(id) {
  return  ''
}