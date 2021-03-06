import './profile-style.css';
import Head from '../header/header';
import { Layout ,Breadcrumb } from 'antd';
import { Row, Col } from 'antd';
import { Input } from 'antd';
import { UserOutlined,LockOutlined,MailOutlined} from '@ant-design/icons';
import { Button } from 'antd';
import { Avatar } from 'antd';
import {useState,useEffect} from "react"
import {Helmet} from "react-helmet";
const {  Header,Content } = Layout;

function Profile ()  {
  const [user,setuser]=useState({name:"",email:"",first_name:"",last_name:""})
  const [formdata,setformdata]=useState({name: "", lastname: "", pass: "", confimpass: "", email: ""})
  const token=localStorage.getItem("token")

  const submitHandler=(e)=>{
      e.preventDefault()      
      const senddata ={
        is_superuser:true,
        username:formdata.name,
        first_name:formdata.name,
        last_name:formdata.lastname,
        email: formdata.email,
        is_staff:true,
        is_active:true,
        teams:"",
        password:formdata.pass
      }
      fetch("https://api.ticket.tempserver.ir/api/users/",{
        method:"POST",
        body:JSON.stringify(senddata),
        headers: new Headers({
          'content-type': 'application/json',
          "AUTHORIZATION" : "Bearer "+token
        })
      }).then((res)=>{
        return res.json()
      }).then((result)=>{
        alert(JSON.stringify(result))
        setformdata({name: "", lastname: "", pass: "", confimpass: "", email: ""})
      }).catch((err)=>{
        console.log(err.message)
      })
    }
    useEffect(()=>{
      fetch("https://api.ticket.tempserver.ir/api/users/",{
        method:"GET",
        headers: new Headers({
          'content-type': 'application/json',
          "AUTHORIZATION" : "Bearer "+ token
        })
      }).then((res)=>(res.json())).then((res)=>{
        return res.results
      }).then((result)=>{
        const user=result.find((arr)=>{
          return arr.username === localStorage.getItem("username")
        })
        setuser({name:user.username,email:user.email,last_name:user.last_name,first_name:user.first_name})
      }).catch((err)=>{
        console.log(err.message)
      })
    },[])
    return (
              <>
               <Helmet>
                  <title>Ticketing - Profile Page</title>
              </Helmet>
              <Layout className="layout">   
            
                <Header>
                  <Head/>
                </Header>
            
              <Content style={{ padding: '0 100px' }}>
              
                <div className="site-layout-content">

                <Row style={{marginTop:'8%'}}>
                    <Col flex={2} style={{margin:"50px" , marginBottom:"0px"}}>
                    <div className="avatar">
                    <Avatar  size={150} icon={<UserOutlined />} />
                    </div>
                    <p>Add image</p>
                    <p className="user-name">{user.name}</p>
                    <p>{user.first_name}</p>
                    <p>{user.last}</p>
                    <p>{user.email}</p>
                    </Col>

                    <Col flex={1} className="left-border"></Col>
                    <Col flex={4} style={{margin:"50px" , marginBottom:"0px"}}>
                    <form onSubmit={(e)=>{submitHandler(e)}}>
                    <h2>User Information</h2>
                    <Input size="large" value={formdata.name} onChange={(e)=>{setformdata((prev)=>{
                      return {...prev,name:e.target.value}
                    })}} placeholder="Name" className="ant-icon" prefix={<UserOutlined />} />
                    <br />
                    <br />
                    <Input value={formdata.lastname} onChange={(e)=>{setformdata((prev)=>{
                      return {...prev,lastname:e.target.value}
                    })}} size="large" placeholder="Last Name" className="ant-icon" prefix={<UserOutlined />} />
                    <br />
                    <br />
                    <Input value={formdata.pass} onChange={(e)=>{setformdata((prev)=>{
                      return {...prev,pass:e.target.value}
                    })}} size="large" placeholder="Password" className="ant-icon" prefix={<LockOutlined />} />
                    <br />
                    <br />
                    <Input value={formdata.confimpass} onChange={(e)=>{
                      setformdata((prev)=>{
                      return {...prev,confimpass:e.target.value}
                    })}} size="large" placeholder="Confirm Password" className="ant-icon" prefix={<LockOutlined />} />
                    <br />
                    <br />
                    <Input value={formdata.email} onChange={(e)=>{setformdata((prev)=>{
                      return {...prev,email:e.target.value}
                    })}} size="large" placeholder="Email" className="ant-icon" prefix={<MailOutlined />} />
                    <br />
                    <br />
                   <div className="btn-position">
                   <Button className="button"  key="submit" htmlType="submit"  ghost>
                    Save
                    </Button>
                   </div>
                   </form>
                    </Col>
                </Row>
                                
                </div>
              </Content>
             
              </Layout>
              </>
       
       );
}

export default Profile;