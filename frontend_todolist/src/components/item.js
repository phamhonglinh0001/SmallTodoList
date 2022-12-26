import { Icon, Header } from 'semantic-ui-react'
import { memo } from 'react'
import styles from '../styles/ItemComponent.module.css'

const Item = ({id, item, complete, onDelete, onComplete}) => {
    return (
        <div className={styles.wrapItem}>
            <div className='text-center' style={{ width: 300 }}>
                <Header as='h3'>{item}</Header>
            </div>
            <div style={{width: 150}}>
                <Icon onClick={() => onDelete(id)} circular color='red' inverted name='delete' />
                {!complete && <Icon circular onClick={() => onComplete(id)} color='green' inverted name='check' />}
            </div>
        </div>
    )   
}

export default memo(Item)