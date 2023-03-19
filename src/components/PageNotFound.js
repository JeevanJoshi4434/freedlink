import React from 'react'
import notFound from './Assets/undraw_page_not_found_re_e9o6.svg'
const PageNotFound = () => {
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                            <img src={notFound} alt='Coming Soon...' style={{height:"40%",width:"40%"}} />

                            <div>
                                <h4 style={{ fontSize: "30px", fontWeight: "500" }} >404 Page Not Found!</h4>
                                <p>try to do this: <br/> check whether URL is correct <br/> check if this page exists. <br/> maybe you are not allowed to access this page!</p>
                            </div>
        </div>
  )
}

export default PageNotFound