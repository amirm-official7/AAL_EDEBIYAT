// App.js
import React, { useRef, useState, useEffect } from 'react';
import JSONDATA from '../../DATA.json';

import './App.css';



const App = ({ setSteps, steps }) => {
  const [HIGHLEVELDISPLAYWINDOW, SetHIGHLEVELDISPLAYWINDOW] = useState({});
  const [display, SetDisplay] = useState({display: false, url: '', explanation: ""});
  const [displaySlogan, SetDisplaySlogan] = useState({display: false, data: {}});
  
  const [data, setData] = useState([
    // {
    //   TITLE: "YILIN SLOGANLARI", SLOGANS: [
    //     { SLOGAN: "radioactive \r", WRITER: "AMIR M. Y.", CLASSofWRITER: "10/C" },
    //     { SLOGAN: "rasputin \r", WRITER: "AMIR M. Y.", CLASSofWRITER: "10/C" },
    //     // Add more slogans as needed
    //   ]
    // },
  ]);

  useEffect(()=>{
    setData(JSONDATA)
  },[])



  
  return (
    <div className="app">
      <header className="header">
        <div className="logo">AAL edebiyat</div>
      </header>
      <main className="content">
        {data.map((d, index) => {
          console.log(d);
          return (
            <div key={index}>
              <h2 className='sticky-title' style={{margin:"0", width: "100%", background: "white", position: "sticky", top: "0px", textAlign:"center", zIndex: "1" }}><u>{d.TITLE}</u></h2>

              <div>
                {d.DATA.map((i, index)=>{
                  if(i.TYPE == "TEXT"){
                    return (
                      <div className='addheight'>
                        <h3 style={{background: "white", position: "sticky", top: "32px", paddingLeft: "10px", borderBottom: "1px solid #bdbdbd" }}>{i.SUBTITLE}</h3>
                         
                        <div style={{margin: "20px"}}>
                          {/* <div>{i.DATA}</div> */}
                          <div dangerouslySetInnerHTML={{ __html: i.DATA }}/>
                        </div>
                      </div>

                    )
                  }
                  else if (i.TYPE == "SLOGANS"){
                    return (
                      <div>
                        <h3 style={{background: "white", position: "sticky", top: "32px", paddingLeft: "10px", borderBottom: "1px solid #bdbdbd" }}>{i.SUBTITLE}</h3>
                        
                        <div style={{margin: "20px"}}>
                          <ul  className="sloganul">
                            {i.DATA.map((slogan, index)=> {
                              return ( 
                                <li className="sloganli" onClick={()=>SetDisplaySlogan({display: true, data: slogan})} key={index}>{slogan.DATA}</li>    

                              )
                            })}
                          </ul>
                        </div>
                      </div>

                    )
                  } 
                  else if (i.TYPE == "IMGS"){
                    return (
                      
                      <div>
                        <h3 style={{background: "white", position: "sticky", top: "32px", paddingLeft: "10px", borderBottom: "1px solid #bdbdbd" }}>{i.SUBTITLE}</h3>
                        
                        <div className="gallery">
                          {i.DATA.map((img, index)=> {
                            return ( 

                              <div key={index} className="gallery-item">
                                <img onClick={()=> SetDisplay({display: true, url: img.DATA, explanation: "hello world mother fuckers"})}  src={img.DATA} alt={`Picture ${index + 1}`} className="gallery-image" />
                              </div>        

                            )
                          })}      
                        </div>                    
                        <div className='lastelement'></div>
                      </div>
                    
                    )
                  }
                })}
  
              </div>

            </div>
          );
        })}
      </main>
      <div style={{marginTop: "2000px"}}>jsdklfj skljf dskljf lskdjf sklfj sldkfj slkdjf lskdjf klsdjf klsjf lksdjf kl</div>
      
      {display.display? <DisplayOverlay display={display} setDisplay={SetDisplay} />: null}
        
      {displaySlogan.display? <DisplaySloganOverlay displaySlogan={displaySlogan} SetDisplaySlogan={SetDisplaySlogan} />: null}
      
      {console.log(display)}
      <a href="https://github.com/amirm-official7/AAL_EDEBIYAT/" target="_blank">{"github (source code)"}</a>
      <h1>{steps}</h1>
      <button style={{height: "1000px"}} onClick={() => { setSteps(1) }}>change to 1</button>
    </div>
  );
}

export default App;



const DisplayOverlay = ({ display, setDisplay }) => {
  const [IsHorizontal, setIsHorizontal] = useState(true);

  const handleClose = () => {
    setDisplay({display: false, url: '', explanation: ""});
  };

  const handleImageLoad = (event) => {
    const imgElement = event.target;
    const isHorizontal = imgElement.naturalWidth > imgElement.naturalHeight;

    setIsHorizontal(isHorizontal);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 9999,
      }}
      onClick={()=> handleClose()}
    >
      <div>
        <span style={{ cursor: 'pointer', fontSize: '24px', position: "absolute", top: "15px", right: "25px" }} onClick={()=>handleClose()}>
          &#10006;
        </span>
      </div>
      <div className='overlay-image-container'>
        <img src={display.url} onLoad={(e)=> handleImageLoad(e)} style={{width: IsHorizontal ? '100%' : 'auto', height: IsHorizontal ? 'auto' : '80%'}} alt="Overlay" className='overlay-image' />
      </div>
      <div style={{userSelect: "none", display: "block", width: "100%",}}>
        <p style={{width: '80%', textAlign: "center", margin: "5px auto"}}>{display.explanation}</p>
      </div>
    </div>
  );
};



const DisplaySloganOverlay = ({ displaySlogan, SetDisplaySlogan }) => {
  const handleClose = () => {
    SetDisplaySlogan({display: false, data: {}});
  };



  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 9999,
      }}
      onClick={()=> handleClose()}
    >
      <div>
        <span style={{ cursor: 'pointer', fontSize: '20px', position: "absolute", top: "15px", right: "25px" }} onClick={()=>handleClose()}>
          &#10006;
        </span>
      </div>
      <div style={{height: "90%", width: "75%", background: "white", color: "black", padding: '15px', overflow: "scroll"}}>
        <div style={{fontSize: "25px"}}><b>Slogan:</b></div>

        <p style={{color: "black", marginLeft: "15px", marginTop: "10px"}}><b>{displaySlogan.data.DATA}</b></p>
        
        <div style={{fontSize: "25px", marginTop: "25px"}}><b>Anlam:</b></div>

        <p style={{color: "black", marginLeft: "15px", marginTop: "10px"}}><b>{displaySlogan.data.MEANINGOFTHESLOGAN}</b></p>
        

        {(displaySlogan.data.EXPLONATION.length > 0)? 
          <div>
            <div style={{fontSize: "25px", marginTop: "50px", textAlign: "center"}}><b>Açıklama</b></div>
    
            <div style={{marginTop: "15px", height: '1000px'}} dangerouslySetInnerHTML={{ __html: displaySlogan.data.EXPLONATION }}/>

          </div>     
        : null}
      </div>
    </div>
  );
};
