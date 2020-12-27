import React from 'react'
import styles from './List.module.css'

function List(props) {
    return (
        <tr className={styles.App__list__item}>
            <td><h4>{props.serial}</h4></td>
            <td><h2>{props.value}</h2></td>
            {/* <td><i onClick={ ()=> props.editItem(props.id)} className="fas fa-edit"></i></td> */}
            <td><i onClick={ ()=> props.deleteItem(props.id)} className="fas fa-trash"></i></td>
        </tr>
    )
}

export default List
