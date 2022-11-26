import { faExternalLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import AddLinks from './AddLinks'
import DeleteLink from './DeleteLink'

export default function OtherLinks({ links }) {
   return (
      <div className='mt-3 bg-dark px-3 py-3' >
         <div className="p-1 mb-3 ps-0"> <span className='h6'>Other Links</span> <AddLinks parentId="universal" /></div>

         <ul className='row p-0'>
            {
               links.filter(l => l.parentId === "universal").length > 0 ? links.filter(l => l.parentId === "universal").map(link =>
                  <li style={{
                     fontSize: 13,
                     borderRight: "1px solid grey"
                  }} key={link._id} className='col-auto my-1 d-flex justify-content-between links-li'>
                     <a className='mt-1 me-1' href={link.url} rel="noreferrer" target="_blank">{link.title}
                        <FontAwesomeIcon icon={faExternalLink} className='ms-2' />
                     </a>
                     <span className='p-1'>
                        <DeleteLink id={link._id} />
                     </span>
                  </li>
               ) : <div className="text-secondary text-center mb-3">No Links!</div>
            }
         </ul>
      </div>
   )
}
