import { useState } from "react"
import { NavLink } from "react-router-dom"

import css from "./menuForm.module.css"

const MenuFormM = () => {

  const [userMenu, setUserMenu] = useState(false)

  const onClick = () => {
    setUserMenu(true)
  }


  const closeMenu = () => {
    setUserMenu(false)
  }


  return(
      <div >
        <button className={userMenu ? css.ButtonNon : css.Button } onClick={ () => onClick() }>Меню</button>
           {userMenu&&<div className={css.miniMenu}>
            <ul>
                <li><NavLink className={css.liClose}  to={"/new"}> Новинки </NavLink></li>
                <li><NavLink className={css.liClose}  to={"/allPlants"}> Всі товари </NavLink></li>
                <li><NavLink className={css.liClose}  to={"/forSell"}> Розпродаж </NavLink></li>
                <li><NavLink className={css.liClose}  to={"/contacts"}> Контакти </NavLink></li>
                <li><NavLink className={css.liClose}  onClick={ () => closeMenu() }> Закрити </NavLink></li>
                {/* <li className={css.liClose} onClick={ () => closeMenu() }> закрити </li> */}
            </ul>
            
          </div>
          }
      </div>
  )
}

export {MenuFormM}