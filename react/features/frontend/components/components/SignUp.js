import React from 'react';
import {Container, Row,Col,Input, Form, FormGroup,Button} from 'reactstrap';
import {connect} from 'react-redux';
//import {AUTH_USER,USER_REGISTER} from '../redux/constant';
import toastr from 'toastr';
import { Link } from 'react-router-dom';
import * as API from '../api/Apiservice';
class Signup extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            email:"",
            password:"",
            rpassword:"",
            fullname:""
        }
    }

    handlechange = (name,e) => {
        this.setState({
            [name]:e.target.value
        })
    }

    handlesubmit = (e) => {
        const {dispatch} = this.props;
        if(this.state.password == this.state.rpassword)
        {
            let userinfo = {email:this.state.email,password:this.state.password,fullname:this.state.fullname};
            API.register(userinfo).then(res=>{
                if(res.data.success)
                {
                    this.props.history.push('/signin');
                }
                else
                {
                    toastr.error(res.data.message);
                }
            })
           // dispatch({type:USER_REGISTER,user:{email:this.state.email,password:this.state.password,fullname:this.state.fullname},success:()=>this.props.history.push('/signin'),error:(message)=>toastr.error(message)})
        }
        else
        {
            toastr.error('Confirm Password is not matched with Password');
        }
        
        e.preventDefault();
    }

    render()
    {
        return (
            <div className="home">
                <Container style={{height:'100%'}}>
                    <Row style={{height:'100%',alignItems:'center'}}>
                        <Col lg={4} md={6} xs={12} style={{margin:'auto',textAlign:'center'}}>
                            <h1>Sign Up</h1>
                            <Form style={{marginTop:'48px'}} onSubmit={this.handlesubmit}>
                                <FormGroup>
                                    <input type="text" className="input" placeholder="Full Name" name="fullname" required onChange={(e)=>this.handlechange("fullname",e)} autoComplete="off"/>
                                </FormGroup>
                                <FormGroup>
                                    <input type="email" className="input" placeholder="Email Address" name="email" required onChange={(e)=>this.handlechange("email",e)} autoComplete="off"/>
                                </FormGroup>
                                <FormGroup>
                                    <input className="input" placeholder="Password" type="password" name="password" required  onChange={(e)=>this.handlechange("password",e)}/>
                                </FormGroup>
                                <FormGroup>
                                    <input className="input" placeholder="Confirm Password" type="password" name="rpassword" required  onChange={(e)=>this.handlechange("rpassword",e)}/>
                                </FormGroup>
                                <FormGroup style={{marginTop:'30px'}}>
                                    <Button type="submit" className="primarybtn" style={{width:'100%'}}>Sign Up</Button>
                                </FormGroup>
                                <FormGroup>
                                    <Link to="/signin" className="link">Go to Sign in Page</Link>
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

const mapstatetoprops = (state) => ({
    auth:state['feature/frontend/auth']
})

export default connect(mapstatetoprops)(Signup);