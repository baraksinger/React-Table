import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useTable, useGlobalFilter, useSortBy, usePagination} from 'react-table';
import {makeStyles} from "@material-ui/core/styles/index";
import MuiTable from '@material-ui/core/Table/index'

import Popup from '../components/Popup/Popup';
import Toolbar from '../components/Table/Toolbar';
import Body from '../components/Table/Body';
import Header from '../components/Table/Header';
import Footer from '../components/Table/Footer';

// My implementation uses React-Table (v7) that does not render or supply UI elements.
// it provides hooks that allow you to create your own table markup.
// React-Table can be can be integrated with any UI library which i chose as Material-UI.

const useStyles = makeStyles(() => ({
    tableWrap: {
        margin: "0 30px",
        overflowX: 'scroll',
    }
}));

const TableBuilder = ({columns, data, onExperimentUpdate, skipAutoReset}) => {

    const classes = useStyles();

    const [isDialogOpen, setDialogOpen] = useState(false);
    const [dialogData, setDialogData] = useState(null);

    // (optional) using my custom id's as keys. React-Table generates unique key identifiers for each row.
    // getRowId changes how React Table detects unique rows and constructs each row's underlying id property.
    const getRowId = React.useCallback(row => {
        return row.id
    }, [])

    // useTable with options and hook to create table configuration - order of plugin hooks are important
    // autoReset__ stops table from auto resetting on data updates
    const instance = useTable(
        {
            columns,
            data,
            initialState: {pageSize: 20},
            autoResetGlobalFilter: !skipAutoReset,
            autoResetSortBy: !skipAutoReset,
            autoResetPage: !skipAutoReset,
            getRowId,
        },
        useGlobalFilter,
        useSortBy,
        usePagination,
    )

    // Use the state and functions returned on instance object to build your UI
    const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            prepareRow,
            page,                                                       //only the rows to be render on current page
            gotoPage,                                                   //sets 'pageIndex'
            setPageSize,                                                //sets 'pageSize'
            preGlobalFilteredRows,
            setGlobalFilter,
            state: {pageIndex, pageSize, globalFilter},
        } = instance
    ;

    const changePageHandler = (event, newPage) => {
        gotoPage(newPage)
    }

    const changeRowsPerPageHandler = event => {
        setPageSize(Number(event.target.value))
    }

    const openDialogHandler = (data) => {
        setDialogData(data);
        setDialogOpen(true)
    }

    return (
        <>
            <Toolbar
                preGlobalFilteredRows={preGlobalFilteredRows}
                setGlobalFilter={setGlobalFilter}
                globalFilter={globalFilter}
            />

            <MuiTable {...getTableProps()} classes={{root: classes.tableWrap}}>
                <Header
                    headerGroups={headerGroups}
                />
                <Body
                    getTableBodyProps={getTableBodyProps}
                    prepareRow={prepareRow}
                    openDialogHandler={openDialogHandler}
                    page={page}
                />
                <Footer
                    dataLength={data.length}
                    pageSize={pageSize}
                    pageIndex={pageIndex}
                    changePageHandler={changePageHandler}
                    changeRowsPerPageHandler={changeRowsPerPageHandler}
                />
            </MuiTable>

            {isDialogOpen &&
            <Popup
                setDialogOpen={setDialogOpen}
                data={dialogData}
                onExperimentUpdate={onExperimentUpdate}
            />
            }
        </>
    )
}

TableBuilder.propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    onExperimentUpdate: PropTypes.func.isRequired,
    skipAutoReset: PropTypes.bool.isRequired
}

export default TableBuilder;