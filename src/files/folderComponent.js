import React,{useState,useContext} from 'react';
import {AppContext} from '../App';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';

// const folderData = [{id:0 ,title: 'ALL', content: [0,1],createdAt:"0"},{id:1 ,title: 'Folder 1', content: [1],createdAt:1654159790029}, {id:2,title: 'Folder 2', content: [0],createdAt:1654159806519}];
// const listData=[{id:0 ,title:"List 1",description: 'des 1', status:true,priority:3,deadline:1654159806519,tags:["cs","ar"],folder:[0,1],createdAt:1654159790129},{id:1 ,title:"List 2",description: 'des 2', status:false,priority:5,deadline:1654159816519,tags:["cs2","ar2"],folder:[0,1],createdAt:1654159800519}];

function FolderComponent() {
    // localStorage.setItem("archit-todo-folders", JSON.stringify(folderData));
    // localStorage.setItem("archit-todo-tasks", JSON.stringify(listData));
    
    const {folders,setFolders} = useContext(AppContext);
    return (
        <div>
                <Accordion style={{border:"2px solid black"}}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        style={{borderBottom:"1px solid black",backgroundColor:"#e5e5e5"}}
                    >
                    <Typography variant='h5' fontWeight={600}>Folder Section</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <div style={{display:"flex-block"}}>
                        <Grid container spacing={4} style={{ marginBottom:"10px"}}>
                            {
                                folders.map((folder,index)=>{
                                    return(
                                        <Grid item xs={4} key={index}>
                                            <div style={{border:"1px solid black",padding:"10px"}}>
                                            <Card sx={{ display: 'flex'}}>
                                                <CardMedia>
                                                    <FolderOpenIcon sx={{ fontSize: 100 }}/>
                                                </CardMedia>
                                                <Box sx={{ display: 'flex', flexDirection: 'column', textAlign:"left" }}>
                                                    <CardContent sx={{ flex: '1 0 auto' }} left>
                                                        <Typography component="div" variant="h5">
                                                            {folder.title}
                                                        </Typography>
                                                        <Typography variant="h6" color="text.secondary" component="div">
                                                            {folder.content.length} tasks
                                                        </Typography>
                                                    </CardContent>
                                                </Box>
                                                </Card>
                                                    {
                                                        folder.createdAt==="0"?
                                                        <div style={{display:"flex"}}>
                                                            <IconButton aria-label="Delete">
                                                                <LabelImportantIcon />
                                                            </IconButton>
                                                            <Typography variant="body1" color="text.primary" component="div" pt={1}>
                                                                PRIMARY FOLDER
                                                            </Typography>
                                                        </div>:
                                                        <div style={{display:"flex"}}>
                                                            <Typography variant="caption" color="text.secondary" component="div">
                                                                {Date(folder.createdAt)}
                                                            </Typography>
                                                            <IconButton aria-label="Delete">
                                                                <DeleteIcon/>
                                                            </IconButton>
                                                        </div>
                                                    }
                                            </div>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>

                        <div style={{float:"right"}}>
                            <Button variant="contained" startIcon={<CreateNewFolderIcon />} style={{marginBottom:"15px"}}>
                                Create New Folder
                            </Button>
                        </div>
                    </div>
                    </AccordionDetails>
                </Accordion>
        </div>
    );
}

export default FolderComponent;