import React from 'react'
import { useRecoilState } from 'recoil'
import { ProfileState } from '../../../recoil/modelAtom'
import "./SidebarOptions.css"

function SidebarOption({active, text, Icon}) {

  const [navProf,setNavProf] = useRecoilState(ProfileState);
  return (
    <div className= {`sidebarOption ${navProf && 'sidebarOption--active'}`} >
        <Icon></Icon>
        <span>{text}</span>
    </div>
  )
}

export default SidebarOption
