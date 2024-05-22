import React, {useContext} from 'react';
import { Typography, Container, CssBaseline  } from '@mui/material';
import RecordTable from '../components/RecordsTable';
import  Nav  from '../components/Nav';
import './styles.css';
import AuthContext from '../context/AuthContext';

const Records = () => {
  const { username } = useContext(AuthContext);

  return (
    <Container>
      <CssBaseline />
      <Nav />
      <div className="title-container">
        <Typography variant="h4" component="h1"  className='titulo'>
          Records of {username}
        </Typography>
      </div>
      <RecordTable />
    </Container>
  );
};

export default Records;
