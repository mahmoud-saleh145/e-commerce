import './NotFound.module.css'
import { Helmet } from 'react-helmet'

export default function NotFound() {
    return (


        <div className=" text-center p-5  not-found-page">

            <Helmet>
                <title>Not  Found</title>
            </Helmet>
            <h1>404</h1>
            <h6>File not found</h6>
            <p>The site configured at this address does not contain the requested file.</p>
            <p>If this is your site, make sure that the filename case matches the URL as well as any<br /> file permissions.</p>
            <p>For root URLs (like http://example.com/) you must provide an index.html file.</p>
            <p><a className='text-info' href='https://docs.github.com/en/pages'> Read the full documentation </a>for more information about using <span className='fw-semibold'>GitHub Pages.</span></p>
        </div>
    )
}
