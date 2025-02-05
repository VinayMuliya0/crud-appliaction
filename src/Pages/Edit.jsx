// filepath: /C:/Users/91798/Desktop/Crud Application/crud-appliaction/src/Pages/Edit.jsx
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useSelector((state) => state.forms.find((form) => form.id === id));

  const formik = useFormik({
    initialValues: {
      firstName: form?.firstName || "",
      lastName: form?.lastName || "",
      email: form?.email || "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      const updatedForm = { ...values, id };
      dispatch({ type: 'EDIT_DATA', payload: updatedForm });
      navigate('/');
    },
    validate: (values) => {
      let errors = {};

      if (!values.firstName) {
        errors.firstName = 'Please enter the first name';
      }

      if (!values.email) {
        errors.email = 'Please enter your Email';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }

      if (!values.lastName) {
        errors.lastName = 'Please enter the last name';
      }

      return errors;
    }
  });

  return (
    <div className="vh-100 d-flex align-items-center">
      <Container>
        <Row className="gy-4 justify-content-center">
          <Col xs={12}>
            <h1 className="text-center">Edit Form</h1>
          </Col>
          <Col sm={5}>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  placeholder='Enter first name'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                  isInvalid={!!formik.errors.firstName && formik.touched.firstName}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  placeholder='Enter last name'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                  isInvalid={!!formik.errors.lastName && formik.touched.lastName}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.lastName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder='Enter email address'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  isInvalid={!!formik.errors.email && formik.touched.email}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="primary" type="submit">
                Update
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Edit;