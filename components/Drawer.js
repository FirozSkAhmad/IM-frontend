
import React from "react";
import Box from "@mui/material/Box";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Addproduct from "./Addproduct";
import Loader from "./Loader";
import UploadData from './UploadData'

const Drawer = ({ anchor, toggleDrawer, isOpen, AddRow, current, getProducts, getOrdersCount, getTotalSales, getTotalStock, getTotalStockValue }) => {

    const handleClose = (event) => {
        toggleDrawer(anchor, false, event)
    };


    const descriptionElementRef = React.useRef(null);

    React.useEffect(() => {
        if (isOpen) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [isOpen]);

    const getComponent = () => {

        switch (current) {
            case 'add': return <Addproduct
                handleClose={handleClose}
                AddRow={AddRow}
                getTotalStock={getTotalStock}
                getTotalStockValue={getTotalStockValue}
            />

            case 'upload': return <UploadData handleClose={handleClose} getProducts={getProducts} getTotalStock={getTotalStock} getTotalStockValue={getTotalStockValue}/>

            default:
                <div><Loader /></div>
        }

    }
    return (
        <Dialog
            open={isOpen}
            onClose={(event) => toggleDrawer(anchor, false, event)}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            PaperProps={{ style: { borderRadius: '10px' } }}
        >

            <DialogContent dividers={true} sx={{ padding: 0 }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>

                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                        sx={{ padding: '28px' }}
                    >
                        <Box role="presentation">
                            {getComponent()}
                        </Box>

                    </DialogContentText>
                </div>
            </DialogContent>
        </Dialog>
    );
}
export default Drawer;