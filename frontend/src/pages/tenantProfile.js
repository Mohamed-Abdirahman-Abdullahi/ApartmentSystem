import React, { useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, input, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon, MDBCheckbox, MDBTextArea } from 'mdb-react-ui-kit';
import '../assets/profile.css';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import moment from 'moment';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';


export default function PersonalProfile() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [isDisabled, setDisabled] = useState(true);
    const [message, setMessage] = useState('');

    const {
        register,
        handleSubmit,
    } = useForm();

    const formatDate = (date) => {
        return moment(date).format('DD/MM/YYYY');
      }

    async function updateEmp(id, data) {
        await axios.patch(`http://localhost:9000/api/tenants/:${id}`,
            {
                fullname: data.fullname,
                gender: data.gender,
                tel: data.tel,
                email: data.email,
                address: data.address,
                guarantor: data.guarantor,
                createdBy: data.createdBy,
                status: data.status
            })
            .then((res) => navigate('/dashboard/tenants'))
            .catch((err) => setMessage('tenant not updated...'));
    };

    return (
        <section className="vh-100" style={{ backgroundColor: '#f4f5f7', width: '100%' }}>
            <p style={{ textAlign: 'center' }}>{message}</p>
            <MDBContainer className="py-5 h-100" >
                <MDBRow >
                    <MDBCol lg="8" className="mb-4 mb-lg-0">
                        <MDBTypography tag="h6">Tenant Profile</MDBTypography>
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
                                    {state?.map((tenant, key) => {
                                        return (
                                            <MDBCardBody className="p-4">
                                                <form onSubmit={handleSubmit(data => updateEmp(tenant._id, data))}>

                                                    <MDBTypography tag="h6">Information</MDBTypography>
                                                    <hr className="mt-0 mb-4" />
                                                    <MDBRow className="pt-1">
                                                        <MDBCol size="6" className="mb-3" key={key}>
                                                            <MDBTypography tag="h6">Fullname</MDBTypography>
                                                            <input type='text' id='form1' {...register('fullname')} onChange={() => setDisabled(false)} className="text-muted form-control" defaultValue={tenant.fullname} />
                                                        </MDBCol>
                                                        <MDBCol size="6" className="mb-3">
                                                            <MDBTypography tag="h6">Gender</MDBTypography>
                                                            <input type='text' {...register('gender')} onChange={() => setDisabled(false)} className="text-muted form-control" defaultValue={tenant.gender} />
                                                        </MDBCol>
                                                    </MDBRow>

                                                    <MDBRow className="pt-1">
                                                        <MDBCol size="6" className="mb-3">
                                                            <MDBTypography tag="h6">Telephone</MDBTypography>
                                                            <input type='number' {...register('tel')} onChange={() => setDisabled(false)} className="text-muted form-control" defaultValue={tenant.tel} />
                                                        </MDBCol>
                                                        <MDBCol size="6" className="mb-3">
                                                            <MDBTypography tag="h6">Email</MDBTypography>
                                                            <input type='email' {...register('email')} onChange={() => setDisabled(false)} className="text-muted form-control" defaultValue={tenant.email} />
                                                        </MDBCol>
                                                    </MDBRow>

                                                    <MDBRow className="pt-1">
                                                        <MDBCol size="6" className="mb-3">
                                                            <MDBTypography tag="h6">Address</MDBTypography>
                                                            <input type='text' {...register('address')} onChange={() => setDisabled(false)} className="text-muted form-control" defaultValue={tenant.address} />
                                                        </MDBCol>
                                                        <MDBCol size="6" className="mb-3">
                                                            <MDBTypography tag="h6">Guarantor</MDBTypography>
                                                            <select onChange={() => setDisabled(false)} {...register('guarantor')} className='form-control mt-2'>
                                                                <option value='alas' style={{ color: 'grey' }}>{tenant.guarantor}</option>
                                                                <option value='alas'>badri</option>
                                                            </select>
                                                        </MDBCol>
                                                    </MDBRow>

                                                    <MDBRow className="pt-1">
                                                        <MDBCol size="6" className="mb-3">
                                                            <MDBTypography tag="h6">Status</MDBTypography>
                                                            <select onChange={() => setDisabled(false)} {...register('empStatus')} className='form-control mt-2'>
                                                                <option value={(tenant.status) ? 'true' : 'false'} style={{ color: 'grey' }}>{(tenant.status) ? 'active' : 'inactive'}</option>
                                                                <option value={(tenant.status) ? 'false' : 'true'}>{(tenant.status) ? 'inactive' : 'active'}</option>
                                                            </select>
                                                        </MDBCol>
                                                        <MDBCol size="6" className="mb-3">
                                                            <MDBTypography tag="h6">Created At</MDBTypography>
                                                            <input className="text-muted form-control" value={tenant.createdAt} />
                                                        </MDBCol>
                                                    </MDBRow>

                                                    <MDBRow className="pt-1">
                                                        <MDBCol size="6" className="mb-3">
                                                            <MDBTypography tag="h6">Created by</MDBTypography>
                                                            <input type='text' {...register('createdBy')} onChange={() => setDisabled(false)} className="text-muted form-control" defaultValue={tenant.createdBy} />
                                                        </MDBCol>
                                                        <MDBCol size="6" className="mb-3">
                                                            <MDBTypography tag="h6">End At</MDBTypography>
                                                            <input {...register('endDate')} className="text-muted form-control" value={(tenant.status) ? "rent" : formatDate(tenant.updatedAt)} />
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
                </MDBRow>
            </MDBContainer>
        </section>
    );
}