import React, { Component } from "react";
import {
  Row,
  Col,
  Button,
  Icon,
  Modal,
  Alert,
  Input,
  Form,
  message
} from "antd";
import { connect } from "react-redux";
import { addList, GetList, EditList ,DeleteList } from "../service";
import Header from "../../Common/components/Header/Header";
const confirm = Modal.confirm;
const { TextArea } = Input;

class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      visible: false,
      isNew: true,
      SelectedItem: null,
      ToDoList: [],
      showAlert: false,
      showDeleteAlert: false,
      showMsg: false
    };
    this.loadData();
  }

  showCreateModal = () => {
    this.props.form.resetFields()
    this.setState({
      visible: true,
      isNew: true
    });
  };

  showEditModal = item => {
    this.setState({
      visible: true,
      isNew: false,
      SelectedItem: {
        title: item.title,
        content: item.content,
        Id: item.Id
      }
    });

    this.props.form.setFieldsValue({
        title: item.title,
        content: item.content
    })

    // console.log(JSON.stringify(this.state.SelectedItem));
    console.log(item)
  };


  loadData = () => {
    this.setState({
        loading: true
      });
    this.props.dispatch(
      GetList(
        data => {
          this.setState({
            loading: false,
            ToDoList: data
          });
          console.log(data);
          // this.props.history.push("/ToDoList");
        },
        err => {
          this.setState({ loading: false });
          err.errors.forEach(error => {
            message.error(error);
          });
        }
      )
    );
  };


  handleOk = e => {
    console.log(e);
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (this.state.isNew) {
          //Create logic
          let body = {
            title: values.title,
            content: values.content
          };
          this.props.dispatch(
            addList(
              body,
              data => {
                this.setState({
                  loading: false,
                  visible: false
                });
                this.loadData();
                console.log(data);
                // this.props.history.push("/ToDoList");
              },
              err => {
                this.setState({ loading: false });
                err.errors.forEach(error => {
                  message.error(error);
                });
              }
            )
          );
        } else {
          //edit logic
          let body = {
            Id: this.state.SelectedItem.Id,
            title: values.title,
            content: values.content
          };
          this.props.dispatch(
            EditList(
              body,
              data => {
                this.setState({
                  loading: false,
                  visible: false
                });
                this.loadData();
                console.log(data);
                // this.props.history.push("/ToDoList");
              },
              err => {
                this.setState({ loading: false });
                err.errors.forEach(error => {
                  message.error(error);
                });
              }
            )
          );
        }
      } else {
        this.setState({ loading: false });
      }
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  showDeleteConfirm = id => {
    confirm({
      title: "Are you sure delete this country?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",

      onOk: () => {
        this.props.dispatch(DeleteList(id, data => {
            this.setState({
              loading: false
            });
            this.loadData();
            console.log(data);
          }, (err) => {
              this.setState({loading: false})
              err.errors.forEach(error => {
                  message.error(error)
              })
          }));

        console.log("OK");
      },

      onCancel() {
        console.log("Cancel");
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Header />

        <Row>
          <div className="add_holder">
            <button className="secondary_fill" onClick={this.showCreateModal}>
              add Todo List
            </button>
          </div>
          {this.state.loading ? <h1 style={{textAlign:"center"}}>Loading...</h1> : 
           (this.state.ToDoList.length != 0 ?
          <div className="toDo_holder">
            {this.state.ToDoList &&
              this.state.ToDoList.map((item, i) => (
                <Col className="toDoList_holder" span={14}>
                  <h6>{item.title}</h6>
                  <p>{item.content}</p>
                  <div className="icon_holder">
                    <Icon
                      onClick={() => this.showEditModal(item)}
                      type="edit"
                    />
                    <Icon
                      onClick={() => this.showDeleteConfirm(item.Id)}
                      type="delete"
                    />
                  </div>
                </Col>
              ))}
           </div>:<h1 style={{textAlign:"center"}}>this user has no items</h1>)}
        </Row>

        <Modal
          title="To Do LIst"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form>
            <Form.Item label="title">
              {getFieldDecorator("title", {
                rules: [
                  {
                    required: true,
                    message: "Please input your title!"
                  }
                ]
              })(
                <Input
                  placeholder="please enter your title"
                  vlaue={
                    this.state.isNew ? null : this.state.SelectedItem.title
                  }
                />
              )}
            </Form.Item>

            <Form.Item label="content">
              {getFieldDecorator("content", {
                rules: [
                  {
                    required: true,
                    message: "Please input your content!"
                  }
                ]
              })(
                <TextArea
                  vlaue={
                    this.state.isNew ? null : this.state.SelectedItem.content
                  }
                  placeholder="Description"
                  autosize={{ minRows: 5, maxRows: 6 }}
                />
              )}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

// export default ToDoList;

const ToDoListHolder = Form.create()(ToDoList);

const mapStateToProps = state => {
  return {
    currentLocale: state.auth.currentLocale,
    authResources: state.auth.currentResource.auth,
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps)(ToDoListHolder);
