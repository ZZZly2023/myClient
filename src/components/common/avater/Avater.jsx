
import GroupAvater from './GroupAvater'
import RosterAvater from './RosterAvater'
import './avater.less'

export default function Avater(props){
  const { id, type } = props
  if (type == 'roster') {
    return <RosterAvater id={id} />
  } else if (type == 'group') {
    return <GroupAvater id={id} />
  }
}