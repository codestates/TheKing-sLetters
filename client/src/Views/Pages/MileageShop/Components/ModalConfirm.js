import styled from 'styled-components';
import React, { useState, useEffect, useRef } from "react";
import loadingIcon from "./Assets/loading-1.svg";

const ConfirmModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ConfirmModalView = styled.div`
  position: relative;
  border-radius: 10px;
  width: 30%;
  height: 30%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > .modal_close_icon {
    position: absolute;
    top: 1em;
    right: 1em;
  }
  > .modal_confirm_msg {
  }
  > .modal_loading_icon {
    width: 20%;
    height: 20%;
  }
  > .modal_button_container{
    position: absolute;
    bottom: 1em;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1em;
    > .modal_confirm_yes {

    }
    > .modal_confirm_no {

    }
  }
`;

const ModalConfirm = () => {
  return (

  );
};

export default ModalConfirm;