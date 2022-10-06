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

export default function Departments() {
    const [depts, setDepts] = useState();
    const [message, setMessage] = useState('');
    const [show, setShow] = useState(false);
    const [data, setData] = useState();
    const [showUpdate, setShowUpdate] = useState(false);

    async function bindDepartments() {
        axios.get(`http://localhost:9000/api/departments`)
            .then(res => {
                const aparts = res.data;
                setDepts(aparts);
            })
            .catch((err) => setMessage("Error: can't read departments."))
    };

    async function getSelectedDepart(id) {
        await axios.get(`http://localhost:9000/api/departments/:${id}`)
            .then(res => {
                const deptData = res.data;
                setData(deptData);
                setShowUpdate(true)
            })
            .catch((err) => setMessage("Error: cant't get the selected department."))
    }

    async function updateDepart(data) {
        await axios.patch(`http://localhost:9000/api/departments/:${data.id}`,
            {
                name: data.name,
                manager: data.manager,
                phone: data.phone
            })
            .then((res) => {
                setMessage("Department updated.");
                window.location.reload();
            })
            .catch((err) => console.log(err))
    };

    function showAlert(id) {
        confirmAlert({
            title: 'Warning!',
            message: 'Are you sure to remove.?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => deleteSelectedDepart(id),
                    style: { background: 'red' }
                },
                {
                    label: 'No',
                }
            ]
        });
    };

    async function deleteSelectedDepart(id) {
        await axios.delete(`http://localhost:9000/api/departments/:${id}`)
            .then(res => {
                const deletedDept = res.data;
                setMessage(`department removed.`);
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

    async function addNewDepart(e) {
        await axios.post('http://localhost:9000/api/departments', {
            name: e.name,
            manager: e.manager,
            phone: e.phone
        })
            .then(res => {
                setMessage('new department added');
                setShow(false);
                window.location.reload();
            })
            .catch(err => {
                setMessage('failed...');
                setShow(false)
            });

    };

    useEffect(() => {
        bindDepartments();
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
                <form onSubmit={handleSubmit(data => addNewDepart(data))} >
                    <Modal.Header closeButton>
                        <Modal.Title>ADD NEW DEPARTMENT</Modal.Title>
                    </Modal.Header>
                    <p>{message}</p>

                    <Modal.Body>
                        <input type='text' {...register('name')} placeholder='enter department name' className='form-control' required />
                        <input type='text' {...register('manager')} placeholder='enter manager' className='form-control mt-2' required />
                        <input type='number' {...register('phone')} placeholder='enter primary phone' className='form-control mt-2' />
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
                <form onSubmit={handleSubmit(data => updateDepart(data))} >
                    <Modal.Header closeButton>
                        <Modal.Title>UPDATE DEPARTMENT</Modal.Title>
                    </Modal.Header>
                    <p align='center'>{message}</p>
                    {
                        data?.map((data, key) => {
                            return (
                                <Modal.Body>
                                    <input value={data._id} hidden type='text' {...register('id')} placeholder='enter department name' className='form-control' required />
                                    <input defaultValue={data.name} type='text' {...register('name')} placeholder='enter department name' className='form-control' required />
                                    <input defaultValue={data.manager} type='text' {...register('manager')} placeholder='enter manager' className='form-control mt-2' required />
                                    <input defaultValue={data.phone} type='number' {...register('phone')} placeholder='enter primary phone' className='form-control mt-2' />
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
                        Departments
                    </Typography>
                    <Button variant="contained" onClick={handleShow} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
                        New Department
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
                                    <th scope='col'>manager</th>
                                    <th scope='col'>phone</th>
                                    <th scope='col'>addedAt</th>
                                    <th scope='col'>actions</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {
                                    depts?.map((dept, key) => {
                                        return (
                                            <tr>
                                                <td>{dept.name}</td>
                                                <td>{dept.manager}</td>
                                                <td>{dept.phone}</td>
                                                <td>{dept.createdAt}</td>
                                                <td>
                                                    <div>
                                                        <button onClick={() => { getSelectedDepart(dept._id) }} className="btn" id='mybtn'><i className="fa fa-edit" style={{ color: 'blue' }} /></button>
                                                        <button onClick={() => { showAlert(dept._id) }} className="btn" id='mybtn2'><i className="fa fa-trash text-danger" /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
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
