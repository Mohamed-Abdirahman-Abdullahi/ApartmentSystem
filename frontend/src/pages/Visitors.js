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

export default function Visitors() {
    const [visitors, setVisitors] = useState();
    const [message, setMessage] = useState('');
    const [show, setShow] = useState(false);
    const [data, setData] = useState();
    const [showUpdate, setShowUpdate] = useState(false);
    const [deleted, setDeleted] = useState(false);

    async function bindVisitors() {
        axios.get(`http://localhost:9000/api/visitors`)
            .then(res => {
                const vsts = res.data;
                setVisitors(vsts);
            })
            .catch((err) => setMessage("Error: can't read visitors."))
    };

    async function getSelectedVisitor(id) {
        await axios.get(`http://localhost:9000/api/visitors/:${id}`)
            .then(res => {
                const visitorData = res.data;
                setData(visitorData);
                setShowUpdate(true);
            })
            .catch((err) => setMessage("Error: cant't get the selected apartment."))
    }

    async function updateVisitor(data) {
        await axios.patch(`http://localhost:9000/api/visitors/:${data.id}`,
            {
                fullname: data.fullname,
                gender: data.gender,
                tel: data.tel,
                address: data.address,
                tenant: data.tenant,
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
                    onClick: () => deleteSelectedVisitor(id),
                    style: { background: 'red' }
                },
                {
                    label: 'No',
                }
            ]
        });
    };

    async function deleteSelectedVisitor(id) {
        await axios.delete(`http://localhost:9000/api/visitors/:${id}`)
            .then(res => {
                const deletedVisitor = res.data;
                setMessage(`visitor removed.`);
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

    async function addNewVisitor(e) {
        await axios.post('http://localhost:9000/api/visitors', {
            fullname: e.fullname,
            gender: e.gender,
            tel: e.tel,
            address: e.address,
            tenant: e.tenant,
            description: e.description
        })
            .then(res => {
                setMessage('new visitor added');
                setShow(false)
            })
            .catch(err => {
                setMessage('failed to add visitor...');
                setShow(false)
            });

    };

    useEffect(() => {
        bindVisitors();
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
                <form onSubmit={handleSubmit(data => addNewVisitor(data))} >
                    <Modal.Header closeButton>
                        <Modal.Title>ADD NEW VISITOR</Modal.Title>
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
                        <input type='text' {...register('tenant')} placeholder='if tenant' className='form-control mt-2' />
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
                <form onSubmit={handleSubmit(sumbData => updateVisitor(sumbData))} >
                    <Modal.Header closeButton>
                        <Modal.Title>UPDATE VISITOR</Modal.Title>
                    </Modal.Header>
                    <p align="center">{message}</p>
                    {
                        data?.map((dt, key) => {
                            return (
                                <Modal.Body>
                                    <input hidden type='text' defaultValue={dt._id} {...register('id')} placeholder='fullname' className='form-control' required />
                                    <input type='text' defaultValue={dt.fullname} {...register('fullname')} placeholder='fullname' className='form-control' required />
                                    <select defaultValue={dt.gender} {...register('gender')} className="form-control mt-2">
                                        <option>Select gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                    <input defaultValue={dt.tel} type='number' {...register('tel')} placeholder='tel' className='form-control mt-2' required />
                                    <input defaultValue={dt.address} type='text' {...register('address')} placeholder='address' className='form-control mt-2' required />
                                    <input defaultValue={dt.tenant} type='text' {...register('tenant')} placeholder='if tenant' className='form-control mt-2' />
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
                        Visitors
                    </Typography>
                    <Button variant="contained" onClick={handleShow} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
                        New Visitor
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
                                    <th scope='col'>tenant</th>
                                    <th scope='col'>description</th>
                                    <th scope='col'>visitedAt</th>
                                    <th scope='col'>actions</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {
                                    visitors?.map((visitor, key) => {
                                        return (
                                            <tr>
                                                <td>{visitor.fullname}</td>
                                                <td>{visitor.gender}</td>
                                                <td>{visitor.tel}</td>
                                                <td>{visitor.address}</td>
                                                <td>{visitor.tenant}</td>
                                                <td>{visitor.description}</td>
                                                <td>{visitor.createdAt}</td>
                                                <td>
                                                    <div style={{ display: 'flex' }}>
                                                        <button onClick={() => { getSelectedVisitor(visitor._id) }} className="btn" id='mybtn'><i className="fa fa-edit" style={{ color: 'blue' }} /></button>
                                                        <button onClick={() => { showAlert(visitor._id) }} className="btn" id='mybtn2'><i className="fa fa-trash text-danger" /></button>
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
