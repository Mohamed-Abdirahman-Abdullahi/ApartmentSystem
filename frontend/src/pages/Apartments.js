import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import {
    Card,
    Stack,
    Button,
    Container,
    Typography,
} from '@mui/material';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';

// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import { UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
import '../assets/tblHover.css';
import Profile from './Profile';
// ---------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function User() {
    const [aparts, setAparts] = useState();
    const [message, setMessage] = useState('');
    const [show, setShow] = useState(false);
    const [data, setData] = useState();
    const [showUpdate, setShowUpdate] = useState(false);

    async function bindApartments() {
        axios.get(`http://localhost:9000/api/apartments`)
            .then(res => {
                const aparts = res.data;
                setAparts(aparts);
            })
            .catch((err) => setMessage("Error: can't read apartments."))
    };

    async function getSelectedApart(id) {
        await axios.get(`http://localhost:9000/api/apartments/:${id}`)
            .then(res => {
                const apartData = res.data;
                setData(apartData);
                setShowUpdate(true);
            })
            .catch((err) => setMessage("Error: cant't get the selected apartment."))
    }

    async function updateApart(data) {
        await axios.patch(`http://localhost:9000/api/apartments/:${data.id}`, 
        {
            name: data.name,
            location: data.location,
            address: data.address,
            tel: data.tel,
            status: data.status
        })
        .then((res) => {
            setMessage("Apartment updated.");
            window.location.reload();
        })
        .catch((err) => setMessage("Update failed."))
    };

    function showAlert(id) {
        confirmAlert({
            title: 'Warning!',
            message: 'Are you sure to remove.?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => deleteSelectedApart(id),
                    style: { background: 'red' }
                },
                {
                    label: 'No',
                }
            ]
        });
    };

    async function deleteSelectedApart(id) {
        await axios.delete(`http://localhost:9000/api/apartments/:${id}`)
            .then(res => {
                const deletedApart = res.data;
                setMessage(`apartment removed.`);
                window.location.reload();
            })
            .catch(err => console.log(err));
    };

    const handleClose = () => { 
        setShow(false); 
        setShowUpdate(false);
        window.location.reload();
     };
    const handleShow = () => setShow(true);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    async function addNewApart(e) {
        await axios.post('http://localhost:9000/api/apartments', {
            name: e.name,
            location: e.location,
            address: e.address,
            tel: e.tel
        })
            .then(res => {
                setMessage('new apartment added');
                setShow(false);
                window.location.reload();
            })
            .catch(err => {
                setMessage('failed...');
                setShow(false)
            });

    };

    useEffect(() => {
        bindApartments();
    }, [showUpdate]);

    return (
        <Page title="User">
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                style={{
                    top: '10%'
                }}
            >
                <form onSubmit={handleSubmit(data => addNewApart(data))} >
                    <Modal.Header closeButton>
                        <Modal.Title>ADD NEW APARTMENT</Modal.Title>
                    </Modal.Header>
                    <p>{message}</p>

                    <Modal.Body>
                        <input type='text' {...register('name')} placeholder='enter apartment name' className='form-control' required />
                        <input type='text' {...register('location')} placeholder='enter location' className='form-control mt-2' required />
                        <input type='text' {...register('address')} placeholder='enter address' className='form-control mt-2' required />
                        <input type='number' {...register('tel')} placeholder='enter tell' className='form-control mt-2' />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleClose} >
                            CLOSE
                        </Button>
                        <Button className='btn btn-success' type='submit'>ADD</Button>
                    </Modal.Footer>
                </form>
            </Modal>

            <Modal
                show={showUpdate}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                style={{
                    top: '10%'
                }}
            >
                
                <form onSubmit={handleSubmit(sumbData => updateApart(sumbData))} >
                    <Modal.Header closeButton>
                        <Modal.Title>UPDATE APARTMENT</Modal.Title>
                    </Modal.Header>
                    <p align="center">{message}</p>
                    {
                        data?.map((dt, key) => {
                            return (
                                <Modal.Body>
                                    <input type='text' {...register('id')} hidden className='form-control' required defaultValue={dt._id} />
                                    <input type='text' {...register('name')} placeholder='enter apartment name' className='form-control' required defaultValue={dt.name} />
                                    <input type='text' {...register('location')} placeholder='enter location' className='form-control mt-2' required defaultValue={dt.location} />
                                    <input type='text' {...register('address')} placeholder='enter address' className='form-control mt-2' required defaultValue={dt.address} />
                                    <input type='number' {...register('tel')} placeholder='enter tell' className='form-control mt-2' defaultValue={dt.tel} />
                                    <select {...register('status')} className='form-control mt-2'>
                                        <option value={(dt.status) ? 'true' : 'false'}>{(dt.status) ? 'active' : 'inactive'}</option>
                                        <option value={(dt.status) ? 'false' : 'true'}>{(dt.status) ? 'inactive' : 'active'}</option>
                                    </select>
                                </Modal.Body>
                            )
                        })
                    }
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleClose} >
                            CLOSE
                        </Button>
                        <Button className='btn btn-success' type='submit'>UPDATE</Button>
                    </Modal.Footer>
                </form>
            </Modal>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Apartments
                    </Typography>
                    <Button variant="contained" onClick={handleShow} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
                        New Apartment
                    </Button>
                </Stack>
                <p style={{ textAlign: 'center' }}>{message}</p>
                <Card>
                    <UserListToolbar />

                    <Scrollbar >

                        <MDBTable >
                            <MDBTableHead light >
                                <tr>
                                    <th scope='col'>name</th>
                                    <th scope='col'>location</th>
                                    <th scope='col'>address</th>
                                    <th scope='col'>tel</th>
                                    <th scope='col'>status</th>
                                    <th scope='col'>addedAt</th>
                                    <th scope='col'>actions</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {
                                    aparts?.map((apart, key) => {
                                        if (apart.status) {
                                            return (
                                                <tr>
                                                    <td>{apart.name}</td>
                                                    <td>{apart.location}</td>
                                                    <td>{apart.address}</td>
                                                    <td>{apart.tel}</td>
                                                    <td ><span style={{ background: 'green', color: 'white' }}>active</span></td>
                                                    <td>{apart.createdAt}</td>
                                                    <td>
                                                        <div>
                                                            <button onClick={() => { getSelectedApart(apart._id) }} className="btn" id='mybtn'><i className="fa fa-edit" style={{ color: 'blue' }} /></button>
                                                            <button onClick={() => { showAlert(apart._id) }} className="btn" id='mybtn2'><i className="fa fa-trash text-danger" /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        } if (!apart.status) {
                                            return (
                                                <tr>
                                                    <td name='username'>{apart.name}</td>
                                                    <td>{apart.location}</td>
                                                    <td>{apart.address}</td>
                                                    <td>{apart.tel}</td>
                                                    <td ><span style={{ background: 'red', color: 'white' }}>inactive</span></td>
                                                    <td>{apart.createdAt}</td>
                                                    <td>
                                                        <div style={{ display: 'grid', gridTemplateColumns: 'auto auto' }}>
                                                            <button onClick={() => { getSelectedApart(apart._id) }} className="btn" id='mybtn'><i className="fa fa-edit" style={{ color: 'blue' }} /></button>
                                                            <button onClick={() => { showAlert(apart._id) }} className="btn" id='mybtn2'><i className="fa fa-trash text-danger" /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                        return null
                                    })
                                }
                            </MDBTableBody>
                        </MDBTable>
                    </Scrollbar>
                </Card>
            </Container>
        </Page>
    );
}
