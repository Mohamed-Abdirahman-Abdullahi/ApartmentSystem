import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import {
    Card,
    Stack,
    Button,
    Container,
    Typography,
    Grid
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
import {
    AppWidgetSummary,
} from '../sections/@dashboard/app';
// ---------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function User() {
    const navigate = useNavigate();
    const [emps, setEmps] = useState();
    const [message, setMessage] = useState('');
    const [show, setShow] = useState(false);

    const [totalEmployees, setTotalEmployees] = useState();
    const [totalActive, setTotalActive] = useState(0);
    const [totalInactive, setTotalInactive] = useState(0);

    const formatDate = (date) => {
        return moment(date).format('DD/MM/YYYY');
    };

    async function bindEmployees() {
        axios.get(`http://localhost:9000/api/employees`)
            .then(res => {
                const emps = res.data;
                setEmps(emps);
                setTotalEmployees(emps.length);
                setTotalActive(emps.filter((emp) => emp.status === true).length);
                setTotalInactive(emps.filter((emp) => emp.status === false).length);
            })
            .catch((err) => setMessage("Error: can't read employees."))
    };

    async function getSelectedEmp(id) {
        await axios.get(`http://localhost:9000/api/employees/:${id}`)
            .then(res => {
                const empData = res.data;
                navigate("/dashboard/empProfile", { state: empData });
            })
            .catch((err) => setMessage("Error: cant't get the selected person."))
    }

    function showAlert(id) {
        confirmAlert({
            title: 'Warning!',
            message: 'Are you sure to remove.?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => deleteSelectedEmp(id),
                    style: { background: 'red' }
                },
                {
                    label: 'No',
                }
            ]
        });
    };

    async function deleteSelectedEmp(id) {
        await axios.delete(`http://localhost:9000/api/employees/:${id}`)
            .then(res => {
                const deletedEmp = res.data;
                setMessage(`employee removed.`);
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

    async function addNewEmp(e) {
        await axios.post('http://localhost:9000/api/employees', {
            fullname: e.empName,
            gender: e.empGender,
            tel: e.empTel,
            email: e.empEmail,
            address: e.empAddress,
            department: e.empDepart,
            salary: e.empSalary,
            createdBy: e.createdBy,
            status: e.status,
        })
            .then(res => {
                setMessage('new employee added');
                setShow(false);
            })
            .catch(err => {
                setMessage('failed...');
                setShow(false)
            });

    };

    useEffect(() => {
        bindEmployees();
    }, [message]);

    return (
        <Page title="Employees">
            {/* Add new Employee modal  */}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                style={{
                    top: '10%'
                }}
            >
                <form onSubmit={handleSubmit(data => addNewEmp(data))} >
                    <Modal.Header closeButton>
                        <Modal.Title>ADD NEW EMPLOYEE</Modal.Title>
                    </Modal.Header>
                    <p>{message}</p>

                    <Modal.Body>
                        <input type='text' {...register('empName')} placeholder='enter full name' className='form-control' required />
                        <select {...register('empGender')} className='form-control mt-2' id="exampleFormControlSelect">
                            <option value='' style={{ color: 'grey' }}>select gender</option>
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                        </select>
                        <input type='number' {...register('empTel')} placeholder='enter telephone' className='form-control mt-2' required />
                        <input type='email' {...register('empEmail')} placeholder='enter email' className='form-control mt-2' required />
                        <input type='text' {...register('empAddress')} placeholder='enter address' className='form-control mt-2' />
                        <select {...register('empDepart')} className='form-control mt-2' id="exampleFormControlSelect">
                            <option value='' style={{ color: 'grey' }}>select department</option>
                            <option value='cleaning'>cleaning</option>
                            <option value='staff'>staff</option>
                            <option value='technical'>technical</option>
                        </select>
                        <input type='number' {...register('empSalary')} placeholder='enter salary' className='form-control mt-2' />
                        <input type='text' {...register('createdBy')} placeholder='created by' className='form-control mt-2' required />
                        <select {...register('empStatus')} className='form-control mt-2' id="exampleFormControlSelect">
                            <option value='' style={{ color: 'grey' }}>select status</option>
                            <option value='true'>active</option>
                            <option value='false'>inactive</option>
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
                        Employees
                    </Typography>
                    <Button variant="contained" onClick={handleShow} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
                        New Employee
                    </Button>
                </Stack>
                <Grid container spacing={3}>
                    <p style={{ textAlign: 'center' }}>{message}</p>
                    <Grid item xs={12} sm={6} md={4}>
                        <AppWidgetSummary title="Total Users" total={totalEmployees} color="info" icon={'icon-park-outline:user'} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <AppWidgetSummary title="Total Active" total={totalActive} icon={'icon-park-outline:user'} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <AppWidgetSummary title="Total Inactive" total={totalInactive} color="warning" sx={{ background: "#ffb7b7" }} icon={'icon-park-outline:user'} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <Card>
                            <UserListToolbar />

                            <Scrollbar >

                                <MDBTable >
                                    <MDBTableHead light >
                                        <tr>
                                            <th scope='col'>fullname</th>
                                            <th scope='col'>telephone</th>
                                            <th scope='col'>address</th>
                                            <th scope='col'>department</th>
                                            <th scope='col'>status</th>
                                            <th scope='col'>joinDate</th>
                                            <th scope='col'>actions</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        {
                                            emps?.map((emp, key) => {
                                                if (emp.status) {
                                                    return (
                                                        <tr>
                                                            <td name='username'>{emp.fullname}</td>
                                                            <td>{emp.tel}</td>
                                                            <td>{emp.address}</td>
                                                            <td>{emp.department}</td>
                                                            <td ><span style={{ background: 'green', color: 'white' }}>active</span></td>
                                                            <td>{formatDate(emp.createdAt)}</td>
                                                            <td>
                                                                <div>
                                                                    <button onClick={() => { getSelectedEmp(emp._id) }} className="btn" id='mybtn'><i className="fa fa-edit" style={{ color: 'blue' }} /></button>
                                                                    <button onClick={() => { showAlert(emp._id) }} className="btn" id='mybtn2'><i className="fa fa-trash text-danger" /></button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                } if (!emp.status) {
                                                    return (
                                                        <tr style={{ background: "#ffb7b7" }}>
                                                            <td name='username'>{emp.fullname}</td>
                                                            <td>{emp.tel}</td>
                                                            <td>{emp.address}</td>
                                                            <td>{emp.department}</td>
                                                            <td ><span style={{ background: 'red', color: 'white' }}>inactive</span></td>
                                                            <td>{formatDate(emp.createdAt)}</td>
                                                            <td>
                                                                <div style={{ display: 'flex' }}>
                                                                    <button onClick={() => { getSelectedEmp(emp._id) }} className="btn" id='mybtn'><i className="fa fa-edit" style={{ color: 'blue' }} /></button>
                                                                    <button onClick={() => { showAlert(emp._id) }} className="btn" id='mybtn2'><i className="fa fa-trash text-danger" /></button>
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
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
}
