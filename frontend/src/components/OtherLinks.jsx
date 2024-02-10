import { faExternalLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import AddLinks from './AddLinks';
import DeleteLink from './DeleteLink';

export default function OtherLinks({ links }) {
    return (
        <div
            className='py-2'
            style={{
                borderTop: '1px solid #444',
            }}
        >
            <div className=' mb-1 ps-3'>
                {' '}
                <span className='h6'>Other Links</span> <AddLinks parentId='universal' />
            </div>

            <div className='row m-0 ps-2 mt-2 mb-5'>
                {links.filter((l) => l.parentId === 'universal').length > 0 ? (
                    links
                        .filter((l) => l.parentId === 'universal')
                        .map((link) => (
                            <li
                                style={{
                                    fontSize: 14,
                                    borderRight: '1px solid #444',
                                }}
                                key={link.id}
                                className='col-auto my-1 d-flex justify-content-between links-li'
                            >
                                <a
                                    className='mt-1 me-1'
                                    href={link.url}
                                    rel='noreferrer'
                                    target='_blank'
                                >
                                    {link.title}
                                    <FontAwesomeIcon
                                        icon={faExternalLink}
                                        className='ms-2'
                                    />
                                </a>
                                <span className='p-1'>
                                    <DeleteLink id={link.id} />
                                </span>
                            </li>
                        ))
                ) : (
                    <div className='text-secondary text-center mb-3'>No Links!</div>
                )}
            </div>
        </div>
    );
}
