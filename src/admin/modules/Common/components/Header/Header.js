import React from "react";
import { Form, Input, Row, Affix, message, Button } from "antd";
import { Link } from "react-router-dom";
import logo from "../../../../../resources/images/Codinga-Egypt.png";
import { connect } from "react-redux";
import { login } from "../../service";
import { authLogout, setLocale } from "../../../Authintication/store/actions";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  render() {
    const { header } = this.props.headerResources;
    return (
      <Affix offsetTop style={{ top: "0px" }}>
        <Row className="header" type="flex" justify="space-between">
            <h2>
               <img src={logo}/>
            </h2>
          <Row type="flex" className="lang-holder" align="middle">
            <button
              onClick={e => {
                e.preventDefault();
                this.props.dispatch(
                  setLocale(
                    this.props.currentLocale === "english" ? "ar" : "english"
                  )
                );
              }}
              className="lang_style ciecle"
            >
              {this.props.currentLocale === "english" ? "Ar" : "En"}
            </button>
            <div>
              {!this.props.isAuthenticated ? (
                <div>
                  <button className="secondary_fill">
                    <Link
                      className="login-form-forgot rem_color"
                      to={"/signin"}
                    >
                      {header.login}
                    </Link>
                  </button>
                  <button className="white_fill">
                    <Link
                      className="login-form-forgot rem_color"
                      to={"/signUp"}
                    >
                      {header.signUp}
                    </Link>
                  </button>
                </div>
              ) : (
                <button
                  className="secondary_fill"
                  onClick={() => {
                    this.props.dispatch(authLogout());
                    this.forceUpdate();
                  }}
                >
                  logoout
                </button>
              )}

              <div className="top_fixed" />
            </div>
          </Row>
        </Row>
      </Affix>
    );
  }
}

//const SignInHolder = Form.create()(SignIn);

const mapStateToProps = state => {
  return {
    currentLocale: state.auth.currentLocale,
    headerResources: state.common.currentResource,
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps)(Header);
