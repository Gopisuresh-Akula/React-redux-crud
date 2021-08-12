import React, { useState, useEffect } from "react";
import { List, Row, Col, Card, Modal, message } from "antd";
import uuid from "uuid";
import { Icon, Input, Button } from "antd";

import { useDispatch, useSelector } from "react-redux";
import {
  AddproFeaturesAction,
  DeleteproFeatureAction,
  updateproFeatureAction,
  updateFeatureStatusAction
} from "../../Redux/Project/AddProjectAction";
import { useHistory, useLocation, useParams } from "react-router-dom";

const Features = () => {
  const [FeatureName, setFeatureName] = useState();
  const [Filterdata, setFilterdata] = useState();
  const [updatepro, setupdatepro] = useState({
    featureName: "",
    id: "",
  });
  const [CloseModal, setCloseModal] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathparam } = useParams();
  let data = useSelector((state) => state.AddProjectReducer);
  const { state: proName } = useLocation();

  useEffect(() => {
    const filterdata = data && data?.filter((item) => item.id === pathparam);
    setFilterdata(filterdata);
  }, [data,pathparam]);

  console.log("checkdata", data);
  const handleAddFeature = () => {
    const data = {
      id: pathparam,
      projectName: proName,
      feature: {
        id: uuid.v4(),
        FeatureName: FeatureName,
        complete: false,
      },
    };

    if (FeatureName) {
      dispatch(AddproFeaturesAction(data));
      setFeatureName();
      message.success("Feature added successfully");
    } else {
      message.error("Feature can't be blank");
    }
  };

  const feturesdata = [];
  console.log("filterdata", Filterdata ?? "");
  for (const iterator of Filterdata?.[0]?.feature ?? []) {
    const { FeatureName, id ,complete} = iterator;

    feturesdata.push({
      FeatureName,
      id,
      complete
    });
  }
  const handledeletefeature = (item) => {
    const { FeatureName, id } = item;
    const data = {
      id: pathparam,
      projectName: proName,
      feature: {
        FeatureName,
        id,
      },
    };

    dispatch(DeleteproFeatureAction(data));
    message.success("Deleted successfully");
  };
  const handleupdatefeature = () => {
    const { featureName, id } = updatepro;
    const data = {
      id: pathparam,
      projectName: proName,
      feature: {
        FeatureName: featureName,
        id,
      },
    };
    if (featureName) {
      dispatch(updateproFeatureAction(data));
      setupdatepro({
        FeatureName: "",
        id: "",
      });

      setCloseModal(false);
      message.success("Feature update successfully");
    } else {
      message.error("please update Feature");
    }
  };
  const handlefeatureStatus = (item) => {
    const { FeatureName, id } = item;
    const data = {
      id: pathparam,
      projectName: proName,
      feature: {
        FeatureName: FeatureName,
        id,
      },
    };
    
      dispatch(updateFeatureStatusAction(data));
      message.success("Feature update successfully");
    
  };

  const handleedit = (item) => {
    const { FeatureName, id } = item;
    setupdatepro({
      featureName: FeatureName,
      id,
    });
    setCloseModal(true);
  };
  if (data.length === 0) {
    history.push("/");
  }
  const { featureName } = updatepro;

  return (
    <>
      <div>
        <Row
          type="flex"
          justify="center"
          style={{ display: "flex", alignItems: "center", height: "100vh" }}
        >
          <Col md={12}>
            <Card
              title="Features"
              style={{ borderRadius: 10 }}
              extra={
                <Button className="view" onClick={() => history.goBack()}>
                  back
                </Button>
                
              }
            >
              <List
                dataSource={feturesdata}
                renderItem={(item) => (
                  <>
                    <List.Item
                      key={item.id}
                      actions={[
                        !item.complete &&(<> <Button
                          onClick={() => handleedit(item)}
                          className="edit"
                        >
                          <Icon type="edit" /> Edit
                        </Button>,
                        <Button
                          onClick={() => handledeletefeature(item)}
                          className="remove"
                        >
                          <Icon type="delete" />
                          Remove
                        </Button></>),
                        !item.complete?(<Button onClick={() => handlefeatureStatus(item)}>
                          <Icon type="check-circle" />
                        </Button>):<Button className="complete">
                          completed
                        </Button>,
                      ]}
                    >
                      <List.Item.Meta title={<span style={{textDecoration:item.complete&&"line-through"}}>{item.FeatureName}</span>} />
                    </List.Item>
                  </>
                )}
              ></List><br/>
              <div className="Add-project-Container">
                <div className="Add-project-input">
                  <Input
                    value={FeatureName}
                    onChange={(e) => setFeatureName(e.target.value)}
                  />
                </div>
                <div className="Add_project_Btn">
                  <Icon
                    onClick={handleAddFeature}
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
        title="update-feature"
      >
        <Input
          placeholder="Enter the features..."
          autoSize={{ minRows: 6 }}
          name="featureName"
          value={featureName}
          onChange={(e) =>
            setupdatepro({ ...updatepro, featureName: e.target.value })
          }
        />
        <div className="BtnSetup">
          <Button
            className="submitBtn"
            type="primary"
            onClick={handleupdatefeature}
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

export default Features;
