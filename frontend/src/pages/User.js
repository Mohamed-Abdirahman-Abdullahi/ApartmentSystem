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
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import { UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
import '../assets/tblHover.css';
// ---------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function User() {
  const navigate = useNavigate();
  const [users, setUsers] = useState();
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);

  const formatDate = (date) => {
    return moment(date).format('DD/MM/YYYY');
  }

  async function getUsers() {
    axios.get(`http://localhost:9000/api/users`)
      .then(res => {
        const userss = res.data;
        setUsers(userss);
      })
  };

  async function getSelectedUser(id) {
    await axios.get(`http://localhost:9000/api/users/:${id}`)
      .then(res => {
        const userData = res.data;
        navigate("/dashboard/profile", { state: userData });
      });

  }

  function showAlert(id) {
    confirmAlert({
      title: 'Warning!',
      message: 'Are you sure to remove.?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteSelectedUser(id),
          style: { background: 'red' }
        },
        {
          label: 'No',
        }
      ]
    });
  };

  async function deleteSelectedUser(id) {
    await axios.delete(`http://localhost:9000/api/users/:${id}`)
      .then(res => {
        const deletedUser = res.data;
        setMessage(`user removed.`);
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

  async function addNewUser(e) {
    if (e.password === e.confPassword) {
      await axios.post('http://localhost:9000/api/users', {
        fullname: e.fullname,
        gender: e.gender,
        tel: e.tel,
        email: e.email,
        address: e.address,
        username: e.username,
        password: e.password,
        userGroupID: e.userGroupID
      })
        .then(res => {
          setMessage('new user added');
          setShow(false);
        })
        .catch(err => {
          setMessage('new user creation failed...');
        });
    }
    else {
      setMessage('password fields must match...');
    };

  };

  useEffect(() => {
    getUsers();
  }, [message]);

  return (
    <Page title="Users">
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        style={{
          top: '10%'
        }}
      >
        <form onSubmit={handleSubmit(data => addNewUser(data))} >
          <Modal.Header closeButton>
            <Modal.Title>ADD NEW USER</Modal.Title>
          </Modal.Header>
          <p style={{ textAlign: 'center' }}>{message}</p>

          <Modal.Body>
            <input type='text' {...register('fullname')} placeholder='enter fullname' className='form-control' />
            <select {...register('gender')} className='form-control mt-2' id="exampleFormControlSelect">
              <option value='' style={{ color: 'grey' }}>gender</option>
              <option value='male'>male</option>
              <option value='female'>female</option>
            </select>            
            <input type='number' {...register('tel')} placeholder='enter tel' className='form-control mt-2' />
            <input type='email' {...register('email')} placeholder='enter email' className='form-control mt-2' />
            <input type='text' {...register('address')} placeholder='enter address' className='form-control mt-2' />
            <input type='text' {...register('username')} placeholder='enter username' className='form-control mt-2' />
            <input type='password' {...register('password')} placeholder='enter password' className='form-control mt-2' />
            <input type='password' {...register('confPassword')} placeholder='confirm password' className='form-control mt-2' />
            <select {...register('userGroupID')} className='form-control mt-2' id="exampleFormControlSelect">
              <option value='unknown' style={{ color: 'grey' }}>userGroupID</option>
              <option value='unknown'>managers</option>
              <option value='unknown'>admins</option>
              <option value='unknown'>receptions</option>
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
            Users
          </Typography>
          <Button variant="contained" onClick={handleShow} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Users
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
                  <th scope='col'>gender</th>
                  <th scope='col'>address</th>
                  <th scope='col'>email</th>
                  <th scope='col'>username</th>
                  <th scope='col'>status</th>
                  <th scope='col'>joinedAt</th>
                  <th scope='col'>actions</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {
                  users?.map((user, key) => {
                    if (user.status.toString() === 'true') {
                      return (
                        <tr key={key}>
                          <td>{user.fullname}</td>
                          <td>{user.gender}</td>
                          <td>{user.address}</td>
                          <td>{user.email}</td>
                          <td>{user.username}</td>
                          <td><span style={{ background: 'green', color: 'white' }}>active</span></td>
                          <td>{formatDate(user.created_at)}</td>
                          <td>
                            <div>
                              <button onClick={() => { getSelectedUser(user._id) }} className="btn" id='mybtn'><i className="fa fa-edit" style={{ color: 'blue' }} /></button>
                              <button onClick={() => { showAlert(user._id) }} className="btn" id='mybtn2'><i className="fa fa-trash text-danger" /></button>
                            </div>
                          </td>
                        </tr>
                      )
                    } if (user.status.toString() === 'false') {
                      return (
                        <tr key={key} style={{ background: "#ffb7b7" }}>
                        <td>{user.fullname}</td>
                          <td>{user.gender}</td>
                          <td>{user.address}</td>
                          <td>{user.email}</td>
                          <td>{user.username}</td>
                          <td><span style={{ background: 'red', color: 'white' }}>inactive</span></td>
                          <td>{formatDate(user.created_at)}</td>
                          <td>
                            <div style={{display:"flex"}}>
                              <button onClick={() => { getSelectedUser(user._id) }} className="btn" id='mybtn'><i className="fa fa-edit" style={{ color: 'blue' }} /></button>
                              <button onClick={() => { showAlert(user._id) }} className="btn" id='mybtn2'><i className="fa fa-trash text-danger" /></button>
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
