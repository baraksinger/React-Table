import React, {useState} from 'react';
import {Dialog, DialogTitle, DialogContent, DialogContentText} from '@material-ui/core/index'
import {makeStyles} from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import Input from '../UI/Input'

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(5),
    }
}))

const Popup = ({setDialogOpen, data, onExperimentUpdate}) => {
    const classes = useStyles();
    const [dialogData, setDialogData] = useState(data);

    const nameChangeHandler = (event) => {
        let dataCopy = {...data};
        dataCopy.name = event.target.value
        setDialogData(dataCopy);
    }

    const closeHandler = () => {
        setDialogOpen(false);
    }

    const MediaToDisplay = () => {
        if (data.media.length > 0) {
            return data.media.map(x => {
                return (
                    <DialogContentText key={x.description}>
                        {x.type + ',  ' + x.description + ',  ' + x.minutes}
                    </DialogContentText>
                );
            })
        }
    }

    const servicesToDisplay = () => {
        if (data.media.length > 0) {
            return data.services.map(x => {
                return (
                    <DialogContentText key={x.type}>
                        {x.type}
                    </DialogContentText>
                );
            })
        }
    }

    return (
        <DialogContentText>
            <Dialog open onClose={closeHandler} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Additional Detail:</DialogTitle>
                <DialogContent>
                    <div>
                        <b>ID: </b>{data.id}
                    </div>
                    <Input
                        value={dialogData.name}
                        changed={nameChangeHandler}
                    />
                    <div>
                        <b>Media:</b>
                        {MediaToDisplay()}
                    </div>
                    <div>
                        <b>Services:</b>
                        {servicesToDisplay()}
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        className={classes.button}
                        onClick={closeHandler}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        className={classes.button}
                        onClick={() => {
                            return (
                                closeHandler(),
                                    onExperimentUpdate(dialogData)
                            )}
                        }
                        startIcon={<SaveIcon/>}
                    >
                        Save
                    </Button>
                </DialogContent>
            </Dialog>

        </DialogContentText>
    )
}

export default Popup;