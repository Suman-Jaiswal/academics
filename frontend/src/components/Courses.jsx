import { faAngleDown, faAngleUp, faArrowRight, faExternalLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react'
import AddCourse from './AddCourse'
import AddLinks from './AddLinks';
import DeleteCourse from './DeleteCourse';
import DeleteLink from './DeleteLink';
import EditCourse from './EditCourse';
import { MyContext } from '../contexts/MyContext';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { updateUserData } from '../api';
import { UserData } from '../interfaces';

export default function Courses({ links }) {

   const [show, setShow] = useState([])
   const [registeredCourses, setRegisteredCourses] = useState([])
   const [otherCourses, setOtherCourses] = useState([])
   const [searchResult, setSearchResult] = useState([])

   const { state: { courses, user } } = useContext(MyContext)

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

   const handleSearch = (e) => {
      const text = e.target.value.toLowerCase()
      if (text === "") {
         setSearchResult(otherCourses)
      }
      else {
         const filtered = otherCourses.filter(c => c.code.toLowerCase().includes(text) || c.name.toLowerCase().includes(text))
         setSearchResult(filtered)
      }
   }

   const registerCourse = (code) => {
      const course = courses.filter(c => c.code === code)[0]
      const registered = [...user.registeredCourses, code]
      const doc = new UserData(user.uid, registered).toDoc()
      console.log(doc);
      // update user
      updateUserData(doc).then(res => {
         console.log(res);
         setRegisteredCourses([...registeredCourses, course])
         setOtherCourses(otherCourses.filter(c => c.code !== code))
         setSearchResult(searchResult.filter(c => c.code !== code))
      }).catch(e => {
         console.log(e);
      })
   }

   useEffect(() => {
      if (user) {
         setRegisteredCourses(courses.filter(c => c.code !== "" && user.registeredCourses.includes(c.code)))
         setOtherCourses(courses.filter(c => c.code !== "" && !user.registeredCourses.includes(c.code)))
         setSearchResult(courses.filter(c => c.code !== "" && !user.registeredCourses.includes(c.code)))
      }
   }, [courses, user])

   return (
      <div className='course-wrapper mt-3 mt-md-0'
         style={{
            border: "1px solid #444",
            overflowY: "auto",
            height: '100%',
         }}>
         <ul className='p-0' style={{ height: 409, overflow: 'auto', position: 'relative' }} >
            <div className="d-flex justify-content-between align-items-center p-2" style={{
               borderBottom:
                  '1px solid #333',
               position: 'sticky',
               backgroundColor: 'black',
               top: 0
            }}>
               <div className='small text-secondary my-2'>Registered Courses</div>
               <div>  <AddCourse /></div>
            </div>
            {
               registeredCourses && registeredCourses.length > 0 ? registeredCourses.map((c, i) => c.code !== "" && <div key={i}>
                  <li
                     role={'button'}
                     className='text-light d-flex justify-content-between bg-dark rounded m-0 align-items-center m-2'
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

                  <div className={`${show.includes(c.code) ? "env-open" : "env-close"} env bg-dark mx-2`}>
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
                           ) : <div className="text-secondary text-center pb-3 small">No Links!</div>
                        }
                     </div>
                  </div>
               </div>
               ) : <div className='text-secondary mt-4 text-center small'>No Courses! <br /></div>
            }
         </ul>
         <ul className='p-0' style={{
            position: 'relative', height: 200, overflow: 'auto', backgroundColor: 'black',

         }} >
            <div className="d-flex justify-content-between align-items-center p-2" style={{
               borderTop:
                  '1px solid #333',
               position: 'sticky',
               backgroundColor: 'black',
               top: 0
            }}>
               <div className='small text-secondary'>Other Courses</div>
               <div>
                  <input type="text" style={{ border: 'none', borderBottom: '1px solid #444' }}
                     className='form-control form-control-sm' placeholder='Search' onChange={handleSearch} />
               </div>
            </div>
            {
               searchResult && searchResult.length > 0 ? searchResult.map((c, i) => c.code !== "" && <div key={i}>
                  <li

                     role={'button'}
                     className='text-light d-flex justify-content-between bg-dark m-2 rounded m-0 align-items-center'
                     style={{
                        fontSize: 12,
                     }}
                  >
                     <div className='py-2 px-3' style={{ width: '90%', }}>
                        <div className='d-flex justify-content-between'>
                           <div style={{ width: '100%' }}>
                              <b>{c.code}: </b>{c.name}
                           </div>
                        </div>
                     </div>
                     <div onClick={() => registerCourse(c.code)} className='px-3 text-secondary' style={{ borderLeft: '1px solid #444' }}>
                        <OverlayTrigger role={'button'} placement="top" overlay={(props) => <Tooltip id="button-tooltip" {...props}>
                           <div style={{ fontSize: 10 }}>Register</div>
                        </Tooltip>}>
                           <div><FontAwesomeIcon className='text-light' icon={faArrowRight} /></div>
                        </OverlayTrigger>
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
                           ) : <div className="text-secondary text-center pb-3 small">No Links!</div>
                        }
                     </div>
                  </div>
               </div>
               ) : <div className='text-secondary mt-4 text-center small'>No Courses!</div>
            }
         </ul>
      </div>
   )
}
