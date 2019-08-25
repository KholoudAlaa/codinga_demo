import React from "react";
import { Form, Input, Row, Checkbox, message, Select, Button } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../../service";
import { setLocale } from "../../store/actions";
import Header from "../../../Common/components/Header/Header";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      loading: false,
    };
    this.redirectIfAuthenticated();
  }

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  /** This behaviour is anti-pattern and should not happen */
  redirectIfAuthenticated() {
    if (this.props.isAuthenticated) {
      this.props.history.goBack();
    }
  }


  handleSubmit = e => {
    e.preventDefault();
    this.setState({ loading: true });
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let body = {
            email: values.email,
            password: values.password,
            confirmPassword:values.confirmPassword
        }

        this.props.dispatch(
            register(body,data => {
              this.setState({ loading: false });
              this.props.history.push("/ToDoList");
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
        this.setState({ loading: false });
      }
    });
  };


  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Row className="height_90">
        <Header />
        <Row
          className="height_90 login_holder sign_up"
          type="flex"
          justify="center"
          align="middle"
        >
          <br />
          <br /> 
          <p className="login">{this.props.authResources.signUp}</p>
          <br />
          <Form>
            <Row>
              <Form.Item>
                {getFieldDecorator("email", {
                  rules: [
                    {
                      required: true,
                      message: this.props.authResources.wrongformat
                    },
                    {
                      type: "email",
                      message: this.props.authResources.wrongformat
                    }
                  ]
                })(
                  <Input
                    type="text"
                    placeholder={this.props.authResources.email}
                  />
                )}
              </Form.Item>
            </Row>

            <Row>
              <Form.Item>
                {getFieldDecorator("password", {
                  rules: [
                    {
                      required: true,
                      message: this.props.authResources.pleaseenternameinArabic
                    },
                    {
                      min: 8,
                      message: this.props.authResources
                        .passwordmustbemincharacters
                    },
                    {
                      max: 20,
                      message: this.props.authResources
                        .passwordmustbemax20characters
                    },
                    {
                      //Password expresion that requires one lower case letter, one upper case letter, one digit, 6-13 length, and no spaces.This is merely an extension of a previously posted expression by Steven Smith(ssmith@aspalliance.com) . The no spaces is new.
                      pattern: new RegExp(
                        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
                      ),
                      message: this.props.authResources.Passwordexpresion
                    },
                    {
                      validator: this.compareToFirstPassword
                    }
                  ]
                })(
                  <Input.Password
                    placeholder={this.props.authResources.Password}
                  />
                )}
              </Form.Item>
            </Row>

            <Row>
              <Form.Item>
                {getFieldDecorator("confirmPassword", {
                  rules: [
                    {
                      required: true,
                      message: this.props.authResources.pleaseenternameinArabic
                    },
                    {
                      min: 8,
                      message: this.props.authResources
                        .passwordmustbemincharacters
                    },
                    {
                      max: 20,
                      message: this.props.authResources
                        .passwordmustbemax20characters
                    },
                    {
                      //Password expresion that requires one lower case letter, one upper case letter, one digit, 6-13 length, and no spaces.This is merely an extension of a previously posted expression by Steven Smith(ssmith@aspalliance.com) . The no spaces is new.
                      pattern: new RegExp(
                        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
                      ),
                      message: this.props.authResources.Passwordexpresion
                    },
                    {
                      validator: this.compareToFirstPassword
                    }
                  ]
                })(
                  <Input.Password
                    onBlur={this.handleConfirmBlur}
                    placeholder={this.props.authResources.passwordConfirm}
                  />
                )}
              </Form.Item>
            </Row>

            <br />

            <div className="text_center">
              <Button
                loading={this.state.loading}
                htmlType="submit"
                onClick={this.handleSubmit}
                className="Primary_fill btn_lg"
              >
                {this.props.authResources.signUp}
              </Button>
            </div>

            <br />
            <br />
            <br />
          </Form>
        </Row>
      </Row>
    );
  }
}

const SignUpHolder = Form.create()(SignUp);

const mapStateToProps = state => {
  return {
    currentLocale: state.auth.currentLocale,
    languageID: state.common.languageID,
    authResources: state.auth.currentResource.auth,
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps)(SignUpHolder);
