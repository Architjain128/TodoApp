import React, { useState, useContext } from "react";
import { AppContext } from "../App";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import { Button, Grid, Box, TextField, Modal, Typography } from "@mui/material";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import EditIcon from "@mui/icons-material/Edit";

// const folderData = [{id:0 ,title: 'ALL', content: [0,1],createdAt:"0"},{id:1 ,title: 'Folder 1', content: [1],createdAt:1654159790029}, {id:2,title: 'Folder 2', content: [0],createdAt:1654159806519}];
// const listData=[{id:0 ,title:"List 1",description: 'des 1', status:true,priority:3,deadline:1654159806519,tags:["cs","ar"],folder:[0,1],createdAt:1654159790129},{id:1 ,title:"List 2",description: 'des 2', status:false,priority:5,deadline:1654159816519,tags:["cs2","ar2"],folder:[0,1],createdAt:1654159800519}];

function FolderComponent() {
    // localStorage.setItem("archit-todo-folders", JSON.stringify(folderData));
    // localStorage.setItem("archit-todo-tasks", JSON.stringify(listData));

    const {
        folders,
        setFolders,
        tasks,
        setTasks,
        selectedFolder,
        setSelectedFolder,
        FolderCount,
        setFolderCount,
        dateFormat,
    } = useContext(AppContext);
    const [openFolderModal, setOpenFolderModal] = useState(false);
    const [openFolderModalID, setOpenFolderModalID] = useState(-1);
    const [folderTitle, setFolderTitle] = useState("");

    const onSelectFolder = (a, id) => {
        localStorage.setItem("archit-todo-selFolder", id);
        setSelectedFolder(id);
        window.location.reload();
    };
    const createFolderButton = (e) => {
        e.stopPropagation();
        setOpenFolderModal(true);
    };

    const excecuteModal = () => {
        let id=openFolderModalID
        if(id===-1){
            console.log("create folder");
            if (folderTitle.length > 0) {
                let newFolder = {
                    id: FolderCount,
                    title: folderTitle,
                    content: [],
                    createdAt: Date.now(),
                };
                let newFolders = [...folders, newFolder];
                setFolders([...folders, newFolder]);
                setOpenFolderModal(false);
                localStorage.setItem("archit-todo-folders", JSON.stringify(newFolders));
                localStorage.setItem("archit-todo-folder-count", FolderCount + 1);
                window.location.reload();
            }
            else{
                alert("Please enter folder name");
            }
        }
        else{
            console.log("edit folder");
            let newFolders = folders;
            newFolders.forEach((folder) => {
                if (folder.id === id) {
                    folder.title = folderTitle;
                }
            });
            setFolders(newFolders);
            localStorage.setItem("archit-todo-folders", JSON.stringify(newFolders));
            setOpenFolderModal(false);
            window.location.reload();
        }
    };

    const deleteFolder = (e, id) => {
        let newFolders = folders.filter((folder) => folder.id !== id);
        let newTasks = tasks;
        newTasks.forEach((task) => {
            if (task.folder.includes(id)) {
                task.folder.splice(task.folder.indexOf(id), 1);
            }
        });
        setFolders(newFolders);
        setTasks(newTasks);
        setSelectedFolder(0);
        localStorage.setItem("archit-todo-selFolder", 0);
        localStorage.setItem("archit-todo-folders", JSON.stringify(newFolders));
        localStorage.setItem("archit-todo-tasks", JSON.stringify(newTasks));
        window.location.reload();
    };

    const editFolder = (e,id) => {
        e.stopPropagation();
        setOpenFolderModalID(id);
        setOpenFolderModal(true);
    };

    const modalFolderForm = (id) => {
        return (
            <div class="form">
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Typography variant="h6" align="center" gutterBottom>
                            {id === -1 ? <b>Create Folder</b> : <b>Update Folder</b>}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="standard-basic"
                            label="Title"
                            fullWidth
                            required
                            defaultValue={folderTitle}
                            onChange={(e) => {
                                const { value } = e.target;
                                setFolderTitle(value);
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={(e) => {
                                excecuteModal();
                            }}
                        >
                            {id === -1 ? "Create" : "Update"}
                        </Button>
                    </Grid>
                </Grid>
            </div>
        );
    };

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 500,
        bgcolor: "background.paper",
        border: "2px solid #000",
        borderRadius: "4px",
        boxShadow: 24,
        p: 4,
    };
    return (
        <div>
            <Modal
                open={openFolderModal}
                onClose={() => {
                    setOpenFolderModal(false);
                }}
            >
                <Box sx={style}>{modalFolderForm(openFolderModalID)}</Box>
            </Modal>
            <Accordion style={{ border: "2px solid black" }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{
                        borderBottom: "1px solid black",
                        backgroundColor: "#e5e5e5",
                    }}
                >
                    <Typography variant="h5" fontWeight={600}>
                        Folder Section
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div style={{ display: "flex-block" }}>
                        <Grid container spacing={4} style={{ marginBottom: "10px" }}>
                            {folders.map((folder, index) => {
                                return (
                                    <Grid item xs={4} key={index}>
                                        <div style={{ border: "1px solid black", padding: "10px" }}>
                                            <Card>
                                                <div
                                                    style={{ display: "flex" ,padding: "10px 0px 0px 10px"}}
                                                    onClick={(e) => {
                                                        onSelectFolder(e, folder.id);
                                                    }}
                                                >
                                                    <CardMedia>
                                                        <FolderOpenIcon sx={{ fontSize: 40 }} />
                                                    </CardMedia>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            textAlign: "left",
                                                        }}
                                                    >
                                                    <Typography component="div" variant="body1" p={1}>
                                                        {folder.title}
                                                    </Typography>
                                                            
                                                    </Box>
                                                </div>
                                            </Card>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                }}
                                            >
                                                <Box
                                                    style={{
                                                        border: "1px grey dashed",
                                                        borderRadius: "4px",
                                                    }}
                                                    m={1}
                                                    p={1}
                                                >
                                                    {folder.createdAt === "0" ? (
                                                        <div style={{ display: "flex" }}>
                                                            <IconButton aria-label="Delete">
                                                                <LabelImportantIcon
                                                                    sx={{ width: 20, height: 20 }}
                                                                />
                                                            </IconButton>
                                                            <Typography
                                                                fontSize={15}
                                                                color="text.primary"
                                                                component="div"
                                                                p={1}
                                                                pl={1}
                                                            >
                                                                <b>PRIMARY</b>
                                                            </Typography>
                                                        </div>
                                                    ) : (
                                                        <Typography
                                                            variant="caption"
                                                            color="text.secondary"
                                                            component="div"
                                                        >
                                                            <b>Created On </b> {dateFormat(folder.createdAt)}
                                                        </Typography>
                                                    )}
                                                </Box>
                                                <Box
                                                    style={{
                                                        border: "1px grey dashed",
                                                        borderRadius: "4px",
                                                    }}
                                                    m={1}
                                                    p={1}
                                                >
                                                    <Typography fontSize={10} color="text.primary">
                                                        TASKS
                                                    </Typography>
                                                    <Typography variant="body1" color="text.primary">
                                                        {folder.content.length}
                                                    </Typography>
                                                </Box>
                                                <Box
                                                    style={{
                                                        border: "1px grey dashed",
                                                        borderRadius: "4px",
                                                    }}
                                                    m={1}
                                                    pt={1}
                                                    pb={1}
                                                >
                                                    <div style={{ display: "flex" }}>
                                                        <IconButton
                                                            aria-label="Edit"
                                                            disabled={folder.createdAt === "0"}
                                                            onClick={(e) => {
                                                                editFolder(e,folder.id);
                                                            }}
                                                        >
                                                            <EditIcon />
                                                        </IconButton>
                                                        <IconButton
                                                            aria-label="Delete"
                                                            disabled={folder.createdAt === "0"}
                                                            onClick={(e) => {
                                                                deleteFolder(e, folder.id);
                                                            }}
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </div>
                                                </Box>
                                            </div>
                                        </div>
                                    </Grid>
                                );
                            })}
                        </Grid>

                        <div style={{ float: "right" }}>
                            <Button
                                variant="contained"
                                onClick={(e) => {
                                    createFolderButton(e);
                                }}
                                startIcon={<CreateNewFolderIcon />}
                                style={{ marginBottom: "15px" }}
                            >
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
