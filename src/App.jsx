import { useState } from 'react';
import NewProjectForm from './components/NewProjectForm';
import NoProjectSelected from './components/NoProjectSelected';
import Sidebar from './components/Sidebar';
import ProjectDetails from './components/ProjectDetails';

function App() {
    const [projectsState, setProjectsState] = useState({
        // undefined means that we are doing nothing
        selectedProjectId: undefined,
        projects: [],
        tasks: [],
    });

    const handleAddTask = (text) => {
        setProjectsState((prevState) => {
            const newTask = {
                taskId: Math.random(),
                projectId: prevState.selectedProjectId,
                text: text,
            };
            return {
                ...prevState,
                tasks: [newTask, ...prevState.tasks],
            };
        });
    };

    const handleDeleteTask = () => {};

    const handleStartingProject = () => {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                // null here means that we are now adding a project
                selectedProjectId: null,
            };
        });
    };

    const handleAddProject = (projectData) => {
        setProjectsState((prevState) => {
            const newProject = {
                ...projectData,
                id: Math.random(),
            };
            return {
                ...prevState,
                selectedProjectId: undefined,
                projects: [...prevState.projects, newProject],
            };
        });
    };

    const handleCancelProject = () => {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                // null here means that we are now adding a project
                selectedProjectId: undefined,
            };
        });
    };

    const handleSelectProject = (id) => {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                selectedProjectId: id,
            };
        });
    };

    const handleDeleteProject = () => {
        setProjectsState((prevState) => {
            return {
                ...prevState,
                selectedProjectId: undefined,
                // если здесь возвращается true, то оставляем елемент
                projects: prevState.projects.filter(
                    (project) => project.id !== prevState.selectedProjectId,
                ),
            };
        });
    };

    let selectedProject = projectsState.projects.find(
        (project) => project.id === projectsState.selectedProjectId,
    );

    let content = (
        <ProjectDetails
            project={selectedProject}
            onDelete={handleDeleteProject}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
            tasks={projectsState.tasks}
        />
    );

    if (projectsState.selectedProjectId === null) {
        content = <NewProjectForm onAdd={handleAddProject} onCancel={handleCancelProject} />;
    } else if (projectsState.selectedProjectId === undefined) {
        content = <NoProjectSelected onAddingProject={handleStartingProject} />;
    } else {
    }

    return (
        <main className="h-screen my-8 flex gap-8">
            <Sidebar
                onAddingProject={handleStartingProject}
                projects={projectsState.projects}
                onSelectProject={handleSelectProject}
                selectedProjectId={projectsState.selectedProjectId}
            />
            {content}
            {/* <NoProjectSelected onAddingProject={handleStartingProject} /> */}
        </main>
    );
}

export default App;
