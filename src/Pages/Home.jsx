import React, { useState } from "react";
import { Button, Col, Container, Modal, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const forms = useSelector((state) => state.forms);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch({ type: "DELETE_DATA", payload: id });
  };
  console.log("forms", forms.length);
  return (
    <div className="vh-100 d-flex">
      <Container className="my-auto">
        <Row className="gy-4">
          <Col xs={12}>
            <div className="d-flex flex-wrap align-items-center justify-content-between">
              <h1 className="text-center">CURD Application</h1>
              <Link className="btn btn-primary mt-sm-0 mt-2 me-2" to={"/create"}>
                Create Data
              </Link>
            </div>
          </Col>
          <Col xs={12}>
            <div className="table-wrapper">
              <Table responsive>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Last</th>
                    <th>Email</th>
                    <th className="text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {forms?.length === 0 ? (
                    <tr>
                      <td colSpan={5}>
                        <p className="text-center mb-0 py-5">
                          Please enter the data
                        </p>
                      </td>
                    </tr>
                  ) : (
                    forms?.map((form, index) => (
                      <tr key={form.id}>
                        <td>{index + 1}</td>
                        <td>{form.firstName}</td>
                        <td>{form.lastName}</td>
                        <td>{form.email}</td>
                        <td className="text-end">
                          <div>
                            <Link
                              className="btn btn-primary me-2"
                              to={`/edit/${form.id}`}
                            >
                              Edit
                            </Link>
                            <Button
                              className="btn btn-danger"
                              onClick={() => {
                                setSelectedId(form.id);
                                setDeleteModal(true);
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Container>
      <Modal
        show={deleteModal}
        onHide={() => {
          setDeleteModal(false);
          setSelectedId("");
        }}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Delete Data
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-0">Are you sure want to delete this data?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setDeleteModal(false);
              setSelectedId("");
              handleDelete(selectedId);
            }}
            variant="danger"
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
