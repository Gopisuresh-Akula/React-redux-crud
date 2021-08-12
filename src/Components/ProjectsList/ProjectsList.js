import React, { useState } from "react";
import { List, Row, Col, Card } from "antd";
import uuid from "uuid";
import { Icon, Modal, message, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  AddProjectAction,
  DeleteprojectAction,
  updateprojectAction,
} from "../../Redux/Project/AddProjectAction";
import { useHistory } from "react-router-dom";

const ProjectsList = () => {
  const [projectName, setprojectName] = useState();
  const [updatepro, setupdatepro] = useState({
    proName: "",
    id: "",
  });

  const [CloseModal, setCloseModal] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  let data = useSelector((state) => state.AddProjectReducer);
  const handleAddproject = () => {
    const data = {
      id: uuid.v4(),
      projectName: projectName,
      // feature:[]
    };

    if (projectName) {
      dispatch(AddProjectAction(data));
      setprojectName();
      message.success("project added successfully");
    } else {
      message.error("project can't be blank");
    }
  };
  const handledeleteproject = (item) => {
    dispatch(DeleteprojectAction(item));
    message.success("Deleted successfully")
  };
  const handleupdateproject = () => {
    const { proName, id } = updatepro;
    const data = {
      id: id,
      projectName: proName,
    };
    if (proName) {
      dispatch(updateprojectAction(data));
      setupdatepro({
        proName: "",
        id: "",
      });
      setCloseModal(false);
      message.success("project update successfully");
    } else {
      message.error("please update project");
    }
  };
  const handleedit = (item) => {
    const { projectName, id } = item;
    setupdatepro({
      proName: projectName,
      id,
    });
    setCloseModal(true);
  };
  const { proName } = updatepro;
  return (
    <>
      <div>
        <Row
          type="flex"
          justify="center"
          style={{ display: "flex", alignItems: "center", height: "100vh" }}
        >
          <Col md={12}>
            <Card title="Projects" style={{ borderRadius: 10 }}
              extra={
                <Input/>
              }
            
            >
              <List
                dataSource={data}
                renderItem={(item) => (
                  <>
                    <List.Item
                      key={item.id}
                      actions={[
                        <Button onClick={() => handleedit(item)} className="edit">
                          <Icon type="edit" /> Edit
                        </Button>,
                        <Button onClick={() => handledeleteproject(item)} className="remove">
                          <Icon type="delete" />
                          Remove
                        </Button>,
                        <Button
                          onClick={() =>
                            history.push({
                              pathname: `/project-fetures/${item.id}`,
                              state: item.projectName,
                            })
                          }
                          className="view"
                        >
                          <Icon type="eye" /> view{" "}
                        </Button>,
                      ]}
                    >
                      <List.Item.Meta
                        title={
                          <a href="https://ant.design">{item.projectName}</a>
                        }
                      />
                    </List.Item>
                  </>
                )}
              ></List><br/>
              <div className="Add-project-Container">
                <div className="Add-project-input">
                  <Input
                    value={projectName}
                    placeholder="Enter project name"
                    onChange={(e) => setprojectName(e.target.value)}
                  />
                </div>
                <div className="Add_project_Btn">
                  <Icon
                    onClick={handleAddproject}
                    type="plus-circle"
                    theme="filled"
                  />
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      <Modal
        className="CloseViewModal"
        visible={CloseModal}
        centered={true}
        footer={null}
        onCancel={() => setCloseModal(false)}
        closable={true}
        title="update-project"
      >
        <Input
          placeholder="Enter the Project-Name..."
          autoSize={{ minRows: 6 }}
          name="proName"
          value={proName}
          onChange={(e) =>
            setupdatepro({ ...updatepro, proName: e.target.value })
          }
        />
        <div className="BtnSetup">
          <Button
            className="submitBtn"
            type="primary"
            onClick={handleupdateproject}
          >
            Update
          </Button>
          <Button className="CancelBtn" onClick={() => setCloseModal(false)}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ProjectsList;
