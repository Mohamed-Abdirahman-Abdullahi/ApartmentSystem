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

// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import { UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
import '../assets/tblHover.css';
// ---------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function Visitors() {
    const [compls, setCompls] = useState();
    const [message, setMessage] = useState('');

    async function bindComplaints() {
        axios.get(`http://localhost:9000/api/complaints`)
            .then(res => {
                const compls = res.data;
                setCompls(compls);
            })
            .catch((err) => setMessage("Error: can't read complaints."))
    };

    async function updateComplaint(id) {
        await axios.patch(`http://localhost:9000/api/complaints/:${id}`,
            {
                status: "true"
            })
            .then((res) => {
                setMessage("Complaint updated.");
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
                    onClick: () => deleteSelectedComplaint(id),
                    style: { background: 'red' }
                },
                {
                    label: 'No',
                }
            ]
        });
    };

    async function deleteSelectedComplaint(id) {
        await axios.delete(`http://localhost:9000/api/complaints/:${id}`)
            .then(res => {
                const deletedCompl = res.data;
                setMessage(`complaint removed.`);
            })
            .catch(err => console.log(err));
    };


    useEffect(() => {
        bindComplaints();
    }, [message]);

    return (
        <Page title="User">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Complaints
                    </Typography>
                </Stack>
                <p style={{ textAlign: 'center' }}>{message}</p>
                <Card>
                    <UserListToolbar />

                    <Scrollbar >

                        <MDBTable >
                            <MDBTableHead light >
                                <tr>
                                    <th scope='col'>tenant</th>
                                    <th scope='col'>subject</th>
                                    <th scope='col'>message</th>
                                    <th scope='col'>status</th>
                                    <th scope='col'>sendDate</th>
                                    <th scope='col'>doneDate</th>
                                    <th scope='col'>actions</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {
                                    compls?.map((compl, key) => {
                                        if (compl.status) {
                                            return (
                                                <tr>
                                                    <td>{compl.tenant}</td>
                                                    <td>{compl.subject}</td>
                                                    <td>{compl.message}</td>
                                                    <td ><span style={{background:"green", color:"white"}}>done</span></td>
                                                    <td>{compl.createdAt}</td>
                                                    <td>{compl.updatedAt}</td>
                                                    <td>
                                                        <div style={{ display: 'flex' }}>
                                                            <button onClick={() => { updateComplaint(compl._id) }} className="btn" id='mybtn'><i className="fa fa-check" style={{ color: 'blue' }} /></button>
                                                            <button onClick={() => { showAlert(compl._id) }} className="btn" id='mybtn2'><i className="fa fa-trash text-danger" /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                        if (!compl.status) {
                                            return (
                                                <tr>
                                                    <td>{compl.tenant}</td>
                                                    <td>{compl.subject}</td>
                                                    <td>{compl.message}</td>
                                                    <td><span style={{background:"red", color:"white"}}>pending</span></td>
                                                    <td>{compl.createdAt}</td>
                                                    <td>inprogress</td>
                                                    <td>
                                                        <div style={{ display: 'flex' }}>
                                                            <button onClick={() => { updateComplaint(compl._id) }} className="btn" id='mybtn'><i className="fa fa-check" style={{ color: 'blue' }} /></button>
                                                            <button onClick={() => { showAlert(compl._id) }} className="btn" id='mybtn2'><i className="fa fa-trash text-danger" /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                        return null
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
