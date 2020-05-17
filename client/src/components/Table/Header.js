import {TableCell, TableHead, TableRow, TableSortLabel} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    rowRoot: {
        backgroundColor: 'cadetblue',
    },
    cell: {
        color: 'white',
        fontFamily: 'cursive'
    }
}));

// iterate over header columns provided as flattened array in 'headerGroup'
// call default cell renderer and apply sorting
const Header =({headerGroups}) => {

    const classes = useStyles();

   return(
        <TableHead>
            {headerGroups.map(headerGroup => (
                <TableRow {...headerGroup.getHeaderGroupProps()}
                          classes={{root: classes.rowRoot}}
                >
                    {headerGroup.headers.map(column => (
                        <TableCell
                            classes={{root: classes.cell}}
                            {...column.getHeaderProps(column.getSortByToggleProps())}
                        >
                            {column.render('Header')}
                            <TableSortLabel
                                active={column.isSorted}
                                direction={column.isSortedDesc ? 'desc' : 'asc'}
                            />
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </TableHead>
   )
}

export default Header;