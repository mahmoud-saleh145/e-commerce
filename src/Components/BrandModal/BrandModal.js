import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useEffect, useState } from 'react';


function BrandModal() {

    const [brands, setBrands] = useState([])
    const [specificBrands, setSpecificBrands] = useState([])

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);






    async function displayBrands() {
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
            .then((response) => response)
            .catch((err) => err)
        setBrands(data.data)


    }




    async function getSpecificBrand(id) {
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
            .then((response) => response)
            .catch((err) => err)
        setSpecificBrands(data.data)
    }





    useEffect(() => {
        displayBrands()

    }, [])



    return (
        <>




            {brands?.map((brands) =>
            (
                <>
                    <div className="col-md-3" key={brands._id}>
                        <div className='product cursor-pointer position-relative border rounded text-center' onClick={() => { getSpecificBrand(brands._id) }}>
                            <div className=' position-absolute top-0 bottom-0 start-0 end-0 ' onClick={() => { handleShow() }} >
                            </div>

                            <img src={brands.image} alt={brands.name} className='w-100' />
                            <h6 className='pt-2 pb-3'>{brands.name}</h6>
                        </div >
                    </div>
                </>
            ))}





            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>

                </Modal.Header>
                <Modal.Body>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div className='ms-2'>
                            <h5 className='fs-1 text-main'>{specificBrands.name}</h5>
                            <small>{specificBrands.name}</small>
                        </div>
                        <img src={specificBrands.image} className='w-50' />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default BrandModal;