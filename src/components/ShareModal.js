import React, { Fragment } from "react";
function ShareModal({ modalVisible, shareData, handleClose }) {
 
 
    if(modalVisible)
    return (
    <>
      <div className={`${"share-modal"} ${modalVisible ? "opened" : "closed"}`}>
        <section className="modal-header">
          <h3 className="modal-title">Share Via</h3>
          <button className="close-button" onClick={() => handleClose(false)}>
            &times;
          </button>
        </section>
        <section className="modal-footer">
          <div className="modal-footer-link">{shareData?.url}</div>
          <button className="modal-footer-button" onClick={() => {navigator.clipboard.writeText(`${shareData?.url}`)}}  >Copy Link</button>
        </section>
      </div>
    </>
  );
}
export default ShareModal;