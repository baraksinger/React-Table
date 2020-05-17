import React from "react";
import PropTypes from 'prop-types';
import {TablePagination, TableRow, TableFooter} from "@material-ui/core/index" ;

const Footer = ({
                         dataLength,
                         pageSize,
                         pageIndex,
                         changePageHandler,
                         changeRowsPerPageHandler
                     }) => {
    return (
        <TableFooter>
            <TableRow>
                <TablePagination
                    rowsPerPageOptions={[
                        10,
                        20,
                        50,
                        { label: 'All', value: dataLength },
                    ]}
                    rowsPerPage={pageSize}
                    colSpan={4}
                    count={dataLength}
                    page={pageIndex}
                    SelectProps={{
                        inputProps: { 'aria-label': 'rows per page' },
                        native: true,
                    }}
                    onChangePage={changePageHandler}
                    onChangeRowsPerPage={changeRowsPerPageHandler}
                />
            </TableRow>
        </TableFooter>
    )
}

Footer.propTypes = {
    dataLength: PropTypes.number.isRequired,
    pageIndex: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    changePageHandler: PropTypes.func.isRequired
}


export default Footer;