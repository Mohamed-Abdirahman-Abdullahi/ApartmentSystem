import React, { useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, input, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon, MDBCheckbox, MDBTextArea } from 'mdb-react-ui-kit';
import '../assets/profile.css';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';


export default function PersonalProfile() {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);
  const [isDisabled, setDisabled] = useState(true);
  const [message, setMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function updateUser(id, data) {
    if(data.password === ''){
      await axios.patch(`http://localhost:9000/api/users/:${id}`,
      {
        username: data.username,
        email: data.email,
        status: data.status,
        userGroupID: data.userGroupID
      })
      .then((res) => navigate('/dashboard/user'))
      .catch((err) => setMessage('user not updated...'));
    } else {
      await axios.patch(`http://localhost:9000/api/users/:${id}`,
      {
        username: data.username,
        email: data.email,
        password: data.password,
        status: data.status,
        userGroupId: data.userGroupID
      })
      .then((res) => navigate('/dashboard/user'))
      .catch((err) => console.log(err));
    }
   
  };

  return (
    <section className="vh-100" style={{ backgroundColor: '#f4f5f7', width: '100%' }}>
      <p style={{ textAlign: 'center' }}>{message}</p>
      <MDBContainer className="py-5 h-100" >
        <MDBRow >
          <MDBCol lg="8" className="mb-4 mb-lg-0">
            <MDBTypography tag="h6">User Profile</MDBTypography>
            <MDBCard className="mb-5" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">

                <MDBCol md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                    alt="Avatar" className="my-5" style={{ width: '120px', margin: 'auto' }} fluid />
                  <MDBTypography tag="h5">Alas Abdirahman</MDBTypography>
                  <MDBCardText>Full Stack Developer</MDBCardText>
                  <MDBIcon icon="facebook" style={{ color: 'blue', marginRight: '20px', fontSize: '20px' }} />
                  <MDBIcon icon="whatsapp" style={{ color: 'green', marginRight: '20px', fontSize: '20px' }} />
                  <MDBIcon icon="twitter mb-5 " style={{ color: 'blue', fontSize: '20px' }} />

                </MDBCol>

                <MDBCol md="8">
                  {state?.map((user, key) => {
                    return (
                      <MDBCardBody className="p-4">
                        <form onSubmit={handleSubmit(data => updateUser(user._id, data))}>

                          <MDBTypography tag="h6">Information</MDBTypography>
                          <hr className="mt-0 mb-4" />
                          <MDBRow className="pt-1">
                            <MDBCol size="6" className="mb-3" key={key}>
                              <MDBTypography tag="h6">Username</MDBTypography>
                              <input type='text' id='form1' {...register('username')} onChange={() => setDisabled(false)} className="text-muted form-control" defaultValue={user.username} />
                            </MDBCol>
                            <MDBCol size="6" className="mb-3">
                              <MDBTypography tag="h6">Email</MDBTypography>
                              <input type='email' {...register('email')} onChange={() => setDisabled(false)} className="text-muted form-control" defaultValue={user.email} />
                            </MDBCol>
                          </MDBRow>

                          <MDBRow className="pt-1">
                            <MDBCol size="6" className="mb-3">
                              <MDBTypography tag="h6">Password</MDBTypography>
                              <input type='password' {...register('password')} onChange={() => setDisabled(false)} className="text-muted form-control" defaultValue='' />
                            </MDBCol>
                            <MDBCol size="6" className="mb-3">
                              <MDBTypography tag="h6">Status</MDBTypography>
                              <select onChange={() => setDisabled(false)} {...register('status')} className='form-control mt-2'>
                                <option value={(user.status) ? 'true' : 'false'} style={{ color: 'grey' }}>{(user.status) ? 'active' : 'inactive'}</option>
                                <option value={(user.status) ? 'false' : 'true'}>{(user.status) ? 'inactive' : 'active'}</option>
                              </select>
                            </MDBCol>
                          </MDBRow>

                          <MDBRow className="pt-1">
                            <MDBCol size="6" className="mb-3">
                              <MDBTypography tag="h6">Group</MDBTypography>
                              <select onChange={() => setDisabled(false)} {...register('userGroupID')} className='form-control mt-2'>
                                <option value='unknown' style={{ color: 'grey' }}>userGroupID</option>
                                <option value='unknown'>managers</option>
                                <option value='unknown'>admins</option>
                                <option value='unknown'>receptions</option>
                              </select>
                            </MDBCol>
                            <MDBCol size="6" className="mb-3">
                              <MDBTypography tag="h6">Created</MDBTypography>
                              <input className="text-muted form-control" value={user.created_at} />
                            </MDBCol>
                          </MDBRow>

                          <hr className="mt-0 mb-4" />
                          <MDBRow className="pt-1">
                            <MDBCol size="6" >
                              {
                                (isDisabled) ? <Button disabled variant="outline-success" type='submit'>save</Button> : <Button variant="outline-success" type='submit'>save</Button>
                              }
                            </MDBCol>
                          </MDBRow>
                        </form>
                      </MDBCardBody>
                    )
                  })}
                </MDBCol>

              </MDBRow>
            </MDBCard>
          </MDBCol>

          <MDBCol lg="4" className="mb-4 mb-lg-0 ml-10 " >
            <MDBTypography tag="h6">User Permissions</MDBTypography>
            <MDBCard className="mb-5" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Pages</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBCheckbox inline name='gfg' id='gfgDefault'
                          label='Dashboard' /> <br /> <br />
                        <MDBCheckbox defaultChecked inline name='gfg' id='gfgDefault'
                          label='Users' /> <br /> <br />
                        <MDBCheckbox inline name='gfg' id='gfgDefault'
                          label='Tenants' />

                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBCheckbox defaultChecked inline name='gfg' id='gfgDefault'
                          label='Settings' /> <br /> <br />
                        <MDBCheckbox inline name='gfg' id='gfgDefault'
                          label='Finance' /> <br /> <br />
                        <MDBCheckbox defaultChecked inline name='gfg' id='gfgDefault'
                          label='Reports' />
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}