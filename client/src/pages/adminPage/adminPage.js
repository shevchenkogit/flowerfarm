import {NavLink, Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { useEffect, useState } from "react";

import { userActions } from "../../redux/slices/userSlice";

import css from "./adminPage.module.css"

const AdminPage = ()=>{

  const {TokenA} = useSelector(state => state.user)
  const [state, setState] = useState(false)
  const [adminShow, setAdminShow] = useState(false)
  const queryParams = new URLSearchParams(window.location.search)
  const dispatch = useDispatch()
  const adminT = localStorage.getItem("accessToken")

  

  useEffect(()=>{
    
    if(queryParams.size === 1){
      const token = queryParams.get("token")
      localStorage.setItem("accessToken", token)
  }
    if(!state){
      if(adminT !== undefined || null){
        dispatch(userActions.checkToken(adminT))
      }

    setState(true)
    }

    if (TokenA !== null || undefined) {
      if(TokenA.ATokenA === 1){
        setAdminShow(true)
      }
    }
  },[dispatch, TokenA, state, adminT])

    return(
        <div>{adminShow&&  
        <div className={css.Main}>
          <div className={css.LeftDiv}>
              <ul>
                <li><button className={css.liClose}>
                  <NavLink to={"addNewPlants"}>Додати новий товар </NavLink>
                  </button></li>
                <li ><button className={css.liClose}> 
                  <NavLink to={"allPlants"}> Всі товари</NavLink>
                </button></li>
                <li ><button className={css.liClose}> 
                  <NavLink to={"message"}>Повідомлення</NavLink>
                </button></li>
                <li ><button className={css.liClose}> 
                  <NavLink to={"users"}>Користувачі</NavLink>
                </button></li>
              </ul>
          </div>
          <div className={css.RightDiv}>
            <Outlet/>
          </div>
      </div>}
    </div>
  )
}

export {AdminPage}