import { useEffect, useState } from 'react';
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
import moment from 'moment';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import { UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
import '../assets/tblHover.css';
import Profile from './Profile';
// ---------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function Visitors() {
    const [guarantors, setGuarantors] = useState();
    const [message, setMessage] = useState('');
    const [show, setShow] = useState(false);
    const [data, setData] = useState();
    const [showUpdate, setShowUpdate] = useState(false);

    const formatDate = (date) => {
        return moment(date).format('DD/MM/YYYY');
    };

    async function bindGuarantors() {
        axios.get(`http://localhost:9000/api/guarantors`)
            .then(res => {
                const grts = res.data;
                setGuarantors(grts);
            })
            .catch((err) => setMessage("Error: can't read guarantors."))
    };

    async function getSelectedGuarantor(id) {
        await axios.get(`http://localhost:9000/api/guarantors/:${id}`)
            .then(res => {
                const grtData = res.data;
                setData(grtData);
                setShowUpdate(true);
            })
            .catch((err) => setMessage("Error: cant't get the selected guarantor."))
    }

    async function updateGuarantor(data) {
        await axios.patch(`http://localhost:9000/api/guarantors/:${data.id}`,
            {
                fullname: data.fullname,
                gender: data.gender,
                tel: data.tel,
                address: data.address,
                title: data.title,
                description: data.description
            })
            .then((res) => {
                setMessage("Visitor updated.");
                setShowUpdate(false);
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
                    onClick: () => deleteSelectedGuarantor(id),
                    style: { background: 'red' }
                },
                {
                    label: 'No',
                }
            ]
        });
    };

    async function deleteSelectedGuarantor(id) {
        await axios.delete(`http://localhost:9000/api/guarantors/:${id}`)
            .then(res => {
                const deletedVisitor = res.data;
                setMessage(`guarantor removed.`);
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

    async function addNewGuarantor(e) {
        await axios.post('http://localhost:9000/api/guarantors', {
            fullname: e.fullname,
            gender: e.gender,
            tel: e.tel,
            address: e.address,
            title: e.title,
            description: e.description
        })
            .then(res => {
                setMessage('new guarantor added');
                setShow(false)
            })
            .catch(err => {
                setMessage('failed to add guarantor...');
                setShow(false)
            });

    };

    useEffect(() => {
        bindGuarantors();
    }, [message]);

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
                <form onSubmit={handleSubmit(data => addNewGuarantor(data))} >
                    <Modal.Header closeButton>
                        <Modal.Title>ADD NEW GUARANTOR</Modal.Title>
                    </Modal.Header>
                    <p>{message}</p>

                    <Modal.Body>
                        <input type='text' {...register('fullname')} placeholder='fullname' className='form-control' required />
                        <select {...register('gender')} className="form-control mt-2">
                            <option>Select gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        <input type='number' {...register('tel')} placeholder='tel' className='form-control mt-2' required />
                        <input type='text' {...register('address')} placeholder='address' className='form-control mt-2' required />
                        <input type='text' {...register('title')} placeholder='title' className='form-control mt-2' />
                        <textarea type='text' {...register('description')} placeholder='description' className='form-control mt-2' />
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
                <form onSubmit={handleSubmit(sumbData => updateGuarantor(sumbData))} >
                    <Modal.Header closeButton>
                        <Modal.Title>UPDATE GUARANTOR</Modal.Title>
                    </Modal.Header>
                    <p align="center">{message}</p>
                    {
                        data?.map((dt, key) => {
                            return (
                                <Modal.Body>
                                    <input hidden type='text' defaultValue={dt._id} {...register('id')} placeholder='fullname' className='form-control' required />
                                    <input type='text' defaultValue={dt.fullname} {...register('fullname')} placeholder='fullname' className='form-control' required />
                                    <select  {...register('gender')} className="form-control mt-2">
                                        <option value={(dt.gender === "Male") ? "Male" : "Female"}>{(dt.gender === "Male") ? "Male" : "Female"}</option>
                                        <option value={(dt.gender === "Male") ? "Female" : "Male"}>{(dt.gender === "Male") ? "Female" : "Male"}</option>
                                    </select>
                                    <input defaultValue={dt.tel} type='number' {...register('tel')} placeholder='tel' className='form-control mt-2' required />
                                    <input defaultValue={dt.address} type='text' {...register('address')} placeholder='address' className='form-control mt-2' required />
                                    <input defaultValue={dt.title} type='text' {...register('title')} placeholder='title' className='form-control mt-2' />
                                    <textarea defaultValue={dt.description} type='text' {...register('description')} placeholder='description' className='form-control mt-2' />
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
                        Guarantors
                    </Typography>
                    <Button variant="contained" onClick={handleShow} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
                        New Guarantor
                    </Button>
                </Stack>
                <p style={{ textAlign: 'center' }}>{message}</p>
                <Card>
                    <UserListToolbar />

                    <Scrollbar >

                        <MDBTable >
                            <MDBTableHead light >
                                <tr>
                                    <th scope='col'>fullname</th>
                                    <th scope='col'>gender</th>
                                    <th scope='col'>tel</th>
                                    <th scope='col'>address</th>
                                    <th scope='col'>title</th>
                                    <th scope='col'>description</th>
                                    <th scope='col'>addedAt</th>
                                    <th scope='col'>actions</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {
                                    guarantors?.map((guarantor, key) => {
                                        return (
                                            <tr>
                                                <td>{guarantor.fullname}</td>
                                                <td>{guarantor.gender}</td>
                                                <td>{guarantor.tel}</td>
                                                <td>{guarantor.address}</td>
                                                <td>{guarantor.title}</td>
                                                <td>{guarantor.description}</td>
                                                <td>{formatDate(guarantor.createdAt)}</td>
                                                <td>
                                                    <div style={{ display: 'flex' }}>
                                                        <button onClick={() => { getSelectedGuarantor(guarantor._id) }} className="btn" id='mybtn'><i className="fa fa-edit" style={{ color: 'blue' }} /></button>
                                                        <button onClick={() => { showAlert(guarantor._id) }} className="btn" id='mybtn2'><i className="fa fa-trash text-danger" /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    }
                                    )
                                }
                            </MDBTableBody>
                        </MDBTable>
                    </Scrollbar>
                </Card>
            </Container>
        </Page>
    );
}
