import { useEffect } from "react";
import PropTypes from "prop-types";
import { Spinner } from "../../../components";
import { useUI } from "../../../hooks/useUI"
import { Footer } from "./components/footer/Footer"
import { Navigation } from "./components/navigation/Navigation"

export const LayoutAbrasa = ({ children }) => {

  const { isLoading, closeSlide } = useUI();

  useEffect(() => {
    closeSlide();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] );

  return (
    <> 
      <Navigation />
      <div className="layout-abrasa animate__animated animate__fadeIn">
        <div className="layout-abrasa__flex">
          <div className="layout-abrasa__container">
            {
              !isLoading
              ? ( children )
              : (<Spinner />) 
            }
          </div>
          <Footer />
        </div>
      </div>
    </>
  )
}

LayoutAbrasa.propTypes = {
  children: PropTypes.node,
};

