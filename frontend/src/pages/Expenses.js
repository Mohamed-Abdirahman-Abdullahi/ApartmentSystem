import { useEffect, useState } from 'react';
// material
import { Grid, Card, Stack, Container, Typography } from '@mui/material';
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
import { AppWidgetSummary } from '../sections/@dashboard/app';
// ---------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function Visitors() {
  const [Expenses, setExpenses] = useState();
  const [message, setMessage] = useState('');
  const [numberOfExpense, setNoExpense] = useState();
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [totalUnpaid, setTotalUnpaid] = useState(0);

  const formatDate = (date) => {
    return moment(date).format('DD/MM/YYYY');
  };

  function getTotalExpense(data) {
    let total = 0;
    data.forEach((element) => {
      total += element.amount;
    });
    setTotalExpense(total);
  }
  function getTotalPaid(data) {
    let total = 0;
    data.forEach((element) => {
      total += element.amount;
    });
    setTotalPaid(total);
  }
  function getTotalUnpaid(data) {
    let total = 0;
    data.forEach((element) => {
      total += element.amount;
    });
    setTotalUnpaid(total);
  }

  async function bindExpense() {
    await axios
      .get(`http://localhost:9000/api/expenses`)
      .then((res) => {
        const Expenses = res.data;
        setExpenses(Expenses);
        setNoExpense(Expenses.length);
        getTotalExpense(Expenses);
        getTotalPaid(Expenses.filter((Expense) => Expense.status === true));
        getTotalUnpaid(Expenses.filter((Expense) => Expense.status === false));
      })
      .catch((err) => setMessage("Error: can't read Expenses."));
  }

  async function updateExpense(id) {
    await axios
      .patch(`http://localhost:9000/api/expenses/:${id}`, {
        status: 'true',
      })
      .then((res) => {
        setMessage('Expense updated.');
      })
      .catch((err) => setMessage('Update failed.'));
  }

  function showAlert(action, id) {
    if (action === 'update') {
      confirmAlert({
        title: 'Warning!',
        message: 'Are you sure to update ?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => updateExpense(id),
            style: { background: 'blue' },
          },
          {
            label: 'No',
          },
        ],
      });
    } else {
      confirmAlert({
        title: 'Warning!',
        message: 'Are you sure to remove ?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => deleteExpense(id),
            style: { background: 'red' },
          },
          {
            label: 'No',
          },
        ],
      });
    }
  }

  async function deleteExpense(id) {
    await axios
      .delete(`http://localhost:9000/api/expenses/:${id}`)
      .then((res) => {
        const deletedExpense = res.data;
        setMessage(`Expense removed.`);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    bindExpense();
  }, [message]);

  return (
    <Page title="Expense">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Expense
          </Typography>
        </Stack>
        <p style={{ textAlign: 'center' }}>{message}</p>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Number of Expense"
              total={numberOfExpense}
              color="info"
              icon={'icon-park-outline:transaction-order'}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Expense" total={totalExpense} icon={'dashicons:money-alt'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Paid" total={totalPaid} color="info" icon={'bi:check-circle'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Total Unpaid"
              total={totalUnpaid}
              color="warning"
              icon={'ic:outline-pending-actions'}
            />
          </Grid>
          <br /> <br />
          <Grid item xs={12} sm={12} md={12}>
            <Card>
              <UserListToolbar />

              <Scrollbar>
                <MDBTable>
                  <MDBTableHead light>
                    <tr>
                      <th scope="col">account</th>
                      <th scope="col">number</th>
                      <th scope="col">description</th>
                      <th scope="col">type</th>
                      <th scope="col">category</th>
                      <th scope="col">receiptNo</th>
                      <th scope="col">memo</th>
                      <th scope="col">amount</th>
                      <th scope="col">date</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {Expenses?.map((Expense, key) => {
                      return (
                        <tr>
                          <td>{Expense.account}</td>
                          {/* <td style={{ background: 'lightgray' }}>${Expense.amount}</td> */}
                          <td>{Expense.number}</td>
                          <td>{Expense.description}</td>
                          <td>{Expense.type}</td>
                          <td>{Expense.category}</td>
                          <td>{Expense.receiptNo}</td>
                          <td>{Expense.memo}</td>
                          <td>{Expense.amount}</td>
                          <td style={{ background: 'lightgray' }}>{formatDate(Expense.createdAt)}</td>
                          <td>
                            <div style={{ display: 'flex' }}>
                              <button
                                onClick={() => {
                                  updateExpense(Expense._id);
                                }}
                                className="btn"
                                id="mybtn"
                              >
                                <i className="fa fa-check" style={{ color: 'blue' }} />
                              </button>
                              <button
                                onClick={() => {
                                  showAlert(Expense._id);
                                }}
                                className="btn"
                                id="mybtn2"
                              >
                                <i className="fa fa-trash text-danger" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );

                      //   if (!Expense.status) {
                      //     return (
                      //       <tr>
                      //         <td>{Expense.tenant}</td>
                      //         <td style={{ background: 'lightgray' }}>${Expense.amount}</td>
                      //         <td>{Expense.staff}</td>
                      //         <td>
                      //           <span style={{ background: 'red', color: 'white' }}>pending</span>
                      //         </td>
                      //         <td>{Expense.message}</td>
                      //         <td style={{ background: 'lightgray' }}>{formatDate(Expense.createdAt)}</td>
                      //         <td>
                      //           <div style={{ display: 'flex' }}>
                      //             <button
                      //               onClick={() => {
                      //                 showAlert('update', Expense._id);
                      //               }}
                      //               className="btn"
                      //               id="mybtn"
                      //             >
                      //               <i className="fa fa-check" style={{ color: 'blue' }} />
                      //             </button>
                      //             <button
                      //               onClick={() => {
                      //                 showAlert('delete', Expense._id);
                      //               }}
                      //               className="btn"
                      //               id="mybtn2"
                      //             >
                      //               <i className="fa fa-trash text-danger" />
                      //             </button>
                      //           </div>
                      //         </td>
                      //       </tr>
                      //     );
                      //   }
                      //   return null;
                    })}
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
