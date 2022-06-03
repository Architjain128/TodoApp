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
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {Modal,Chip,Checkbox,Stack, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Autocomplete from '@mui/material/Autocomplete';
import DateTimePicker from 'react-datetime-picker';

// const folderData = [{id:0 ,title: 'ALL', content: [0,1],createdAt:"0"},{id:1 ,title: 'Folder 1', content: [1],createdAt:1654159790029}, {id:2,title: 'Folder 2', content: [0],createdAt:1654159806519}];
// const listData=[{id:0 ,title:"List 1",description: 'des 1', status:true,priority:3,deadline:1654159806519,tags:["cs","ar"],folder:[0,1],createdAt:1654159790129},{id:1 ,title:"List 2",description: 'des 2', status:false,priority:5,deadline:1654159816519,tags:["cs2","ar2"],folder:[0,1],createdAt:1654159800519}];

function ListComponent(props) {
    // localStorage.setItem("archit-todo-tasks",JSON.stringify(listData));
    const {count,setCount,tasks,folders,setTasks,setFolders,selectedFolder,setSelectedFolder,expanded,handleChange,dateFormat} = useContext(AppContext);
    const [openModal,setOpenModal] = useState(false);
    const [openModalID,setOpenModalID] = useState(-1);
    const [date,setDate] = useState(new Date());
    const [folderList,setFoldersList] = useState([folders[0]]);
    const [taskTitle,setTaskTitle] = useState("");
    const [taskDescription,setTaskDescription] = useState("");
    const [taskPriority,setTaskPriority] = useState(5);
    const [taskTags,setTaskTags] = useState([]);
    const [selectedTasks,setSelectedTasks] = useState(tasks.filter(task=>folders.find(folder=>folder.id===selectedFolder).content.includes(task.id)));

    const checkTask = (e,id) => {
        e.stopPropagation()
        let newTasks = tasks;
        let idx=newTasks.findIndex(task=>task.id===id);
        newTasks[idx].status = !newTasks[idx].status;
        setTasks(newTasks);
        localStorage.setItem("archit-todo-tasks",JSON.stringify(newTasks));
        window.location.reload();
    }

    const createTaskButton = (e) => {
        e.stopPropagation()
        setOpenModalID(-1);
        setOpenModal(true);
    }

    const updateTask=(e,id)=>{
        e.stopPropagation()
        setOpenModalID(id);
        let task = tasks.find(task=>task.id===id);
        setTaskTitle(task.title);
        setTaskDescription(task.description);
        setTaskPriority(task.priority);
        setTaskTags(task.tags);
        setDate(new Date(task.deadline));
        let val=[]
        for(let i=0;i<folders.length;i++){
            val.push(folders[i])
        }
        setFoldersList(val)
        setOpenModalID(id);
        setOpenModal(true);
    }

    const deleteTask = (e,id) => {
        e.stopPropagation()
        let newTasks = tasks.filter(task => task.id !== id);
        let newFolders = folders.map(folder => {
            if(folder.content.includes(id)){
                folder.content = folder.content.filter(task => task !== id);
            }
            return folder;
        });
        setTasks(newTasks);
        setFolders(newFolders);
        localStorage.setItem("archit-todo-tasks",JSON.stringify(newTasks));
        localStorage.setItem("archit-todo-folders",JSON.stringify(newFolders));
        window.location.reload();
    }

    const excecuteModal = () => {
        let id=openModalID;
        let newFolders;
        let newTasks;
        console.log(id);
        if(id===-1){
            let foo=[]
            let newId=count;
            folderList.forEach(element => {
                foo.push(element.id);
            });
            newTasks=tasks
            newFolders=folders;
            newTasks.push({id:newId,title:taskTitle,description:taskDescription,status:false,priority:taskPriority,tags:taskTags,deadline:date.getTime(),folder:foo,createdAt:new Date().getTime()});
            folderList.forEach(folder=>{
                let idx=newFolders.findIndex(f=>f.id===folder.id);
                newFolders[idx].content.push(newId);
            });
            localStorage.setItem("archit-todo-count",count+1);
        }else{
            newTasks = tasks
            let foo=[]
            folderList.forEach(element => {
                foo.push(element.id);
            });
            let idx=newTasks.findIndex(task=>task.id===id);
            newTasks[idx].title = taskTitle;
            newTasks[idx].description = taskDescription;
            newTasks[idx].priority = taskPriority;
            newTasks[idx].tags = taskTags;
            newTasks[idx].folder = foo;
            newTasks[idx].deadline = date.getTime();

            newFolders=folders;
            let prevFolder = tasks[idx].folder;
            prevFolder.forEach(folder=>{
                let idx=newFolders.findIndex(f=>f.id===folder);
                newFolders[idx].content = newFolders[idx].content.filter(task=>task!==id);
            });
            folderList.forEach(folder=>{
                let idx=newFolders.findIndex(f=>f.id===folder.id);
                newFolders[idx].content.push(id);
                // newFolders[folder.id].content.push(id).;
            });

            console.log(newTasks);
            console.log(newFolders);
        }
        // setTaskTitle("");
        // setTaskDescription("");
        // setTaskPriority("");
        // setTaskTags([]);
        // setDate(new Date());
        // setOpenModalID(-1);
        // setTasks(newTasks);
        // setFolders(newFolders);
        // setFoldersList([folders[0]]);
        // setOpenModal(false);

        localStorage.setItem("archit-todo-folders",JSON.stringify(newFolders));
        localStorage.setItem("archit-todo-tasks",JSON.stringify(newTasks));
        window.location.reload();
    }



    

    const modalForm = (id)=>{
        return (
            <div class="form">
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Typography variant="h6" align='center' gutterBottom>{id===-1?<b>Create Task</b>:<b>Update Task</b>}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="standard-basic" label="Title" fullWidth required defaultValue={taskTitle} onChange={(e)=>{const {value} = e.target;setTaskTitle(value);}}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField multiline rows={4} id="standard-basic" label="Description" fullWidth defaultValue={taskDescription} onChange={(e)=>{const {value} = e.target;setTaskDescription(value);}}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="standard-basic" label="Tags" fullWidth  defaultValue={taskTags} onChange={(e)=>{const {value} = e.target;setTaskTags(value.split(","));}}/>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField id="standard-basic" label="Priority" fullWidth inputProps={{ inputMode: 'numeric', pattern: '[1-5]*'}} defaultValue={taskPriority} onChange={(e)=>{const {value} = e.target;setTaskPriority(parseInt(value));}}/>
                    </Grid>
                    
                    <Grid item xs={8}>
                        <Autocomplete
                            multiple
                            id="fixed-tags-demo"
                            value={folderList}
                            onChange={(event, newValue) => {
                                setFoldersList([
                                ...[folders[0]],
                                ...newValue.filter((option) => [folders[0]].indexOf(option) === -1),
                                ]);
                            }}
                            options={folders}
                            getOptionLabel={(option) => option.title}
                            renderTags={(tagValue, getTagProps) =>
                                tagValue.map((option, index) => (
                                <Chip
                                    label={option.title}
                                    variant="outlined"
                                    {...getTagProps({ index })}
                                    disabled={[folders[0]].indexOf(option) !== -1}
                                />
                                ))
                            }
                            fullWidth
                            renderInput={(params) => (
                                <TextField {...params} label="Fixed tag" placeholder="Favorites" />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <div style={{display:"flex",justifyContent:"space-between"}}>
                            <TextField label="Deadline ➜" disabled style={{width:"180px"}}/>
                            <DateTimePicker onChange={(val)=>{setDate(val)}} value={date} style={{width:"100%",height:"100%"}}/>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <Button fullWidth variant="contained" color="primary" onClick={(e)=>{excecuteModal()}}>{id===-1?"Create":"Update"}</Button>
                    </Grid>
                </Grid>
            </div>
        )
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        borderRadius: '4px',
        boxShadow: 24,
        p: 4,
    };
    return (
        <div>
            <Modal open={openModal} onClose={()=>{setOpenModal(false)}}>
                <Box sx={style}>
                    {modalForm(openModalID)}
                </Box>
            </Modal>
                <Accordion style={{border:"2px solid black"}} defaultExpanded={true} >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        style={{borderBottom:"1px solid black",backgroundColor:"#e5e5e5"}}
                    >
                        <div style={{display:'flex',justifyContent:"space-between",width:"100%"}}>
                            <Typography variant='h5' fontWeight={600}>List Section</Typography>
                            <Typography variant='h6' fontWeight={400}>Selected Folder : <b>{folders.find(folder=>folder.id===selectedFolder).title}</b></Typography>
                            <Button variant="contained" startIcon={<AddCircleIcon />} onClick={(e)=>{createTaskButton(e)}}>
                                Create New Task
                            </Button>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                    <div style={{display:"flex-block"}}>
                        {
                            selectedTasks.map((task,index)=>{
                                return(
                                    <Accordion expanded={expanded === task.id} onChange={handleChange(task.id)} style={{border:"2px solid black"}}  defaultExpanded={true}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            style={{borderBottom:"1px solid black",backgroundColor:"#f5f5f5"}}
                                            m={0}
                                            
                                        >
                                            <div style={{display:"flex",justifyContent:"space-between",width:"100%"}}>
                                                <div style={{display:"flex",justifyContent:"left"}}>
                                                    <Checkbox  checked={task.status} onClick={(e)=>{checkTask(e,task.id)}}/>
                                                    <Typography component="div" variant="h6" pt={1}>
                                                        {task.title}
                                                    </Typography>
                                                </div >
                                                <div >
                                                    <IconButton aria-label="Edit" style={{height:"100%"}} onClick={(index)=>{updateTask(index,task.id)}}>
                                                        <EditIcon sx={{height:30,width:30}}/>
                                                    </IconButton>
                                                    <IconButton aria-label="Delete" style={{height:"100%"}} onClick={(index)=>{deleteTask(index,task.id)}}>
                                                        <DeleteIcon sx={{height:30,width:30}}/>
                                                    </IconButton>
                                                </div>
                                            </div>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Box sx={{ display: 'flex',justifyContent:"space-between"}} >
                                                <div style={{ width:"100%"}}>
                                                    <Box sx={{ textAlign:"left",border:"1px solid grey", borderRadius:"5px", width:"100%",height:"100%"}}>
                                                        <Typography component="div" variant="body2" m={1}>
                                                            {task.description}
                                                        </Typography>
                                                    </Box>
                                                </div>
                                                <div style={{ width:"170px"}}>
                                                    <Box direction="row" spacing={1} p={1}>
                                                        <Chip key={index} label={"Priority: "+task.priority} variant="outlined" color="warning" size="small" />
                                                        {
                                                            task.tags.map((tag,index)=>{
                                                                return(
                                                                    tag!==" " && <Chip key={index} label={tag} variant="outlined" color="success" size="small" />
                                                                )
                                                            })
                                                        }
                                                    </Box>
                                                    <Box pl={2} style={{display:"flex", textAlign:"left",justifyContent:"space-between"}}>
                                                        <div>
                                                            <Typography variant="caption" color="text.secondary" component="div">
                                                                <b>Deadline</b><br/> {dateFormat(task.deadline)}
                                                            </Typography>
                                                            <Typography variant="caption" color="text.secondary" component="div">
                                                                <b>Created On</b><br/>{dateFormat(task.createdAt)}
                                                            </Typography>
                                                        </div>
                                                    </Box>
                                                </div>
                                            </Box>
                                            
                                        </AccordionDetails>
                                    </Accordion>
                                )
                            })
                        }
                    </div>
                    </AccordionDetails>
                </Accordion>
        </div>
    );
}

export default ListComponent;