import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getFoodId, cleanDetails } from "../../Redux/Action/action";
import styles from "./CardDetail.module.css";
export const CardDetail = () => {
  const dispatch = useDispatch();
  const details = useSelector((state) => state.detailFood);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getFoodId(id));
  }, [dispatch, id]);

  const handleClean = () => {
    dispatch(cleanDetails());
  };

  console.log(details);
  return (
    <div className={styles.container}>
      {details.name ? (
        <div className={styles.info}>
          <div className={styles.info2}>
            <h1 className={styles.name}>{details.name}</h1>
            <div>
              <img
                className={styles.image}
                src={
                  details.image ||
                  "https://s1.eestatic.com/2015/03/31/cocinillas/cocinillas_22257914_116018277_1706x960.jpg"
                }
                alt=""
              />
            </div>
            <br />
            <div className={styles.score}>
              HealthScore : {details.healthScore}
            </div>
            <br />
            <div className={styles.diets}>
              Diets:
              <br />
              {details.diets.join(" - ")}
            </div>
            <br />
            <div className={styles.dishTypes}>
              {" "}
              DishTypes:
              <br />
              {details.dishTypes}
            </div>
          </div>

          <div className={styles.info3}>
            <br />
            <h1>Sumaary</h1>
            <div>{details.sumary}</div>
            <br />
            <h1>Steps</h1>
            <div>{details.steps.replace(/<[^>]+>/g, "")}</div>
            <br />
          </div>

          <Link to={"/home"}>
            <button onClick={() => handleClean()} className={styles.button}>
              Back
            </button>
          </Link>
        </div>
      ) : (
        <img src="https://i.gifer.com/DGKM.gif" alt="" />
      )}
    </div>
  );
};
