import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { withStyles } from "@material-ui/core/styles";
import './index.css'
function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}


const styles = theme => ({
    paper: {
        // position: 'absolute',
        width: 350,
        minHeight: 225,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid red',
        boxShadow: theme.shadows[5],
        padding: 0,
        margin: '100px auto',
        borderRadius: 10,
        overflow: 'hidden'
    },
})

const timer = (func, strickedAction) => {
    setTimeout(() => {
        func()
        if(strickedAction) strickedAction();
    }, 3000)
}

const TextModal = ({ open, handleClose, classes, title, text, isTimer, btnTitle, btnAction, strickedAction }) => {
    // getModalStyle is not a pure function, we roll the style only on the first render
    if (isTimer && open) timer(handleClose, strickedAction)
    return (
        <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={open}
            onClose={handleClose}
        >
            <div style={classes.modalStyle} className={classes.paper + " text-modal-wrapper"}>
                <h2 id="simple-modal-title">{title}</h2>
                <p id="simple-modal-description">
                    {text}
                </p>
                {
                    btnTitle && btnAction ?
                        <button className={'text-modal-button'} onClick={btnAction}>{btnTitle}</button> :
                        <button className={'text-modal-button'} onClick={handleClose}>Close</button>
                }

            </div>
        </Modal>
    );
}

export default withStyles(styles)(TextModal);
