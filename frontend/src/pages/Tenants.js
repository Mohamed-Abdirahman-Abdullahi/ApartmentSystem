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
    const navigate = useNavigate();
    const [tenants, setTenants] = useState();
    const [message, setMessage] = useState('');
    const [show, setShow] = useState(false);

    const formatDate = (date) => {
        return moment(date).format('DD/MM/YYYY');
    };

    async function bindTenants() {
        axios.get(`http://localhost:9000/api/tenants`)
            .then(res => {
                const tns = res.data;
                setTenants(tns);
            })
            .catch((err) => setMessage("Error: can't read tenants."))
    };

    async function getSelectedTenant(id) {
        await axios.get(`http://localhost:9000/api/tenants/:${id}`)
            .then(res => {
                const tenantData = res.data;
                navigate("/dashboard/tenantProfile", { state: tenantData });
            })
            .catch((err) => setMessage("Error: cant't get the selected tenant."))
    }

    function showAlert(id) {
        confirmAlert({
            title: 'Warning!',
            message: 'Are you sure to remove.?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => deleteSelectedTenant(id),
                    style: { background: 'red' }
                },
                {
                    label: 'No',
                }
            ]
        });
    };

    async function deleteSelectedTenant(id) {
        await axios.delete(`http://localhost:9000/api/tenants/:${id}`)
            .then(res => {
                const deletedTenant = res.data;
                setMessage(`tenant removed.`);
                window.location.reload();
            })
            .catch(err => console.log(err));
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    async function addNewTenant(e) {
        await axios.post('http://localhost:9000/api/tenants', {
            fullname: e.fullname,
            gender: e.gender,
            tel: e.tel,
            email: e.email,
            address: e.address,
            guarantor: e.guarantor,
            createdBy: e.createdBy,
        })
            .then(res => {
                setMessage('new tenant added');
                setShow(false);
                window.location.reload();
            })
            .catch(err => {
                setMessage('failed...');
                setShow(false)
            });

    };

    useEffect(() => {
        bindTenants();
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
                <form onSubmit={handleSubmit(data => addNewTenant(data))} >
                    <Modal.Header closeButton>
                        <Modal.Title>ADD NEW TENANT</Modal.Title>
                    </Modal.Header>
                    <p>{message}</p>

                    <Modal.Body>
                        <input type='text' {...register('fullname')} placeholder='enter full name' className='form-control' required />
                        <select {...register('gender')} className='form-control mt-2' id="exampleFormControlSelect">
                            <option value='' style={{ color: 'grey' }}>select gender</option>
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                        </select>
                        <input type='number' {...register('tel')} placeholder='enter telephone' className='form-control mt-2' required />
                        <input type='email' {...register('email')} placeholder='enter email' className='form-control mt-2' required />
                        <input type='text' {...register('address')} placeholder='enter address' className='form-control mt-2' />
                        <input type='text' {...register('createdBy')} className='form-control mt-2' required value={'alas'}/>
                        <select {...register('guarantor')} className='form-control mt-2' id="exampleFormControlSelect">
                            <option value='' style={{ color: 'grey' }}>select guarantor</option>
                            <option value='nadaara'>nadaara</option>
                            <option value='badri'>badri</option>
                        </select>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleClose} >
                            CLOSE
                        </Button>
                        <Button className='btn btn-success' type='submit'>ADD</Button>
                    </Modal.Footer>
                </form>
            </Modal>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Tenants
                    </Typography>
                    <Button variant="contained" onClick={handleShow} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
                        New Tenant
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
                                    <th scope='col'>telephone</th>
                                    <th scope='col'>address</th>
                                    <th scope='col'>guarantor</th>
                                    <th scope='col'>status</th>
                                    <th scope='col'>regDate</th>
                                    <th scope='col'>actions</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {
                                    tenants?.map((tenant, key) => {
                                        if (tenant.status) {
                                            return (
                                                <tr>
                                                    <td name='username'>{tenant.fullname}</td>
                                                    <td>{tenant.tel}</td>
                                                    <td>{tenant.address}</td>
                                                    <td>{tenant.guarantor}</td>
                                                    <td ><span style={{ background: 'green', color: 'white' }}>active</span></td>
                                                    <td>{formatDate(tenant.createdAt)}</td>
                                                    <td>
                                                        <div>
                                                            <button onClick={() => { getSelectedTenant(tenant._id) }} className="btn" id='mybtn'><i className="fa fa-edit" style={{ color: 'blue' }} /></button>
                                                            <button onClick={() => { showAlert(tenant._id) }} className="btn" id='mybtn2'><i className="fa fa-trash text-danger" /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        } if (!tenant.status) {
                                            return (
                                                <tr style={{background: "#ffb7b7"}}>
                                                    <td name='username'>{tenant.fullname}</td>
                                                    <td>{tenant.tel}</td>
                                                    <td>{tenant.address}</td>
                                                    <td>{tenant.guarantor}</td>
                                                    <td ><span style={{ background: 'red', color: 'white' }}>inactive</span></td>
                                                    <td>{formatDate(tenant.createdAt)}</td>
                                                    <td>
                                                        <div style={{ display: 'grid', gridTemplateColumns:'auto auto' }}>
                                                            <button onClick={() => { getSelectedTenant(tenant._id) }} className="btn" id='mybtn'><i className="fa fa-edit" style={{ color: 'blue' }} /></button>
                                                            <button onClick={() => { showAlert(tenant._id) }} className="btn" id='mybtn2'><i className="fa fa-trash text-danger" /></button>
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
