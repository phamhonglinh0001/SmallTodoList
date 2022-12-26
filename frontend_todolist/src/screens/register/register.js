import { useState } from 'react'
import { Input, Button, Header } from 'semantic-ui-react'
import styles from '../../styles/LoginScreen.module.css'
import { useNavigate, Link } from "react-router-dom"
import Screens from '../../contants/screen'
import { register } from '../../services/Register.service'

const RegisterScreen = () => {
    const [err, setErr] = useState(false)
    const [noti, setNoti] = useState('')
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
        if(inputData.username&&inputData.password){
            const result = register(inputData)
            result.then(({ data }) => {
                // console.log(data);
                if (data.code === 200) {
                    // console.log(data);
                    setNoti("Đăng ký thành công")
                    // navigate(Screens.LOGIN, { replace: true })
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
                <Header.Content>Đăng ký</Header.Content>
            </Header>
            <div className='text-success'>
                {noti}
            </div>
            <Input onChange={(e, data)=>onChangeInput("username", data.value)} error={err} className={styles.input} placeholder='username' />
            <br />
            <Input type='password' onChange={(e, data)=>onChangeInput("password", data.value)} error={err} className={styles.input} placeholder='password' />
            <br />
            <Button onClick={handleSubmit}>Đăng ký</Button>
            <Link to={Screens.LOGIN}>Đăng nhập</Link>
        </div>
    )
}

export default RegisterScreen