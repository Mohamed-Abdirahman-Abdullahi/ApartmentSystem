import { useEffect, useState } from 'react';
// material
import {
    Grid,
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
import {
    AppWidgetSummary,
} from '../sections/@dashboard/app';
// ---------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function Visitors() {
    const [incomes, setIncomes] = useState();
    const [message, setMessage] = useState('');
    const [numberOfIncome, setNoIncome] = useState();
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalPaid, setTotalPaid] = useState(0);
    const [totalUnpaid, setTotalUnpaid] = useState(0);

    const formatDate = (date) => {
        return moment(date).format('DD/MM/YYYY');
    };

    function getTotalIncome(data){
        let total = 0;
        data.forEach(element => {   
            total += element.amount
        });
        setTotalIncome(total);
    };
    function getTotalPaid(data){
        let total = 0;
        data.forEach(element => {   
            total += element.amount
        });
        setTotalPaid(total);
    };
    function getTotalUnpaid(data){
        let total = 0;
        data.forEach(element => {   
            total += element.amount
        });
        setTotalUnpaid(total);
    };

    async function bindIncome() {
        await axios.get(`http://localhost:9000/api/income`)
            .then(res => {
                const incomes = res.data;
                setIncomes(incomes);
                setNoIncome(incomes.length);
                getTotalIncome(incomes);
                getTotalPaid(incomes.filter((income) => income.status === true));
                getTotalUnpaid(incomes.filter((income) => income.status === false));
            })
            .catch((err) => setMessage("Error: can't read incomes."))
    };

    async function updateIncome(id) {
        await axios.patch(`http://localhost:9000/api/income/:${id}`,
            {
                status: "true"
            })
            .then((res) => {
                setMessage("Income updated.");
            })
            .catch((err) => setMessage("Update failed."))
    };

    function showAlert(action, id) {
        if (action === "update") {
            confirmAlert({
                title: 'Warning!',
                message: 'Are you sure to update ?',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => updateIncome(id),
                        style: { background: 'blue' }
                    },
                    {
                        label: 'No',
                    }
                ]
            });
        }
        else {
            confirmAlert({
                title: 'Warning!',
                message: 'Are you sure to remove ?',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => deleteIncome(id),
                        style: { background: 'red' }
                    },
                    {
                        label: 'No',
                    }
                ]
            });
        }

    };

    async function deleteIncome(id) {
        await axios.delete(`http://localhost:9000/api/income/:${id}`)
            .then(res => {
                const deletedIncome = res.data;
                setMessage(`Income removed.`);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        bindIncome();
    }, [message]);

    return (
        <Page title="Income">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Income
                    </Typography>
                </Stack>
                <p style={{ textAlign: 'center' }}>{message}</p>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Number of Income" total={numberOfIncome} color="info" icon={'icon-park-outline:transaction-order'} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Total Income" total={totalIncome} icon={'dashicons:money-alt'} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Total Paid" total={totalPaid} color="info" icon={'bi:check-circle'} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Total Unpaid" total={totalUnpaid} color="warning" icon={'ic:outline-pending-actions'} />
                    </Grid>
                    <br /> <br />
                    <Grid item xs={12} sm={12} md={12}>
                        <Card>
                            <UserListToolbar />

                            <Scrollbar >

                                <MDBTable >
                                    <MDBTableHead light >
                                        <tr>
                                            <th scope='col'>tenant</th>
                                            <th scope='col'>amount</th>
                                            <th scope='col'>staff</th>
                                            <th scope='col'>status</th>
                                            <th scope='col'>message</th>
                                            <th scope='col' style={{ width: '150px' }}>added date</th>
                                            <th scope='col'>actions</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        {
                                            incomes?.map((income, key) => {
                                                if (income.status) {
                                                    return (
                                                        <tr>
                                                            <td>{income.tenant}</td>
                                                            <td style={{ background: "lightgray" }}>${income.amount}</td>
                                                            <td>{income.staff}</td>
                                                            <td ><span style={{ background: "green", color: "white" }}>done</span></td>
                                                            <td>{income.message}</td>
                                                            <td style={{ background: "lightgray" }}>{formatDate(income.createdAt)}</td>
                                                            <td>
                                                                <div style={{ display: 'flex' }}>
                                                                    <button onClick={() => { updateIncome(income._id) }} className="btn" id='mybtn'><i className="fa fa-check" style={{ color: 'blue' }} /></button>
                                                                    <button onClick={() => { showAlert(income._id) }} className="btn" id='mybtn2'><i className="fa fa-trash text-danger" /></button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                                if (!income.status) {
                                                    return (
                                                        <tr>
                                                            <td>{income.tenant}</td>
                                                            <td style={{ background: "lightgray" }}>${income.amount}</td>
                                                            <td>{income.staff}</td>
                                                            <td ><span style={{ background: "red", color: "white" }}>pending</span></td>
                                                            <td>{income.message}</td>
                                                            <td style={{ background: "lightgray" }}>{formatDate(income.createdAt)}</td>
                                                            <td>
                                                                <div style={{ display: 'flex' }}>
                                                                    <button onClick={() => { showAlert("update", income._id) }} className="btn" id='mybtn'><i className="fa fa-check" style={{ color: 'blue' }} /></button>
                                                                    <button onClick={() => { showAlert("delete", income._id) }} className="btn" id='mybtn2'><i className="fa fa-trash text-danger" /></button>
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
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
}
