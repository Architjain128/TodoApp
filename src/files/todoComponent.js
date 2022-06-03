import React,{useContext} from 'react';
import ListComponent from './listComponent';
import FolderComponent from './folderComponent';
import Container from '@mui/material/Container';
import { AppContext } from "../App";

function TodoComponent() {
    return (
            <Container  maxWidth="lg">
                <h1>TODO APP</h1>
                <div>
                    <FolderComponent />
                    <hr/>
                    <ListComponent />
                </div>
            </Container>
    );
}

export default TodoComponent;