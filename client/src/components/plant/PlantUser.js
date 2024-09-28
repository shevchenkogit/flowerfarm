import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";

import {plantsActions} from "../../redux";

import css from "./plantUser.module.css"
// nano /root/coreflowersite/client/src/components/plant/plantUser.module.css
const PlantUser = (p) => {
    const navigate  = useNavigate()
    const dispatch = useDispatch()
    const {PlantName, price, cropImage, noOnStorage} = p.p
    

    const onClick = async (object) =>{
        navigate("/plantsCardPage")
        dispatch(plantsActions.objectCard(object))
    }

    return(
        <div >
            <div className={noOnStorage === 1 ? css.DontHave : css.plantUser}>
                <div className={css.ImageDiv} >
                    <img prop="img" alt="img" className={noOnStorage === 1 ? css.DontHaveImg : css.Image }src={cropImage}/>
                </div>
                    <div className={css.divph1}><h3 className={css.ph1}>{PlantName}</h3></div>
                    {noOnStorage === 1 ?  <div className={css.priceDiv}><h2>Немає в наявності</h2> </div> :
                    <div className={css.priceDiv}><h2>{price} грн</h2> </div>}

                <div className={css.buttonDiv}>
                    <button className={css.button} onClick={()=> onClick(p) }>Дізнатися більше</button>
                </div>

            </div>
        </div>
    )
}

export {PlantUser}