
import GroupAvatar from './GroupAvatar'
import RosterAvatar from './RosterAvatar'
import './avatar.less'

export default function Avatar(props){
  const { id, type } = props
  if (type == 'roster') {
    return <RosterAvatar id={id} />
  } else if (type == 'group') {
    return <GroupAvatar id={id} />
  }
}