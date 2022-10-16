import { useEffect, useState } from 'react';
// material
import {
    Card,
    Stack,
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
    const [inboxes, setMaintenances] = useState();
    const [message, setMessage] = useState('');

    const formatDate = (date) => {
        return moment(date).format('DD/MM/YYYY');
    };

    async function bindInboxes() {
        await axios.get(`http://localhost:9000/api/inboxes`)
            .then(res => {
                const mnts = res.data;
                setMaintenances(mnts);
            })
            .catch((err) => setMessage("Error: can't read inboxes."))
    };

    async function updateInbox(id) {
        await axios.patch(`http://localhost:9000/api/inboxes/:${id}`,
            {
                status: "true"
            })
            .then((res) => {
                setMessage("Inbox updated.");
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
                    onClick: () => deleteInbox(id),
                    style: { background: 'red' }
                },
                {
                    label: 'No',
                }
            ]
        });
    };

    async function deleteInbox(id) {
        await axios.delete(`http://localhost:9000/api/inboxes/:${id}`)
            .then(res => {
                const deletedInbox = res.data;
                setMessage(`inbox removed.`);
            })
            .catch(err => console.log(err));
    };


    useEffect(() => {
        bindInboxes();
    }, [message]);

    return (
        <Page title="Inbox">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Inbox
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
                                    <th scope='col'>type</th>
                                    <th scope='col'>status</th>
                                    <th scope='col'>sendDate</th>
                                    <th scope='col'>doneDate</th>
                                    <th scope='col'>actions</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {
                                    inboxes?.map((inbox, key) => {
                                        if (inbox.status) {
                                            return (
                                                <tr>
                                                    <td>{inbox.tenant}</td>
                                                    <td>{inbox.subject}</td>
                                                    <td>{inbox.message}</td>
                                                    <td>{inbox.type}</td>
                                                    <td ><span style={{background:"green", color:"white"}}>done</span></td>
                                                    <td>{formatDate(inbox.createdAt)}</td>
                                                    <td>{formatDate(inbox.updatedAt)}</td>
                                                    <td>
                                                        <div style={{ display: 'flex' }}>
                                                            <button onClick={() => { updateInbox(inbox._id) }} className="btn" id='mybtn'><i className="fa fa-check" style={{ color: 'blue' }} /></button>
                                                            <button onClick={() => { showAlert(inbox._id) }} className="btn" id='mybtn2'><i className="fa fa-trash text-danger" /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                        if (!inbox.status) {
                                            return (
                                                <tr>
                                                    <td>{inbox.tenant}</td>
                                                    <td>{inbox.subject}</td>
                                                    <td>{inbox.message}</td>
                                                    <td>{inbox.type}</td>
                                                    <td><span style={{background:"red", color:"white"}}>pending</span></td>
                                                    <td>{formatDate(inbox.createdAt)}</td>
                                                    <td>inprogress</td>
                                                    <td>
                                                        <div style={{ display: 'flex' }}>
                                                            <button onClick={() => { updateInbox(inbox._id) }} className="btn" id='mybtn'><i className="fa fa-check" style={{ color: 'blue' }} /></button>
                                                            <button onClick={() => { showAlert(inbox._id) }} className="btn" id='mybtn2'><i className="fa fa-trash text-danger" /></button>
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
