import React from 'react'
import {
    Row,
    Button,
    Col,
} from 'antd';
import { Link } from 'react-router-dom';
import Error_404 from '../../../../../resources/images/404.png';
import Error_404_ar from '../../../../../resources/images/404_ar.png';
import { connect } from 'react-redux';


class Error404 extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
        }
    };
    render() {
        return (
            <Row className="text_center" >
                <div>
                    {this.props.currentLocale === 'english' ?
                        <img src={Error_404} alt='error-404' style={{ maxHeight: "70vh" }} /> : <img src={Error_404_ar} alt='error-404' style={{ maxHeight: "70vh" }} />
                    }
                </div>
                <div>
                    <br />
                    <br />
                    <Button type="primary" htmlType="submit" className="Primary_fill ">
                        {/* <Link to="/dashboard">*/}
                        {this.props.errorsResources.goToHome}
                        {/* </Link> */}
                    </Button>
                </div>
            </Row>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        currentLocale: state.auth.currentLocale,
        errorsResources: state.auth.currentResource.errors
    }
}
export default connect(mapStateToProps)(Error404);