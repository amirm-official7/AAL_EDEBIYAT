// App.js
import React, { useRef, useState, useEffect } from 'react';
import JSONDATA from '../../DATA.json';

import { Document, Page, pdfjs } from 'react-pdf';

import './App.css';

import axios from 'axios'

import GithubLogo from '../../github_logo.png'




const App = ({ setSteps, steps }) => {
  const [HIGHLEVELDISPLAYWINDOW, SetHIGHLEVELDISPLAYWINDOW] = useState({});
  const [display, SetDisplay] = useState({display: false, url: '', explanation: ""});
  const [displaySlogan, SetDisplaySlogan] = useState({display: false, data: {}});
  const [DisplayDictionary, SetDisplayDictionary] = useState({display: false, word: ""});
  

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
        <div title="Abidinpaşa Anadolu Lisesi dilimizin zenginlikleri projesi" className="logo">DILIMIZIN ZENGINLIKLERI</div>
      </header>
      <main className="content">
        {data.map((d, index) => {
          console.log(d);
          return (
            <div key={index}>
              <h2 className='sticky-title' style={{margin:"0", width: "100%", background: "white", position: "sticky", top: "0px", textAlign:"center", zIndex: "1", color: "orange" }}><u>{d.TITLE}</u></h2>

              {/* <div className="pdf-container">
                <object className="pdf-object" data="https://ahgal.meb.k12.tr/meb_iys_dosyalar/08/03/125513/dosyalar/2018_02/07085232_PYTHON-II.DYNEM.pdf" type="application/pdf">
                  <p>Alternative text - include a link <a href="https://ahgal.meb.k12.tr/meb_iys_dosyalar/08/03/125513/dosyalar/2018_02/07085232_PYTHON-II.DYNEM.pdf">to the PDF!</a></p>
                </object>
              </div> */}
              {/* <PdfViewer pdfFile={"/sozluk.pdf"} startingPage={1}/> */}

              <div>
                {d.DATA.map((i, index)=>{
                  if(i.TYPE === "TEXT"){
                    return (
                      <div className='addheight'>
                        <h3 style={{background: "white", position: "sticky", top: "27px", paddingLeft: "10px", borderBottom: "1px solid #bdbdbd", marginTop: "10px", color: "blue" }}>{i.SUBTITLE}</h3>
                         
                        <div style={{margin: "20px"}}>
                          {/* <div>{i.DATA}</div> */}
                          <div dangerouslySetInnerHTML={{ __html: i.DATA }}/>
                        </div>
                      </div>

                    )
                  }
                  else if (i.TYPE === "SLOGANS"){
                    return (
                      <div>
                        <h3 style={{background: "white", position: "sticky", top: "27px", paddingLeft: "10px", borderBottom: "1px solid #bdbdbd", color: "blue" }}>{i.SUBTITLE}</h3>
                        
                        <div style={{margin: "20px"}}>
                          <ul  className="sloganul">
                            {i.DATA.map((slogan, index)=> {
                              return ( 
                                <li className="sloganli" onClick={()=>SetDisplaySlogan({display: true, data: slogan})} key={index}>{slogan.DATA} 
                                  <span className="spanTDK">{"[anlamı]"}</span>
                                </li>    

                              )
                            })}
                          </ul>
                        </div>
                      </div>

                    )
                  } 
                  else if (i.TYPE === "IMGS"){
                    return (
                      
                      <div>
                        <h3 style={{background: "white", position: "sticky", top: "27px", paddingLeft: "10px", borderBottom: "1px solid #bdbdbd", color: "blue" }}>{i.SUBTITLE}</h3>
                        
                        <div className="gallery">
                          {i.DATA.map((img, index)=> {
                            return ( 

                              <div key={index} className="gallery-item">
                                <img onClick={()=> SetDisplay({display: true, url: img.DATA, explanation: img.EXPLONATION})}  src={img.DATA} alt={`Picture ${index + 1}`} className="gallery-image" />
                              </div>        

                            )
                          })}      
                        </div>                    
                        <div className='lastelement'></div>
                      </div>
                    
                    )
                  }
                  else if (i.TYPE === "DICTIONARY"){
                    return (
                      <div>
                        <h3 style={{background: "white", position: "sticky", top: "27px", paddingLeft: "10px", borderBottom: "1px solid #bdbdbd", color: "blue" }}>{i.SUBTITLE}</h3>
                        
                        <div style={{margin: "20px"}}>
                          <ul  className="sloganul">
                            {i.DATA.map((word, index)=> {
                              return ( 
                                <li style={{cursor: "default"}} className="sloganli"  key={index}>
                                  
                                  {word.DATA} = {word.MEANING}
                                  <span> </span>
                                  <span onClick={()=>SetDisplayDictionary({display: true, word: word.DATA})} className="spanTDK" style={{cursor: "pointer"}}> 
                                      {"[TDK]"}
                                  </span>
                                  
                                </li>    

                              )
                            })}
                          </ul>
                        </div>
                        <div style={{textAlign: "center"}}>
                          <a className="orange-button" href="/sozluk.pdf" target="_blank">Devamını Oku</a>

                        </div>
                      </div>

                    )
                  }
                })}
  
              </div>

            </div>
          );
        })}
      </main>
      {/* <div style={{marginTop: "2000px"}}>jsdklfj skljf dskljf lskdjf sklfj sldkfj slkdjf lskdjf klsdjf klsjf lksdjf kl</div> */}
      
      {display.display? <DisplayOverlay display={display} setDisplay={SetDisplay} />: null}
        
      {displaySlogan.display? <DisplaySloganOverlay displaySlogan={displaySlogan} SetDisplaySlogan={SetDisplaySlogan} />: null}
      
      {DisplayDictionary.display? <DisplayDictionaryOverlay DisplayDictionary={DisplayDictionary} SetDisplayDictionary={SetDisplayDictionary}/>:null}

      <footer className="footer">
        <a href="https://github.com/amirm-official7/AAL_EDEBIYAT/" target="_blank" className="footer-link">
          <div>
            <img src={GithubLogo} alt="GitHub Logo" className="github-logo" />
            <span>GitHub</span>

          </div>
        </a>
      </footer>
      {/* {console.log(display)} */}
      {/* <a href="https://github.com/amirm-official7/AAL_EDEBIYAT/" target="_blank">{"github (source code)"}</a> */}
      {/* <h1>{steps}</h1>
      <button style={{height: "1000px"}} onClick={() => { setSteps(1) }}>change to 1</button> */}
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


  const handleOverlayClick = (e) => {
    // Check if the clicked element or any ancestor has the class 'sloganoverlaycontainer'
    if (e.target.closest('.sloganoverlaycontainer')) {
      // Don't close the overlay if clicked within the element with class 'sloganoverlaycontainer'
      return;
    }

    // Close the overlay for all other areas
    handleClose();
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
      onClick={(e)=> handleOverlayClick(e)}
    >
      <div>
        <span style={{ cursor: 'pointer', fontSize: '20px', position: "absolute", top: "15px", right: "25px" }} onClick={(e)=>handleOverlayClick(e)}>
          &#10006;
        </span>
      </div>
      <div className="sloganoverlaycontainer" style={{height: "90%", width: "75%", background: "white", color: "black", padding: '15px', overflowY: "scroll", borderRadius:"25px", cursor: "default"}}>
        <div style={{fontSize: "25px", color: "blue"}}><b>Slogan:</b></div>

        <p style={{color: "black", marginLeft: "15px", marginTop: "10px"}}><b>{displaySlogan.data.DATA}</b></p>
        

        {(displaySlogan.data.MEANINGOFTHESLOGAN.length > 0)?
        <div>
          <div style={{fontSize: "25px", marginTop: "25px", color: "orange"}}><b>Anlam:</b></div>
  
          <p style={{color: "black", marginLeft: "15px", marginTop: "10px"}}><b>{displaySlogan.data.MEANINGOFTHESLOGAN}</b></p>

        </div>
        : 
        <div>
          <div style={{fontSize: "25px", marginTop: "25px", color: "orange"}}><b>Anlam:</b></div>

          <p style={{color: "black", marginLeft: "15px", marginTop: "10px", color: "red"}}><b>Anlam Bulunamadi</b></p>

        </div>
        }
        

        {(displaySlogan.data.EXPLONATION.length > 0)? 
          <div >
            <div style={{fontSize: "25px", marginTop: "50px", textAlign: "center"}}><b>Açıklama</b></div>
    
            <div style={{marginTop: "15px", height: '1000px'}} dangerouslySetInnerHTML={{ __html: displaySlogan.data.EXPLONATION }}/>

          </div>     
        : null}

        <div style={{position: "absolute", bottom: "10px", right: "10px", fontSize: "25px"}}>
          <b>
            {displaySlogan.data.CREATOR} - {displaySlogan.data.CLASSOFCREATOR}


          </b>

        </div>
      </div>
    </div>
  );
};



const DisplayDictionaryOverlay = ({ DisplayDictionary, SetDisplayDictionary }) => {
  const [WordData, setWordData] = useState({})

  const [IsLoading, setIsLoading] = useState(true)

  
  const handleClose = () => {
    setIsLoading(true)
    setWordData({})
    SetDisplayDictionary({display: false, word: ""})  
  };


  const handleOverlayClick = (e) => {
    // Check if the clicked element or any ancestor has the class 'sloganoverlaycontainer'
    if (e.target.closest('.sloganoverlaycontainer')) {
      // Don't close the overlay if clicked within the element with class 'sloganoverlaycontainer'
      return;
    }

    // Close the overlay for all other areas
    handleClose();
  };




  const constTDKuri = "https://sozluk.gov.tr/"

  const resultsOfTdk = async (searching) => {
    setIsLoading(true)
    try {
      const { data } = await axios(
        `${constTDKuri}gts?ara=` + encodeURI(searching.toLocaleLowerCase("tr"))
      );
      setWordData(data[0])
      console.log(data[0]);
      setIsLoading(false)
    } catch (e) {
      console.error(e);
      handleClose()
    }
  };
  useEffect(()=>{
    resultsOfTdk(DisplayDictionary.word)
    setIsLoading(true)

  },[])

  if(IsLoading){
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
        onClick={(e)=> handleOverlayClick(e)}
      >
        <div>
          <span style={{ cursor: 'pointer', fontSize: '20px', position: "absolute", top: "15px", right: "25px" }} onClick={(e)=>handleOverlayClick(e)}>
            &#10006;
          </span>
        </div>
        <div className="sloganoverlaycontainer" style={{height: "90%", width: "75%", background: "white", color: "black", padding: '15px', overflowY: "scroll", borderRadius:"25px", cursor: "default"}}>
          <div class="loading-container">
            <div class="loading-dot"></div>
            <div class="loading-dot"></div>
            <div class="loading-dot"></div>
          </div>
        </div>
      </div>
    );
  }

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
      onClick={(e)=> handleOverlayClick(e)}
    >
      <div>
        <span style={{ cursor: 'pointer', fontSize: '20px', position: "absolute", top: "15px", right: "25px" }} onClick={(e)=>handleOverlayClick(e)}>
          &#10006;
        </span>
      </div>
      <div className="sloganoverlaycontainer" style={{height: "90%", width: "75%", background: "white", color: "black", padding: '15px', overflowY: "scroll", borderRadius:"25px", cursor: "default"}}>
        <div className="TDKOVERLAYWORD" >{WordData.madde}</div>
        <div className="TDKOVERLAYTELAFFUZ">
          {'('}{WordData.telaffuz}{'), '}{WordData.lisan}
        </div>
        {WordData.anlamlarListe.map((anlam, index)=>{
          return <p className="TDKOVERLAYWORDMEANING"><b>{anlam.anlam_sira}{'. '}</b> {anlam.anlam}</p>
        })}
      </div>
    </div>
  );
};


pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;


// const PdfViewer = ({ pdfFile, startingPage }) => {
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(startingPage);

//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   };

//   const goToPreviousPage = () => {
//     setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
//   };

//   const goToNextPage = () => {
//     setPageNumber((prevPageNumber) => Math.min(prevPageNumber + 1, numPages));
//   };

//   return (
//     <div>
//       <nav>
//         <button onClick={() => goToPreviousPage()} disabled={pageNumber <= 1}>
//           Previous
//         </button>
//         <button onClick={() => goToNextPage()} disabled={pageNumber >= numPages}>
//           Next
//         </button>
//       </nav>

//       <div>
//         <Document file={pdfFile}>
//           <Page pageNumber={pageNumber} />
//         </Document>
//       </div>

//       <p>
//         Page {pageNumber} of {numPages}
//       </p>
//     </div>
//   );
// };