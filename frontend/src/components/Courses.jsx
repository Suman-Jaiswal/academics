import { faCaretDown, faCaretUp, faExternalLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import AddCourse from './AddCourse'
import AddLinks from './AddLinks';
import DeleteCourse from './DeleteCourse';
import DeleteLink from './DeleteLink';
import EditCourse from './EditCourse';

export default function Courses({ links, courses }) {

   const [show, setShow] = useState([])

   const handleClick = (code) => {
      if (show.includes(code)) {
         const filtered = show.filter(x => x !== code);
         setShow(filtered)
      }
      else {
         const arr = [...show, code];
         setShow(arr)
      }

   }

   return (
      <div className='course-wrapper p-3'
         style={{
            border: "1px solid #333",
            borderRadius: 10,
            height: 420,
            overflowY: "auto",
         }}>
         <div className="header d-flex justify-content-between">
            <div className="h6 my-auto text-center">Courses</div>
            <AddCourse />
         </div>

         <ul className=' mt-3 p-0' style={{}} >
            {
               courses && courses.length > 0 ? courses.map((c, i) => c.code !== "" && <div key={i}>
                  <li
                     role={'button'}
                     className='text-light bg-dark mt-2 py-2 rounded row m-0 align-items-center'
                     onClick={() => handleClick(c.code)}
                  >
                     <div style={{ fontSize: 12 }} className="col-11"><b>{c.code}:</b>{c.name}</div>

                     <div className='col-1'>
                        <FontAwesomeIcon role={'button'} icon={show.includes(c.code) ? faCaretUp : faCaretDown} />
                     </div>

                  </li>

                  <div className={`${show.includes(c.code) ? "env-open" : "env-close"} env bg-dark`}>
                     <div className='px-3' style={{ fontSize: 12 }}>
                        <div className="d-flex justify-content-between">
                           <span className="p"> {c.name}</span>
                           <div>
                              <span><EditCourse course={c} /></span>
                              <span><DeleteCourse id={c.id} /></span>
                           </div>
                        </div>
                        {
                           c.prof &&
                           <div className="p mt-1">Prof:  {c.prof} </div>
                        }
                        <hr />

                        <div className="d-flex justify-content-between mt-1">
                           {
                              c.ltp &&
                              <div className="p">L-T-P: {c.ltp}</div>
                           }
                           {
                              c.credit &&
                              <div className="p">Credit: {c.credit}</div>
                           }
                        </div>
                        {
                           c.details &&
                           <div className="p mt-1"> Details: {c.details}</div>
                        }

                        <hr />

                        <div className="p text-light">Useful Links <AddLinks parentId={c.id} /></div>
                        {
                           links.filter(link => link.parentId === c.id).length > 0 ? links.filter(link => link.parentId === c.id).map(l =>
                              <span key={l.id} className='my-1 d-flex justify-content-between links-li '>
                                 <a href={l.url} rel="noreferrer" target="_blank">{l.title}<FontAwesomeIcon icon={faExternalLink} className='ms-2' /></a>
                                 <span className='p-1'>
                                    <DeleteLink id={l.id} />
                                 </span>
                              </span>
                           ) : <div className="text-secondary text-center pb-3">No Links!</div>
                        }
                     </div>
                  </div>
               </div>
               ) : <div className='text-secondary text-center'>No Courses!</div>
            }
         </ul>
      </div>
   )
}
