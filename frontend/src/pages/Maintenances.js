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
import moment from 'moment';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import { UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
import '../assets/tblHover.css';
// ---------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function Visitors() {
    const [maintenances, setMaintenances] = useState();
    const [message, setMessage] = useState('');

    const formatDate = (date) => {
        return moment(date).format('DD/MM/YYYY');
    };

    async function bindMaintenances() {
        axios.get(`http://localhost:9000/api/maintenances`)
            .then(res => {
                const mnts = res.data;
                setMaintenances(mnts);
            })
            .catch((err) => setMessage("Error: can't read maintenances."))
    };

    async function updateMaintenance(id) {
        await axios.patch(`http://localhost:9000/api/maintenances/:${id}`,
            {
                status: "true"
            })
            .then((res) => {
                setMessage("Maintenances updated.");
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
                    onClick: () => deleteSelectedMaintenance(id),
                    style: { background: 'red' }
                },
                {
                    label: 'No',
                }
            ]
        });
    };

    async function deleteSelectedMaintenance(id) {
        await axios.delete(`http://localhost:9000/api/maintenances/:${id}`)
            .then(res => {
                const deletedMnt = res.data;
                setMessage(`maintenance removed.`);
            })
            .catch(err => console.log(err));
    };


    useEffect(() => {
        bindMaintenances();
    }, [message]);

    return (
        <Page title="User">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Maintenances
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
                                    maintenances?.map((mnt, key) => {
                                        if (mnt.status) {
                                            return (
                                                <tr>
                                                    <td>{mnt.tenant}</td>
                                                    <td>{mnt.subject}</td>
                                                    <td>{mnt.message}</td>
                                                    <td ><span style={{background:"green", color:"white"}}>done</span></td>
                                                    <td>{formatDate(mnt.createdAt)}</td>
                                                    <td>{formatDate(mnt.updatedAt)}</td>
                                                    <td>
                                                        <div style={{ display: 'flex' }}>
                                                            <button onClick={() => { updateMaintenance(mnt._id) }} className="btn" id='mybtn'><i className="fa fa-check" style={{ color: 'blue' }} /></button>
                                                            <button onClick={() => { showAlert(mnt._id) }} className="btn" id='mybtn2'><i className="fa fa-trash text-danger" /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                        if (!mnt.status) {
                                            return (
                                                <tr>
                                                    <td>{mnt.tenant}</td>
                                                    <td>{mnt.subject}</td>
                                                    <td>{mnt.message}</td>
                                                    <td><span style={{background:"red", color:"white"}}>pending</span></td>
                                                    <td>{formatDate(mnt.createdAt)}</td>
                                                    <td>inprogress</td>
                                                    <td>
                                                        <div style={{ display: 'flex' }}>
                                                            <button onClick={() => { updateMaintenance(mnt._id) }} className="btn" id='mybtn'><i className="fa fa-check" style={{ color: 'blue' }} /></button>
                                                            <button onClick={() => { showAlert(mnt._id) }} className="btn" id='mybtn2'><i className="fa fa-trash text-danger" /></button>
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
