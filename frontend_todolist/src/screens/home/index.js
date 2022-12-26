import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Input, Button } from 'semantic-ui-react'
import styles from '../../styles/HomeScreen.module.css'
import Item from '../../components/item'
import { getAll, deleteItem, complete, add } from '../../services/Home.service'

const HomeScreen = () => {
    const [inputData, setInputData] = useState("")
    const [listData, setListData] = useState([])
    const [access_key, setAccess_key] = useState(sessionStorage.getItem("access_key"))
    const inputRef = useRef()
    const getAllList = () => {
        const result = getAll({ access_key })
        result.then(({data}) => {
            // console.log(data);
            if (data.code == 200) setListData(data.data)
        })
    }

    useEffect(() => {
        getAllList()
    }, [])

    const handleDelete = useCallback((id) => {
        const result = deleteItem({id, access_key})
        result.then(({data})=>{
            if(data.code==200) getAllList()
        })
        
    },[])

    const handleComplete = useCallback((id) => {
        const result = complete({id, access_key})
        result.then(({data})=>{
            if(data.code==200) getAllList()
        })
    },[])

    const onChangeInput = (e, data) => {
        setInputData(data.value)
    }
    
    const handleAdd = () => {
        const result = add({access_key, content: inputData})
        result.then(({data})=>{
            if(data.code==200)
            inputRef.current.focus()
            setInputData('')
            getAllList()
        })
    }
     
    return (
        <div>
            <div className={`text-center p-4 mx-auto ${styles.wrapContainer}`}>
                <Input value={inputData} ref={inputRef} onChange={onChangeInput} className={styles.input} placeholder='Nhập công việc ...' />
                <Button onClick={handleAdd}>Thêm</Button>
            </div>
            <div className={`${styles.wrapList} mx-auto`}>
                {listData && listData.map((item, index) => {
                    return (
                        <Item 
                            complete={item.type=="complete"} 
                            key={index} 
                            id={item.id} 
                            item={item.content} 
                            onDelete={handleDelete}
                            onComplete={handleComplete}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default HomeScreen