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
      <div className='course-wrapper'  >
         <div className="header d-flex justify-content-between">
            <div className="h6 my-auto text-center">Courses</div>
            <AddCourse />
         </div>

         <ul className=' mt-3 p-0' style={{}} >
            {
               courses && courses.length > 0 ? courses.map((c, i) => c.code !== "" && <div
                  style={{
                     maxWidth: 600
                  }}
                  key={i}>
                  <li

                     role={'button'}
                     className='text-light bg-dark mt-2 py-2 px-1 rounded row m-0 align-items-center'
                     onClick={() => handleClick(c.code)}
                  >
                     <div style={{ fontSize: 13 }} className="col-11">{c.code} (<i >{c.name}</i>)</div>

                     <div className='col-1'>
                        <FontAwesomeIcon role={'button'} icon={show.includes(c.code) ? faCaretUp : faCaretDown} />
                     </div>

                  </li>

                  <div className={`${show.includes(c.code) ? "env-open" : "env-close"} env bg-dark`}>
                     <ul className='py-2 pe-3'>
                        <li style={{
                           fontSize: 12
                        }}>
                           <span className="p"> {c.name}</span>
                           <span><EditCourse course={c} /></span>
                           <span><DeleteCourse id={c._id} /></span>

                           {
                              c.prof &&
                              <div className="p text-secondary"> <i>{c.prof}</i> </div>
                           }

                           <div className="d-flex justify-content-between">
                              {
                                 c.ltp &&
                                 <div className="p text-secondary">L-T-P: <b>{c.ltp}</b></div>
                              }
                              {
                                 c.credit &&
                                 <div className="p text-secondary">Credit: <b>{c.credit}</b></div>
                              }
                           </div>
                           {
                              c.details &&
                              <div className="p text-secondary"> Details: <b>{c.details}</b> </div>
                           }
                           <hr className="my-1" />
                           <div className="p text-light">Useful Links <AddLinks parentId={c._id} /></div>
                           {
                              links.filter(link => link.parentId === c._id).length > 0 ? links.filter(link => link.parentId === c._id).map(l =>
                                 <span key={l._id} className='my-1 d-flex justify-content-between links-li '>
                                    <a href={l.url} rel="noreferrer" target="_blank">{l.title}<FontAwesomeIcon icon={faExternalLink} className='ms-2' /></a>
                                    <span className='p-1'>
                                       <DeleteLink id={l._id} />
                                    </span>
                                 </span>
                              ) : <div className="text-secondary text-center mb-3">No Links!</div>
                           }

                        </li>
                     </ul>
                  </div>
               </div>
               ) : <div className='text-secondary text-center'>No Courses!</div>
            }
         </ul>
      </div>
   )
}
