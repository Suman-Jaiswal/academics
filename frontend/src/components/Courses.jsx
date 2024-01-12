import { faAngleDown, faAngleUp, faExternalLink } from '@fortawesome/free-solid-svg-icons';
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
      <div className='course-wrapper mt-3 mt-md-0'
         style={{
            border: "1px solid #444",
            overflowY: "auto",
            height: 426,
            borderLeft: 'none',
         }}>
         <div className='bg-dark p-3' style={{
            borderBottom: "1px solid #444",
            position: 'sticky',
            top: 0,
         }}>
            <div className="d-flex justify-content-between bg-dark">
               <div className="h6 my-auto text-center">Courses</div>
               <AddCourse />
            </div>
         </div>

         <ul className='px-2' style={{}} >
            {
               courses && courses.length > 0 ? courses.map((c, i) => c.code !== "" && <div key={i}>
                  <li
                     role={'button'}
                     className='text-light d-flex justify-content-between bg-dark mt-2 rounded m-0 align-items-center'
                     style={{
                        fontSize: 12,
                     }}
                  >
                     <div className='py-2 px-3' style={{ width: '90%', }}>
                        <div className='d-flex justify-content-between'>
                           <div style={{ width: '95%' }}>
                              <b>{c.code}: </b>{c.name}
                           </div>
                           <div style={{ width: 50 }}>
                              <span><EditCourse course={c} /></span>
                              <span><DeleteCourse id={c.id} /></span>
                           </div>
                        </div>
                        <div className="d-flex mt-1 justify-content-between align-items-center text-secondary">
                           {
                              c.prof &&
                              <div className="p">{c.prof}</div>
                           }
                           {
                              c.ltp &&
                              <div className="p">L-T-P-C: {c.ltp}</div>
                           }
                        </div>
                     </div>
                     <div onClick={() => handleClick(c.code)} className='px-3 text-secondary' style={{ borderLeft: '1px solid #444' }}>
                        <span><FontAwesomeIcon role={'button'} icon={show.includes(c.code) ? faAngleUp : faAngleDown} /></span>
                     </div>

                  </li>

                  <div className={`${show.includes(c.code) ? "env-open" : "env-close"} env bg-dark`}>
                     <div className='px-3' style={{ fontSize: 12 }}>

                        <div className="d-flex justify-content-between">
                           {
                              c.credit &&
                              <div className="p">Credit: {c.credit}</div>
                           }
                        </div>
                        {
                           c.details &&
                           <div className="p mt-1"> Details: {c.details}</div>
                        }

                        <hr className='mt-2' />

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
               ) : <div className='text-secondary mt-4 text-center'>No Courses!</div>
            }
         </ul>
      </div>
   )
}
