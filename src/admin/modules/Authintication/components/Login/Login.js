import React from "react";
import { Form, Input, Row, message, Button } from "antd";
import logo from "../../../../../resources/images/Codinga-Egypt.png";
import { connect } from "react-redux";
import { login } from "../../service";
import Header from "../../../Common/components/Header/Header";



class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      autoCompleteResult: [],
      loading: false,
      phone: "",
      rawPhone: "",
      dialCode: "",
      countryCode: ""
    };
    this.redirectIfAuthenticated();
  }

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
          password: values.password
        };
        this.props.dispatch(
          login(
            body,
            data => {
              this.setState({ loading: false });
              console.log(data);
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
    console.log(this.state);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row className="height_90">
        <Header />
        <Row
          className="height_90 login_holder login_by_mobile "
          type="flex"
          justify="center"
          align="middle"
        >
          <p className="login">{this.props.authResources.login}</p>
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

            <div className="login_btn_holder">
              <Button
                loading={this.state.loading}
                htmlType="submit"
                onClick={this.handleSubmit}
                className="login_btn"
              >
               login
              </Button>
            </div>
          </Form>
        </Row>
      </Row>
    );
  }
}

const SignInHolder = Form.create()(SignIn);

const mapStateToProps = state => {
  return {
    currentLocale: state.auth.currentLocale,
    authResources: state.auth.currentResource.auth,
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps)(SignInHolder);
