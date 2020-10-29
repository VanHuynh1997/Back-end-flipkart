import React, { useState } from 'react'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'
import {Container,Row,Col,Form,Button} from 'react-bootstrap'
import {login} from '../../actions'
import {useDispatch, useSelector} from 'react-redux'
import { Redirect } from 'react-router-dom'


export default function Signin(props) {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    //const [error,setError] = useState('')
    const dispatch = useDispatch()
    const auth = useSelector(state=>state.auth)

    const userLogin = (e)=>{
        e.preventDefault();
        const user = {
            email,password
        }
        dispatch(login(user))
        
    }
    if(auth.authenticate){
        return <Redirect to={`/`} />
    }

    return (
        <Layout>
            <Container>
                <Row style={{marginTop: '50px'}}>
                    <Col md={{span:6,offset:3}}>
                        <Form onSubmit={userLogin}>
                        <Input
                                label="Email"
                                placeholder="Enter Email"
                                value={email}
                                type="email"
                                errorMessage="We'll never share your email with anyone else."
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                            <Input
                                label="Password"
                                placeholder="Enter Password"
                                value={password}
                                type="password"
                                
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
                
            </Container>
            
        </Layout>
    )
}
