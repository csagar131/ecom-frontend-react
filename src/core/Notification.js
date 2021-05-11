import React from 'react'
import styles from "./Helper/notification.module.css"

const Notification = (props) => {
    const classname1 = props.show ? styles.Show : styles.Hide
    const classname2 = styles.Notification
    return (
        <div
        className = {`${classname1} ${classname2}`}
        >
            Item Added to cart
        </div>
    )
}

export default Notification;


