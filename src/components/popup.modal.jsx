import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CsvToJsonConverter from './csv-json';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  border: '1px solid  #000',
  boxShadow: 24,
  p: 4,
  
};

export default function BasicModal({isModalOpen, handleCloseModal}) {
  return (
    <div>
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <CsvToJsonConverter/>
        </Box>
      </Modal>
    </div>
  );
}