import React from 'react'
import MuiToolbar from '@material-ui/core/Toolbar/index';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles,  } from '@material-ui/core/styles/index';
import TextField from '@material-ui/core/TextField/index';
import InputAdornment from '@material-ui/core/InputAdornment/index'
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '30px 33px 30px 44px',
        fontFamily: 'cursive',
    }
}));

const Toolbar = ({preGlobalFilteredRows, setGlobalFilter, globalFilter}) => {

    const classes = useStyles();
    const count = preGlobalFilteredRows.length;

    // Global filter only works with pagination from the first page.
    // This may not be a problem for server side pagination when
    // only the current page is downloaded.

    return (
        <MuiToolbar className={classes.toolbar}>
            <h2>
                Experiments Table
            </h2>
            <TextField
                value={globalFilter || ''}
                onChange={e => {
                    setGlobalFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
                }}
                placeholder={`${count} records...`}
                label="Search By ID:"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </MuiToolbar>
    )
}


Toolbar.propTypes = {
    preGlobalFilteredRows: PropTypes.array.isRequired,
    setGlobalFilter: PropTypes.func.isRequired,
    globalFilter: PropTypes.string
}


export default Toolbar;