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
        username: e.username,
        email: e.email,
        password: e.password,
        status: e.status,
        userGroupID: e.userGroupID
      })
        .then(res => {
          setMessage('new user added');
          setShow(false);
          window.location.reload();
        })
        .catch(err => {
          setMessage('new use creation failed...');
        });
    }
    else {
      setMessage('password fields must match...');
    };

  };

  useEffect(() => {
    getUsers();
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
        <form onSubmit={handleSubmit(data => addNewUser(data))} >
          <Modal.Header closeButton>
            <Modal.Title>ADD NEW USER</Modal.Title>
          </Modal.Header>
          <p style={{ textAlign: 'center' }}>{message}</p>

          <Modal.Body>
            <input type='text' {...register('username')} placeholder='enter username' className='form-control' />
            <input type='email' {...register('email')} placeholder='enter email' className='form-control mt-2' />
            <input type='password' {...register('password')} placeholder='enter password' className='form-control mt-2' />
            <input type='password' {...register('confPassword')} placeholder='confirm password' className='form-control mt-2' />
            <select {...register('status')} className='form-control mt-2' id="exampleFormControlSelect">
              <option value='false' style={{ color: 'grey' }}>status</option>
              <option value='true'>active</option>
              <option value='false'>inactive</option>
            </select>
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
                  <th scope='col'>username</th>
                  <th scope='col'>email</th>
                  <th scope='col'>userGroupID</th>
                  <th scope='col'>status</th>
                  <th scope='col'>created_at</th>
                  <th scope='col'>actions</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {
                  users?.map((user, key) => {
                    if (user.status.toString() === 'true') {
                      return (
                        <tr key={key}>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td>{user.userGroupID}</td>
                          <td><span style={{  background: 'green', color: 'white' }}>active</span></td>
                          <td>{user.created_at}</td>
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
                        <tr key={key} style={{background: "#ffb7b7"}}>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td>{user.userGroupID}</td>
                          <td><span style={{ background: 'red', color: 'white' }}>inactive</span></td>
                          <td>{user.created_at}</td>
                          <td>
                            <div>
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
