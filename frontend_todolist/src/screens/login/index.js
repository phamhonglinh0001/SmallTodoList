import { useState } from 'react'
import { Input, Button, Header } from 'semantic-ui-react'
import styles from '../../styles/LoginScreen.module.css'
import { checkLogin } from '../../services/Login.service'
import { useNavigate, Link } from "react-router-dom"
import Screens from '../../contants/screen'

const LoginScreen = () => {
    const [err, setErr] = useState(false)
    const [inputData, setInputData] = useState({
        username: "",
        password: ""
    })
    const navigate = useNavigate()

    const onChangeInput = (type, value) => {
        setInputData((preState) => {
            console.log(preState);
            return ({
                ...preState,
                [type]: value
            })
        })
    }

    const handleSubmit = () => {
        if(inputData.username && inputData.password){
            const result = checkLogin(inputData)
            result.then(({ data }) => {
                // console.log(data);
                if (data.code === 200) {
                    const access_key = data.access_key
                    sessionStorage.setItem("access_key", access_key)
                    navigate(Screens.HOME, { replace: true })
                } else {
                    setErr(true)
                }
            })
        }else{
            setErr(true)
        }
        
        
    }

    return (
        <div className={`text-center p-4 ${styles.wrapContainer}`}>
            <Header as='h2'>
                <Header.Content>Đăng nhập</Header.Content>
            </Header>
            <Input onChange={(e, data)=>onChangeInput("username", data.value)} error={err} className={styles.input} placeholder='username' />
            <br />
            <Input type='password' onChange={(e, data)=>onChangeInput("password", data.value)} error={err} className={styles.input} placeholder='password' />
            <br />
            <Button onClick={handleSubmit}>Đăng nhập</Button>
            <br />
            <Link to={Screens.REGISTER}>Đăng ký</Link>
        </div>
    )
}

export default LoginScreen