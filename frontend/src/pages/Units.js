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

export default function Units() {
    const [units, setUnits] = useState();
    const [message, setMessage] = useState('');
    const [show, setShow] = useState(false);
    const [data, setData] = useState();
    const [showUpdate, setShowUpdate] = useState(false);

    async function bindUnits() {
        axios.get(`http://localhost:9000/api/units`)
            .then(res => {
                const units = res.data;
                setUnits(units);
            })
            .catch((err) => setMessage("Error: can't read units."))
    };

    async function getSelectedUnit(id) {
        await axios.get(`http://localhost:9000/api/units/:${id}`)
            .then((res) => {
                const unitData = res.data;
                setData(unitData);
                setShowUpdate(true);
            })
            .catch((err) => setMessage("Error: cant't get the selected unit."))
    }

    async function updateUnit(data) {
        await axios.patch(`http://localhost:9000/api/units/:${data.id}`,
            {
                name: data.name,
                floor: { name: data.floor },
                status: data.status,
                numberOfRooms: data.noOfRooms,
                numberOfBathRooms: data.noOfBathRooms,
                numberOfKitchens: data.noOfKitchens
            })
            .then((res) => {
                setMessage("Unit updated.")
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
                    onClick: () => deleteSelectedUnit(id),
                    style: { background: 'red' }
                },
                {
                    label: 'No',
                }
            ]
        });
    };

    async function deleteSelectedUnit(id) {
        await axios.delete(`http://localhost:9000/api/units/:${id}`)
            .then(res => {
                const deletedUnit = res.data;
                setMessage(`unit removed.`);
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
    } = useForm();

    async function addNewUnit(e) {
        await axios.post('http://localhost:9000/api/units', {
            name: e.name,
            floor: e.floor,
            numberOfRooms: e.noOfRooms,
            numberOfBathRooms: e.noOfBathRooms,
            numberOfKitchens: e.noOfKitchens
        })
            .then(res => {
                setMessage('new unit added');
                setShow(false);
                window.location.reload();
            })
            .catch(err => {
                setMessage('failed...');
                setShow(false)
            });

    };

    useEffect(() => {
        bindUnits();
    }, []);

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
                <form onSubmit={handleSubmit(data => addNewUnit(data))} >
                    <Modal.Header closeButton>
                        <Modal.Title>ADD NEW UNIT</Modal.Title>
                    </Modal.Header>
                    <p>{message}</p>

                    <Modal.Body>
                        <input type='text' {...register('name')} placeholder='enter unit name' className='form-control' required  />
                        <input type='number' {...register('noOfRooms')} placeholder='number of rooms' className='form-control mt-2' required  />
                        <input type='number' {...register('noOfBathRooms')} placeholder='number of bath rooms' className='form-control mt-2' required  />
                        <input type='number' {...register('noOfKitchens')} placeholder='number of kitchens' className='form-control mt-2' required  />
                        <input type='text' {...register('floor')} placeholder='floor name' className='form-control mt-2' required  />
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
                <form onSubmit={handleSubmit(data => updateUnit(data))} >
                    <Modal.Header closeButton>
                        <Modal.Title>UPDATE UNIT</Modal.Title>
                    </Modal.Header>
                    <p>{message}</p>
                    {
                        data?.map((unit, key) => {
                            return (
                                <Modal.Body>
                                    <input type='text' {...register('id')} hidden className='form-control' required value={unit._id} />
                                    <input type='text' {...register('name')} placeholder='enter unit name' className='form-control' required defaultValue={unit.name} />
                                    <input type='text' {...register('noOfRooms')} placeholder='number of rooms' className='form-control mt-2' required defaultValue={unit.numberOfRooms} />
                                    <input type='text' {...register('noOfBathRooms')} placeholder='number of bathrooms' className='form-control mt-2' required defaultValue={unit.numberOfBathRooms} />
                                    <input type='text' {...register('noOfKitchens')} placeholder='number of kitchens' className='form-control mt-2' required defaultValue={unit.numberOfKitchens} />
                                    <input type='text' {...register('floor')} placeholder='floor name' className='form-control mt-2' required defaultValue={unit.floor.name} />
                                    <select {...register('status')} className='form-control mt-2'>
                                        <option value={(unit.status) ? 'true' : 'false'}>{(unit.status) ? 'active' : 'inactive'}</option>
                                        <option value={(unit.status) ? 'false' : 'true'}>{(unit.status) ? 'inactive' : 'active'}</option>
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
                        Units
                    </Typography>
                    <Button variant="contained" onClick={handleShow} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
                        New Unit
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
                                    <th scope='col'>floor</th>
                                    <th scope='col'>bathRooms</th>
                                    <th scope='col'>rooms</th>
                                    <th scope='col'>kitchens</th>
                                    <th scope='col'>status</th>
                                    <th scope='col'>addedAt</th>
                                    <th scope='col'>actions</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {
                                    units?.map((unit, key) => {
                                        if (unit.status) {
                                            return (
                                                <tr>
                                                    <td >{unit.name}</td>
                                                    <td>{unit.floor.name}</td>
                                                    <td>{unit.numberOfBathRooms}</td>
                                                    <td>{unit.numberOfRooms}</td>
                                                    <td>{unit.numberOfKitchens}</td>
                                                    <td ><span style={{ background: 'green', color: 'white' }}>active</span></td>
                                                    <td>{unit.createdAt}</td>
                                                    <td>
                                                        <div>
                                                            <button onClick={() => { getSelectedUnit(unit._id) }} className="btn" id='mybtn'><i className="fa fa-edit" style={{ color: 'blue' }} /></button>
                                                            <button onClick={() => { showAlert(unit._id) }} className="btn" id='mybtn2'><i className="fa fa-trash text-danger" /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        } if (!unit.status) {
                                            return (
                                                <tr style={{background: "#ffb7b7"}}>
                                                    <td name='username'>{unit.name}</td>
                                                    <td>{unit.floor.name}</td>
                                                    <td>{unit.numberOfBathRooms}</td>
                                                    <td>{unit.numberOfRooms}</td>
                                                    <td>{unit.numberOfKitchens}</td>
                                                    <td ><span style={{ background: 'red', color: 'white' }}>inactive</span></td>
                                                    <td>{unit.createdAt}</td>
                                                    <td>
                                                        <div style={{ display: "flex" }}>
                                                            <button onClick={() => { getSelectedUnit(unit._id) }} className="btn" id='mybtn'><i className="fa fa-edit" style={{ color: 'blue' }} /></button>
                                                            <button onClick={() => { showAlert(unit._id) }} className="btn" id='mybtn2'><i className="fa fa-trash text-danger" /></button>
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
