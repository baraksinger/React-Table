import {makeStyles} from "@material-ui/core/styles";
import {TableBody, TableCell, TableRow} from "@material-ui/core";
import React from "react";
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
    rowRoot: {
        cursor: 'pointer',
    },
    cellRoot: {
        lineHeight: '2.5rem'
    },
}));
const Body = ({getTableBodyProps, prepareRow, openDialogHandler, page}) => {

    const classes = useStyles();

    return (
        <TableBody {...getTableBodyProps()}>
            {page.map((row, i) => {
                prepareRow(row);
                return (
                    <TableRow
                        {...row.getRowProps()}
                        classes={{root: classes.rowRoot}}
                        onClick={() => openDialogHandler(row.original)}
                    >
                        {row.cells.map(cell => {
                            return (
                                <TableCell
                                    {...cell.getCellProps()}
                                    classes={{root: classes.cellRoot}}
                                >
                                    {cell.render('Cell')}
                                </TableCell>
                            );
                        })}
                    </TableRow>
                )
            })}
        </TableBody>
    )
}

Body.propTypes = {
    openDialogHandler: PropTypes.func.isRequired,
}

export default Body;
