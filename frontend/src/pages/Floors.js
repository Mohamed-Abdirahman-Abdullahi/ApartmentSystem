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

export default function User() {
    const [floors, setFloors] = useState();
    const [message, setMessage] = useState('');
    const [show, setShow] = useState(false);
    const [data, setData] = useState();
    const [showUpdate, setShowUpdate] = useState(false);

    const formatDate = (date) => {
        return moment(date).format('DD/MM/YYYY');
    };

    async function bindFloors() {
        axios.get(`http://localhost:9000/api/floors`)
            .then(res => {
                const floors = res.data;
                setFloors(floors);
            })
            .catch((err) => setMessage("Error: can't read floors."))
    };

    async function getSelectedFloor(id) {
        await axios.get(`http://localhost:9000/api/floors/:${id}`)
            .then((res) => {
                const floorData = res.data;
                setData(floorData);
                setShowUpdate(true);
            })
            .catch((err) => setMessage("Error: cant't get the selected floor."))
    }

    async function updateFloor(data) {
        await axios.patch(`http://localhost:9000/api/floors/:${data.id}`,
            {
                name: data.name,
                apartment: {name: data.apartment},
                status: data.status
            })
            .then((res) => {
                setMessage("Floor updated.")
                window.location.reload()
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
                    onClick: () => deleteSelectedFloor(id),
                    style: { background: 'red' }
                },
                {
                    label: 'No',
                }
            ]
        });
    };

    async function deleteSelectedFloor(id) {
        await axios.delete(`http://localhost:9000/api/floors/:${id}`)
            .then(res => {
                const deletedFloor = res.data;
                setMessage(`floor removed.`);
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

    async function addNewFloor(e) {
        await axios.post('http://localhost:9000/api/floors', {
            name: e.name,
            apartment: e.apartment
        })
            .then(res => {
                setMessage('new floor added');
                setShow(false);
                window.location.reload();
            })
            .catch(err => {
                setMessage('failed...');
                setShow(false)
            });

    };

    useEffect(() => {
        bindFloors();
    }, []);

    return (
        <Page title="Floors">
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                style={{
                    top: '10%'
                }}
            >
                <form onSubmit={handleSubmit(data => addNewFloor(data))} >
                    <Modal.Header closeButton>
                        <Modal.Title>ADD NEW FLOOR</Modal.Title>
                    </Modal.Header>
                    <p>{message}</p>

                    <Modal.Body>
                        <input type='text' {...register('name')} placeholder='enter floor name' className='form-control' required />
                        <input type='text' {...register('apartment')} placeholder='floor apartment' className='form-control mt-2' required />
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
                keyboard={false}
                style={{
                    top: '10%'
                }}
            >
                <form onSubmit={handleSubmit(data => updateFloor(data))} >
                    <Modal.Header closeButton>
                        <Modal.Title>UPDATE FLOOR</Modal.Title>
                    </Modal.Header>
                    <p>{message}</p>
                    {
                        data?.map((floor, key) => {
                            return (
                                <Modal.Body>
                                    <input type='text' {...register('id')} hidden className='form-control' required value={floor._id} />
                                    <input type='text' {...register('name')} placeholder='enter apartment name' className='form-control' required defaultValue={floor.name} />
                                    <input type='text' {...register('apartment')} placeholder='enter location' className='form-control mt-2' required defaultValue={floor.apartment.name} />
                                    <select {...register('status')} className='form-control mt-2'>
                                        <option value={(floor.status) ? 'true' : 'false'}>{(floor.status) ? 'active' : 'inactive'}</option>
                                        <option value={(floor.status) ? 'false' : 'true'}>{(floor.status) ? 'inactive' : 'active'}</option>
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
                        Floors
                    </Typography>
                    <Button variant="contained" onClick={handleShow} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
                        New Floor
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
                                    <th scope='col'>apartment</th>
                                    <th scope='col'>status</th>
                                    <th scope='col'>addedAt</th>
                                    <th scope='col'>actions</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {
                                    floors?.map((floor, key) => {
                                        if (floor.status) {
                                            return (
                                                <tr>
                                                    <td name='username'>{floor.name}</td>
                                                    <td>{floor.apartment.name}</td>
                                                    <td ><span style={{ background: 'green', color: 'white' }}>active</span></td>
                                                    <td>{formatDate(floor.createdAt)}</td>
                                                    <td>
                                                        <div>
                                                            <button onClick={() => { getSelectedFloor(floor._id) }} className="btn" id='mybtn'><i className="fa fa-edit" style={{ color: 'blue' }} /></button>
                                                            <button onClick={() => { showAlert(floor._id) }} className="btn" id='mybtn2'><i className="fa fa-trash text-danger" /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        } if (!floor.status) {
                                            return (
                                                <tr style={{background: "#ffb7b7"}}>
                                                    <td name='username'>{floor.name}</td>
                                                    <td>{floor.apartment.name}</td>
                                                    <td ><span style={{ background: 'red', color: 'white' }}>inactive</span></td>
                                                    <td>{formatDate(floor.createdAt)}</td>
                                                    <td>
                                                        <div>
                                                            <button onClick={() => { getSelectedFloor(floor._id) }} className="btn" id='mybtn'><i className="fa fa-edit" style={{ color: 'blue' }} /></button>
                                                            <button onClick={() => { showAlert(floor._id) }} className="btn" id='mybtn2'><i className="fa fa-trash text-danger" /></button>
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
