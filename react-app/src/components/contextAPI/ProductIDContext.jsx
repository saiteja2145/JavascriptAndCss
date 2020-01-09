import React, { createContext, useState, useEffect } from "react";
import Axios from "axios";
import { axiosFailureResponseHandler } from "../../axios/axiosResponseHandler";
import { Loader } from "../Utils/Loader";
import { setToken } from "../../axios/axios";

export const ProductIDContext = createContext();

const ProductIDProvider = props => {
  const [productID, setProductID] = useState("WAC540");
  const [triRadioCheck, setTriRadioCheck] = useState(false);
  const [wifiRadios, setWifiRadios] = useState([]);
  const [radios, setRadios] = useState([]);
  /*  useEffect(() => {
    Axios.post("/APtype", {
      productId: ""
    })
      .then(res => {
        setProductID(res.data.productID);
        if (
          res.data.productID === "WAC540" ||
          this.state.productID === "WAC564"
        ) {
          setTriRadioCheck(true);
          setWifiRadios(["wlan0", "wlan1", "wlan2"]);
          setRadios(["2.4 GHz", "5 GHz Low", "5GHz High"]);
        } else {
          setTriRadioCheck(false);
          setWifiRadios(["wlan0", "wlan1"]);
          setRadios(["2.4 GHz", "5 GHz"]);
        }
        setToken();
      })
      .catch(err => axiosFailureResponseHandler(err));
  }, []); */

  return (
    <ProductIDContext.Provider
      value={{
        productID,
        triRadioCheck,
        wifiRadios,
        radios
      }}
    >
      {productID ? props.children : <Loader type="Loading" />}
    </ProductIDContext.Provider>
  );
};

export default ProductIDProvider;
