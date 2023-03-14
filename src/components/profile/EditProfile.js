import React, { useState } from 'react'

const EditProfile = (props) => {
    const [bio, setBio] = useState(`${props.bio}`)
    const [name, setName] = useState(props.name)
    const [checked, setChecked] = useState(false);
    const [shortbio, setShortbio] = useState(props.shortbio)
    const [skill, setSkill] = useState('')
    const handleCheckedChange = e => {
        setChecked(checked ? false : true);
    }

    return (
        <div className='editProfileSection'>
            <div>
                <img src={props.cover} className='ProfileCoverEdit' />
                <div style={{display:"flex", flexDirection:"row"}} >
                    <img src={props.profile} style={{ width: "75px", height: '75px', borderRadius: '50%' }} />
                    <div style={{display:"flex", flexDirection:"column"}}  >
                        <h4 style={{ fontSize: "10px" }} >Name</h4>
                        <input type='text' placeholder={`Bio`} value={name} onChange={(e) => setName(e.target.value)} style={{ margin: "10px 10px", color: "#000", fontSize: "14px", borderTop: "none", borderRight: "none", borderLeft: "none", borderBottom: "1px solid rgb(170,170,170)", height: "40px" }} />
                    </div>
                    <div style={{display:"flex", flexDirection:"column"}} >
                        <h4 style={{ fontSize: "10px" }} >short-bio</h4>
                        <input type='text' placeholder={`Bio`} value={shortbio} onChange={(e) => setName(e.target.value)} style={{ margin: "10px 10px", color: "#000", fontSize: "14px", borderTop: "none", borderRight: "none", borderLeft: "none", borderBottom: "1px solid rgb(170,170,170)", height: "40px" }} />
                    </div>
                </div>
            </div>
            <div style={{ margin: "10px 10px", display: "flex", flexDirection: "column", overflow: 'auto' }} >
                <h4 style={{ fontSize: "10px" }} >Bio</h4>
                <input type='text' placeholder={`Bio`} value={bio} onChange={(e) => setBio(e.target.value)} style={{ margin: "10px 10px", color: "#000", fontSize: "14px", borderTop: "none", borderRight: "none", borderLeft: "none", borderBottom: "1px solid rgb(170,170,170)", height: "40px" }} />
            </div>
            <div style={{ margin: "10px 10px", display: "flex", flexDirection: "column" }} >
                <h4 style={{ fontSize: "10px" }} >Add Work Experience</h4>
                <div style={{ display: "flex", flexDirection: "column" }} >
                    <div style={{ display: "flex" }} >
                        <input type='text' placeholder={`Company Name`} onChange={(e) => e.target.value} style={{ margin: "10px 10px", color: "#000", fontSize: "14px", borderTop: "none", borderRight: "none", borderLeft: "none", borderBottom: "1px solid rgb(170,170,170)", height: "40px" }} />
                        <input type='text' placeholder={`Position`} onChange={(e) => e.target.value} style={{ margin: "10px 10px", color: "#000", fontSize: "14px", borderTop: "none", borderRight: "none", borderLeft: "none", borderBottom: "1px solid rgb(170,170,170)", height: "40px" }} />
                    </div>
                    <div style={{ margin: "10px 10px", display: "flex", flexDirection: "flex" }} >

                        <div>
                            <p style={{ fontSize: "10px" }} >From</p>
                            <input type='date' onChange={(e) => e.target.value} style={{ margin: "10px 10px", color: "#000", fontSize: "14px", borderTop: "none", borderRight: "none", borderLeft: "none", borderBottom: "1px solid rgb(170,170,170)", height: "40px" }} />
                        </div>
                        {!checked && <div>
                            <p style={{ fontSize: "10px" }} >to</p>
                            <input type='date' onChange={(e) => e.target.value} style={{ margin: "10px 10px", color: "#000", fontSize: "14px", borderTop: "none", borderRight: "none", borderLeft: "none", borderBottom: "1px solid rgb(170,170,170)", height: "40px" }} />
                        </div>}
                        <div>
                            <p style={{ fontSize: "10px" }} >Currently Working</p>
                            <input type='checkbox' onChange={handleCheckedChange} />
                        </div>

                    </div>

                </div>
            </div>
            <div style={{ margin: "10px 10px", display: "flex", flexDirection: "column" }} >
                <h4 style={{ fontSize: "10px" }} >Add Education </h4>
                <div style={{ display: "grid", }} >
                    <input type='text' placeholder={`University Name`} onChange={(e) => e.target.value} style={{ margin: "10px 10px", color: "#000", fontSize: "14px", borderTop: "none", borderRight: "none", borderLeft: "none", borderBottom: "1px solid rgb(170,170,170)", height: "40px" }} />
                    <input type='text' placeholder={`degree`} onChange={(e) => e.target.value} style={{ margin: "10px 10px", color: "#000", fontSize: "14px", borderTop: "none", borderRight: "none", borderLeft: "none", borderBottom: "1px solid rgb(170,170,170)", height: "40px" }} />
                    <div style={{ margin: "10px 10px", display: "flex", flexDirection: "flex" }} >

                        <div>
                            <p style={{ fontSize: "10px" }} >From</p>
                            <input type='date' onChange={(e) => e.target.value} style={{ margin: "10px 10px", color: "#000", fontSize: "14px", borderTop: "none", borderRight: "none", borderLeft: "none", borderBottom: "1px solid rgb(170,170,170)", height: "40px" }} />
                        </div>
                        <div>
                            <p style={{ fontSize: "10px" }} >to</p>
                            <input type='date' onChange={(e) => e.target.value} style={{ margin: "10px 10px", color: "#000", fontSize: "14px", borderTop: "none", borderRight: "none", borderLeft: "none", borderBottom: "1px solid rgb(170,170,170)", height: "40px" }} />
                        </div>
                    </div>

                </div>
            </div>
            <div style={{ margin: "10px 10px", display: "flex", flexDirection: "column" }} >
                <h4 style={{ fontSize: "10px" }} >Add Skills</h4>
                <div>
                <input type='text' placeholder={`Java HTML C++...`} onChange={(e) => setSkill(e.target.value)} style={{ margin: "10px 10px", color: "#000", fontSize: "14px", borderTop: "none", borderRight: "none", borderLeft: "none", borderBottom: "1px solid rgb(170,170,170)", height: "40px" }} />
                {skill === '' ? <span className='material-icons' style={{color:"skyblue"}} >done</span>
                :<span className='material-icons' style={{color:"#00b5ff"}} >check</span>
                }</div>
            </div>
            <div style={{ margin: "10px 10px", display: "flex", flexDirection: "column" }} >
                <h4 style={{ fontSize: "10px" }} >Add Project</h4>
                <div>
                    <input type='text' placeholder={`Name`} onChange={(e) => e.target.value} style={{ margin: "10px 10px", color: "#000", fontSize: "14px", borderTop: "none", borderRight: "none", borderLeft: "none", borderBottom: "1px solid rgb(170,170,170)", height: "40px", width: "190px" }} />
                    <input type='text' placeholder={`Website link`} onChange={(e) => e.target.value} style={{ margin: "10px 10px", color: "#000", fontSize: "14px", borderTop: "none", borderRight: "none", borderLeft: "none", borderBottom: "1px solid rgb(170,170,170)", height: "40px" }} />
                    <input type='text' placeholder={`More Detail`} onChange={(e) => e.target.value} style={{ margin: "10px 10px", color: "#000", fontSize: "14px", borderTop: "none", borderRight: "none", borderLeft: "none", borderBottom: "1px solid rgb(170,170,170)", height: "40px", width: "80%" }} />
                </div>
            </div>
        </div>
    )
}

export default EditProfile