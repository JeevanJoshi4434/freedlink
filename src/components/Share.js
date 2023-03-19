import React, { useEffect, useState } from "react";
import ShareModal from "./ShareModal";
import { shareOnMobile } from "react-mobile-share";

function ShareContent({ label, text, title,url }) {
    const [showModal, setShowModal] = useState(false);
    const [basicShare, setBasicShare] = useState(false);
    // const canonical = document.querySelector("link[rel=canonical]");
    // let url = canonical ? canonical.href : document.location.href;
    const shareDetails = { url, title, text };
  
    const handleSharing = async () => {
      if (navigator.share) {
        try {
          await navigator
            .share(shareDetails)
            .then(() =>
              console.log("Hooray! Your content was shared to tha world")
            );
        } catch (error) {
          // console.log(`Oops! I couldn't share to the world because: ${error}`);
        }
      } else {
        // fallback code
        shareOnMobile({
          title: `${title}`,
                text: `${text}`,
                url: `${url}`,
        })
        setBasicShare(true); //this is the line added in this snippet
        // .... other code statement below
        // console.log(
          // "Web share is currently not supported on this browser. Please provide a callback"
        // );
      }
    };
    
    return (
        <>
          <button style={{color:"gray",border:"none",backgroundColor:"rgba(123,123,123,0)"}} onClick={handleSharing}>
            <p style={{color:"gray",border:"none",backgroundColor:"rgba(123,123,123,0)"}} className="sharer-button-text">{label}</p>
          </button>
        <ShareModal
        modalVisible={showModal} shareData={shareDetails} handleClose={setShowModal}
         />
        </>
      );
  }
export default ShareContent;